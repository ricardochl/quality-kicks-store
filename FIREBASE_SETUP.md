# 🔥 Firebase AI Setup - Quality Kicks

## 📋 Requisitos Previos

1. Cuenta de Google/Firebase
2. Proyecto Firebase creado

## 🚀 Pasos de Configuración

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombre: `quality-kicks-store`
4. Habilita Google Analytics (opcional)

### 2. Habilitar Firebase AI Logic

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. En tu proyecto, abre el apartado "Build" > "Extensions & AI Logic"
3. Habilita **AI Logic** y acepta los términos

### 3. Obtener Credenciales de Firebase

1. En Firebase Console, ve a Configuración del proyecto (⚙️)
2. En la pestaña "General", baja hasta "Tus aplicaciones"
3. Click en el ícono de web (`</>`)
4. Registra tu app: `quality-kicks-store`
5. Copia la configuración de Firebase

### 4. Configurar el Proyecto

Actualiza los archivos de entorno con tus credenciales:

**`src/environments/environment.ts`:**
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

**`src/environments/environment.prod.ts`:**
```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: "TU_API_KEY_PRODUCCION",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

### 5. Configurar Reglas de Seguridad (Opcional)

Si usas Firestore u otros servicios, configura las reglas en Firebase Console.

### 6. Verificar Configuración

1. Inicia el servidor de desarrollo:
```bash
npm start
```

2. Abre el navegador en `http://localhost:4200`
3. Abre la consola del navegador
4. Deberías ver logs de inicialización de Firebase AI Logic
5. Si hay errores de API Key, verifica las credenciales

## 🧪 Probar el Asistente AI

### Comandos de Prueba:

1. **Buscar productos:**
   - "Muéstrame tenis Nike"
   - "Busco tenis para correr talla 10"
   - "Quiero ver tenis de mujer"

2. **Agregar al carrito:**
   - "Agrega los Nike Air Max al carrito"
   - "Añade el producto 1 al carrito"

3. **Ver carrito:**
   - "Muéstrame mi carrito"
   - "¿Qué tengo en el carrito?"

4. **Conversación natural:**
   - "Hola, necesito tenis para hacer ejercicio"
   - "¿Cuál es el tenis más barato?"
   - "Recomiéndame algo elegante"

## 🔧 Troubleshooting

### Error: "Firebase not initialized"
- ✅ Verifica que las credenciales en `environment.ts` sean correctas
- ✅ Asegúrate de que el proyecto esté creado en Firebase

### Error: "AI Logic is not enabled"
- ✅ Ve a Firebase Console > AI Logic
- ✅ Habilita AI Logic
- ✅ Espera 2-3 minutos para que se propague

### Fallback a reglas básicas
- Si Firebase AI no está configurado, el sistema usa reglas básicas automáticamente
- No hay pérdida de funcionalidad, solo menos inteligencia conversacional

## 📊 Monitoreo de Uso

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Abre "AI Logic" > "Usage & Quotas"
3. Revisa uso y costos; AI Logic usa precios de Gemini API

## 💰 Costos Estimados

**Gemini 1.5 Flash (modelo usado):**
- Input: ~$0.075 por 1M caracteres
- Output: ~$0.30 por 1M caracteres
- Para uso normal de tienda: **$1-5/mes**

## 🔐 Seguridad

**Nunca compartas públicamente:**
- ❌ API Keys
- ❌ Credenciales de Firebase
- ❌ Project IDs sensibles

**Buenas prácticas:**
- ✅ Usa variables de entorno
- ✅ Configura reglas de seguridad
- ✅ Habilita App Check (producción)
- ✅ Monitorea el uso regularmente

## 📚 Recursos

- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase AI Logic](https://firebase.google.com/docs/ai-logic)
- [Gemini API](https://ai.google.dev/docs)
- [Pricing](https://ai.google.dev/pricing)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación oficial de Firebase.

