import { Component, signal, effect, viewChild, ElementRef, PLATFORM_ID, inject, untracked } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AiService, ChatMessage } from '../../../core/services/ai.service';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    MatToolbarModule,
    TextFieldModule,
    RouterLink,
  ],
  templateUrl: './chat-assistant.component.html',
  styleUrl: './chat-assistant.component.scss'
})
export class ChatAssistantComponent {
  chatContent = viewChild<ElementRef>('chatContent');

  private readonly aiService = inject(AiService);
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser: boolean;

  readonly messages = signal<ChatMessage[]>([
    { text: '¡Hola! Soy tu asistente virtual de Quality Kicks. ¿En qué puedo ayudarte hoy? 🎤👟', sender: 'assistant', timestamp: new Date() }
  ]);

  isOpen = signal<boolean>(false);
  isThinking = signal<boolean>(false);
  userInput: string = '';

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Voice recognition disabled for demo

    // Effect for scrolling when messages change (only in browser)
    if (this.isBrowser) {
      effect(() => {
        this.messages();
        // Use untracked to avoid infinite loops and schedule scroll
        untracked(() => {
          requestAnimationFrame(() => {
            this.scrollToBottom();
          });
        });
      });
    }
  }

  async sendMessage(): Promise<void> {
    if (this.userInput.trim() === '') return;

    // Add user message
    this.messages.update((history) => [
      ...history,
      { text: this.userInput, sender: 'user', timestamp: new Date() }
    ]);

    // Clear input
    const userQuestion = this.userInput;
    this.userInput = '';

    // Set thinking state to true
    this.isThinking.set(true);

    try {
      const response = await this.aiService.askAgent(userQuestion);
      this.messages.update((history) => [
        ...history,
        {
          sender: 'assistant',
          text: response.text,
          timestamp: new Date(),
          products: response.products
        }
      ]);
    } finally {
      // Set thinking state to false regardless of success or failure
      this.isThinking.set(false);
    }
  }

  toggleChat(): void {
    this.isOpen.update(value => !value);
  }


  formatTime(date: Date): string {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  clearHistory(): void {
    if (confirm('¿Estás seguro de que deseas limpiar el historial del chat?')) {
      this.messages.set([
        { text: '¡Hola! Soy tu asistente virtual de Quality Kicks. ¿En qué puedo ayudarte hoy? 🎤👟', sender: 'assistant', timestamp: new Date() }
      ]);
      this.aiService.resetConversation();
      console.log('✅ Chat history cleared');
    }
  }

  addProductToCart(productId: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const product = this.messages()
      .flatMap(m => m.products || [])
      .find(p => p.id === productId);

    if (product) {
      this.cartService.addToCart(product);

      // Add confirmation message
      this.messages.update((history) => [
        ...history,
        {
          sender: 'assistant',
          text: `✅ ${product.brand} ${product.name} agregado al carrito!`,
          timestamp: new Date()
        }
      ]);
    }
  }

  private scrollToBottom(): void {
    const element = this.chatContent();
    if (element) {
      element.nativeElement.scrollTop = element.nativeElement.scrollHeight;
    }
  }
}
