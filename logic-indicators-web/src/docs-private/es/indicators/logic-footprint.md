---
title: Logic Footprint
description: Manual técnico y referencia del gráfico de Order Flow vela por vela con arquitectura multi-columna en NinjaTrader 8.
order: 1
category: indicators
---

# Logic Footprint

> **El buque insignia de lectura microestructural y flujo de órdenes para NinjaTrader 8.**  
> Revela la distribución matemática exacta de las órdenes de compra (Ask) y venta (Bid) ejecutadas en cada nivel de precio, desbalances diagonales apilados y perfiles intrayectorios con arquitectura de hasta 3 columnas por vela.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador descompone la anatomía interna de cada vela mediante los siguientes elementos visuales de alta precisión:

### 1. Celdas Numéricas Bid x Ask (Cruce Diagonal)
* **Qué dibuja:** Dos valores numéricos separados por una cruz o espacio en cada tick de la vela.
  * El número a la izquierda representa los contratos ejecutados al Bid (vendedores agresivos atacando la liquidez pasiva).
  * El número a la derecha representa los contratos ejecutados al Ask (compradores agresivos atacando la liquidez pasiva).
* **Interpretación:** La subasta se evalúa diagonalmente: se compara el Ask de un precio contra el Bid del precio inmediatamente inferior.

### 2. Desbalances Diagonales (*Imbalances*)
* **Qué dibuja:** Cuando el volumen del Ask supera al Bid diagonal opuesto por el ratio configurado (ej. 3.1:1 o 310%), la cifra se ilumina en **Verde brillante** (desbalance comprador). Cuando el Bid supera al Ask diagonal superior, se ilumina en **Rojo brillante** (desbalance vendedor).
* **Desbalances Apilados (*Stacked Imbalances*):** La aparición de 3 o más desbalances contiguos en la misma dirección marca una zona de agresión institucional masiva que actúa como soporte o resistencia en futuros testeos.

### 3. Point of Control de la Vela (POC)
* **Qué dibuja:** Un recuadro perimetral sólido (por defecto amarillo o dorado) que encierra el nivel de precio exacto donde se transó el mayor volumen o delta de toda la vela.
* **Interpretación:**
  * *POC en la base de una vela alcista:* Confirma un fuerte soporte institucional que impulsó el movimiento.
  * *POC en el extremo superior de una vela alcista con mecha:* Alerta de absorción pasiva; los compradores agresivos fueron frenados por órdenes límite de venta (posible trampa de mercado).

### 4. Celdas en Modo Perfil (`ProfileLeft` / `ProfileRight`)
* **Qué dibuja:** En lugar de celdas rectangulares sólidas, dibuja una barra de histograma horizontal proporcional al volumen o delta de ese tick específico.
* **Interpretación:** Convierte la vela en un micro-perfil intrayectorio para identificar de un vistazo si la vela tuvo forma de "D" (balance), "P" (subida por parada de cortos) o "b" (liquidación de largos).

### 5. Mapas de Calor (Heatmaps)
* **Qué dibuja:** Gradientes cromáticos de 5 niveles en el fondo de las celdas según la concentración de volumen o agresividad.
* **Interpretación:** Permite detectar instantáneamente dónde se ubicaron los bloques de mayor liquidez sin necesidad de leer minuciosamente cada número individual.

### 6. Transición LOD Automática (*Level of Detail*)
* **Qué dibuja:** A medida que alejas el zoom del gráfico, el indicador retira automáticamente los números para evitar empastes y muestra un mini perfil compacto. Si te alejas aún más, dibuja velas japonesas impecables y limpias.

---

## 2. Herramientas y Controles Interactivos

* **Botón `[VP]` en la barra flotante de la suite (`_LOF Control Panel`):**
  * Al hacer clic en `[VP]`, conmuta instantáneamente entre la vista de huella numérica detallada (*Bid x Ask*) y el modo de *Perfil de Volumen intrayectorio*.
  * Permite pasar de la lectura microscópica de números a la evaluación geométrica rápida de la forma de la vela con un solo toque.
* **Zoom Dinámico Inteligente:**
  * Al utilizar la rueda del ratón o la escala de tiempo, el sistema LOD ajusta de forma automática la densidad visual para que el gráfico nunca pierda fluidez ni se amontone.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "LOF_FootPrint")*: Nombre identificador en la suite.
* **`Instance Color`** *(Brush | Default: DodgerBlue)*: Color de la etiqueta en el orquestador maestro.
* **`Enable Indicator`** *(Bool | Default: True)*: Interruptor maestro para activar o pausar la huella visual.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Mantener en `BidAsk` para procesar el libro de órdenes real tick a tick.
* **`Tick Multiplier`** *(Int | Default: 1 | Rango: 1 a 20)*: Agrupa ticks contiguos en un solo nivel de precio.  
  * *Recomendación:* `1` para ES, Petróleo o Bonos; `2` a `4` para NQ para consolidar la escala vertical y mejorar la visualización.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Regula la cadencia de refresco en pantalla.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Posición de capa gráfica en el gráfico.

### Grupos: Column 1, Column 2 y Column 3 (Columnas Modulares)
* **`Enable Column`** *(Bool | Default: True en Col 1 y 2 / False en Col 3)*: Activa o apaga cada una de las 3 columnas disponibles por vela.
* **`Column Width (%)`** *(Int | Default: 50 en Col 1 y 2)*: Distribución del ancho de la vela entre las columnas activas.
* **`Column Separation Margin`** *(Int | Default: 2)*: Separación en píxeles entre columnas contiguas.
* **`Text Value Type`** *(Enum: None, Volume, Trades, BidAsk, Delta, DeltaPct, Bid, Ask | Default: Delta en Col 1 / BidAsk en Col 2)*:  
  Define qué dato numérico se imprime en la celda.
* **`Text Alignment`** *(Enum: Left, Center, Right | Default: Right en Col 1 / Center en Col 2)*: Alineación del texto dentro de la celda.
* **`Cell Type`** *(Enum: Full, ProfileLeft, ProfileRight | Default: ProfileRight en Col 1 / Full en Col 2)*:
  * `Full`: Celda rectangular completa que cubre todo el espacio del tick.
  * `ProfileLeft / ProfileRight`: Barra de perfil horizontal que crece desde el borde hacia el centro.
* **`Cell Profile Metric`** *(Enum: Volume, Delta, DeltaPct, Trades, Bid, Ask)*: Dato utilizado para calcular la longitud de la barra de perfil.
* **`Cell Color Type`** *(Enum: Delta, BidColor, AskColor, Custom, Heatmaps)*: Esquema de color para el fondo de la celda.
* **`Cell Opacity`** *(Enum: Volume, Delta, DeltaPct, Trades, None)*: Regula la transparencia de la celda según el volumen o delta transado.
* **`Min / Max Opacity (%)`** *(Int | Default: 10% a 100%)*: Límites de transparencia.
* **`POC Type`** *(Enum: Volume, Metric, None | Default: Volume en Col 2)*: Resalta el Point of Control dentro de esa columna.
* **`POC Color / Border Thickness`** *(Default: Yellow / 2f)*: Estilo visual del marco del POC.
* **`Minimum Filter (Hide Below)`** *(Int | Default: 0)*: Oculta los datos en celdas que no alcancen este volumen mínimo.

### Grupo: Imbalances (Desbalances Diagonales y por Diferencia)
* **`Enable Ratio Imbalances`** *(Bool | Default: True)*: Activa la detección por multiplicación diagonal.
* **`Imbalance Ratio (x:1)`** *(Double | Default: 3.1 | Rango: 2.5 a 4.0)*: Multiplicador requerido. Un valor de `3.1` exige que las compras superen al menos por 3.1 veces (310%) a las ventas diagonales.
* **`Min Volume (Ratio)`** *(Int | Default: 10)*: Contratos mínimos requeridos para validar el desbalance.  
  * *Recomendación:* En ES fijar entre `80` y `150`; en NQ entre `15` y `30`.
* **`Imbalance Color Buys (Ask) / Sells (Bid)`** *(Brush | Default: Lime / Red)*: Colores para las cifras con desbalance.
* **`Enable Difference Imbalances`** *(Bool | Default: True)*: Activa la detección por resta aritmética absoluta ($\text{Ask} - \text{Bid}_{\text{diagonal}}$).
* **`Net Difference (Subtraction)`** *(Double | Default: 100)*: Contratos netos de diferencia exigidos.
* **`Difference Color Buys / Sells`** *(Default: Cyan / DarkOrange)*: Colores para los desbalances por diferencia.

### Grupo: Relative Maximum Value (Modo de Escala de Calor)
* **`Scale Mode (Relative)`** *(Enum: Bar, CustomSession, Visible, AllData, Manual | Default: Bar)*:
  * `Bar`: Normaliza los colores y barras de perfil en función del volumen máximo de esa propia vela.
  * `CustomSession`: Normaliza contra el volumen más alto registrado durante la sesión configurada.
  * `Visible`: Normaliza contra las barras visibles en pantalla.
  * `Manual`: Respeta los valores numéricos fijos configurados en los campos manuales.
* **`Scale Intensity (%)`** *(Int | Default: 100)*: Sensibilidad del gradiente de calor.

### Grupos de Calor: Heatmap (Volume, Delta, Ask, Bid)
* Cada grupo cuenta con **5 niveles térmicos configurables** (Nivel 1 mínimo a Nivel 5 máximo) con casillas de activación y selectores de color para representar la intensidad de la liquidez ejecutada.

### Grupo: Texts (Tipografía y Legibilidad)
* **`Base Text Size`** *(Int | Default: 13)*: Tamaño de fuente máximo.
* **`Auto-Contrast`** *(Bool | Default: True)*: Conmuta automáticamente los números entre blanco y negro según la oscuridad del fondo de la celda.
* **`Abbreviate (k, M)`** *(Bool | Default: True)*: Simplifica valores grandes (ej. `1.5k` en vez de `1500`).
* **`Text Internal Margin`** *(Int | Default: 2)*: Margen interior para que el texto no toque los bordes de la celda.

### Grupo: Zoomed Out View (Nivel de Detalle Adaptativo - LOD)
* **`Auto Candle Width`** *(Bool | Default: True)*: Escala el ancho de la vela suavemente al hacer zoom.
* **`Threshold to Hide Texts`** *(Int | Default: 60)*: Distancia en píxeles entre barras por debajo de la cual se ocultan los textos numéricos.
* **`Footprint to Profile Threshold`** *(Int | Default: 40)*: Ancho en píxeles por debajo del cual la vela pasa de huella numérica a mini-perfil visual.
* **`Profile to Bars Threshold`** *(Int | Default: 20)*: Ancho en píxeles por debajo del cual el mini-perfil se transforma en vela japonesa sólida tradicional.
* **`Bullish / Bearish / Doji Candle Colors`** *(Default: Lime / Red / Gray con 70% de opacidad)*: Colores del cuerpo de la vela cuando se activa la vista alejada.

---

## 4. Mejores Prácticas y Consejos de Trading

### A. La Lectura de Desbalances Apilados (*Stacked Imbalances*)
* Cuando se imprimen **3 o más desbalances consecutivos de compra (Verde)** en una vela alcista que rompe una consolidación, ese bloque representa el origen de la agresión institucional.
* **Estrategia de Entrada:** No compres persiguiendo el precio en la punta de la vela. Espera a que el mercado realice un retroceso (*pullback*) buscando testear el nivel del desbalance apilado. Si al tocar la zona el delta vendedor se seca y la vela rechaza, entra en largo con stop protegido justo por debajo del desbalance inferior.

### B. Operativa de Absorción en los Extremos de la Vela
* **Trampa en el Techo (Absorción de Compras):**
  * Observa una vela alcista con mecha superior.
  * En el tick más alto aparece un volumen muy grande de compras (ej. `500` al Ask), pero el precio no avanza ni un tick más y el nivel inferior cierra con un desbalance vendedor.
  * El **POC de la vela queda atrapado en el extremo superior**.
  * **Interpretación:** Los compradores de ruptura atacaron el Ask con todas sus fuerzas, pero una institución colocó órdenes límite de venta pasiva que absorbieron cada contrato. Es una señal de giro bajista de altísima efectividad.
* **Cero en la Punta (*Finished vs. Unfinished Auction*):**
  * Si en el extremo de la mecha observas un cero en la columna contraria (ej. `0 x 85`), la subasta ha finalizado formalmente: a nadie le interesó comprar a un precio más alto. Es un techo seguro para colocar tu orden de Stop Loss.

### C. Tabla de Configuraciones Recomendadas de Footprint según el Activo

| Parámetro | E-mini S&P 500 (`ES`) | E-mini Nasdaq (`NQ`) | Petróleo Crudo (`CL`) | Oro (`GC`) |
| :--- | :--- | :--- | :--- | :--- |
| **`Tick Multiplier`** | `1` tick (0.25 pt) | `2` a `4` ticks (0.50 - 1.0 pt) | `1` tick (0.01) | `1` tick (0.10) |
| **`Imbalance Ratio`** | `3.1` (o 300%) | `3.5` a `4.0` | `3.0` | `3.0` |
| **`Min Volume (Ratio)`** | `80` a `150` contratos | `15` a `30` contratos | `25` a `50` contratos | `20` a `40` contratos |
| **`Col 1 Setup`** | Delta Profile | Delta Profile | Delta Profile | Volume Profile |
| **`Col 2 Setup`** | Bid x Ask con POC de Volumen | Bid x Ask con POC de Volumen | Bid x Ask con POC de Volumen | Bid x Ask con POC de Volumen |

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Footer](/dashboard/docs/indicators/logic-footer):** Añade telemetría de 27 métricas y delta acumulado al pie de tu gráfico de Footprint.
* **[Logic Algorithms](/dashboard/docs/indicators/logic-algorithms):** Proyecta desbalances apilados y marcas de agotamiento sobre tus velas sin tener que calcularlas a mano.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a guardar tus plantillas de Footprint para ES y NQ en NinjaTrader 8.
