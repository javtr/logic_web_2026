---
title: Logic Algorithms
description: Manual técnico y referencia completa de los 11 algoritmos de microestructura de Order Flow en NinjaTrader 8.
order: 7
category: indicators
---

# Logic Algorithms

> **Estación algorítmica de reconocimiento de patrones microestructurales para NinjaTrader 8.**  
> Detecta de forma automatizada desbalances apilados, absorciones pasivas, operadores atrapados, subastas abiertas y anomalías de volumen directamente sobre tus velas sin necesidad de analizar tablas numéricas densas.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador dibuja 11 patrones microestructurales independientes. A continuación se detalla cómo se representa y cómo se interpreta cada uno en pantalla:

### 1. Zonas de Desbalance Apilado (*Imbalance Zones*)
* **Qué dibuja:** Franjas rectangulares horizontales de color azul (demanda) o rojo (oferta) originadas en velas donde se detectaron varios niveles contiguos de agresividad compradora o vendedora en diagonal.
* **Interpretación:** Representan el origen de un desequilibrio institucional masivo. Si está habilitada la extensión continua, actúan como zonas de soporte o resistencia dinámicas cuando el precio regresa a testearlas.

### 2. Cajas de Clústeres Avanzados (*Advanced Clusters*)
* **Qué dibuja:** Cajas rectangulares centradas en el nivel o niveles de precio específicos de la vela donde el volumen, el delta o las compras/ventas superaron el umbral definido.
* **Interpretación:** Muestra el "núcleo de gravedad" de la vela. Revela si la mayor batalla por liquidez ocurrió en el centro (aceptación de valor) o en los extremos (defensa agresiva de un nivel).

### 3. Señal de Absorción (*Absorptions Finder*)
* **Qué dibuja:** Un recuadro delimitado alrededor del nivel absorbido con dos fases visuales:
  * **Caja Activa (color oscuro / semitransparente):** Se genera cuando el algoritmo detecta la entrada de un volumen elevado de contratos pero el precio no logra desplazarse más de los ticks configurados.
  * **Caja Aprobada (color brillante y borde sólido):** Se valida tras el cierre de las velas de confirmación si el precio efectivamente rebotó en la dirección esperada.
* **Interpretación:** Señal de giro de alta precisión. Un participante pasivo colocó órdenes límite masivas que absorbieron todas las órdenes de mercado de la contraparte, frenando en seco la progresión del precio.

### 4. Marcas de Agotamiento (*Exhaustion*)
* **Qué dibuja:** Un marcador distintivo en el tick más alto o más bajo de la mecha de la vela.
* **Interpretación:** Señala que el volumen se secó en el extremo (falta de interés comprador en máximos o vendedor en mínimos). El mercado se queda sin liquidez para continuar y se prepara para retroceder.

### 5. Líneas de Subasta Inacabada (*Unfinished Auctions*)
* **Qué dibuja:** Una línea horizontal discontinua anclada en el extremo de la vela que se proyecta hacia la derecha.
* **Interpretación:** En una subasta completa, el volumen transado en el tick del extremo absoluto suele ser cero contratos en la contraparte. Si hubo contratos negociados en ambos lados del tick final, la subasta quedó abierta; el mercado tiende a actuar como un imán hacia ese nivel para mitigar la zona y completar el ciclo.

### 6. Nodos Cero / Vacíos de Liquidez (*Zero Nodes*)
* **Qué dibuja:** Pequeñas cajas rectangulares en niveles de precio específicos dentro del cuerpo de la vela.
* **Interpretación:** Representa niveles de precio donde se negociaron 0 contratos debido a movimientos explosivos o saltos de liquidez (*slippage*). Suelen actuar como zonas donde el precio no encuentra freno al volver a cruzarlas.

### 7. Picos de Volumen Aislados (*Volume Spikes*)
* **Qué dibuja:** Franjas destacadas en un único tick que registró un volumen anormalmente superior (por ejemplo, 5 veces más) que los ticks inmediatamente contiguos.
* **Interpretación:** Delimita una defensa institucional concentrada en un precio específico.

### 8. Bloques de Ballenas (*Whale Blocks*)
* **Qué dibuja:** Cajas sólidas en niveles donde se ejecutaron órdenes con un tamaño promedio por contrato muy por encima del participante común.
* **Interpretación:** Evidencia la intervención de dinero institucional concentrado y no fragmentado.

### 9. Operadores Atrapados (*Trapped Traders*)
* **Qué dibuja:** Marcas de señalización en color verde brillante (compradores atrapados / giro alcista) o rojo brillante (vendedores atrapados / giro bajista).
* **Interpretación:** Aparece cuando el Point of Control (POC) o una masa de contratos agresivos queda atrapada en el 20%-25% superior o inferior de la vela y el precio cierra en la dirección opuesta, forzando la posterior liquidación o cobertura de esos operadores.

### 10. Reversiones de Delta (*Delta Reversals*)
* **Qué dibuja:** Un sombreado tenue en el fondo de la vela.
* **Interpretación:** Ocurre cuando una vela cierra fuertemente alcista pero su delta interno fue profundamente negativo (o viceversa), evidenciando que las órdenes pasivas absorbieron la agresión y dominaron el movimiento.

### 11. Divergencias de Delta (*Delta Divergences*)
* **Qué dibuja:** Sombreado de fondo en la vela (ej. Dorado o Púrpura).
* **Interpretación:** El precio alcanza un nuevo máximo o mínimo respecto a las barras previas, pero el delta total de la barra no acompaña el nuevo extremo, señalando agotamiento de la tendencia.

---

## 2. Herramientas y Controles Interactivos

### Quick Buttons en el Panel de Control Maestro (`_LOF Control Panel`)
En la barra flotante de control de la suite, Logic Algorithms dispone de **hasta 4 botones de acceso rápido configurables** (`Button 1`, `Button 2`, `Button 3`, `Button 4`):

* Cada botón puede vincularse a cualquiera de los 11 algoritmos (por ejemplo: Botón 1 = *Absorptions*, Botón 2 = *Imbalances*, Botón 3 = *Trapped Traders*, Botón 4 = *Unfinished Auctions*).
* Al hacer clic sobre ellos directamente en la pantalla, puedes activar o desactivar ese patrón específico al instante, permitiéndote mantener el gráfico despejado durante el análisis general y encender únicamente las confirmaciones necesarias al entrar en tu zona operativa.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "LOF_Algorithms")*: Identificador de la instancia dentro del espacio de trabajo.
* **`Instance Color`** *(Brush | Default: Cyan)*: Color de identificación en el panel de control maestro.
* **`Visuals Enabled`** *(Bool | Default: True)*: Interruptor maestro para encender o pausar el trazado visual de todas las señales simultáneamente.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*:
  * `BidAsk`: Modo profesional de máxima precisión. Requiere alimentación de datos tick a tick reales de mercado.
  * `UpDownTick`: Modo simulado basado en la variación del tick (utilizar solo si la fuente de datos no suministra Level 1 completo).
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Optimiza la tasa de refresco gráfico según la carga de tu ordenador. En gráficos estándar se recomienda `Disabled` o `Balanced`.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*: Ubicación de las señales respecto a las velas. `BehindPrice` sitúa las zonas detrás de las velas para mantener despejada la acción del precio.
* **`Priority (Offset)`** *(Int | Default: 0)*: Prioridad de renderizado frente a otros indicadores de la suite.
* **`Signals Margin (Ticks)`** *(Int | Default: 0)*: Separación en ticks entre los extremos de la vela y los marcadores exteriores (triángulos de agotamiento, marcas de atrapados).

### Grupo: Quick Buttons
* **`Button 1 Action` a `Button 4 Action`** *(Enum: None, Imbalances, Clusters, Exhaustion, Absorptions, UnfinishedAuctions, ZeroNodes, VolumeSpikes, WhaleBlocks, TrappedTraders, DeltaReversals, DeltaDivergences | Default: None)*:  
  Asigna qué algoritmo enciende o apaga cada uno de los 4 botones rápidos de la barra flotante.  
  * *Recomendación típica:* Botón 1 = `Imbalances`, Botón 2 = `Absorptions`, Botón 3 = `TrappedTraders`, Botón 4 = `UnfinishedAuctions`.

### Grupo: Imbalance Zones (Zonas de Desbalance)
* **`Show Imbalances`** *(Bool | Default: True)*: Activa la detección y trazado de desbalances apilados.
* **`Min Stacked Count`** *(Int | Default: 3 | Rango: 2 a 5)*: Número mínimo de niveles consecutivos de precio con desbalance diagonal para formar una zona institucional. `3` es el estándar más robusto de la industria.
* **`Use Ratio`** *(Bool | Default: True)*: Evalúa el desbalance mediante multiplicación diagonal ($Ask / Bid_{previo}$).
* **`Minimum Ratio (Diagonal)`** *(Double | Default: 3.1 | Rango: 2.5 a 4.0)*: Multiplicador requerido. Un valor de `3.1` exige que las compras superen al menos por 310% a las ventas diagonales opuestas.
* **`Min Volume (Ratio)`** *(Double | Default: 10)*: Filtro de volumen mínimo para evitar marcar desbalances en niveles con escasa liquidez (ej. 3 vs 0 contratos). En ES se sugiere `100` a `150`; en NQ `15` a `30`.
* **`Use Difference (Delta)`** *(Bool | Default: False)*: Evalúa el desbalance mediante resta absoluta de contratos en lugar de porcentaje.
* **`Minimum Difference`** *(Double | Default: 100)*: Contratos netos de diferencia para el cálculo por resta.
* **`Extend to Infinity`** *(Bool | Default: False)*: Si se activa, extiende las zonas rectangulares hacia la derecha indefinidamente hasta que el precio regrese a mitigarlas.
* **`Filter Mode (Infinite)`** *(Enum: None, LastXDays, CustomDate | Default: LastXDays)*: Evita sobrecargar el gráfico limitando la memoria de zonas a los últimos días seleccionados.
* **`Last X Days`** *(Int | Default: 5)*: Días hacia atrás para mantener vigentes las zonas no mitigadas.
* **`Ask Color (Demand) / Bid Color (Supply)`** *(Brush | Default: DodgerBlue / Crimson)*: Colores de las zonas de compra y venta.
* **`Zone Opacity`** *(Float | Default: 0.2f)*: Grado de transparencia de las franjas (20% por defecto).

### Grupo: Advanced Clusters
* **`Show Clusters`** *(Bool | Default: True)*: Activa las cajas de concentración de volumen dentro de la vela.
* **`Search Mode`** *(Enum: Volume, Ask, Bid, Delta | Default: Volume)*: Métrica que busca el algoritmo para trazar el clúster.
* **`Value Type`** *(Enum: Absolute, RelativePercent | Default: Absolute)*: Define si el umbral es una cantidad fija de contratos o un porcentaje del volumen total de la vela.
* **`Minimum Value`** *(Double | Default: 1000.0)*: Contratos mínimos requeridos en el tick para ser considerado clúster (en ES `1.000` a `2.500`; en NQ `150` a `400`).
* **`Candle Location`** *(Enum: Any, MidToHigh, MidToLow | Default: Any)*: Filtra la posición del clúster dentro de la estructura de la vela.
* **`Max Ticks from High / Low`** *(Int | Default: 999)*: Permite aislar clústeres que ocurran únicamente a menos de $N$ ticks del extremo superior o inferior.
* **`Min Delta Dominance (%)`** *(Double | Default: 0.0)*: Exige que el delta dentro del clúster domine al menos en el porcentaje indicado.
* **`Tick Grouping (Thickness)`** *(Int | Default: 1)*: Grosor en ticks del bloque del clúster.
* **`Box Color / Box Opacity / Box Width %`** *(Default: Aquamarine, 0.4f, 80%)*: Estilo visual de la caja.

### Grupo: Absorptions Finder (Detector de Absorción)
* **`Show Absorptions`** *(Bool | Default: False)*: Activa el buscador de absorciones pasivas institucionales.
* **`Min Ask/Bid`** *(Double | Default: 200)*: Volumen mínimo que debe ser ejecutado en el nivel para considerarse absorción potencial.
* **`Min Delta`** *(Double | Default: 100)*: Delta mínimo absorbido en el nivel.
* **`Max Displacement (Ticks)`** *(Int | Default: 5)*: Desplazamiento máximo de precio tolerado. Si el precio se desplaza más allá de estos ticks, no hubo absorción sino ruptura direccional.
* **`Validation Bars`** *(Int | Default: 1 | Rango: 1 a 3)*: Barras requeridas para aprobar la absorción. Con `1`, la siguiente vela debe cerrar en la dirección opuesta para confirmar la señal.
* **`Max Validation Displacement`** *(Int | Default: 5)*: Tolerancia máxima en ticks durante la barra de validación.
* **`Approved Ask / Bid Colors`** *(Default: MediumSpringGreen / DeepPink)*: Color de la señal cuando la absorción ha sido validada por el giro posterior.
* **`Active Ask / Bid Colors`** *(Default: Teal / DarkMagenta)*: Color preliminar mientras la absorción está en desarrollo.
* **`Strict Mode (Vol+Delta)`** *(Bool | Default: False)*: Exige que tanto el volumen total como el delta cumplan estrictamente y en simultáneo los umbrales configurados.

### Grupo: Exhaustion (Agotamiento)
* **`Show Exhaustion`** *(Bool | Default: False)*: Habilita el detector de secado de liquidez en extremos.
* **`Drying Threshold (Vol)`** *(Double | Default: 10.0)*: Contratos máximos permitidos en el extremo para considerarlo agotado (valores bajos indican ausencia de contraparte).
* **`Use Relative Vol (%)`** *(Bool | Default: False)*: Calcula el secado como un porcentaje del volumen medio de la vela.
* **`Candle Reversal Filter`** *(Bool | Default: False)*: Exige que la vela exhiba mecha de rechazo para validar la señal.
* **`Extreme High / Low Colors`** *(Default: Cyan / Magenta)*: Color del marcador en los extremos.

### Grupo: Unfinished Auctions (Subastas Inacabadas)
* **`Show Unfinished Auctions`** *(Bool | Default: True)*: Habilita la proyección de niveles con subasta abierta.
* **`Show Only Active (Naked)`** *(Bool | Default: True)*: Oculta automáticamente las líneas una vez que el precio las ha tocado y mitigado, manteniendo el gráfico limpio.
* **`Ask / Bid Colors`** *(Default: DodgerBlue / Crimson)*: Color de las líneas de proyección en máximos y mínimos.
* **`Opacity`** *(Float | Default: 0.5f)*: Transparencia de la línea proyectada.

### Grupo: Zero Nodes (Vacíos de Liquidez)
* **`Show Voids (Zero Nodes)`** *(Bool | Default: False)*: Destaca los niveles dentro del cuerpo con 0 contratos transados.
* **`Ignore Extremes (Wicks)`** *(Bool | Default: True)*: Ignora los ceros naturales en la punta exterior de las velas para centrarse en saltos dentro del cuerpo.

### Grupo: Volume Spikes (Picos Aislados)
* **`Show Volume Spikes`** *(Bool | Default: False)*: Habilita el detector de anomalías de volumen tick a tick.
* **`Neighbor Multiplier`** *(Double | Default: 5.0)*: Multiplicador de volumen respecto al promedio de los ticks vecinos superior e inferior (un valor de `5.0` exige que el nivel negocie 5 veces más volumen que sus vecinos contiguos).
* **`Min Volume`** *(Double | Default: 250.0)*: Filtro de volumen mínimo absoluto para el pico.

### Grupo: Whale Blocks (Bloques de Ballenas)
* **`Show Whale Blocks`** *(Bool | Default: False)*: Muestra ejecuciones individuales con un promedio alto de contratos por orden.
* **`Min Contracts/Order (Avg)`** *(Double | Default: 50.0)*: Promedio de contratos por transacción requerido (distingue órdenes institucionales agrupadas de órdenes minoristas fragmentadas).
* **`Min Volume`** *(Double | Default: 250.0)*: Filtro de volumen total acumulado en el bloque.

### Grupo: Trapped Traders (Operadores Atrapados)
* **`Show Trapped Traders`** *(Bool | Default: False)*: Activa las alertas de atrapamiento en extremos de la vela.
* **`Extreme Zone (%)`** *(Double | Default: 25.0 | Rango: 15% a 30%)*: Porcentaje de la vela considerado zona extrema (por ejemplo, el 25% superior o inferior).
* **`Min POC Volume`** *(Double | Default: 500.0)*: Volumen mínimo que debe contener el Point of Control atrapado en esa zona extrema.
* **`Bullish / Bearish Signal Colors`** *(Default: Lime / Red)*: Color del marcador visual de atrapamiento.

### Grupos: Delta Reversals & Delta Divergences
* **`Show Delta Reversals / Divergences`** *(Bool | Default: False)*: Activa el sombreado de fondo para estas dos condiciones estructurales.
* **`Min Extreme Delta`** *(Double | Default: 300.0)*: Delta mínimo contrario requerido para pintar una reversión de delta.
* **`Min Discordant Delta`** *(Double | Default: 200.0)*: Delta mínimo discordante con el nuevo extremo para pintar una divergencia.

---

## 4. Mejores Prácticas y Consejos de Trading

### A. La "Combinación de Oro": Absorción + Operador Atrapado
* Una de las configuraciones más sólidas consiste en esperar a que el precio alcance un nivel técnico clave (por ejemplo, un VAH de sesión o un máximo previo de alta importancia).
* **Señal de Entrada:** Si en ese nivel el indicador dibuja simultáneamente una **Caja de Absorción Aprobada** en la parte alta y una señal de **Trapped Traders (Compradores Atrapados)** con mecha de rechazo, el dinero institucional ha absorbido todas las compras de ruptura. Esto genera una oportunidad de entrada corta con stop ceñido por encima de la mecha y un ratio beneficio/riesgo altamente asimétrico.

### B. Operativa con Subastas Inacabadas (*Unfinished Auctions*)
* Las subastas inacabadas no son señales de entrada inmediata en contra de la tendencia; actúan como **imanes de precio (Take Profits)**.
* Si estás buscando compras tras una consolidación y observas una línea de *Unfinished Auction* abierta 15 ticks más arriba, utilízala como tu objetivo de salida principal. El mercado suele acelerar cuando se aproxima a estos niveles para liquidar y completar la subasta antes de revertir.

### C. Cómo evitar el ruido y no sobrecargar el gráfico
1. **No actives los 11 algoritmos al mismo tiempo:** Mantener todas las señales encendidas satura la pantalla. La mejor práctica es elegir **2 o 3 algoritmos complementarios** según tu estrategia:
   * *Para traders de continuación y tendencia:* `Imbalance Zones` (para operar retrocesos a zonas de soporte/resistencia) y `Advanced Clusters`.
   * *Para traders de reversión y giros en extremos:* `Absorptions Finder`, `Trapped Traders` y `Exhaustion`.
2. **Utiliza los 4 Quick Buttons:** Configura tus algoritmos favoritos en los botones rápidos del panel flotante. Esto te permite mantener el gráfico limpio y encender el detector de absorciones o desbalances solo cuando el precio llega a tu zona de interés operativo.
3. **Calibra los volúmenes según el instrumento:** Un umbral de `500` contratos en `Min POC Volume` funciona excelente en el E-mini S&P 500 (`ES`), pero no generará señales en el Nasdaq (`NQ`) o el Petróleo (`CL`), donde el volumen por tick es menor. En NQ, ajusta los filtros de volumen entre `100` y `250` contratos.

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Inspecciona el interior de cada vela para confirmar los desbalances y deltas detectados por los algoritmos.
* **[Logic BigTrades](/dashboard/docs/indicators/logic-bigtrades):** Monitorea las grandes ejecuciones de órdenes a mercado en tiempo real.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a guardar tus plantillas personalizadas de algoritmos y optimizar el rendimiento.
