---
title: Solución de problemas
description: Guía de diagnóstico y resolución rápida de incidencias frecuentes en NinjaTrader 8.
order: 1
category: troubleshooting
---

# Solución de Problemas

En esta guía encontrarás las soluciones directas a las dudas técnicas e incidencias más comunes reportadas por los usuarios al operar con la suite de **Logic Indicators** en NinjaTrader 8.

---

## 1. Los Indicadores no Aparecen en la Lista (Ctrl + I)

Si abres tu gráfico, pulsas `Ctrl + I` y no encuentras la categoría **Logic Indicators** ni los indicadores con prefijo `Logic...`, revisa las siguientes causas:

### Causa A: No se reinició NinjaTrader 8 tras la importación
* **Solución:** NinjaTrader 8 compila y registra los ensamblados externos únicamente al arrancar. Cierra la aplicación por completo y vuelve a abrirla.

### Causa B: Conflicto con una versión previa de los indicadores
* **Solución:** Si tenías instalada una versión anterior, debes removerla antes de importar la nueva.  
  1. Ve a **Tools → Remove NinjaScript Assembly...**.  
  2. Selecciona y elimina todos los archivos que comiencen con las letras **LOF** (ej. `LOF_FullPack`, `LOF_BasicPack`, `LOF_DepthPack`, etc.).  
  3. **Reinicia NinjaTrader 8**.  
  4. Vuelve a importar tu archivo `.zip` descargado desde `Tools → Import → NinjaScript Add-On...`.  
  5. Vuelve a reiniciar NinjaTrader 8.

### Causa C: Error de compilación en otros scripts de NinjaTrader 8
* Si tienes indicadores o estrategias de terceros con errores en su código, NinjaTrader bloquea la compilación de todos los scripts del sistema.
* **Cómo comprobarlo:**  
  1. En el Centro de Control de NinjaTrader 8, ve a **New → NinjaScript Editor**.  
  2. En la ventana del editor, presiona la tecla **F5** (o haz clic derecho y selecciona *Compile*).  
  3. Si en la parte inferior aparece un recuadro amarillo/rojo indicando errores en scripts ajenos, deberás corregirlos o eliminarlos para que NinjaTrader pueda compilar y activar la suite.

---

## 2. Aparece Alerta de Licencia o el Indicador no Dibuja Nada

Si puedes agregar el indicador a tu gráfico, pero este muestra un aviso de licencia no válida o no dibuja datos:

### Causa A: El Machine ID no coincide con el registrado en tu cuenta
* **Solución:**
  1. En NinjaTrader 8, ve al menú superior: **Help → About**.
  2. Copia exactamente la clave alfanumérica que aparece en el campo **Machine ID**.
  3. Abre tu [Zona de miembros](/dashboard), ubica la tarjeta de **NinjaTrader ID** en la esquina superior izquierda y pega el valor copiado para guardarlo.
  4. Cierra y vuelve a abrir NinjaTrader 8 para que valide la clave actualizada.

### Causa B: Sin conexión a internet al iniciar NinjaTrader 8
* **Solución:** La validación de tu licencia requiere conexión a internet al momento de cargar el indicador por primera vez en la sesión. Asegúrate de que tu cortafuegos (*firewall*) o antivirus no esté bloqueando las conexiones salientes de NinjaTrader 8.

### Causa C: El producto adquirido no incluye ese indicador específico
* **Solución:** Verifica en tu [Zona de miembros](/dashboard) qué indicadores comprende tu paquete. Por ejemplo, el paquete básico no incluye los indicadores de libro de órdenes profundo (`Logic Depth Chart` y `Logic Depth Live`), los cuales forman parte del *Depth Pack* o de la *Suite Completa*.

---

## 3. Error al Importar el Archivo .zip en NinjaTrader 8

Si al intentar importar el archivo mediante `Tools → Import → NinjaScript Add-On...` NinjaTrader muestra un mensaje de error:

### Causa A: El archivo fue descomprimido por el navegador
* Algunos navegadores o gestores de descarga extraen automáticamente el contenido de los archivos comprimidos al terminar de bajarlos.
* **Solución:** NinjaTrader 8 requiere el archivo original en formato `.zip` sin descomprimir. Vuelve a descargarlo desde el [Dashboard](/dashboard) asegurándote de guardar el archivo `.zip` intacto.

### Causa B: Descarga corrupta o incompleta
* **Solución:** Si tu conexión experimentó micro-cortes durante la descarga, el archivo puede quedar incompleto. Elimina el archivo anterior y descárgalo nuevamente desde tu panel de usuario.

---

## 4. El Gráfico va Lento o se Producen Caídas de FPS

Si notas que tu gráfico pierde fluidez o el movimiento se vuelve pesado:

1. **Ajusta `Days to load` en la serie de datos:**  
   Presiona `Ctrl + F` sobre el gráfico. En gráficos de velas por volumen, ticks o segundos, fija **Days to load** en **3 o 5 días**. Cargar 20 o 30 días de datos históricos a nivel de tick consume gigabytes innecesarios de memoria RAM.
2. **Configura el `Zero-Lag Engine Mode` en `Balanced` o `MaxPerformance`:**  
   En las propiedades del indicador (`Ctrl + I`), cambia el modo de rendimiento a **Balanced** o **MaxPerformance** para reducir la demanda sobre tu procesador.
3. **Activa `Merge Nearby Bubbles` en BigTrades y Depth Live:**  
   Asegúrate de mantener activada esta opción para que las transacciones simultáneas se fusionen en una sola burbuja magnética, evitando que la pantalla se sature con miles de micro-objetos en momentos de noticias económicas.
4. **Utiliza `Min Volume Filter`:**  
   Filtra órdenes pequeñas (ej. menores a 20 o 50 contratos según el mercado) para que el indicador no gaste recursos dibujando transacciones insignificantes de traders minoristas.

---

## 5. ¿Qué Hacer si Formateas tu PC o Cambias de Computador?

No necesitas esperar la intervención del equipo técnico:
1. Instala NinjaTrader 8 en tu nuevo equipo o tras formatear.
2. Ve a **Help → About** y copia el nuevo **Machine ID**.
3. Inicia sesión en tu cuenta desde el navegador, entra al [Dashboard](/dashboard) y actualiza el campo **NinjaTrader ID** con tu nueva clave.
4. Vuelve a descargar tu producto e instálalo normalmente.

---

## 6. Canales de Soporte Directo

Si tu consulta no queda resuelta con los pasos anteriores, nuestro equipo de soporte técnico está disponible para asistirte:
* **Soporte oficial por WhatsApp:** [Escríbenos directamente aquí](https://wa.me/573113006826)
* **Formulario de contacto:** [Página de Contacto](/contact)
