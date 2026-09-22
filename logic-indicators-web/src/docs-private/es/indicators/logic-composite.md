---
title: Logic Composite
description: Manual técnico y referencia de Perfil de Volumen macro, Delta y TPO anclado a pantalla en NinjaTrader 8.
order: 4
category: indicators
---

# Logic Composite

> **Estación de perfilado macroestructural y multisesión para NinjaTrader 8.**  
> Condensa semanas, meses o rangos históricos seleccionados en perfiles sincronizados de doble columna anclados a la pantalla, proyectando precios de control institucional y áreas de valor a través de todo tu gráfico intradiario.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador proyecta una estructura de lectura macro organizada en los siguientes componentes visuales:

### 1. Estructura de Doble Columna (Columna 1 y Columna 2)
* **Columna 1 (Estructural Primaria):** Típicamente configurada para mostrar el *Volume Profile* general. Dibuja la distribución acumulada de contratos negociados a cada nivel de precio.
* **Columna 2 (Complementaria Dinámica):** Puede configurarse para mostrar *Delta Profile* (sesgo comprador/vendedor neto por tick) o *TPO Market Profile* (distribución temporal por letras o bloques).

### 2. Nodos de Alto Volumen (HVN - High Volume Nodes)
* **Qué dibuja:** Zonas ensanchadas del histograma de volumen.
* **Interpretación:** Representan áreas de consenso y aceptación institucional de precios. El mercado suele oscilar y consolidar dentro de estos nodos; no se recomiendan entradas de ruptura dentro de un HVN.

### 3. Nodos de Bajo Volumen (LVN - Low Volume Nodes)
* **Qué dibuja:** Valles estrechos o hendiduras marcadas en el perfil.
* **Interpretación:** Representan precios de rechazo donde el mercado se desplazó rápidamente por falta de contraparte. Funcionan como soportes y resistencias infranqueables en el primer re-testeo. Si el precio logra penetrar un LVN, suele atravesarlo a gran velocidad hacia el siguiente HVN.

### 4. Point of Control Macro (Línea POC)
* **Qué dibuja:** Nivel de precio exacto donde se transó el mayor volumen de todo el periodo consolidado, destacado con una línea sólida y una barra de color prominente (por defecto Naranja o Rojo).
* **Interpretación:** El precio de equilibrio y centro de gravedad institucional del balance macro.

### 5. Zonas de Valor (Value Area - VAH / VAL)
* **Qué dibuja:** Franja sombreada que encierra el porcentaje configurado de negociación (por defecto el 70% del volumen total).
* **Límites:** El límite superior (VAH) y el límite inferior (VAL) delimitan las fronteras de valor justo de la subasta macro.

### 6. Líneas de Extensión Total de Pantalla (*ScreenLeft*)
* **Qué dibuja:** Cuando se activa la extensión en el POC, VAH o VAL, la línea no queda confinada dentro del marco del perfil lateral, sino que cruza horizontalmente todo el gráfico hacia el borde izquierdo.
* **Interpretación:** Permite observar sobre las velas operativas de 1 o 5 minutos cómo el precio intradiario reacciona con precisión milimétrica sobre niveles clave originados semanas atrás.

### 7. Cuadro de Métricas Macro
* **Qué muestra:** Panel numérico anclado en la parte superior o inferior del perfil que computa el volumen total de contratos, delta neto acumulado, rango en ticks y precios de POC, VAH y VAL.

---

## 2. Herramientas y Controles Interactivos

* **Botón `[Draw]` en la barra flotante de la suite (`_LOF Control Panel`):**
  * Al pulsar el botón `[Draw]` (o con el modo de rango en `ManualDraw`), el cursor entra en modo de selección interactiva.
  * Haz un clic sobre la barra inicial en el pasado y un segundo clic sobre la barra final: el Composite se calculará inmediatamente sobre esa ventana temporal específica.
* **Anclaje Fijo al Viewport:**
  * El perfil se mantiene acoplado al margen de la ventana respetando los parámetros de ancho en píxeles y margen lateral. Puedes desplazarte libremente hacia el pasado para revisar sesiones históricas y el perfil permanecerá visible en su posición fija sin tapar las velas.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: Composite Settings (Configuración de Rango y Pantalla)
* **`Range Mode`** *(Enum: VisibleBars, AllLoadedBars, DaysBack, WeeksBack, MonthsBack, CustomDate, ManualDraw | Default: VisibleBars)*:  
  Define el horizonte temporal sobre el cual se calcula el perfil:
  * `VisibleBars`: Calcula el perfil dinámicamente con las barras visibles en pantalla en cada momento.
  * `AllLoadedBars`: Consolida todo el historial de datos cargado en el gráfico.
  * `DaysBack / WeeksBack / MonthsBack`: Consolida los últimos $N$ días, semanas o meses hacia atrás de forma automática.
  * `CustomDate`: Ancla el inicio del cálculo a una fecha histórica fija fijada en `Custom Date`.
  * `ManualDraw`: Permite trazar el rango interactivamente con el botón `[Draw]`.
* **`Periods Back (If applicable)`** *(Int | Default: 2)*: Número de días, semanas o meses a consolidar en modos retrospectivos.
* **`Custom Date (If applicable)`** *(DateTime | Default: Fecha actual)*: Fecha de anclaje para el modo `CustomDate`.
* **`TPO Bracket (Minutes)`** *(Int | Default: 30)*: Duración en minutos asignada a cada bloque de tiempo para las columnas configuradas como TPO (estándar: 30 minutos).
* **`Total Width (Pixels)`** *(Int | Default: 300 | Rango: 100 a 800)*: Ancho horizontal total asignado al perfil en la pantalla.
* **`Screen Margin (Pixels)`** *(Int | Default: 10)*: Separación en píxeles entre el perfil y el borde de la ventana de NinjaTrader 8.
* **`Alignment`** *(Enum: Left, Right | Default: Right)*: Ancla el perfil al margen derecho o izquierdo de la pantalla.

### Grupo: Profile Settings
* **`Session Mode`** *(Enum: Continuous, Custom | Default: Continuous)*:
  * `Continuous`: Procesa todas las operaciones sin distinción de horario (sesión completa 24 horas / ETH).
  * `Custom`: Filtra el cálculo para que solo procese las horas fijadas en `Start Time` y `End Time` (ej. sesión regular RTH de 09:30 a 16:00).
* **`Value Area (%)`** *(Double | Default: 70.0 | Rango: 50.0 a 95.0)*: Porcentaje del volumen total utilizado para calcular el Área de Valor (el estándar institucional es 70%).

### Grupo: Multipliers & Compression (Compresión de Ticks)
* **`Bar Spacing (px)`** *(Int | Default: 0)*: Separación vertical entre niveles de precio del perfil (0 = barras contiguas sin espacio).
* **`VP: Tick Multiplier`** *(Int | Default: 2 | Rango: 1 a 20)*: Agrupación de ticks para el Perfil de Volumen. En NQ o activos de alto rango, agrupar de 2 a 4 ticks compacta el perfil y mejora la legibilidad.
* **`VP: Box Visual Mode`** *(Enum: Summation, MaximumPeak | Default: Summation)*:
  * `Summation`: Suma el volumen de los ticks agrupados.
  * `MaximumPeak`: Utiliza el valor del tick con mayor pico dentro del grupo.
* **`VP: POC Calculation`** *(Enum: OriginalMaximumPeak, AdjustedSummation | Default: OriginalMaximumPeak)*: Método de determinación del Point of Control.
* **`D: Tick Multiplier`** *(Int | Default: 2)*: Agrupación de ticks para la columna de Delta.
* **`TPO: Tick Multiplier`** *(Int | Default: 2)*: Agrupación de ticks para la columna de TPO.

### Grupos: Col. 1 General & Col. 2 General
* **`Enable Column`** *(Bool | Default: True en C1 / True en C2)*: Activa o apaga la columna respectiva.
* **`Column Width (%)`** *(Int | Default: 50)*: Distribución del ancho total de pantalla entre ambas columnas (ej. 50% para C1 y 50% para C2).
* **`Used Width (%)`** *(Int | Default: 80)*: Espacio horizontal que utiliza el histograma antes de alcanzar su límite máximo.
* **`Profile Type`** *(Enum: Volume, Delta, DeltaOverVolume, VolumeAndDelta, DeltaAndVolume, TPO | Default: Volume en C1 / Delta en C2)*: Selecciona el tipo de datos a calcular y representar en la columna (Volumen, Delta o TPO).
* **`Highlight Open/Close`** *(Bool | Default: False)*: Resalta los niveles de precio donde abrió y cerró el periodo macro consolidado.

### Grupos: C1 / C2 Volume Profile
* **`Draw Style`** *(Enum: Bars, Geometry | Default: Bars)*:
  * `Bars`: Histograma clásico de barras horizontales independientes.
  * `Geometry`: Contorno poligonal suavizado de alta definición.
* **`Alignment`** *(Enum: Left, Right | Default: Right en C1 / Left en C2)*: Orientación de crecimiento de las barras (permite crear perfiles enfrentados estilo "espejo").
* **`Fill Color / Fill Opacity`** *(Default: Silver, 80%)*: Color y transparencia del cuerpo del perfil.
* **`Enable Stacked Bid/Ask`** *(Bool | Default: False)*: Divide internamente cada barra del perfil de volumen en dos colores para mostrar la proporción exacta comprada (Ask) y vendida (Bid).

### Grupos: C1 / C2 Delta Profile
* **`Bid Color / Ask Color`** *(Default: Red / SpringGreen)*: Colores asignados a los niveles con delta neto negativo y positivo.
* **`Fill Opacity / Border Opacity`** *(Default: 20% / 100%)*: Grado de transparencia para el histograma de delta.
* **`Custom Width (%)`** *(Int | Default: 50)*: Proporción de ancho asignada al gráfico de delta dentro de su columna.

### Grupos: C1 / C2 TPO (Market Profile)
* **`Visualization`** *(Enum: Blocks, Letters, BlocksAndLetters, Geometry | Default: Blocks)*: Representación visual mediante bloques monocromáticos, letras tradicionales (A, B, C...) o geometría.
* **`Color Mode`** *(Enum: Solid, Heatmap | Default: Solid)*: Permite activar un gradiente térmico de 5 niveles que colorea las letras/bloques según el momento temporal en que se formaron (desde la apertura en azul hasta el cierre en rojo).
* **`Font Size / Letter Color`** *(Default: 10 / White)*: Tamaño y color de la tipografía para las letras del TPO.

### Grupos: C1 / C2 POC (Point of Control)
* **`Highlight in VP / Delta / TPO`** *(Bool | Default: True)*: Resalta la barra de mayor volumen del perfil con un color distintivo.
* **`Color / Fill Opacity`** *(Default: Orange / 100%)*: Color del bloque de POC.
* **`Enable POC Line`** *(Bool | Default: True)*: Traza una línea horizontal guía en el nivel del POC.
* **`Line Style / Thickness`** *(Default: Solid / 2)*: Estilo y grosor del trazo de la línea.
* **`Line Extension`** *(Enum: Column, CompositeBox, ScreenLeft | Default: ScreenLeft)*:  
  **Parámetro clave:**
  * `Column`: La línea se dibuja únicamente dentro de su columna.
  * `CompositeBox`: Cruza el ancho de ambas columnas (C1 + C2).
  * `ScreenLeft`: **Extiende la línea a través de toda la pantalla hasta el borde izquierdo**, proyectando el POC macro directamente sobre tus velas operativas.
* **`Show Label / Show Price`** *(Default: True)*: Muestra una etiqueta de texto con el nombre "POC" y su cotización numérica exacta.

### Grupos: C1 / C2 Value Area (Zonas de Valor)
* **`Enable VA`** *(Bool | Default: True)*: Activa el sombreado visual de la zona del 70% de volumen.
* **`Color / Fill Opacity`** *(Default: CornflowerBlue / 80%)*: Color y transparencia del área de valor.
* **`Enable VA Line`** *(Bool | Default: True)*: Traza las líneas de delimitación superior (VAH) e inferior (VAL).
* **`Line Extension`** *(Enum: Column, CompositeBox, ScreenLeft | Default: ScreenLeft)*: Permite proyectar el VAH y VAL macro horizontalmente cruzando todo el gráfico hacia la izquierda.

### Grupo: Metrics (Cuadro Cuantitativo)
* **`Enable Metrics`** *(Bool | Default: False)*: Activa la caja flotante con el resumen estadístico macro.
* **`Block Position`** *(Enum: Top, Bottom | Default: Bottom)*: Ubicación de la caja dentro del marco del Composite.
* **`Show Volume / Show Delta / Show Range / Show POC`**: Selectores booleanos para elegir qué métricas mostrar en pantalla.

### Grupo: General Settings
* **`Historical Load Speed`** *(Enum: Standard_DeltaEnabled, Medium_NoDelta, Fast_NoDelta, Ultra_NoDelta | Default: Fast_NoDelta)*:  
  **Optimizador de carga para periodos largos:**
  * `Fast_NoDelta` / `Ultra_NoDelta`: Agrupa los datos históricos para cargar semanas o meses de volumen en segundos (recomendado si solo usas Volume Profile).
  * `Standard_DeltaEnabled`: Procesa el flujo completo tick a tick con cálculo de Delta (usar si necesitas Delta Profile exacto).
* **`Instance Name`** *(String | Default: "LOF_Composite")*: Identificador en la suite.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Control de capa gráfica.

---

## 4. Mejores Prácticas y Consejos de Trading

### A. Identificar Soportes y Resistencias Estructurales (HVN vs. LVN)
El mapa que genera **Logic Composite** es la herramienta definitiva para no operar contra las manos fuertes:

1. **Regla de los Nodos de Alto Volumen (HVN):**
   * Un HVN representa una zona donde compradores y vendedores institucionales estuvieron de acuerdo en que el precio era "justo".
   * Cuando el mercado regresa a un HVN macro, el movimiento tiende a frenarse y entrar en fase lateral o de congestión. **No busques operaciones de ruptura dentro de un HVN macro; busca rebotes hacia el POC o toma beneficios de posiciones en tendencia**.
2. **Regla de los Nodos de Bajo Volumen (LVN):**
   * Un LVN representa rechazo institucional. En ese nivel el precio pasó muy rápido porque no hubo liquidez interesada en transar allí.
   * **Gatillo Operativo:** Los bordes de un LVN actúan como **soportes o resistencias firmes**. Si el precio retrocede hacia un LVN macro de las últimas 2 semanas y ves una absorción en el gráfico intradiario, entra con stop ceñido al otro lado del LVN. Si el precio logra adentrarse en el LVN, lo atravesará rápidamente buscando el siguiente HVN.

### B. La Ventaja de Proyectar con `ScreenLeft`
* Configura `Line Extension` en **`ScreenLeft`** tanto para el **POC** como para el **VAH** y **VAL**.
* Al extenderse hacia el borde izquierdo de la pantalla, estas líneas cruzan directamente por debajo de tus velas operativas de 1 minuto, 5 minutos o barras de rango.
* Esto te permite tomar decisiones de ejecución intradiaria con el contexto de semanas atrás siempre visible en tu pantalla, sin tener que cambiar de temporalidad ni abrir gráficos secundarios.

### C. Configuraciones Recomendadas Según el Estilo de Trading
* **Para Day Traders de Futuros (ES / NQ):**
  * `Range Mode`: `DaysBack` con `Periods Back = 5` (muestra la estructura acumulada de la última semana de negociación).
  * Columna 1: `Volume Profile` alineado a la derecha.
  * Columna 2: `Delta Profile` alineado a la izquierda.
  * `Historical Load Speed`: `Fast_NoDelta` para apertura instantánea del gráfico.
* **Para Swing Traders y Análisis de Fin de Semana:**
  * `Range Mode`: `WeeksBack` con `Periods Back = 4` o `MonthsBack = 1` a `3`.
  * Columna 1: `Volume Profile` en modo `Geometry`.
  * Columna 2: `TPO` en modo `Blocks` con mapa térmico cronológico activado.

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Profile](/dashboard/docs/indicators/logic-profile):** Desglose detallado sesión por sesión (RTH, ETH, sesiones intradiarias).
* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Inspecciona el flujo de órdenes tick a tick dentro de las velas en los niveles de HVN y LVN macro.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a guardar tus plantillas de Composite y optimizar el rendimiento de NinjaTrader 8.
