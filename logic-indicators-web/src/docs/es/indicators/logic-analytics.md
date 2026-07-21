---
title: Logic Analytics
description: Caja estadística de Order Flow que analiza Volumen, Delta y Rango con desviaciones estándar.
order: 6
category: indicators
---

# Logic Analytics

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Analytics** es una herramienta estadística avanzada diseñada para analizar el Order Flow dentro de un rango de tiempo específico. Aísla la acción del precio dentro de una "Caja" personalizable y calcula las métricas reales del mercado, como el Volumen, Delta Positivo, Delta Negativo y el Rango de precio.

Al calcular promedios y desviaciones estándar dinámicamente, Logic Analytics te permite identificar al instante cuándo el mercado se comporta con normalidad y cuándo está experimentando un empuje institucional anómalo. Esto lo convierte en una herramienta esencial para los traders que buscan contextualizar el esfuerzo actual del mercado frente a promedios históricos o de sesión, sin dejar espacio a la subjetividad.

## Componentes Principales

Cuando se dibuja una caja en tu gráfico, esta se divide en distintos paneles (los cuales pueden ocultarse o mostrarse a voluntad):

1. **Price Box (Caja de Precio):** Resalta el rango exacto de precio y tiempo del análisis.

2. **Panel de Volumen:** Muestra un histograma del volumen operado por vela. Incluye líneas punteadas que representan el Volumen Promedio y el umbral de Desviación Estándar.

3. **Panel de Delta:** Dibuja la curva del Delta Acumulado, mostrando la evolución de la presión agresiva de compras vs. ventas a lo largo de la caja.

4. **Panel de Estadísticas (Stats):** Un resumen limpio en la parte inferior que muestra el Máximo, Promedio (Avg) y Desviación Estándar (Std) para el Volumen, Delta+, Delta- y Rango.

## Herramientas Interactivas (Barra superior)

Logic Analytics incluye una barra de herramientas interactiva en tu gráfico:

- **Draw (Dibujar):** Haz clic aquí y luego dos veces en tu gráfico para dibujar manualmente una caja de análisis sobre cualquier área del precio.

- **Edit (Editar):** Activa el modo de edición. Permite arrastrar los bordes de cualquier caja manual para redimensionarla, o hacer clic en la 'X' roja para borrarla.

- **X-Ray Toggle:** Alterna entre los modos de resaltado (**G** = Global, **O** = Apagado, **L** = Compras, **S** = Ventas, **B** = Ambos). Esto colorea velas específicas dentro de la caja que presentan una actividad extrema de Order Flow.

- **Clear (Limpiar):** Elimina instantáneamente todas las cajas dibujadas manualmente (las Cajas Automáticas se conservan).

## Opciones de Configuración

### 1. Configuración General (General Settings)

- **Zero-Lag Engine Mode:** Controla la tasa de refresco gráfico para optimizar el uso de la CPU. Las opciones incluyen **Smooth**, **Balanced**, **Max Performance** o **Disabled** (60 FPS en tiempo real). Usa balanceado o superior si tienes múltiples indicadores activos.

- **Use Global Engine:** Vincula el indicador a un motor de datos maestro para un mejor rendimiento.

- **Layer Mode & Priority:** Controla si las cajas se dibujan por detrás de las velas, de forma normal, o por encima de todo.

### 2. Configuración Gráfica (Graphic Settings)

- **Box Background & Opacity:** Define el color y la transparencia del fondo de la caja.

- **Colores:** Personaliza totalmente los colores para los bordes, Volumen, Delta Positivo, Delta Negativo y texto de métricas.

- **Abbreviate Values (K, M):** Si se activa, los números grandes se abrevian (ej. 1,500 pasa a 1.5K; 1,000,000 pasa a 1M) para mantener el gráfico limpio.

- **Show Panels:** Muestra u oculta individualmente los paneles de Volumen, Delta y Estadísticas.

- **Box Heights (px):** Ajusta la altura exacta en píxeles para los distintos paneles.

- **Histogram Internal Margin (%):** Añade un margen vertical interno en los paneles para que los histogramas no toquen los bordes.

- **Width Settings:** Elige si el ancho de las barras del histograma debe coincidir con el ancho de las velas del gráfico, o establece un porcentaje personalizado.

### 3. Cajas Automáticas (Auto Box Settings)

En lugar de dibujar cajas manualmente, puedes configurar el indicador para que analice automáticamente un período de tiempo específico todos los días.

- **Enable Auto Box:** Enciende o apaga la generación automática.

- **Start Time (HH:mm):** La hora exacta en la que la caja debe empezar a registrar datos (ej. `09:30`).

- **End Time (HH:mm):** La hora exacta en la que la caja debe dejar de registrar datos (ej. `10:30`).

## Mejores Prácticas y Tips

- **Análisis de Sesión:** Usa la función de Caja Automática para encerrar la primera hora de tu sesión de trading (ej. la apertura de NY). Esto te dará una base estadística para comparar el resto del día.

- **Identificar Rupturas Reales:** Si el precio rompe fuera de tu caja de análisis pero el volumen de esa ruptura se mantiene por debajo de la Desviación Estándar calculada en la caja, existe una alta probabilidad de que sea una falsa ruptura.

- **Optimización de CPU:** Si dibujas muchas cajas en múltiples gráficos, mantén el Zero-Lag Engine en **Balanced** para asegurarte de que NinjaTrader siga respondiendo de forma fluida.

## Ver también

- [Logic Footprint](/docs/indicators/logic-footprint) — análisis de Order Flow por vela.

- [Logic BigTrades](/docs/indicators/logic-bigtrades) — detección de bloques grandes.
