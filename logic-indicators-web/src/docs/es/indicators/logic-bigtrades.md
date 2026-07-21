---
title: Logic BigTrades
description: Detecta y visualiza órdenes de mercado institucionales masivas, ofreciendo agrupación magnética, naked lines y mapas de calor.
order: 5
category: indicators
---

# Logic BigTrades

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic BigTrades** rastrea la actividad institucional agresiva detectando órdenes de mercado excepcionalmente grandes (block trades) a medida que ingresan a la cinta (tape). En lugar de leer una matriz de números que se mueve a gran velocidad, los traders pueden visualizar exactamente dónde se inyectó volumen masivo en el mercado.

Al dibujar burbujas inteligentes, líneas dinámicas de soporte/resistencia (Naked Lines) y un histograma de volumen dedicado, BigTrades te permite identificar instantáneamente niveles de defensa institucional, zonas de absorción y puntos de capitulación.

## Componentes Principales

Cuando está habilitado, Logic BigTrades añade varios elementos visuales a tu gráfico:

1. **Burbujas de Volumen:** Círculos dibujados directamente sobre la vela de precio. El tamaño de la burbuja representa el volumen total de la orden, y el color indica si fue una compra agresiva (Ask) o venta (Bid).

2. **Naked Lines (Líneas Limpias):** Líneas horizontales extendidas hacia el futuro desde el nivel de precio donde ocurrió un bloque grande, actuando como zonas visuales de soporte y resistencia.

3. **Histograma de Volumen:** Un sub-panel opcional en la parte inferior del gráfico que muestra el volumen acumulado de "Grandes Órdenes" por vela.

4. **Scanner (Inspector):** Una ventana flotante que aparece al pasar el cursor sobre una burbuja, revelando la hora exacta, precio, volumen total y Delta interno de la agrupación.

## Herramientas Interactivas (Barra superior)

Logic BigTrades incluye una barra de herramientas dedicada en la parte superior del gráfico para ajustes rápidos:

- **Line (Línea):** Haz clic en este botón y luego en cualquier burbuja del gráfico para dibujar manualmente una Naked Line que se extienda desde ese nivel de precio.

- **DelLine (Borrar Líneas):** Elimina instantáneamente todas las Naked Lines dibujadas manualmente para limpiar tu gráfico.

- **Scan (Escanear):** Enciende o apaga el modo "Scanner". Cuando está encendido, simplemente pasa el ratón sobre cualquier burbuja para ver su bloque de datos internos.

## Opciones de Configuración

Este indicador es altamente personalizable. A continuación, se detalla cada sección de configuración parámetro por parámetro:

### 1. Configuración General (General Settings)

- **Zero-Lag Engine Mode:** Controla la tasa de actualización gráfica. Usa **Balanced** (refresco de 1s) si usas múltiples indicadores, o **Disabled** para un renderizado en tiempo real a 60 FPS.

- **Layer Mode & Priority:** Elige si las burbujas deben dibujarse por detrás del precio (**BehindPrice**), de forma normal (**Normal**), o por encima de todos los demás dibujos (**TopMost**).

### 2. Filtros (Filter Settings)

- **Min Volume (Filter):** El ajuste más importante. Define el número mínimo de contratos que debe tener una orden para ser dibujada en el gráfico.

- **Max Volume (Fixed Reference):** El umbral de volumen que representa el tamaño máximo de una burbuja. Cualquier trade mayor a este valor tendrá el tamaño máximo permitido.

- **Scale Mode:** **Fixed** basa el tamaño de las burbujas en tu configuración de Max Volume. **VisibleWindow** redimensiona las burbujas dinámicamente basándose en el volumen más alto visible actualmente en tu pantalla.

### 3. Configuración Visual (Visual Settings)

- **Colors & Opacity:** Define los colores por defecto para Ask (Compras) y Bid (Ventas), el grosor del borde y la transparencia general.

- **Min/Max Radius:** Establece el tamaño físico (en píxeles) de la burbuja más pequeña y la más grande.

- **Magnetic Clustering:** Si está activado, las burbujas que ocurren en el mismo nivel de precio y tiempo se fusionarán inteligentemente en una sola burbuja más grande representando el "Centro de Masa". Esto evita que el gráfico se vuelva ilegible.

- **Color Mode:** Elige **Basic** para colores sólidos, o **Heatmap** para colorear las burbujas según su intensidad de volumen (configurado en las secciones de Heatmap).

### 4. Mapas de Calor (Heatmap Ask & Bid Settings)

Si **Color Mode** está en **Heatmap**, puedes definir hasta 3 niveles de colores según el tamaño del volumen.

- El Nivel 1 representa órdenes grandes pero comunes, mientras que el Nivel 3 (Max) está reservado para órdenes institucionales masivas. Puedes configurar los colores de forma independiente para compras (Ask) y ventas (Bid).

### 5. Configuración de Líneas (Naked Lines Settings)

- **Enable Auto-Lines:** Si está activado, el indicador dibuja automáticamente líneas horizontales desde los trades que superen el **AutoLine Min Volume**.

- **Mitigation Mode:** Determina cuándo deja de dibujarse una línea. **CutOnTouch** borrará automáticamente la línea una vez que el precio la vuelva a tocar en el futuro (mitigación). **ExtendInfinite** dibuja la línea para siempre.

- **Line Horizon:** **SessionOnly** borrará las líneas de ayer al comenzar un nuevo día. **All** mantiene las líneas históricas para siempre.

- **Enable Naked Area:** En lugar de una línea delgada, esto dibuja una zona rectangular semitransparente (altura definida por **Area Height in Ticks**) para representar una banda de soporte/resistencia.

- **Enable Label:** Muestra el número exacto de volumen en el extremo derecho de la Naked Line.

### 6. Configuración del Histograma (Histogram Settings)

- **Visual Style:** Elige cómo se dibujan las barras de volumen inferior. **Stacked** apila Ask y Bid uno sobre otro. **SideBySide** los dibuja uno al lado del otro. **Bidirectional** dibuja Ask apuntando hacia arriba y Bid hacia abajo desde una línea cero.

- **Auto-Fit Scale:** Comprime automáticamente la escala de precio de tu gráfico hacia arriba para que las velas nunca se superpongan con el histograma inferior.

- **Histogram Height (%):** Define cuánto espacio de la pantalla inferior tiene permitido ocupar el histograma (ej. 20%).

### 7. Alertas (Alert Settings)

- **Enable Sound Alerts:** Reproduce una señal de audio cuando ocurre un nuevo Big Trade en tiempo real.

- **Min Volume (Alert):** Puedes establecer esto más alto que tu filtro visual. (ej. Dibujar burbujas de más de 500 contratos, pero disparar alarma solo si superan los 1000 contratos).

- **Selected Sound:** Elige entre 5 sonidos de alerta institucionales personalizados.

## Mejores Prácticas y Tips

- **Usa Magnetic Clustering:** Durante la alta volatilidad (como en noticias), cientos de trades grandes pueden ocurrir en segundos. Enciende **Magnetic Clustering** para fusionar estos datos en "mega-burbujas" limpias que muestran el verdadero centro de volumen.

- **Mantén los gráficos limpios con CutOnTouch:** Configura el Mitigation Mode de tus Naked Lines en **CutOnTouch**. Esto asegura que tu gráfico se limpie automáticamente al eliminar los niveles que ya han sido re-testeados y absorbidos por el mercado.

- **Combina con el Scanner:** Si ves una burbuja fusionada gigante pero quieres saber quién quedó atrapado adentro, enciende el botón **Scan** en la barra superior y pasa el ratón sobre la burbuja para ver el desglose exacto del Delta (Ask vs Bid).

## Ver también

- [Logic Footprint](/docs/indicators/logic-footprint) — Análisis profundo del Order Flow vela por vela.

- [Logic Algorithms](/docs/indicators/logic-algorithms) — Detección automatizada de desequilibrios y absorciones.
