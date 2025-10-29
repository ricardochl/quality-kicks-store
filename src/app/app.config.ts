import { ApplicationConfig, Injector, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideVertexAI, getVertexAI, VertexAIBackend, getAI, GoogleAIBackend } from '@angular/fire/vertexai';
const firebaseApp = initializeApp(environment.firebase);
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideVertexAI(() => getAI(firebaseApp)),
    provideFirebaseApp(() => firebaseApp),
    {
      provide: 'FIREBASE_APP',
      useValue: firebaseApp
    }
  ]
};
