---
title: Logic Footer
description: Panel estadístico exhaustivo que muestra volumen, delta, métricas acumulativas y datos de transacciones por vela.
order: 2
category: indicators
---

# Logic Footer

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Footer** es un potente motor estadístico que se sitúa en la parte inferior de tu gráfico o flota directamente por encima/debajo de tus velas. Extrae los datos puros del Order Flow de cada barra y calcula métricas cruciales como el Delta Acumulado, el Compromiso de los Traders (COT), el Delta Máx/Mín y el conteo de transacciones (Trades).

Al traducir los complejos datos de los ticks en una cuadrícula codificada por colores y fácil de leer, los traders pueden detectar divergencias al instante (ej. el precio sube pero el Delta es muy negativo), evaluar el verdadero esfuerzo detrás de una ruptura y monitorear el cambio de momentum en la sesión.

## Componentes Principales

El indicador cuenta con dos motores de renderizado independientes que pueden usarse juntos o por separado:

1. **Fixed Footer (Footer Fijo):** Una cuadrícula estadística tradicional anclada en la parte inferior del gráfico. Incluye etiquetas de fila a la izquierda o derecha y es perfecta para rastrear cambios macroeconómicos (como el Delta Acumulado o el Volumen de la Sesión).

2. **Floating DataBox (Caja de Datos Flotante):** Una caja de estadísticas compacta y flotante que se sitúa automáticamente arriba o abajo de las velas. Ideal para mantener los ojos en la acción del precio mientras se monitorean las métricas inmediatas de la barra.

3. **Heatmaps Dinámicos (Mapas de calor):** En lugar de mostrar solo números, el fondo de las celdas cambia de color o de opacidad en función de lo fuerte que sea el valor en comparación con el resto del mercado.

4. **Auto-Fit Engine (Auto-Ajuste):** Comprime automáticamente la escala de precio del gráfico para que las velas nunca se oculten detrás del Footer o el DataBox.

## Herramientas Interactivas (Barra superior)

Logic Footer incluye una barra de herramientas de acceso rápido en tu gráfico para alternar elementos visuales sin abrir la configuración del indicador:

- **FT:** Muestra u oculta instantáneamente el Fixed Footer en la parte inferior del gráfico.

- **DB:** Muestra u oculta instantáneamente el Floating DataBox pegado a las velas.

## Opciones de Configuración

Debido a que el Fixed Footer y el Floating DataBox son totalmente independientes, tienen sus propias secciones de configuración dedicadas:

### 1. Configuración General (General Settings)

- **Zero-Lag Engine Mode:** Controla la tasa de actualización gráfica para optimizar la CPU. Las opciones incluyen **Smooth**, **Balanced**, **Max Performance** o **Disabled** (tiempo real). Usa **Balanced** en gráficos pesados.

- **Layer Mode & Priority:** Define si el footer se dibuja detrás o delante de otros elementos del gráfico (**BehindPrice**, **Normal**, **TopMost**).

### 2. Gráficos de Footer y DataBox (Graphics)

Estas dos secciones controlan la estética visual de sus respectivos paneles:

- **Enable...:** Interruptor maestro para encender o apagar el panel.

- **Auto-Fit Scale:** Si está activado, el eje Y del gráfico se encogerá automáticamente para hacer espacio para el panel.

- **Colors & Opacities:** Define los colores base para Volumen, Ask, Bid y métricas Custom. Puedes establecer una **Min Opacity** y **Max Opacity** para el fondo de las celdas.

- **Text Color Mode:**

  - **AutoContrast:** El texto cambia automáticamente a blanco o negro dependiendo del color de fondo de la celda para asegurar su lectura.

  - **SameAsCell:** El texto toma el color exacto del fondo de la celda (útil si pones la opacidad de la celda en 0 y solo quieres el texto de color).

  - **CustomColor:** Fuerza a que todo el texto use un color manual específico.

- **Show Labels / Labels Position:** Muestra u oculta los títulos descriptivos (ej. "Vol", "Del") y los posiciona a la izquierda (**Left**) o derecha (**Right**).

- **DataBox Distance (Ticks):** A qué distancia (en ticks) flota el DataBox del máximo/mínimo de la vela.

### 3. Modo de Escala de Valor Máximo (Scale Mode)

Esta sección dicta cómo el indicador calcula la intensidad (color/opacidad) de las celdas:

- **Max Calculation Mode:**

  - **VisibleBars:** Compara la celda contra el valor más alto actualmente visible en tu pantalla.

  - **CustomSession:** Compara la celda contra el valor más alto dentro del horario definido en Custom Session.

  - **AllData:** Compara contra todo el historial cargado en el gráfico.

  - **Manual:** Compara la celda contra límites fijos que defines manualmente en la sección "Manual Value".

- **Reset Delta per Session:** Si se activa, el Delta Acumulado se reinicia a cero al inicio de una nueva sesión operativa.

### 4. Valores Manuales (Manual Value)

Si tu *Scale Mode* está configurado en **Manual**, esta sección define los límites de techo. Por ejemplo, si configuras *Total Volume* en 5000, cualquier vela con 5000+ contratos de volumen brillará con la máxima intensidad (100% de opacidad o Heatmap Nivel 5).

### 5. Métricas (Footer Metrics & DataBox Metrics)

Selecciona exactamente qué filas de datos quieres mostrar en cada panel. Puedes mostrar más de 20 estadísticas diferentes, incluyendo:

- **Total / Buy / Sell Volume:** Volumen estándar operado.

- **Delta & Delta (%):** La diferencia neta entre compradores y vendedores agresivos.

- **Max / Min Delta:** El Delta más alto y más bajo alcanzado *durante* la formación de la vela.

- **COT High / COT Low:** "Compromiso de los Traders". Mide el Delta acumulado exclusivamente desde que la vela hizo su Máximo o Mínimo.

- **Top / Bottom Delta:** El Delta ejecutado precisamente en el tick extremo superior o extremo inferior de la vela.

- **Cumulative Delta / Cum Volume:** Acumulaciones a lo largo de toda la sesión.

- **Bar Range & Time (Duration):** Cuántos ticks abarca la vela y cuántos segundos tardó en cerrar.

### 6. Mapas de Calor (Heatmaps)

Si activas **Footer/DataBox Heatmap** en la sección de gráficos, el indicador ignorará la opacidad y usará una escala de color de 5 niveles. El Nivel 1 representa actividad baja/fría, mientras que el Nivel 5 representa actividad institucional extrema. Puedes personalizar los colores de cada nivel.

### 7. Vista Alejada (Zoomed Out View)

Para evitar que la pantalla se vuelva un caos al alejar el zoom, el sistema de Nivel de Detalle (LOD) oculta elementos automáticamente:

- **Hide Labels / DataBox / Footer (Candle Width):** El ancho mínimo en píxeles que debe tener una vela. Si la vela se vuelve más delgada que este valor al hacer zoom, el panel o texto respectivo desaparecerá automáticamente.

## Mejores Prácticas y Tips

- **Divide la Carga Visual:** Un excelente setup es habilitar el **Floating DataBox** para mostrar solo 2 métricas: *Delta* y *Volumen* (para lectura rápida), mientras usas el **Fixed Footer** en la parte inferior para mostrar estadísticas macro como el *Delta Acumulado*, *Max/Min Delta* y *COT*.

- **Usa el Auto-Fit:** Mantén siempre encendido el **Footer Auto-Fit**. Esto asegura que tus velas nunca queden enterradas detrás de la cuadrícula de datos en la parte inferior de tu pantalla.

- **Identifica Absorciones con Max/Min Delta:** Si una vela alcista cierra con un Delta altamente positivo, pero su *Min Delta* fue extremadamente negativo durante la barra, significa que los vendedores intentaron empujar el mercado hacia abajo, fueron absorbidos y los compradores tomaron el control.

## Ver también

- [Logic Footprint](/docs/indicators/logic-footprint) — Observa el volumen distribuido dentro de la vela.

- [Logic Analytics](/docs/indicators/logic-analytics) — Dibuja cajas estadísticas personalizadas sobre áreas específicas de la acción del precio.
