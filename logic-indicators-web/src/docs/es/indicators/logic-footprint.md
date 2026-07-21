---
title: Logic Footprint
description: Gráfico avanzado de Order Flow que muestra el volumen Bid/Ask, Delta y perfiles dentro de cada vela.
order: 1
category: indicators
---

# Logic Footprint

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El **Logic Footprint** es el corazón de la suite de Order Flow. En lugar de mirar una vela tradicional que oculta cómo ocurrieron realmente las transacciones, el Footprint mira *dentro* de la vela para mostrarte la distribución exacta de compradores agresivos (Ask) frente a vendedores agresivos (Bid) en cada nivel de precio.

Al visualizar el proceso de subasta interno, los traders pueden detectar absorciones institucionales, traders agresivos atrapados y verdaderos desequilibrios del mercado en tiempo real, eliminando por completo la incertidumbre de la acción del precio.

## Componentes Principales

El Logic Footprint está diseñado en torno a un sistema de "Flex Grid" altamente flexible. Una sola vela puede mostrar hasta 3 columnas de datos independientes lado a lado:

1. **Thin Candle (Vela Delgada):** Una representación minimalista de la vela tradicional (Apertura/Máximo/Mínimo/Cierre), asegurando que nunca pierdas la perspectiva del precio.

2. **Data Columns (1, 2 y 3):** Puedes apilar hasta tres columnas por vela. Por ejemplo, la Columna 1 puede mostrar texto en formato **BidAsk**, la Columna 2 puede dibujar un perfil horizontal (**ProfileRight**) mostrando el Delta, y la Columna 3 puede mostrar el **Volume** total.

3. **Imbalances (Desequilibrios):** Resalta niveles de precio específicos donde los compradores superaron abrumadoramente a los vendedores en diagonal (o viceversa).

4. **Point of Control (POC):** Dibuja un borde distintivo alrededor del nivel de precio con mayor actividad (Volumen, Delta o Trades) dentro de esa vela específica.

5. **Vista Alejada (LOD - Level of Detail):** Un sistema dinámico de detalle visual. Al alejar el gráfico (comprimiendo las velas), el texto del Footprint se transforma automáticamente en un Mini-Perfil de Volumen, y si te alejas aún más, se convierte en velas tradicionales para evitar saturar la pantalla.

## Herramientas Interactivas

Logic Footprint está diseñado para ser completamente automático y fluido. No requiere botones de dibujo manuales. En su lugar, interactúa directamente con la rueda de tu ratón:

- **Zoom Dinámico:** Simplemente usa la rueda del ratón para alejar o acercar el gráfico. El indicador hará una transición fluida entre números completos, perfiles de volumen visuales y velas estándar alejadas, sin necesidad de tocar la configuración.

## Opciones de Configuración

### 1. Configuración General (General Settings)

- **Tick Multiplier:** Agrupa los niveles de precio. Por ejemplo, en el ES (S&P 500), ajustar esto en **4** agrupará 4 ticks (1 punto completo) en una sola fila, reduciendo drásticamente el ruido visual.

- **Zero-Lag Engine Mode:** Controla la tasa de actualización gráfica. Las opciones son **Smooth**, **Balanced**, **Max Performance** o **Disabled** (60 FPS en tiempo real). Usa **Balanced** para un rendimiento óptimo en gráficos pesados.

### 2. Configuración de Columnas (1, 2 y 3)

Cada una de las 3 columnas tiene ajustes idénticos e independientes para que construyas tu footprint perfecto:

- **Enable Column:** Enciende o apaga la columna (La Columna 1 siempre está activa).

- **Text Value Type:** Qué números mostrar. Elige entre **BidAsk**, **Volume**, **Delta**, **DeltaPct**, **Trades**, **Bid**, **Ask** o **None**.

- **Cell Type:** Cómo dibujar la celda de fondo. **Full** pinta toda la caja. **ProfileLeft** o **ProfileRight** dibuja barras horizontales de histograma dentro de la vela.

- **Cell Color Type:** Define cómo se colorea la celda. **HeatmapVolume** la colorea según la intensidad de volumen. **Delta** la colorea verde/rojo según quién ganó ese nivel. **Custom** usa un color sólido plano.

- **Cell Opacity:** Hace que los nodos de alto volumen sean oscuros y los de bajo volumen altamente transparentes.

- **POC Type:** Resalta el nodo máximo de la vela. Puede basarse en el **Volume** o en la métrica (**Metric**) que se esté mostrando actualmente en la columna.

### 3. Valor Máximo Relativo (Scale Mode)

Esta sección crítica define cómo el indicador calcula la "Intensidad" (Mapa de calor/Opacidad) de los colores:

- **Scale Mode (Relative):**

  - **Bar:** Compara el volumen contra el volumen más alto *dentro de esa vela específica*.

  - **Visible:** Compara el volumen contra el volumen más alto actualmente visible *en tu pantalla*.

  - **CustomSession:** Compara el volumen contra el volumen más alto operado durante las horas definidas en Custom Session.

  - **Manual:** Compara el volumen contra un número fijo ingresado manualmente (ej. 5000 contratos).

### 4. Textos (Texts)

- **Auto-Contrast:** Cambia automáticamente el color del texto a **Auto-Contrast Dark** o **Auto-Contrast Light** dependiendo del color de fondo de la celda, asegurando que los números siempre sean legibles.

- **Abbreviate (k, M):** Acorta los números grandes (ej. 1,500 pasa a 1.5k) para mantener el footprint estrecho y limpio.

### 5. Imbalances (Desequilibrios)

- **Enable Ratio Imbalances:** Compara el Bid y el Ask en diagonal.

- **Imbalance Ratio (x:1):** El multiplicador requerido para activar un desequilibrio. Por defecto es **3.0** (es decir, 300% más de volumen de un lado).

- **Min Volume (Ratio):** La cantidad mínima de contratos requerida para siquiera considerar aplicar el ratio.

- **Enable Difference Imbalances:** Activa un desequilibrio basado puramente en la diferencia de contratos (ej. Ask menos Bid > 100 contratos), ignorando el multiplicador diagonal.

### 6. Mapas de Calor (Heatmaps)

Si el **Cell Color Type** de tu columna está configurado en un Heatmap, estos ajustes definen los 5 niveles de color. El Nivel 1 es para el volumen más bajo (más frío) y el Nivel 5 es para el volumen más alto (más caliente).

### 7. Vista Alejada (Zoomed Out View)

- **Footprint to Profile Threshold:** La distancia en píxeles entre velas donde el indicador dejará de renderizar texto y cambiará a dibujar Mini-Perfiles de Volumen.

- **Profile to Bars Threshold:** La distancia en píxeles donde dejará de dibujar perfiles y cambiará a velas simples y alejadas.

- **Profile Opacity Mode:** Cómo calcular la sombra de los perfiles alejados.

## Mejores Prácticas y Tips

- **La Configuración Dorada:** Un setup muy popular es encender 2 columnas. Columna 1: **Cell Type** en **Full**, **Value Type** en **BidAsk**. Columna 2: **Cell Type** en **ProfileRight**, **Value Type** en **Volume**. Esto te da los números exactos a la izquierda y una forma visual a la derecha.

- **Usa el Tick Multiplier:** Si operas Nasdaq (NQ) u Oro (GC), un footprint tradicional tick-a-tick es demasiado rápido y ruidoso. Ajusta el **Tick Multiplier** a **4** o **10** para agrupar la cinta en zonas claras y legibles.

- **Escala Visible para Heatmaps:** Si quieres que tus mapas de calor resalten los verdaderos nodos de alto volumen del día, cambia tu **Scale Mode (Relative)** a **Visible** en lugar de **Bar**. Esto evita que velas lentas de bajo volumen brillen en rojo/verde intenso sin justificación.

## Ver también

- [Logic Footer](/docs/indicators/logic-footer) — Añade delta acumulado y estadísticas de barra en la parte inferior de tu footprint.

- [Logic Algorithms](/docs/indicators/logic-algorithms) — Señala automáticamente trampas y absorciones dentro del footprint.
