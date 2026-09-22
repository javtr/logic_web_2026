---
title: Logic Profile
description: Manual técnico completo y referencia de configuración de Volume Profile, Delta Profile y TPO Market Profile en NinjaTrader 8.
order: 3
category: indicators
---

# Logic Profile

> **La estación definitiva de análisis de Subasta (Auction Market Theory) para NinjaTrader 8.**  
> Desglosa la interacción entre precio, volumen y tiempo sesión a sesión mediante una arquitectura sincronizada de doble columna, con proyección matemática del Área de Valor (70%), POCs desnudos con mitigación automática (*CutOnTouch*), Initial Balance (60 min) y rechazos violentos de TPO (*Single Prints*).

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador proyecta la estructura de la subasta sobre cada jornada operativa mediante los siguientes elementos visuales de alta precisión:

| Componente Visual | Representación en Pantalla | Significado Operativo e Interpretación |
| :--- | :--- | :--- |
| **Columna 1: Volume Profile** | Histograma horizontal o silueta geométrica (*Geometry*) anclada al inicio de la sesión. | Mapea el volumen total de contratos transados en cada nivel de precio. Destaca los Nodos de Alto Volumen (**HVN**, zonas de aceptación y soporte/resistencia) y Nodos de Bajo Volumen (**LVN**, zonas de rechazo rápido). |
| **Columna 2: TPO Market Profile** | Letras clásicas (A, B, C...) o bloques de tiempo agrupados en brackets de 30 minutos. | Mapea la distribución temporal de la subasta. Permite auditar cuánto tiempo pasó el mercado en cada precio y reconstruir el orden cronológico del día mediante mapas de calor térmicos de 5 niveles. |
| **Columna 2 (Alt): Delta Profile** | Barras bidireccionales coloreadas (Rojo = Delta negativo, Verde = Delta positivo). | Muestra el balance neto comprador vs. vendedor por tick dentro de la sesión completa, revelando a qué precios se absorbió o presionó agresivamente. |
| **Área de Valor (VAH / VAL)** | Franja sombreada que delimita el 70% central del volumen o TPO de la sesión. | **VAH (Value Area High):** Techo del valor justo; resistencia clave en retrocesos. <br>**VAL (Value Area Low):** Suelo del valor justo; soporte institucional de alta probabilidad. |
| **Point of Control (POC Line)** | Línea horizontal destacada (por defecto Aguamarina o Dorada) en el precio de mayor volumen o tiempo. | Representa el precio de máximo consenso y equilibrio de la sesión. Si el precio se aleja sin mitigarlo, se convierte en un **Naked POC** que se extiende hacia el futuro como objetivo magnético. |
| **Single Prints (Impresiones Únicas)** | Letras solitarias resaltadas en color magenta en los extremos del perfil TPO. | Señalan una agresión institucional tan violenta que el precio no permitió una segunda media hora en ese nivel; actúan como soportes y resistencias infranqueables en el corto plazo. |
| **Initial Balance (IB)** | Trazo vertical continuo que abarca el rango de los primeros 60 minutos (brackets A y B). | Delimita la volatilidad de referencia de la sesión regular (RTH). Sirve como base para proyectar expansiones estadísticas de rango (1.5x IB, 2x IB). |
| **Extremos de Sesión (High / Low)** | Líneas de trazo fino que marcan el máximo y mínimo absoluto de la sesión. | Delimitan el rango total alcanzado por la subasta en la jornada. |
| **Cuadro de Métricas (HUD Box)** | Panel flotante anclado en la esquina superior o inferior del perfil. | Resumen cuantitativo inmediato: Volumen total, Delta neto, Ask/Bid, Max/Min Delta, Rango total en ticks, Rango de IB y cotizaciones exactas de POC, VAH y VAL. |

---

## 2. Herramientas y Controles Interactivos

Logic Profile ofrece manipulación directa en el gráfico para realizar análisis sobre cualquier segmento histórico sin recargar el indicador:

* **Botón `[Draw]` en la barra de herramientas de la suite (`_LOF Control Panel`):**
  * Al pulsar `[Draw]`, el cursor entra en modo de trazado interactivo.
  * Haz un clic en la vela inicial y un segundo clic en la vela final sobre cualquier parte del gráfico.
  * Se generará inmediatamente un **Perfil de Volumen / TPO personalizado** sobre ese rango específico, permitiendo auditar consolidaciones, noticias o impulsos pasados de forma independiente.
* **Modo Exclusivo Manual (`Manual Mode Only`):**
  * Si activas esta casilla en la configuración, el indicador apaga los perfiles diarios automáticos y funciona exclusivamente como una herramienta de dibujo manual limpia.
* **Menú Contextual (Clic Derecho sobre el Perfil):**
  * Permite fusionar perfiles adyacentes (*Merge Profiles*), dividir el TPO en medias horas individuales (*Split TPO*) o extender manualmente líneas de POC hacia el futuro.
* **Aceleración Gráfica y Modos de Carga Ultrarrápida:**
  * Mediante el parámetro `Historical Load Speed`, el indicador procesa semanas y meses de historial en segundos, garantizando un renderizado fluido a 60 FPS sin sobrecargar la CPU.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "LOF_Profile")*: Nombre identificador de la instancia en la suite.
* **`Instance Color`** *(Brush | Default: Orange)*: Color de la etiqueta en el orquestador maestro.
* **`Historical Load Speed`** *(Enum: Standard_DeltaEnabled, Medium_NoDelta, Fast_NoDelta, Ultra_NoDelta | Default: Fast_NoDelta)*:  
  **Optimizador de velocidad de carga histórica:**
  * `Fast_NoDelta` / `Ultra_NoDelta`: Agrupa los datos históricos para cargar meses de perfil de volumen en segundos.
  * `Standard_DeltaEnabled`: Procesa el flujo completo tick a tick calculando el Delta intrayectorio (requerido si activas columnas de Delta Profile).
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Modalidad de procesamiento de órdenes. Mantener en `BidAsk`.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Regula la cadencia de refresco en pantalla.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*: Mantiene los perfiles detrás de las velas para no entorpecer la visión de la acción del precio.

### Grupo: Profile Settings (Ciclos de Subasta y Horarios)
* **`Session Mode`** *(Enum: Continuo, Custom | Default: Continuo)*:
  * `Continuo`: Procesa la sesión continua 24 horas (ETH/Globex).
  * `Custom`: Filtra el cálculo para que solo procese las horas exactas fijadas en `Start Time` y `End Time`.
* **`Start Time / End Time`** *(DateTime | Default: 09:30 a 16:00)*: Horario de la sesión regular de mercado (RTH de Nueva York).
* **`Profile Period`** *(Enum: Daily, Weekly, Monthly | Default: Daily)*: Determina si el indicador genera un nuevo perfil cada día, cada semana o cada mes.
* **`Manual Mode Only`** *(Bool | Default: False)*: Si está en `True`, desactiva los perfiles automáticos y solo muestra los perfiles dibujados a mano con el botón `[Draw]`.
* **`TPO Bracket (Minutes)`** *(Int | Default: 30)*: Duración de cada letra o bloque temporal en el TPO (estándar de subasta: 30 min).
* **`Value Area (%)`** *(Double | Default: 70.0 | Rango: 50.0 a 95.0)*: Porcentaje del volumen total utilizado para calcular el Área de Valor (70% recomendado).
* **`Min. Realtime Width (px)`** *(Int | Default: 200)*: Ancho mínimo reservado para el perfil de la sesión actual en vivo.
* **`Merge Overlapping Profiles`** *(Bool | Default: False)*: Fusiona perfiles cuyas fechas u horarios se solapen.

### Grupo: Multipliers (Compresión de Ticks y Agrupación)
* **`Bar Spacing (px)`** *(Int | Default: 0)*: Separación vertical entre barras del perfil.
* **`VP / Delta / TPO: Tick Multiplier`** *(Int | Default: 1)*: Factor de agrupación de ticks independiente para cada tipo de perfil.  
  * *Recomendación:* `1` en ES, Petróleo o Bonos; `2` a `4` en NQ para compactar el perfil verticalmente y eliminar el ruido.
* **`VP / Delta / TPO: Box Visual Mode`** *(Enum: Summation, MaximumPeak | Default: Summation)*: Método de cómputo al agrupar ticks (sumatoria total o pico más alto).
* **`VP / Delta / TPO: POC Calculation`** *(Enum: OriginalMaximumPeak, AdjustedSummation | Default: OriginalMaximumPeak)*: Algoritmo para fijar el nivel del Point of Control.

### Grupos: Col. 1 General & Col. 2 General (Estructura de Columnas)
* **`Enable Column`** *(Bool | Default: True en C1 / False en C2)*: Activa o apaga la segunda columna para visualización dual.
* **`Column Width (%)`** *(Int | Default: 50 en C1 / 100 en C2)*: Proporción del ancho asignado a cada columna.
* **`Used Width (%)`** *(Int | Default: 50% en C1 / 80% en C2)*: Porcentaje horizontal máximo que puede ocupar el histograma dentro de su columna.
* **`Profile Type`** *(Enum: Volume, Delta, DeltaOverVolume, VolumeAndDelta, DeltaAndVolume, TPO | Default: Volume en C1 / Volume en C2)*: Selecciona el tipo de datos a calcular y representar en la columna (Volumen, Delta o TPO).
* **`Highlight Open/Close`** *(Bool | Default: False)*: Resalta los precios de apertura y cierre de la sesión en el perfil.

### Grupos: C1 / C2 Volume Profile
* **`Draw Style`** *(Enum: Bars, Geometry | Default: Geometry en C1 / Bars en C2)*:
  * `Geometry`: Silueta suave y continua de alta definición que resalta los nodos HVN y LVN.
  * `Bars`: Histograma clásico de barras horizontales independientes.
* **`Alignment`** *(Enum: Left, Right | Default: Left)*: Orientación de crecimiento del perfil.
* **`Fill Color / Fill Opacity`** *(Brush / Int | Default: Silver / 80%)*: Color y transparencia del cuerpo del perfil.
* **`Enable Stacked Bid/Ask`** *(Bool | Default: False)*: Divide cada barra en dos colores para mostrar el volumen comprado y vendido en ese nivel.

### Grupos: C1 / C2 Delta Profile
* **`Bid Color / Ask Color`** *(Brush | Default: Red / LimeGreen)*: Colores para deltas negativos y positivos.
* **`Custom Width (%)`** *(Int | Default: 50)*: Ancho horizontal específico para el gráfico de delta.

### Grupos: C1 / C2 TPO (Market Profile)
* **`Visualization`** *(Enum: Blocks, Letters, BlocksAndLetters, Geometry | Default: Letters)*: Formato de representación de los brackets temporales.
* **`Color Mode`** *(Enum: Solid, Heatmap | Default: Solid)*: Activa el gradiente térmico cronológico de 5 niveles (de apertura en azul a cierre en rojo).
* **`Highlight Single Prints`** *(Bool | Default: False)*: Resalta con color distintivo (por defecto Magenta) las letras individuales que marcaron rechazos violentos de precio.
* **`Font Size / Letter Color`** *(Int / Brush | Default: 6 a 10 / White)*: Tipografía y color de las letras del TPO.

### Grupos: C1 / C2 POC (Point of Control)
* **`Highlight in VP / Delta / TPO`** *(Bool | Default: True)*: Resalta la barra o letra del POC con color distintivo.
* **`POC Color / Fill Opacity`** *(Brush / Int | Default: MediumAquamarine / 100%)*: Estilo del bloque del POC.
* **`Enable POC Line`** *(Bool | Default: True)*: Proyecta una línea horizontal en el nivel del POC.
* **`POC Line Extension`** *(Enum: Column, Profile, NextProfile | Default: Column)*:
  * `Column`: Se dibuja dentro del ancho de su columna.
  * `Profile`: Cruza todo el ancho de la sesión.
  * `NextProfile`: **Naked POC:** Extiende la línea horizontal hacia el futuro hasta que una sesión posterior la toque y mitigue (*CutOnTouch*).
* **`Show Label / Show Price`** *(Bool | Default: True)*: Etiquetas con el texto "POC" y su cotización.

### Grupos: C1 / C2 Value Area (Zonas de Valor)
* **`Enable VA`** *(Bool | Default: True)*: Sombrea la zona del 70% de volumen o TPO.
* **`VA Color / Fill Opacity`** *(Brush / Int | Default: CornflowerBlue / 90%)*: Color y transparencia del área de valor.
* **`Enable VA Line`** *(Bool | Default: True)*: Dibuja las líneas delimitadoras de VAH y VAL.
* **`VA Line Extension`** *(Enum: Column, Profile, NextProfile | Default: Column)*: Regla de proyección horizontal para las líneas de VAH y VAL.

### Grupos: C1 / C2 Initial Balance (Rango de 60 Minutos)
* **`Enable`** *(Bool | Default: False)*: Activa el trazado del Initial Balance.
* **`Duration (Minutes)`** *(Int | Default: 60)*: Duración del rango inicial (60 minutos por estándar).
* **`Color / Line Thickness`** *(Brush / Int | Default: MediumBlue / 2)*: Estilo y grosor del trazo visual del IB.

### Grupo: Profile Metrics (Telemetría de Sesión)
* **`Enable Metrics`** *(Bool | Default: False)*: Enciende la caja de resumen estadístico de la sesión.
* **`Block Position`** *(Enum: TopLeft, BottomLeft | Default: BottomLeft)*: Posición de anclaje de la caja de métricas.
* **`Show Volume / Show Delta / Show Range / Show IB Range / Show POC / Show VAH / Show VAL`**: Selectores para activar o desactivar cada métrica en el panel HUD.

---

## 4. Mejores Prácticas y Estrategias Operativas

### A. La Regla del 80% en el Área de Valor (Value Area Play)
Una de las estrategias estadísticas más sólidas de la Teoría de Subasta tradicional:
* **Condición inicial:** El mercado abre la sesión por fuera del Área de Valor del día anterior (por encima de VAH o por debajo de VAL).
* **Gatillo de confirmación:** Si durante la sesión el precio logra ingresar al Área de Valor previa y **cierra dos velas consecutivas de 30 minutos dentro de ella**, existe un **80% de probabilidad estadística de que el precio recorra el área completa hasta alcanzar el extremo opuesto (VAL o VAH)**.
* **Gestión:** Entrada en el re-testeo del límite del Área de Valor con primer objetivo en el POC de la sesión previa y toma de beneficios final en el extremo opuesto.

### B. La Ventaja de la Doble Columna (Volume Profile + TPO o Delta)
Configurar la doble columna sincronizada te otorga una ventaja analítica decisiva:
* **Columna 1 en Volume Profile (Modo Geometría):** Revela dónde se acumuló el volumen pesado de contratos (nodos HVN).
* **Columna 2 en TPO Market Profile (Modo Letras):** Revela el tiempo que el mercado permaneció en cada zona.
* **Detección de Intervención Institucional:** Si observas un nivel con **alto volumen en C1 pero muy pocas letras en C2**, significa que en pocos minutos se ejecutó un volumen descomunal de contratos. Eso no es una subasta natural de equilibrio, sino una **intervención institucional agresiva** que defenderá ese precio.

### C. Operativa de Single Prints en el TPO
* Las **Single Prints** (letras aisladas en magenta) señalan desequilibrios violentos donde el mercado se desplazó rápidamente sin generar aceptación bidireccional.
* En más del 80% de los casos, cuando el precio retrocede hacia una zona de Single Prints de sesiones anteriores, reacciona violentamente rebotando en el primer toque. Utiliza los extremos de las Single Prints como niveles de entrada de alta precisión o zonas de invalidación estricta de Stop Loss.

### D. Calibración de Horarios: Sesión RTH vs. Sesión ETH
* **Para futuros de índices (ES / NQ):**
  * Para análisis de subasta puro, configura `Session Mode` en **`Custom`** con horario de **`09:30` a `16:00`** (hora de Nueva York). Esto aísla la sesión regular RTH donde operan las instituciones reales y calcula el Initial Balance verdadero.
  * Si operas durante la sesión nocturna o europea, utiliza una segunda pestaña o gráfico con `Session Mode` en **`Continuo`** para evaluar los balances de la sesión global (Globex / ETH).

---

## Ver También

* [Logic Footprint](/dashboard/docs/indicators/logic-footprint) — Análisis microestructural vela a vela con desbalances y POC intrayectorio.
* [Logic Composite](/dashboard/docs/indicators/logic-composite) — Perfiles de volumen y TPO macro multi-día anclados a la pantalla.
* [Logic Analytics](/dashboard/docs/indicators/logic-analytics) — Laboratorio cuantitativo de Esfuerzo vs. Resultado con cajas interactivas.
