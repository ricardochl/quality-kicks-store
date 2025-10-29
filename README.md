# Quality Kicks - Tienda de Tenis con IA

Una aplicación Angular moderna para una tienda de tenis en línea con un asistente de chat inteligente (conversacional en español).

## Características

- 🛍️ **Catálogo de productos**: Explora tenis con filtros avanzados (marca, talla, género)
- 🛒 **Carrito de compras**: Agrega/quita ítems con estado reactivo (Angular Signals)
- 🤖 **Asistente de Chat con IA**: Basado en **Firebase AI Logic (Gemini)**
- 🎨 **Tema Material vibrante**: Paleta Azure (tokens de Material 3) aplicada a toda la UI
- 🧠 **Function Calling**: La IA puede buscar productos, gestionar el carrito y dar recomendaciones
- 📱 **Diseño responsive**: Enfoque mobile‑first con Angular Material
- 🎨 **UI moderna**: Interfaz limpia con Material Design 3
- 👟 **Catálogo extenso**: 24 productos, tallas US 6‑12 para hombre, mujer y unisex
- 💬 **Conversación natural**: Español con contexto (ChatSession)

## Tecnologías

- **Angular 20+** con Standalone Components
- **Angular Material** para la UI
- **Angular Signals** para estado reactivo
- **TypeScript** para tipado seguro
- **SCSS** para estilos
- **Firebase AI Logic (Gemini 1.5 Flash)** para el asistente conversacional
- **Firebase** para despliegue y hosting
- Theming Material 3 con `$azure-palette` y tokens del sistema (`--mat-sys-*`)
- **Function Calling** for AI-driven actions

## Requisitos

- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

1. **Clone the repository**:
```bash
git clone <repository-url>
cd quality-kicks-store
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
ng serve
```

4. **Open your browser** and navigate to:
```
http://localhost:4200
```

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # TypeScript interfaces
│   │   │   ├── product.model.ts
│   │   │   └── cart.model.ts
│   │   ├── services/         # Business logic services
│   │   │   ├── product.service.ts
│   │   │   ├── cart.service.ts
│   │   │   └── ai.service.ts
│   │   └── mocks/           # Mock data
│   │       └── products.mock.ts
│   ├── features/
│   │   ├── layout/          # Layout components
│   │   │   ├── layout.component.ts
│   │   │   ├── header.component.ts
│   │   │   └── footer.component.ts
│   │   ├── products/        # Product features
│   │   │   ├── product-list.component.ts
│   │   │   └── product-card.component.ts
│   │   └── cart/            # Shopping cart
│   │       └── cart.component.ts
│   ├── shared/
│   │   └── components/
│   │       └── chat-assistant/   # AI Chat Assistant
│   │           └── chat-assistant.component.ts
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
└── styles.scss              # Global styles
```

## 🤖 Uso del asistente de chat con IA

El asistente está impulsado por **Firebase AI Logic (Gemini 1.5 Flash)** y entiende lenguaje natural en español. Haz clic en el botón azul del chat para empezar.

### ⚙️ Configuración de IA

**Primera configuración:**
1. Sigue las instrucciones en [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
2. Configura tus credenciales de Firebase en `src/environments/environment.ts`
3. La IA funcionará automáticamente con conversaciones inteligentes

**Modo de respaldo:**
- Si Firebase AI no está configurado, el sistema opera con comandos basados en reglas
- Las funcionalidades permanecen, pero sin conversación natural

### 💬 Ejemplos de conversación:

**Lenguaje natural (con Firebase AI):**
- "Hola, necesito tenis para hacer ejercicio"
- "Busco algo cómodo para caminar, talla 9"
- "¿Cuál es el tenis más barato que tienes?"
- "Muéstrame opciones para mujer"
- "Agrégalo al carrito por favor"
- "¿Qué marcas tienes disponibles?"

**Comandos basados en reglas (respaldo):**
- "mostrar tenis Adidas talla 9"
- "buscar Nike para mujer"
- "agregar Nike Air Max talla 10 al carrito"
- "mostrar mi carrito"
- "limpiar carrito"



## Compilación para producción

```bash
ng build --configuration production
```

Los artefactos se generan en el directorio `dist/`.

## Despliegue a Firebase

### 1. Instalar Firebase CLI:
```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión en Firebase:
```bash
firebase login
```

### 3. Inicializar Firebase:
```bash
firebase init hosting
```

Configuración:
- Selecciona "Use an existing project" o crea uno nuevo
- Directorio público: `dist/quality-kicks-store/browser`
- Single Page App: Sí
- Builds automáticos: Opcional

### 4. Compilar y desplegar:
```bash
ng build --configuration production
firebase deploy
```

Tu app quedará disponible en: `https://<tu-project-id>.web.app`

## Comandos de desarrollo

```bash
# Start development server
ng serve

# Build for production
ng build --configuration production

# Run unit tests
ng test

# Run linting
ng lint

# Generate a component
ng generate component component-name

# Generate a service
ng generate service service-name
```

## Datos de ejemplo

The application includes **24 brand-new sneakers** from top brands:

### Marcas disponibles:
- **Nike**: Air Max 90, Air Max 270, Air Force 1, Air Jordan 1, React Infinity, Air Max 97, ZoomX Vaporfly
- **Adidas**: Ultraboost 22, Stan Smith, Superstar Platform, NMD_R1, Ultraboost Light
- **On**: Cloud 5, Cloudstratus
- **New Balance**: Fresh Foam 1080, Fresh Foam X 880
- **Converse**: Chuck Taylor All Star, Chuck 70 High Top
- **Puma**: Suede Classic, Cali Sport
- **Vans**: Old Skool
- **Asics**: Gel-Kayano 29

### Detalles de productos:
- **Sizes**: US 6-12 (tallas americanas)
- **Gender**: Hombre (14 products), Mujer (10 products), Unisex (3 products)
- **Condition**: All products are brand new (todos nuevos)
- **Stock**: Real-time stock availability with low stock indicators
- **Currency**: Honduran Lempira (HNL) - Exchange rate: 1 USD = 26.30 HNL
- **Prices**: Range from L 1,840.70 to L 6,574.70

## Funcionalidades en detalle

### Servicio de productos
- Get all products (24 sneakers)
- Filter by brand, size (US 6-12), and gender (hombre/mujer/unisex)
- Search products by keyword (name, brand, description)
- Stock availability checking

### Servicio de carrito
- Add/remove products with stock validation
- Update quantities dynamically
- Calculate totals in real-time
- Reactive state management with Angular Signals
- Cart item counter badge

### Servicio de IA (Firebase AI Logic)
- **Gemini 1.5 Flash** model for fast, intelligent responses
- **Function Calling** for executing actions (search, add to cart, etc.)
- **Conversation History** for context-aware interactions
- Natural language understanding in Spanish
- Intelligent product recommendations based on user needs
- Automatic fallback to rule-based system if AI unavailable
- Cost-effective: ~$1-5/month for typical usage

## Navegadores compatibles

- Chrome, Edge, Firefox, Safari (Material 3 + Angular 20)

## Contribuir

1. Haz fork del repositorio
2. Crea una rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo MIT.

## Soporte

Para dudas o problemas, abre un issue en el repositorio.

## 🔥 Configuración de Firebase AI

**Importante:** Para habilitar el asistente conversacional completo, debes configurar Firebase AI Logic:

1. **Follow the setup guide:** [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
2. **Configure credentials:** Update `src/environments/environment.ts` with your Firebase project details
3. **Enable Firebase AI Logic:** Habilita las APIs necesarias en Google Cloud Console
4. **Start chatting:** The AI will automatically use Gemini for intelligent responses

**Sin Firebase AI:**
- La app funciona con comandos basados en reglas
- Todas las funcionalidades están disponibles
- No habrá conversaciones en lenguaje natural

### Aspectos destacados de UI (Material 3)
- Tema vivo basado en `$azure-palette` (primary y secondary)
- Uso extensivo de system tokens: `surface(-container)`, `primary(-container)`, `secondary(-container)`, `tertiary`, `outline-variant`, etc.
- Chat con burbujas diferenciadas (usuario: secondary; asistente: surface con borde) y campo de entrada ancho con `matSuffix`.

**Cost:** Typical usage costs ~$1-5/month with Gemini 1.5 Flash

## Acknowledgments

- Angular Team for the amazing framework
- Material Design team for the beautiful UI components
- Google Firebase & Firebase AI Logic por las capacidades de IA
- Unsplash for product images

---

**Quality Kicks** - Los mejores tenis al mejor precio 👟 🤖

Construido con ❤️ usando Angular 20 + Firebase AI Logic
