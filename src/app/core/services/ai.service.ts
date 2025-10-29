import { Inject, Injectable, inject } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';
import {
  ChatSession,
  FunctionDeclarationsTool,
  GenerativeModel,
  getGenerativeModel,
  Schema,
  ObjectSchemaInterface,
  VertexAI,
  getAI,
  VertexAIBackend,
  GoogleAIBackend,
} from '@angular/fire/vertexai';
import { FirebaseApp } from '@angular/fire/app';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  products?: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly vertexAI = inject(VertexAI);
  private readonly model: GenerativeModel;
  private chat: ChatSession;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: FirebaseApp) {
    // Define function tools for the AI
    const sneakerStoreToolSet: FunctionDeclarationsTool = {
      functionDeclarations: [
        {
          name: 'search_products',
          description:
            'Busca productos de tenis en el catálogo. Puede buscar por texto general (nombre del modelo, descripción), marca específica, talla US, o género. Si el usuario menciona cualquier característica de tenis, usa esta función.',
          parameters: Schema.object({
            properties: {
              query: Schema.string({
                description:
                  'Búsqueda general de texto. Incluye el nombre del modelo, marca, o cualquier palabra clave mencionada por el usuario (ej: "Air Max", "running", "deportivos")',
              }),
              brand: Schema.string({
                description:
                  'Marca específica del producto si el usuario la menciona (Nike, Adidas, On, New Balance, Converse, Puma, Vans, Asics)',
              }),
              size: Schema.number({
                description: 'Talla US específica si el usuario la menciona (6-12)',
              }),
              gender: Schema.string({
                description: 'Género si el usuario lo especifica (hombre, mujer, unisex)',
                enum: ['hombre', 'mujer', 'unisex'],
              }),
            },
          }) as ObjectSchemaInterface,
        },
        {
          name: 'add_to_cart',
          description:
            'Agrega un producto específico al carrito de compras del cliente usando su ID.',
          parameters: Schema.object({
            properties: {
              productId: Schema.string({
                description: 'ID único del producto a agregar al carrito',
              }),
              quantity: Schema.number({
                description: 'Cantidad de unidades a agregar (por defecto 1)',
              }),
            },
            required: ['productId'],
          }) as ObjectSchemaInterface,
        },
        {
          name: 'remove_from_cart',
          description: 'Elimina un producto específico del carrito de compras usando su ID.',
          parameters: Schema.object({
            properties: {
              productId: Schema.string({
                description: 'ID único del producto a eliminar del carrito',
              }),
            },
            required: ['productId'],
          }) as ObjectSchemaInterface,
        },
        {
          name: 'view_cart',
          description:
            'Obtiene el contenido completo del carrito de compras incluyendo productos, cantidades y total.',
        },
        {
          name: 'clear_cart',
          description: 'Vacía completamente el carrito de compras eliminando todos los productos.',
        },
      ],
    };

    const systemInstruction = `Eres un asistente virtual amigable y experto en ventas de tenis para Quality Kicks, una tienda hondureña.

CONTEXTO DE LA TIENDA:
- Marcas disponibles: Nike, Adidas, On, New Balance, Converse, Puma, Vans, Asics
- Tallas: US 6-12
- Géneros: Hombre, Mujer, Unisex (los unisex sirven para ambos)
- Moneda: Lempiras hondureñas (HNL)
- Todos los productos son nuevos de paquete

TU TRABAJO:
1. BUSCAR productos cuando el usuario mencione cualquier característica de tenis
   - Usa search_products con el parámetro "query" para búsquedas generales
   - Si dicen "Nike", "Adidas", etc. → usa el parámetro brand
   - Si mencionan talla → usa el parámetro size
   - Si especifican género → usa el parámetro gender
   - SIEMPRE busca aunque la consulta sea vaga

2. RESPONDER según los resultados:
   - Si encuentras productos: Da una respuesta descriptiva pero concisa (2-3 líneas)
     Ejemplo: "¡Perfecto! Encontré 5 tenis Nike increíbles para ti. Tenemos desde los clásicos Air Max hasta modelos para running. ¿Te gustaría agregar alguno al carrito?"
   - Menciona cantidad, marca/tipo, y haz una pregunta de seguimiento
   - NO listes cada producto individualmente, las tarjetas visuales los mostrarán
   - Si NO encuentras nada: Explica y sugiere alternativas con más detalle
   - Para carrito u otras acciones: Responde con claridad y contexto

3. GESTIONAR el carrito
   - Agrega productos cuando el cliente lo pida
   - Muestra el carrito cuando lo soliciten
   - Da retroalimentación útil sobre las acciones

ESTILO DE COMUNICACIÓN:
- Español natural y conversacional
- Respuestas útiles y con personalidad
- Formato de precios: "L 3,418.70"
- Usa emojis para ser más amigable 👟😊
- Haz preguntas de seguimiento para ayudar al cliente

IMPORTANTE:
- Cuando encuentres productos: Describe el resultado en 2-3 líneas máximo
- Sé específico sobre cantidad, marcas, o características destacadas
- NO listes cada producto, las tarjetas visuales harán eso
- Siempre pregunta algo para continuar la conversación`;

    // Initialize Gemini Developer API/Vertex AI Gemini API Service
    const ai = getAI(this.firebaseApp, { backend: new GoogleAIBackend() });

    // Initialize Gemini model with function calling
    this.model = getGenerativeModel(ai, {
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction,
      tools: [sneakerStoreToolSet],
    });

    // Initialize chat session
    this.chat = this.model.startChat();

    console.log('✅ Firebase AI initialized successfully with ChatSession');
  }

  async askAgent(userInput: string): Promise<{ text: string; products?: Product[] }> {
    // Send message to chat session
    let result = await this.chat.sendMessage(userInput);
    let foundProducts: Product[] | undefined;

    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      for (const functionCall of functionCalls) {
        switch (functionCall.name) {
          case 'search_products': {
            const args = functionCall.args as {
              query?: string;
              brand?: string;
              size?: number;
              gender?: string
            };
            const functionResult = this.searchProducts(args);

            // Store products for UI display
            if (functionResult.count > 0) {
              foundProducts = functionResult.products.map((p: any) => ({
                id: p.id,
                name: p.name,
                brand: p.brand,
                size: p.size,
                price: p.price,
                gender: p.gender,
                stock: p.stock,
                description: p.description,
                imageUrl: this.productService.getProductById(p.id)?.imageUrl || ''
              }));
            }

            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: functionResult,
                },
              },
            ]);
            break;
          }

          case 'add_to_cart': {
            const args = functionCall.args as { productId: string; quantity?: number };
            const functionResult = this.addToCart(args);
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: functionResult,
                },
              },
            ]);
            break;
          }

          case 'remove_from_cart': {
            const args = functionCall.args as { productId: string };
            const functionResult = this.removeFromCart(args);
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: functionResult,
                },
              },
            ]);
            break;
          }

          case 'view_cart': {
            const functionResult = this.viewCart();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: functionResult,
                },
              },
            ]);
            break;
          }

          case 'clear_cart': {
            const functionResult = this.clearCart();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: functionResult,
                },
              },
            ]);
            break;
          }
        }
      }
    }

    return {
      text: result.response.text(),
      products: foundProducts
    };
  }

  /**
   * Reset the chat session to start a new conversation
   */
  resetConversation(): void {
    this.chat = this.model.startChat();
    console.log('Chat session reset');
  }

  // Function implementations
  private searchProducts(args: {
    query?: string;
    brand?: string;
    size?: number;
    gender?: string
  }): any {
    console.log('🔍 Search args:', args);

    let products: Product[];

    // Strategy 1: Text search with query
    if (args.query) {
      products = this.productService.searchProducts(args.query);
      console.log(`📝 Text search for "${args.query}": ${products.length} results`);

      // Apply additional filters to text search results
      if (args.brand) {
        products = products.filter(p =>
          p.brand.toLowerCase().includes(args.brand!.toLowerCase())
        );
      }
      if (args.size) {
        products = products.filter(p => p.size === args.size);
      }
      if (args.gender) {
        products = products.filter(p =>
          p.gender === args.gender || p.gender === 'unisex'
        );
      }
      console.log(`🎯 After additional filters: ${products.length} results`);
    }
    // Strategy 2: Filter-based search
    else {
      const filters: any = {};
      if (args.brand) filters.brand = args.brand;
      if (args.size) filters.size = args.size;
      if (args.gender) filters.gender = args.gender;

      if (Object.keys(filters).length > 0) {
        products = this.productService.filterProducts(filters);
        console.log(`🎯 Filter search: ${products.length} results`);
      } else {
        // No filters at all, return all products
        products = this.productService.getProducts();
        console.log(`📋 Showing all products: ${products.length}`);
      }
    }

    console.log(`✅ Final results: ${products.length} products`);

    return {
      count: products.length,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        size: p.size,
        price: p.price,
        gender: p.gender,
        stock: p.stock,
        description: p.description,
      })),
    };
  }

  private addToCart(args: { productId: string; quantity?: number }): any {
    const product = this.productService.getProductById(args.productId);

    if (!product) {
      return { success: false, error: 'Producto no encontrado' };
    }

    if (product.stock === 0) {
      return { success: false, error: 'Producto agotado' };
    }

    const quantity = args.quantity || 1;
    this.cartService.addToCart(product, quantity);

    return {
      success: true,
      message: `${product.brand} ${product.name} agregado al carrito`,
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        size: product.size,
        price: product.price,
      },
      quantity,
    };
  }

  private removeFromCart(args: { productId: string }): any {
    const item = this.cartService.getCartItem(args.productId);

    if (!item) {
      return { success: false, error: 'Producto no encontrado en el carrito' };
    }

    this.cartService.removeFromCart(args.productId);

    return {
      success: true,
      message: `${item.product.brand} ${item.product.name} eliminado del carrito`,
      product: {
        name: item.product.name,
        brand: item.product.brand,
      },
    };
  }

  private viewCart(): any {
    const items = this.cartService.items();
    const total = this.cartService.total();

    return {
      itemCount: items.length,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        size: item.product.size,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      })),
      total,
    };
  }

  private clearCart(): any {
    const itemCount = this.cartService.items().length;
    this.cartService.clearCart();
    return {
      success: true,
      message: 'Carrito vaciado',
      itemsRemoved: itemCount,
    };
  }
}
