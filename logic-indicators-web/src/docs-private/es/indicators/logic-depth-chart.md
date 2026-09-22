---
title: Logic Depth Chart
description: Manual técnico completo y guía de parámetros de Logic Depth Chart para NinjaTrader 8.
order: 8
category: indicators
---

# Logic Depth Chart

> Si todavía no instalaste la suite de Logic Indicators, consulta la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Depth Chart** proyecta la profundidad de mercado histórica y en vivo (Level 2) directamente en el gráfico de precios mediante un mapa térmico continuo optimizado para ofrecer la máxima fluidez gráfica sin sobrecargar tu procesador, complementado con un Live DOM lateral en el margen derecho.

---

## Componentes Visuales en el Gráfico

1. **Mapa de Calor Histórico de Liquidez (Fondo):** Bandas horizontales en el fondo de las velas cuyo brillo e intensidad cromática reflejan la concentración de contratos límite esperando ejecución en cada tick.
2. **Proyección de Liquidez Extendida (*Extend Passive Liquidity*):** Proyecta hacia el espacio vacío futuro del gráfico los últimos volúmenes conocidos de cada nivel para anticipar zonas de reacción.
3. **Live DOM Panel (Margen Derecho):** Histograma horizontal sincronizado nivel a nivel con los ticks del precio actual, mostrando barras de volumen y conteo numérico de contratos.
4. **Control HUD Flotante:** Panel de control táctil en pantalla para ajustar filtros y visibilidad en tiempo real sin abrir el menú de propiedades.

---

## Herramientas y Controles Interactivos

* **Botón `[HUD]` en el panel maestro LOF (`LOF_Configuration`):** Muestra u oculta instantáneamente el panel de calibración táctil sobre el gráfico.
* **Botón `[Reset]` en el panel maestro LOF:** Purga la memoria local de liquidez histórica y restablece la visualización de datos en el gráfico ante anomalías o desconexiones del bróker.
* **Controles dentro del HUD Flotante:**
  * **Fila 1 (`Min Filter` con botones `[-]` y `[+]`):** Incrementa o reduce el umbral de filtrado en saltos de `Volume Step Size` para eliminar el ruido de órdenes menores.
  * **Fila 2 (`Max Vol` con botones `[-]` y `[+]`):** Ajusta el tope superior de la escala de calor para adaptar el contraste térmico a sesiones líquidas o lentas.
  * **Fila 3 (Botones Toggle `[HEATMAP]` y `[DOM]`):** Apaga o enciende individualmente el fondo térmico o la barra lateral derecha con un clic.
  * **Fila 4 (`Ticks Group` con botones `[-]` y `[+]`):** Agrupa ticks en múltiplos (1, 2, 4, etc.) para consolidar el libro en instrumentos de alta volatilidad (ej. NQ).

---

## Opciones de Configuración (Parámetro por Parámetro)

A continuación se detalla cada parámetro de la ventana de propiedades de NinjaTrader 8 (**F6**), organizado exactamente por grupo:

### 1. General Settings

* **`Instance Name`** *(String | Default: "Logic Depth Chart")*  
  Nombre identificador de la instancia en el panel de control multi-indicador de la suite LOF.
* **`Instance Color`** *(Brush | Default: Cyan)*  
  Color de la etiqueta identificativa de esta instancia en el panel maestro `LOF_Configuration`.
* **`Ticks per Level`** *(Int | Rango: 1 a 20 | Default: 1)*  
  Factor de consolidación de ticks. Agrupa múltiples niveles de precio en una sola fila visual.  
  * *Recomendación:* Mantén en `1` para instrumentos de spread fino y alta liquidez como ES, ZN o FDAX. Configura en `2` o `4` para NQ o criptoactivos para evitar fragmentación excesiva del libro.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Balanced)*  
  Modo de optimización gráfica Zero-Lag para equilibrar la fluidez visual del mapa térmico con los recursos del procesador:  
  * `Disabled`: Visualización continua en tiempo real a 60 FPS estables.  
  * `Smooth`: Máxima fluidez y suavidad de movimiento para equipos potentes.  
  * `Balanced` *(Recomendado)*: Rendimiento ágil con consumo moderado de recursos, ideal para espacios de trabajo con varios gráficos.  
  * `MaxPerformance`: Máximo ahorro de recursos para ordenadores portátiles o momentos de noticias macroeconómicas de alto impacto.
* **`Clear Cache on Close`** *(Bool | Default: False)*  
  Si se activa (`True`), libera inmediatamente la memoria RAM ocupada por la profundidad histórica al cerrar la ventana del gráfico.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*  
  Posición de renderizado del mapa térmico respecto a las velas del gráfico:  
  * `BehindPrice` *(Recomendado)*: Dibuja la liquidez al fondo para que las velas y los indicadores de Footprint permanezcan legibles en primer plano.  
  * `Normal`: Renderiza al mismo nivel que las barras.  
  * `TopMost`: Superpone la liquidez por encima de cualquier otro elemento del gráfico.
* **`Layer Priority (Offset)`** *(Int | Default: 0)*  
  Ajusta el orden de prioridad de capas cuando se ejecutan múltiples indicadores de la suite LOF en el mismo gráfico.

---

### 2. Historical Heatmap

* **`Show Historical Heatmap`** *(Bool | Default: True)*  
  Activa o desactiva el mapa térmico de fondo en todo el gráfico.
* **`Extend Passive Liquidity`** *(Bool | Default: True)*  
  Extiende horizontalmente los últimos volúmenes límite conocidos hacia el área vacía del gráfico a la derecha de la barra actual.  
  * *Recomendación:* Mantener en `True` para anticipar con precisión los techos y suelos de liquidez antes de que el precio impacte en ellos.
* **`Max Depth Levels`** *(Int | Rango: 10 a 500 | Default: 100)*  
  Cantidad máxima de niveles de precio por encima (Asks) y por debajo (Bids) del precio actual que el indicador almacena en memoria y dibuja.  
  * *Recomendación:* Entre `50` y `100` niveles cubre holgadamente la acción del precio en ES y NQ sin desperdiciar memoria RAM en niveles lejanos que no serán testeados en la sesión.
* **`Opacity Scaling Mode`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  Define el método matemático para calcular la opacidad y brillo de las bandas térmicas:  
  * `Manual`: Respeta estrictamente los umbrales fijos configurados en `Min Volume Filter` y `Max Volume Reference`.  
  * `AutoVisible`: Escanea continuamente el volumen más alto visible en la ventana actual de tu pantalla y normaliza la escala de color de forma dinámica.
* **`Min Volume Filter`** *(Double | Default: 0)*  
  Volumen mínimo de contratos requerido para pintar una banda de calor. Cualquier nivel con un volumen inferior a este valor se vuelve transparente.  
  * *Recomendación:* En ES ajusta entre `100` y `200` contratos; en NQ ajusta entre `20` y `40` contratos para eliminar el ruido de órdenes menores de traders minoristas.
* **`Max Volume Reference`** *(Double | Default: 300)*  
  Umbral de contratos con el cual la banda alcanza la máxima intensidad cromática (Nivel 5 / brillo total). Cualquier volumen igual o superior a esta cifra se dibuja con el color más intenso.  
  * *Recomendación:* En ES ajusta entre `800` y `1.500`; en NQ ajusta entre `100` y `250`.
* **`Heatmap Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Esquema cromático utilizado para el mapa de calor:  
  * `Solid`: Tono monocromático suave con opacidad proporcional al volumen (mínima distracción visual).  
  * `HeatmapDual`: Paleta dual diferenciada (tonos azules para Bids / tonos rojos para Asks).  
  * `HeatmapSingle`: Gradiente de calor unificado (Azul $\rightarrow$ Naranja $\rightarrow$ Oro) según la concentración de volumen sin importar el lado del libro.
* **`Enable Transparency`** *(Bool | Default: True)*  
  Aplica niveles de transparencia a los colores para que las líneas de cuadrícula, velas y dibujos del gráfico sigan siendo claramente visibles a través de las bandas de liquidez.
* **`Sync with DepthLive Panel`** *(Bool | Default: True)*  
  Sincroniza automáticamente la paleta de colores y los filtros con la instancia de `LOF_DepthLive` si ambos indicadores se ejecutan en el mismo gráfico.

---

### 3. Live DOM Panel

* **`Show Live DOM`** *(Bool | Default: True)*  
  Muestra u oculta el histograma lateral de profundidad en el margen derecho del gráfico.
* **`DOM Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Estilo de color aplicado a las barras horizontales del panel lateral.
* **`DOM Opacity Scaling`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  Algoritmo de cálculo de opacidad para las barras del DOM lateral.
* **`DOM Min Volume Filter`** *(Double | Default: 0)*  
  Filtro numérico para las barras laterales; los niveles con volumen inferior no dibujan barra.
* **`DOM Max Volume Ref.`** *(Double | Default: 100)*  
  Volumen con el cual la barra horizontal alcanza el ancho máximo definido en `Panel Width`.
* **`Enable Transparency`** *(Bool | Default: True)*  
  Aplica transparencia a las barras del panel lateral.
* **`Panel Width (Px)`** *(Int | Default: 150)*  
  Ancho total en píxeles reservado para las barras del Live DOM.
* **`Right Margin (Px)`** *(Int | Default: 0)*  
  Separación en píxeles entre el panel del DOM y el borde derecho de la ventana del gráfico.
* **`Bar Spacing (Px)`** *(Int | Default: 1)*  
  Separación vertical en píxeles entre barras contiguas de precio.
* **`Text Size`** *(Int | Default: 11)*  
  Tamaño de fuente de las cifras numéricas de contratos en cada tick.
* **`Ask Color`** *(Brush | Default: Crimson)*  
  Color de las barras para los contratos vendedores pasivos (Asks).
* **`Bid Color`** *(Brush | Default: DodgerBlue)*  
  Color de las barras para los contratos compradores pasivos (Bids).
* **`Text Color`** *(Brush | Default: White)*  
  Color del texto numérico que indica los contratos en cada nivel.

---

### 4. Control HUD

* **`HUD Position`** *(Enum: BottomLeft, BottomRight | Default: BottomRight)*  
  Ubicación del panel de calibración táctil sobre el gráfico.
* **`HUD Margin (Px)`** *(Int | Default: 10)*  
  Separación en píxeles entre el panel HUD y los bordes de la ventana.
* **`Volume Step Size`** *(Double | Default: 10)*  
  Cantidad de contratos que suma o resta cada pulsación de los botones `[+]` y `[-]` en el HUD.

---

### 5. Grupos de Color: Colors Heatmap

* **`Colors: Heatmap Global`:** Niveles del 1 al 5 (Indigo $\rightarrow$ Purple $\rightarrow$ DarkOrange $\rightarrow$ Orange $\rightarrow$ Gold) para el modo de gradiente continuo.
* **`Colors: Heatmap Resistance`:** Niveles del 1 al 5 (DarkRed $\rightarrow$ Firebrick $\rightarrow$ Crimson $\rightarrow$ Red $\rightarrow$ OrangeRed) para órdenes de venta pasiva (Asks).
* **`Colors: Heatmap Support`:** Niveles del 1 al 5 (MidnightBlue $\rightarrow$ MediumBlue $\rightarrow$ RoyalBlue $\rightarrow$ DodgerBlue $\rightarrow$ DeepSkyBlue) para órdenes de compra pasiva (Bids).
* **`Colors: Solid Mode`:** Color base neutro (Silver por defecto) cuya opacidad varía según el volumen para entornos visuales limpios.

---

## Mejores Prácticas y Consejos Operativos

### 1. Detección de Liquidez Real vs. Spoofing
* **Prueba de persistencia:** Las órdenes institucionales reales se mantienen visibles en el mismo nivel durante varios minutos, incluso cuando el precio se aproxima a ellas.
* **Identificación de manipulación:** Si un muro denso de liquidez se retira abruptamente 1 o 2 ticks antes de que el precio llegue, se trata de *spoofing* diseñado para frenar o atraer al mercado artificialmente. **Nunca ingreses al mercado confiando en un muro que retrocede continuamente ante el avance del precio.**
* **Efecto imán:** Grandes acumulaciones de liquidez pasiva a menudo atraen al mercado para buscar contrapartida antes de iniciar un movimiento direccional genuino.

### 2. Detección de Absorción Institucional
* Se produce absorción cuando el precio golpea una banda térmica densa y, a pesar de que el indicador Footprint registra agresividad alta al Bid o Ask, la banda del Depth Chart se mantiene firme y la vela es rechazada. Esta combinación ofrece una de las señales de entrada en contra-tendencia de mayor probabilidad estadística.

### 3. Optimización de Rendimiento en NinjaTrader 8
* **No sobrecargues `Max Depth Levels`:** Mantén el valor en `100` o menos en mercados volátiles como NQ. Niveles a cientos de ticks de distancia consumen memoria innecesariamente.
* **Usa `Min Volume Filter`:** Establecer un filtro mínimo sensato (ej. 30 en NQ, 100 en ES) evita que la GPU dibuje miles de micro-rectángulos de 1 o 2 contratos, manteniendo 60 FPS estables sin degradación de rendimiento.
