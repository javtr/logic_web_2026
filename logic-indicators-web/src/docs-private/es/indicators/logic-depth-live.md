---
title: Logic Depth Live
description: Manual técnico completo y guía de parámetros de Logic Depth Live para NinjaTrader 8.
order: 9
category: indicators
---

# Logic Depth Live

> Si todavía no instalaste la suite de Logic Indicators, consulta la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Depth Live** proporciona una experiencia de libro de órdenes continuo y de ultra alta velocidad estilo Bookmap dentro de NinjaTrader 8. Combina el trazado sub-milisegundo del libro de órdenes pasivo con burbujas de volumen de operaciones agresivas, trayectorias en vivo del Best Bid/Ask y Smart Columns (DOM pasivo, volumen ejecutado y delta acumulado por nivel).

---

## Componentes Visuales en el Gráfico

1. **Lienzo Térmico de Profundidad (Heatmap Canvas):** Muestra la evolución temporal continua de la liquidez pasiva en el libro de órdenes (Bids por debajo, Asks por encima). La densidad de color representa la concentración de contratos esperando ejecución.
2. **Líneas de Mejor Bid y Mejor Ask (Spread Lines):** Líneas continuas escalonadas de alta precisión que dibujan exactamente la micro-trayectoria del spread en tiempo real.
3. **Burbujas de Transacciones de Mercado (Trade Bubbles):** Círculos generados al instante exacto en que una orden de mercado agresiva impacta el libro, con tamaño proporcional al volumen y fusión magnética de operaciones contiguas.
4. **Smart Columns (Margen Derecho del DOM):** Tres columnas analíticas integradas:
   * **DOM Pasivo:** Contratos actualmente descansando en el libro.
   * **Executed Volume:** Histograma de volumen total absorbido en cada precio durante la ventana visible.
   * **Delta:** Balance neto agresivo comprador o vendedor absorbido en ese nivel.

---

## Herramientas y Controles Interactivos

* **Botón `[Reset]` en el panel maestro LOF (`LOF_Configuration`):** Purga la memoria interna de la sesión en vivo y limpia el lienzo en caso de desconexión del bróker.
* **Panel HUD de Navegación Temporal (On-Chart):**
  * **Fila 1 (`Min Filter` con `[-]` y `[+]`):** Filtra órdenes pasivas menores en saltos de volumen.
  * **Fila 2 (`Max Vol` con `[-]` y `[+]`):** Calibra la saturación térmica del mapa en vivo.
  * **Fila 3 (Toggles Visuales Rápidos):**
    * `[HM]`: Enciende o apaga el mapa de calor térmico de fondo.
    * `[TRD]`: Enciende o apaga el trazado de burbujas de órdenes de mercado.
    * `[DOM]`: Enciende o apaga las columnas laterales de profundidad y Smart Columns.
  * **Fila 4 (Control de Máquina del Tiempo / Time Machine):**
    * `[ < ]`: Desplaza la ventana visible hacia atrás en el tiempo en bloques de `Pan Step (Ms)`.
    * `[ + ]`: Hace zoom in temporal (reduce la ventana de milisegundos visible para mayor detalle).
    * `[ R ]`: **Reset / Live:** Devuelve el lienzo inmediatamente al tiempo real en vivo.
    * `[ - ]`: Hace zoom out temporal (amplía la ventana visible para ver más contexto histórico).
    * `[ > ]`: Desplaza la ventana hacia adelante en el tiempo.
  * **Botón Auto-Center:** Bloquea y centra el precio verticalmente en la pantalla para evitar que se desplace fuera del marco en impulsos fuertes.

---

## Opciones de Configuración (Parámetro por Parámetro)

A continuación se detalla cada parámetro de la ventana de propiedades de NinjaTrader 8 (**F6**), organizado exactamente por grupo:

### 1. General

* **`Instance Name`** *(String | Default: "Logic Depth Live")*  
  Nombre identificador de la instancia en la suite LOF.
* **`Instance Color`** *(Brush | Default: Orange)*  
  Color de la etiqueta identificativa de la instancia en el panel maestro `LOF_Configuration`.
* **`Ticks per Level`** *(Int | Default: 1)*  
  Consolida múltiples ticks en un solo nivel de precio (ej. 4 ticks = 1 punto en NQ). Mantén en `1` para ES o mercados espesos.
* **`Max Visible Levels`** *(Int | Rango: 20 a 500 | Default: 200)*  
  Cantidad máxima de niveles de precio visibles alrededor del precio actual.  
  * *Recomendación:* Ajusta entre `100` y `150` para un rendimiento óptimo de GPU sin perder la visión del contexto inmediato.
* **`Z-Order Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*  
  Determina el orden de superposición visual en el gráfico.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Balanced)*  
  Controla el ritmo de renderizado en reposo para economizar ciclos de CPU.  
  * *Recomendación:* `Balanced` para la mayoría de los traders; `Disabled` únicamente si posees una GPU dedicada y buscas máxima tasa de refresco a 60 FPS continuos.

---

### 2. Canvas (Configuración del Lienzo)

* **`Time Flow Mode`** *(Enum: Constant, EventBased | Default: Constant)*  
  Modo de avance temporal del eje horizontal:  
  * `Constant`: El tiempo avanza a velocidad fija y continua en milisegundos (estilo Bookmap).  
  * `EventBased`: El eje horizontal solo avanza cuando se ejecutan trades o se registran cambios en el libro (ideal para mercados lentos o sesiones nocturnas).
* **`Panel Width (Px)`** *(Int | Default: 500)*  
  Ancho total en píxeles asignado al lienzo de Depth Live dentro de la ventana de NinjaTrader.
* **`Visible Window (Ms)`** *(Long | Rango: 10000 a 300000 | Default: 60000)*  
  Tamaño de la ventana de tiempo visible en milisegundos.  
  * *Recomendación:* `60000` (1 minuto) para scalping de alta velocidad; `180000` (3 minutos) para una perspectiva más amplia. Valores superiores a 300.000 ms aumentan el consumo de memoria gráfica de tu equipo.
* **`Grid Interval (Ms)`** *(Long | Default: 10000)*  
  Separación temporal entre las líneas verticales de la cuadrícula (10.000 ms = 10 segundos).
* **`Draw Grid in Foreground`** *(Bool | Default: False)*  
  Dibuja la cuadrícula temporal por encima del mapa de calor si requieres máxima precisión en la lectura de tiempos.
* **`Auto-Adjust Chart Margin`** *(Bool | Default: False)*  
  Ajusta automáticamente los márgenes del gráfico nativo para que el lienzo encaje sin solapar otros paneles.
* **`Right / Left Margins (Px)`** *(Int | Default: 0 / 50)*  
  Márgenes de separación en píxeles del lienzo respecto a los extremos laterales de la ventana.

---

### 3. Depth Heatmap (Mapa de Calor del DOM)

* **`Show Heatmap`** *(Bool | Default: True)*  
  Activa el renderizado térmico continuo de las órdenes pasivas en el lienzo.
* **`Min Volume Filter`** *(Double | Default: 0)*  
  Filtra órdenes pasivas por debajo de este umbral de contratos para limpiar el fondo de ruido irrelevante.
* **`Scaling Mode`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  * `Manual`: Respeta estrictamente el volumen tope configurado en `Volume Reference (Max)`.  
  * `AutoVisible`: Ajusta el brillo dinámicamente según la orden límite más grande visible actualmente en pantalla.
* **`Volume Reference (Max)`** *(Double | Default: 100)*  
  Volumen requerido para alcanzar el nivel térmico máximo de color.  
  * *Recomendación:* En NQ ajusta entre `50` y `120`; en ES ajusta entre `500` y `1.000`.
* **`Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Estilo cromático del mapa térmico en vivo.
* **`Enable Background Color Interpolation`** *(Bool | Default: True)*  
  Suaviza mediante interpolación cromática la transición de color entre niveles contiguos de precio para una visualización HD.

---

### 4. Bubbles and Lines Settings (Burbujas de Órdenes y Spread)

* **`Show Trades (Bubbles)`** *(Bool | Default: True)*  
  Habilita el dibujo de burbujas en las ejecuciones de mercado agresivas.
* **`Merge Nearby Bubbles`** *(Bool | Default: True)*  
  **Parámetro crítico de rendimiento y claridad visual.** Agrupa transacciones simultáneas o contiguas al mismo precio en una sola burbuja ponderada.  
  * *Recomendación:* Mantener **siempre activado (`True`)**. En momentos de noticias de alto impacto evita que se dibujen miles de microburbujas solapadas, manteniendo el consumo de CPU bajo y destacando el volumen institucional real.
* **`Min Volume Filter`** *(Double | Default: 5)*  
  Volumen mínimo para que una ejecución dibuje una burbuja en pantalla.  
  * *Recomendación:* En ES fija entre `10` y `25`; en NQ entre `5` y `15` para eliminar transacciones menores de 1 contrato.
* **`Max Volume Reference`** *(Double | Default: 100)*  
  Volumen con el cual la burbuja alcanza su radio visual máximo (`Max Radius`).
* **`Min / Max Radius (Px)`** *(Float | Default: 2f a 25f)*  
  Tamaño físico mínimo y máximo de las burbujas en píxeles.
* **`Min / Max Opacity (%)`** *(Int | Default: 15% a 70%)*  
  Rango de transparencia para permitir ver el mapa de calor que descansa detrás de las burbujas.
* **`Show Volume Text`** *(Bool | Default: True)*  
  Imprime la cifra numérica de contratos dentro de la burbuja.
* **`Text Size`** *(Int | Default: 10)*  
  Tamaño tipográfico para el conteo de contratos dentro de la burbuja.
* **`Bid Color (TradeAskColor)`** *(Brush | Default: Fuchsia / Crimson)*  
  Color de las ventas agresivas ejecutadas contra el Bid.
* **`Ask Color (TradeBidColor)`** *(Brush | Default: DeepSkyBlue / Green)*  
  Color de las compras agresivas ejecutadas contra el Ask.
* **`Best Ask Line Color`** *(Brush | Default: Green)*  
  Color de la línea continua que traza el mejor precio de venta en el spread.
* **`Best Bid Line Color`** *(Brush | Default: Red)*  
  Color de la línea continua que traza el mejor precio de compra en el spread.
* **`Best Lines Opacity (%)`** *(Int | Default: 80%)*  
  Opacidad de las líneas del spread.

---

### 5. DOM Settings & Smart Columns

* **`Show Right Profile`** *(Bool | Default: True)*  
  Activa las columnas analíticas de profundidad situadas al extremo derecho del lienzo.
* **`Draw Over DOM`** *(Bool | Default: False)*  
  Permite superponer las columnas estadísticas directamente sobre el área del DOM.
* **`DOM Width (Px)`** *(Int | Default: 30)*  
  Ancho en píxeles asignado a la columna del libro pasivo actual.
* **`Executed Vol Width (Px)`** *(Int | Default: 70)*  
  Ancho en píxeles asignado al histograma de volumen total ejecutado durante la ventana visible.
* **`Delta Width (Px)`** *(Int | Default: 40)*  
  Ancho en píxeles asignado a la columna de delta neto por nivel de precio.
* **`Positive / Negative Delta Colors`** *(Brush | Default: LimeGreen / Crimson)*  
  Colores para identificar si la absorción neta en cada precio fue compradora o vendedora.
* **`LiveDOM Dynamic Text / Border Color`** *(Bool | Default: True)*  
  Adapta automáticamente el contraste de bordes y textos al color térmico del nivel.

---

### 6. HUD Control

* **`HUD Position`** *(Enum: BottomLeft, BottomRight | Default: BottomLeft)*  
  Esquina del gráfico donde se posiciona el panel de mandos interactivo.
* **`Pan Step (Ms)`** *(Long | Default: 5000)*  
  Cantidad de milisegundos que salta la pantalla hacia atrás o adelante al pulsar los botones `[ < ]` y `[ > ]`.
* **`Zoom Step (Ms)`** *(Long | Default: 10000)*  
  Cantidad de milisegundos que amplía o reduce la ventana visible al pulsar `[ + ]` y `[ - ]`.

---

## Mejores Prácticas y Consejos Operativos

### 1. Detección de Absorción Instantánea en Tiempo Real
* **Patrón de Giro de Alta Probabilidad:** Observa cuando el precio se estrella contra un muro pasivo brillante de liquidez (Depth Heatmap).
* Si al llegar al nivel aparecen **múltiples burbujas grandes de compras agresivas (Ask)**, pero la línea del **Best Ask no avanza ni un solo tick hacia arriba** y de inmediato el precio retrocede, las órdenes pasivas de los vendedores institucionales absorbieron por completo la demanda agresiva.
* **Confirmación con Smart Columns:** Dirige la mirada a la columna `Delta` en ese precio: si el delta marca un valor fuertemente positivo (ej. `+600`), pero el precio cae, la trampa compradora está confirmada. Es el momento óptimo para entrar en corto.

### 2. Detección del "Vacuum Effect" (Vacío de Liquidez)
* Cuando una zona de precios carece por completo de bandas térmicas en el mapa (color oscuro / ausencia de órdenes pasivas), el mercado suele atravesarla de forma explosiva y casi instantánea mediante velas rápidas y un spread que se ensancha. Los scalpers deben usar estos vacíos como autopistas para sus tomas de beneficios y evitar entrar en contra del impulso en dichas zonas.

### 3. Optimización Extrema de Recursos y Latencia
* **Mantén `Merge Nearby Bubbles` activado:** Sin esta función, en momentos de noticias económicas de alta frecuencia se pueden generar más de 1.500 objetos individuales en menos de dos segundos, saturando la pantalla. La fusión magnética agrupa inteligentemente las órdenes al instante, manteniendo el gráfico completamente fluido y el consumo de tu equipo al mínimo.
* **Calibra la `Visible Window (Ms)`:** Mantén la ventana en un valor razonable (ej. 60.000 ms a 120.000 ms). Querer ver 15 minutos continuos de mercado al microsegundo en una sola pantalla exige demasiados recursos a tu tarjeta gráfica y reduce el beneficio analítico del scalper, que se enfoca en el presente inmediato.
