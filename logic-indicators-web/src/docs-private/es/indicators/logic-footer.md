---
title: Logic Footer
description: Manual técnico y referencia del centro de telemetría de Order Flow y 27 métricas cuantitativas en NinjaTrader 8.
order: 2
category: indicators
---

# Logic Footer

> **Suite cuantitativa de telemetría y diagnóstico microestructural barra a barra para NinjaTrader 8.**  
> Calcula y desglosa en tiempo real hasta 27 métricas de volumen, delta acumulado, agresiones, absorciones y conteo de trades al pie de cada vela o mediante tarjetas flotantes.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

El indicador ofrece dos modalidades independientes y complementarias de presentación visual en pantalla:

### A. Modalidad 1: Fixed Footer (Pie Fijo en la Base)
* **Ubicación:** Se ancla en la parte inferior del panel de precios.
* **Alineación Vertical:** Cada columna de datos coincide de forma vertical con el ancho y la posición exacta de su vela en el gráfico.
* **Panel de Etiquetas:** Una columna lateral configurable a la izquierda o derecha que identifica con claridad el nombre abreviado de cada métrica activa.
* **Mapas de Calor de 5 Niveles:** Cada celda aplica gradientes térmicos automáticos que intensifican su color u opacidad según la relevancia estadística del valor frente al resto de la sesión.

### B. Modalidad 2: Floating DataBox (Caja Flotante en la Vela)
* **Ubicación:** Una tarjeta compacta anclada directamente por encima o por debajo de cada vela a una distancia regulable en ticks (`DataBox Distance`).
* **Propósito:** Permite seguir las métricas críticas inmediatas (como Delta y Volumen) sin desviar la mirada de la acción del precio.

---

## 2. Catálogo Exhaustivo de las 27 Métricas Cuantitativas

Logic Footer procesa el flujo de órdenes tick a tick para desglosar 27 métricas clasificadas en seis familias analíticas:

### Métricas de Volumen
1. **`Total Volume`:** Volumen total de contratos negociados en la barra.
2. **`Buy Volume`:** Volumen ejecutado al Ask (compradores agresivos barriendo el libro).
3. **`Sell Volume`:** Volumen ejecutado al Bid (vendedores agresivos barriendo el libro).
4. **`Cumulative Volume`:** Suma continua del volumen transado desde el inicio de la sesión.

### Métricas de Delta y Agresividad
5. **`Delta`:** Diferencia neta entre compras y ventas agresivas ($\text{Ask Vol} - \text{Bid Vol}$).
6. **`Delta %`:** Proporción porcentual del delta respecto al volumen total de la barra ($\text{Delta} / \text{Total Vol} \times 100$).
7. **`Ask %`:** Porcentaje de compras agresivas sobre el volumen total.
8. **`Bid %`:** Porcentaje de ventas agresivas sobre el volumen total.
9. **`Cumulative Delta`:** Suma continua del delta desde el inicio de la sesión.
10. **`Max Delta`:** El delta más alto alcanzado en cualquier momento de la vida de la vela.
11. **`Min Delta`:** El delta más bajo alcanzado en cualquier momento de la vida de la vela.
12. **`Delta Change`:** Variación neta de delta respecto a la vela inmediatamente anterior.

### Métricas Microestructurales y de Extremos (COT)
13. **`COT High` *(Commitment of Traders Since High)*:** Delta neto acumulado exclusivamente desde el instante en que la vela marcó su precio máximo. Un valor fuertemente negativo indica que entraron vendedores agresivos inmediatamente tras tocar el máximo.
14. **`COT Low` *(Commitment of Traders Since Low)*:** Delta neto acumulado exclusivamente desde el instante en que la vela marcó su precio mínimo. Un valor fuertemente positivo indica que entraron compradores agresivos inmediatamente tras tocar el mínimo.
15. **`Top Delta`:** Delta negociado exclusivamente en el tick superior de la vela.
16. **`Bottom Delta`:** Delta negociado exclusivamente en el tick inferior de la vela.
17. **`Cumulative Delta %`:** Porcentaje del delta acumulado respecto al volumen acumulado de la sesión.

### Métricas de Transacciones (Trades)
18. **`Total Trades`:** Cantidad total de transacciones individuales ejecutadas dentro de la barra.
19. **`Buy Trades`:** Cantidad de transacciones ejecutadas al Ask.
20. **`Sell Trades`:** Cantidad de transacciones ejecutadas al Bid.
21. **`Cumulative Trades`:** Total de transacciones acumuladas en la sesión.

### Métricas de Desbalance (Imbalances)
22. **`Imb (Ratio)`:** Cantidad de desbalances diagonales por ratio detectados en la barra.
23. **`Net Ratio`:** Desbalances compradores menos desbalances vendedores por ratio.
24. **`Imb (Diff)`:** Cantidad de desbalances por diferencia neta de contratos detectados.
25. **`Net Diff`:** Desbalance neto por diferencia en contratos.

### Métricas de Dimensión y Tiempo
26. **`Range (Ticks)`:** Amplitud vertical total de la vela medida en ticks desde el máximo hasta el mínimo.
27. **`Time (Duration)`:** Tiempo transcurrido en segundos para la formación completa de la barra (crucial para velas de volumen, ticks o rango).

---

## 3. Herramientas y Controles Interactivos

* **Botón `[FT]` en la barra flotante de la suite (`_LOF Control Panel`):**
  * Alterna instantáneamente la visibilidad del pie de página fijo (`Show / Hide Fixed Footer`) con un solo clic. Permite encender la tabla en momentos de toma de decisiones o apagarla para obtener máxima área de velas.
* **Auto-Alineación Dinámica:**
  * Al hacer zoom o desplazarse en el gráfico, tanto el Fixed Footer como el DataBox recalculan sus posiciones y anchos para mantener una alineación perfecta con cada barra.

---

## 4. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: Footer Graphics (Apariencia del Pie Fijo)
* **`Enable Fixed Footer`** *(Bool | Default: True)*: Habilita la tabla de pie de página en la base del gráfico.
* **`Auto-Fit Footer Scale`** *(Bool | Default: False)*: Adapta automáticamente la escala del gráfico para que las velas no se superpongan con el panel.
* **`Base Color Vol / Trades`** *(Brush | Default: Goldenrod)*: Color base para celdas de volumen y transacciones.
* **`Base Color Buy / Ask`** *(Brush | Default: Green)*: Color para métricas de agresión compradora.
* **`Base Color Sell / Bid`** *(Brush | Default: Crimson)*: Color para métricas de agresión vendedora.
* **`Footer Background Color`** *(Brush | Default: DimGray)*: Fondo de la tabla.
* **`Min / Max Opacity (%)`** *(Int | Default: 20% a 80%)*: Rango de transparencia para los mapas de calor de las celdas.
* **`Font Size`** *(Int | Default: 11)*: Tamaño de la tipografía para las cifras numéricas.
* **`Row Padding`** *(Int | Default: 2)*: Separación vertical interna entre filas.
* **`Show Footer Labels`** *(Bool | Default: True)*: Muestra u oculta la columna lateral con los nombres de las métricas.
* **`Footer Labels Position`** *(Enum: Left, Right, Hidden | Default: Left)*: Ubicación del panel de nombres.
* **`Footer Labels Width`** *(Float | Default: 90f)*: Ancho en píxeles asignado a la columna de nombres.
* **`Text Color Mode`** *(Enum: AutoContrast, CustomColor, SameAsCell | Default: AutoContrast)*:
  * `AutoContrast`: El texto conmuta automáticamente entre blanco y negro según la luminancia del fondo para asegurar una lectura perfecta.
* **`Enable Footer Heatmap`** *(Bool | Default: True)*: Enciende el gradiente térmico de fondo en las celdas.

### Grupo: Footer Metrics (Selección de Filas del Pie Fijo)
* Contiene **27 casillas de verificación booleanas** (`FooterShowVolTotal`, `FooterShowDelta`, `FooterShowMaxDelta`, `FooterShowCotHigh`, etc.) para encender o apagar de forma individual cada una de las 27 filas.

### Grupos: DataBox Graphics & DataBox Metrics (Caja Flotante)
* **`Enable Floating DataBox`** *(Bool | Default: False)*: Activa la tarjeta flotante adherida a cada vela.
* **`DataBox Distance (Ticks)`** *(Int | Default: 4)*: Separación en ticks entre el extremo de la vela y la caja.
* **`Fixed DataBox Width (%)`** *(Int | Default: 80)*: Ancho de la caja en relación con el espacio horizontal de la barra.
* **`DataBox Metrics`**: Casillas de verificación idénticas para seleccionar qué datos específicos aparecen dentro de la tarjeta flotante.

### Grupo: Max Value Scale Mode (Modo de Escala de Calor)
* **`Max Calculation Mode`** *(Enum: Off, CustomSession, VisibleBars, AllData, Manual | Default: CustomSession)*:  
  Define contra qué universo de datos se calculan los máximos del mapa térmico:
  * `CustomSession`: Normaliza los valores térmicos según los máximos registrados en el horario configurado en `Custom Session Start` y `End`.
  * `VisibleBars`: Normaliza el calor únicamente con las barras visibles en la pantalla actual.
  * `AllData`: Utiliza el historial completo cargado.
  * `Manual`: Respeta los valores numéricos fijos configurados en el grupo `Manual Value`.
* **`Scale Intensity (%)`** *(Int | Default: 100)*: Sensibilidad del gradiente de color.
* **`Reset Delta per Session`** *(Bool | Default: True)*: Reinicia el cómputo de delta acumulado al inicio de cada nueva sesión diaria.

### Grupos de Calor: Heatmap (Vol & Trades, Ask, Bid, Range & Time)
* Cada grupo dispone de **5 niveles de color configurables** (del Nivel 1 mínimo al Nivel 5 máximo) para colorear gradualmente las celdas según su magnitud cuantitativa.

### Grupo: Zoomed Out View (Nivel de Detalle - LOD)
* **`Hide Labels (Candle Width)`** *(Int | Default: 20)*: Ancho de vela en píxeles por debajo del cual se ocultan las etiquetas de texto.
* **`Hide DataBox (Candle Width)`** *(Int | Default: 50)*: Ancho por debajo del cual se apaga el DataBox flotante para evitar saturar la pantalla.
* **`Hide Footer (Candle Width)`** *(Int | Default: 10)*: Ancho mínimo para ocultar los números del pie fijo al hacer zoom out total.

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "LOF_Footer")*: Identificador en la suite.
* **`Instance Color`** *(Brush | Default: Cyan)*: Color identificativo en el panel de control maestro.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Mantener siempre en `BidAsk` para procesar órdenes reales.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Optimización de refresco visual.

---

## 5. Mejores Prácticas y Consejos de Trading

### A. La Tríada Clásica de Validación de Tendencia: Delta, Delta % y Max/Min Delta
Una vela con cuerpo amplio puede validarse o desmentirse observando tres datos del Footer:

1. **Validación de Vela Alcista Sana:**
   * La vela cierra verde en precio.
   * `Delta` es positivo y `Delta %` supera el `+20%`.
   * `Max Delta` es alto y `Min Delta` es prácticamente cero o insignificante.
   * **Interpretación:** Los compradores dominaron la subasta de principio a fin; no existió oposición vendedora. La tendencia tiene alta probabilidad de continuar.
2. **Detección de Agotamiento (Absorción Pasiva en Máximos):**
   * La vela cierra alcista con mecha superior.
   * `Delta` es muy bajo o negativo (ej. `-80`), a pesar de ser una vela verde en precio.
   * `Max Delta` fue de `+600`, pero terminó cerrando cerca de cero.
   * **Interpretación:** Hubo un intento agresivo de compra que fue absorbido por completo. Alerta inmediata de giro bajista o trampa de ruptura.

### B. Señales de Reversión con COT High y COT Low
* **COT High (En Máximos):** Si el precio ataca una resistencia y la métrica `COT High` marca un valor fuertemente negativo (ej. `-400` contratos en ES), significa que tan pronto como se marcó el precio más alto, los vendedores institucionales entraron a golpear el Bid agresivamente.
* **COT Low (En Mínimos):** Si tras tocar un soporte la métrica `COT Low` marca un valor fuertemente positivo (ej. `+500`), los compradores institucionales entraron inmediatamente al mercado agresivo, asegurando el suelo de la vela.

### C. Las 6 Métricas Esenciales Recomendadas para el Día a Día
Para no sobrecargar la pantalla con 27 filas, la configuración profesional estándar más eficiente consiste en activar únicamente estas 6 métricas en el **Fixed Footer**:
1. **`Total Volume`:** Esfuerzo total transado.
2. **`Delta`:** Resultado neto del balance comprador/vendedor.
3. **`Delta %`:** Fuerza relativa del sesgo institucional.
4. **`Max Delta`:** Máximo empuje comprador alcanzado.
5. **`Min Delta`:** Máximo empuje vendedor alcanzado.
6. **`Cumulative Delta`:** Dirección del flujo de fondo de la sesión.

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Inspecciona los niveles de precio exactos donde se distribuyeron los contratos del Footer.
* **[Logic Analytics](/dashboard/docs/indicators/logic-analytics):** Aísla consolidaciones y rangos dentro de cajas estadísticas de esfuerzo contra resultado.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a utilizar el botón `[FT]` del panel de control y a gestionar plantillas visuales en NinjaTrader 8.
