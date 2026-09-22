---
title: Logic BigTrades
description: Manual técnico y referencia de detección de bloques institucionales, líneas desnudas y agrupación magnética en NinjaTrader 8.
order: 5
category: indicators
---

# Logic BigTrades

> **Radar institucional de flujo de órdenes para NinjaTrader 8.**  
> Detecta, filtra y proyecta las órdenes agresivas extraordinarias que entran al Bid y al Ask, consolidando ejecuciones fragmentadas mediante agrupación magnética y proyectando líneas de soporte y resistencia automáticas con mitigación en tiempo real.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador proyecta cuatro componentes visuales de alta precisión directamente sobre el gráfico:

### 1. Burbujas de Ejecución de Mercado
* **Ubicación:** Se dibujan en el nivel de precio exacto y sobre la vela en que se ejecutó la orden agresiva.
* **Colores Predeterminados:**
  * *Azul cielo / Verde:* Compras agresivas al Ask (participantes barriendo el libro de órdenes al alza o stops de posiciones cortas ejecutados).
  * *Magenta / Rojo:* Ventas agresivas al Bid (participantes barriendo el libro a la baja o stops de posiciones largas ejecutados).
* **Escala Proporcional:** El diámetro se calcula dinámicamente entre `Min Radius` y `Max Radius` en función del número de contratos transados.
* **Texto Numérico:** Muestra la cifra exacta del volumen dentro de la burbuja (ej. `250`, `600`, `1.5k`).

### 2. Líneas Desnudas (*Naked Lines*) y Zonas de Defensa (*Naked Areas*)
* **Qué dibuja:** Una línea horizontal que nace en el centro de la burbuja institucional y se proyecta hacia la derecha.
* **Área Sombreada:** Franja translúcida alrededor de la línea con un espesor configurable en ticks (por defecto 4 ticks). Representa el margen de tolerancia que la institución permite antes de defender su precio promedio de entrada.
* **Mitigación Automática (*CutOnTouch*):** La línea viaja en el tiempo de forma indefinida hasta que una vela futura regresa a tocarla. En ese microsegundo exacto, la línea se corta, confirmando que el nivel ya fue mitigado y manteniendo el gráfico libre de líneas obsoletas.

### 3. Histograma Inferior de Big Trades
* **Qué muestra:** Un sub-panel en la parte inferior del gráfico que grafica el volumen institucional acumulado por vela.
* **Interpretación:** Permite evaluar si en una vela alcista el volumen de compras institucionales fue dominante o si, por el contrario, existió una presión vendedora contraria que frenó el avance.

### 4. Escáner de Cinta Institucional (HUD Live Feed)
* **Qué muestra:** Un panel flotante y compacto en pantalla que reporta en tiempo real las últimas transacciones institucionales detectadas (hora exacta, dirección de la orden, volumen en contratos y precio de ejecución).

---

## 2. Herramientas y Controles Interactivos

* **Botón `[Line]` en la barra flotante de la suite (`_LOF Control Panel`):**
  * Al hacer clic en `[Line]`, el cursor entra en modo de anclaje interactivo.
  * Haz clic sobre cualquier burbuja o clúster institucional histórico en tu gráfico.
  * Se proyectará inmediatamente una **Línea Desnuda con Área Sombreada** hacia el futuro con la regla de mitigación configurada (`CutOnTouch` o `ExtendInfinite`). Es ideal para marcar niveles que no alcanzaron el filtro automático pero que consideras estratégicos.
* **Interacción con el Escáner HUD:**
  * La ventana del escáner puede reposicionarse o redimensionarse en pantalla según las necesidades de tu espacio de trabajo.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: Filter Settings (Filtros de Volumen y Escala)
* **`Scale Mode`** *(Enum: Fixed, VisibleWindow | Default: Fixed)*:
  * `Fixed`: El tamaño de las burbujas se calcula contra un volumen de referencia estático fijado en `Max Volume (Fixed Reference)`. Mantiene una proporción visual constante sin importar cuántas velas haya en pantalla.
  * `VisibleWindow`: Normaliza el tamaño de las burbujas en relación con la orden más grande visible en la ventana actual.
* **`Min Volume (Filter)`** *(Double | Default: 150)*:  
  Volumen mínimo absoluto para que una orden sea tomada en cuenta y dibujada como burbuja.  
  * *Valores sugeridos:* En E-mini S&P 500 (`ES`) `150` a `250`; en Nasdaq (`NQ`) `40` a `80`; en Petróleo (`CL`) `50` a `100`; en Oro (`GC`) `40` a `80`.
* **`Max Volume (Fixed Reference)`** *(Double | Default: 800)*:  
  Volumen con el cual la burbuja alcanza su radio máximo configurado (`Max Radius`).  
  * *Valores sugeridos:* En ES `800` a `1.500`; en NQ `150` a `300`.

### Grupo: Visual Settings (Apariencia de Burbujas)
* **`Ask Color (Buys)`** *(Brush | Default: DeepSkyBlue)*: Color asignado a las compras institucionales agresivas al Ask.
* **`Bid Color (Sells)`** *(Brush | Default: Magenta)*: Color asignado a las ventas institucionales agresivas al Bid.
* **`Text Color`** *(Brush | Default: White)*: Color del número de contratos dentro de la burbuja.
* **`Min Radius / Max Radius`** *(Float | Default: 10f / 40f)*: Radio mínimo y máximo en píxeles para el círculo de la burbuja.
* **`Bubble Opacity (%)`** *(Int | Default: 40 | Rango: 10 a 100)*: Transparencia del relleno de la burbuja para no tapar el cuerpo de las velas.
* **`Bubble Border Thickness`** *(Float | Default: 2f)*: Grosor del trazo exterior de la burbuja.
* **`Border Opacity (%)`** *(Int | Default: 100)*: Opacidad del borde exterior para asegurar una delimitación nítida.
* **`Show Volume Text`** *(Bool | Default: True)*: Muestra u oculta la cifra numérica de contratos dentro de la burbuja.
* **`Bubble Text Size`** *(Int | Default: 11)*: Tamaño de la tipografía del texto interno.
* **`Color Mode`** *(Enum: Basic, Heatmap | Default: Basic)*:
  * `Basic`: Utiliza exclusivamente los colores fijados en `Ask Color` y `Bid Color`.
  * `Heatmap`: Activa los gradientes térmicos de 3 niveles según la magnitud del bloque.
* **`Show Historical Bubbles`** *(Bool | Default: True)*: Permite ver las burbujas en las velas del pasado o limitarlas únicamente a la sesión viva.
* **`Magnetic Clustering`** *(Bool | Default: False)*:  
  **Función recomendada:** Consolida ejecuciones simultáneas o contiguas en el mismo precio dentro de la misma vela en una sola mega-orden institucional.  
  * *Recomendación:* Activar en `True` en activos altamente fragmentados por algoritmos como NQ o ES.

### Grupos: Heatmap Ask Settings & Heatmap Bid Settings
* **`Ask / Bid: Level 1 (Min)`** *(Bool | Default: True)*: Activa el color de primer nivel para órdenes moderadamente grandes (ej. Verde oscuro / Rojo oscuro).
* **`Ask / Bid: Level 2`** *(Bool | Default: True)*: Color intermedio para bloques de gran tamaño (ej. Verde bosque / Carmesí).
* **`Ask / Bid: Level 3 (Max)`** *(Bool | Default: True)*: Color brillante máximo para mega-ballenas (ej. Verde lima / Tomate brillante).

### Grupo: Naked Lines Settings (Líneas y Zonas de Defensa)
* **`Enable Auto-Lines`** *(Bool | Default: False)*:  
  Si está en `True`, el indicador proyecta automáticamente una línea de soporte o resistencia cada vez que una orden supera el umbral configurado en `AutoLineMinVolume`.
* **`Min Volume (Auto-Lines)`** *(Double | Default: 500)*:  
  Filtro de volumen exigido para que una orden cualifique para generar una línea defensiva automática.  
  * *Valores sugeridos:* En ES `500` a `1.000`; en NQ `100` a `200`.
* **`Mitigation Mode`** *(Enum: CutOnTouch, ExtendInfinite | Default: CutOnTouch)*:
  * `CutOnTouch`: La línea se detiene de forma precisa en el momento exacto en que una barra futura toca su precio. Mantiene el gráfico limpio y enfocado solo en niveles vírgenes.
  * `ExtendInfinite`: La línea continúa indefinidamente sin importar cuántas veces sea cruzada.
* **`Line Horizon`** *(Enum: All, SessionOnly | Default: All)*:
  * `All`: Mantiene las líneas vivas a través de los días hasta que sean mitigadas.
  * `SessionOnly`: Corta todas las líneas abiertas al finalizar la sesión del día.
* **`Enable Line`** *(Bool | Default: True)*: Dibuja la línea central de la trayectoria.
* **`Line Style`** *(Enum: Solid, Dash | Default: Dash)*: Estilo de trazo de la línea de mitigación.
* **`Line Thickness`** *(Float | Default: 2f)*: Grosor de la línea.
* **`Line Opacity (%)`** *(Int | Default: 100)*: Opacidad del trazo.
* **`Enable Area`** *(Bool | Default: True)*: Activa la zona de sombra defensiva alrededor de la línea.
* **`Area Height (Ticks)`** *(Int | Default: 4 | Rango: 1 a 12)*: Ancho vertical de la zona defensiva expresado en ticks (ej. 4 ticks = 1 punto en ES).
* **`Area Opacity (%)`** *(Int | Default: 20)*: Transparencia del sombreado defensivo.
* **`Enable Label / Label Color / Label Size`** *(Default: True, White, 11)*: Etiquetas de texto con el volumen de la orden anclada a la línea.

### Grupo: Histogram Settings (Histograma Inferior)
* **`Enable Histogram`** *(Bool | Default: False)*: Activa el sub-panel inferior de volumen institucional.
* **`Visual Style`** *(Enum: Stacked, Bidirectional, SideBySide | Default: Stacked)*:
  * `Stacked`: Apila el volumen de compra y venta institucional en una sola barra por vela.
  * `Bidirectional`: Dibuja las compras hacia arriba del eje cero y las ventas hacia abajo.
  * `SideBySide`: Coloca dos barras paralelas lado a lado por cada vela.
* **`Histogram Height (%)`** *(Int | Default: 10)*: Porcentaje de altura de la ventana del gráfico asignado al sub-panel.
* **`Auto-Fit Scale`** *(Bool | Default: False)*: Escala automáticamente las barras para que encajen dentro de la altura del panel.
* **`Grid Settings`** *(Grid Divisions, Grid Color, Opacity)*: Malla de referencia visual para medir niveles de volumen en el histograma.

### Grupo: Scanner Settings (Escáner de Cinta HUD)
* **`Background Color / Opacity (%)`** *(Default: Black / 85%)*: Fondo del terminal de lectura en pantalla.
* **`Border Color / Opacity (%)`** *(Default: DarkGray / 100%)*: Marco del escáner.
* **`Text Size / Text Color`** *(Default: 10f / White)*: Tipografía del feed de órdenes.
* **`Ask / Bid Colors`** *(Default: LimeGreen / Crimson)*: Colores para identificar si la orden reportada fue compra o venta de mercado.

### Grupo: Alert Settings (Alertas Acústicas)
* **`Enable Sound Alerts`** *(Bool | Default: False)*: Activa las alertas sonoras en tiempo real.
* **`Min Volume (Alert)`** *(Double | Default: 1000)*: Volumen mínimo necesario para detonar la alerta acústica.
* **`Sound File (.wav) or Path`** *(String | Default: "Alert2.wav")*: Nombre del archivo de audio en la carpeta de sonidos de NinjaTrader o ruta completa a un archivo `.wav` personalizado.

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "LOF_BigTrades")*: Nombre del indicador en la suite.
* **`Instance Color`** *(Brush | Default: Cyan)*: Identidad de color en el orquestador LOF.
* **`Visuals Enabled`** *(Bool | Default: True)*: Interruptor maestro para activar o pausar los dibujos visuales.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Mantener siempre en `BidAsk` para procesar la agresividad real de las órdenes.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Posición de capa de las burbujas respecto a las velas.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Optimización de cadencia de refresco gráfico.

---

## 4. Mejores Prácticas y Consejos de Trading

### A. Absorción Institucional vs. Ruptura de Momentum (Sweep)
Aprender a distinguir el contexto en que aparece una Big Trade es la clave para ganar consistencia:

1. **La Trampa de Absorción en Resistencia:**
   * El precio llega a un máximo del día o nivel clave de resistencia.
   * Aparece una **burbuja masiva de compras (Ask / Color Azul/Verde)** de 1.000 contratos.
   * Sin embargo, la vela **no logra cerrar por encima de la burbuja y deja una mecha superior**, cerrando en rojo.
   * **Interpretación:** Los compradores agresivos de ruptura fueron absorbidos por completo por órdenes límite pasivas de venta institucional. Es una señal de giro bajista de altísima probabilidad.
2. **Ruptura de Momentum Genuina:**
   * El precio ataca un nivel de resistencia.
   * Aparece la burbuja masiva de compras (Ask) y la vela **cierra con cuerpo sólido y amplio por encima del nivel de la burbuja**, desplazando el precio de inmediato.
   * **Interpretación:** La orden institucional barrió toda la liquidez pasiva disponible y tiene la intención de expandir el rango. Espera un retroceso al precio de la burbuja para incorporarte en largo.

### B. Operativa de Retroceso a las Líneas Desnudas (*Naked Lines*)
* Cuando se genera una línea automática con su área sombreada (*Naked Area*), ese nivel representa el precio promedio donde una institución asumió un riesgo masivo.
* En el 70% de las ocasiones en que el mercado se encuentra en tendencia sana, el precio realiza un retroceso técnico (*pullback*) buscando testear exactamente esa línea.
* **Gatillo de Entrada:** Espera a que el precio ingrese en el área sombreada de la línea desnuda. Si el precio reacciona con mecha de rechazo y la línea se corta (*CutOnTouch*), ingresa a favor de la tendencia original con stop ceñido al otro extremo del área sombreada.

### C. Guía de Calibración de Filtros de Volumen por Activo
Configurar umbrales adaptados a cada mercado es fundamental para evitar falsas señales:

| Activo / Futuro | `Min Volume (Filter)` | `Max Volume (Fixed Ref)` | `AutoLineMinVolume` | `Min Volume (Alert)` |
| :--- | :--- | :--- | :--- | :--- |
| **E-mini S&P 500 (`ES`)** | `150` a `250` | `800` a `1.500` | `500` a `800` | `1.000` |
| **Micro E-mini S&P 500 (`MES`)** | `1.500` a `3.000` | `8.000` a `15.000` | `5.000` | `10.000` |
| **E-mini Nasdaq (`NQ`)** | `40` a `80` | `150` a `300` | `100` a `200` | `250` |
| **Micro E-mini Nasdaq (`MNQ`)** | `400` a `800` | `1.500` a `3.000` | `1.000` | `2.500` |
| **Crudo Petróleo (`CL`)** | `50` a `100` | `200` a `400` | `150` a `250` | `300` |
| **Oro (`GC`)** | `40` a `80` | `150` a `300` | `100` a `200` | `250` |
| **Bonos a 10 Años (`ZN`)** | `1.000` a `2.500` | `5.000` a `10.000` | `3.000` a `5.000` | `5.000` |

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Observa los clusters de delta y bid/ask en el interior de las velas donde aparecieron las Big Trades.
* **[Logic Algorithms](/dashboard/docs/indicators/logic-algorithms):** Combina Big Trades con detecciones de Whale Blocks y Absorptions confirmadas.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a cargar y gestionar plantillas visuales optimizadas en NinjaTrader 8.
