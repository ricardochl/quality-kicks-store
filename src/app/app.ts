import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatAssistantComponent } from './shared/components/chat-assistant/chat-assistant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatAssistantComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
