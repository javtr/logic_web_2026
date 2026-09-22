---
title: Logic Analytics
description: Manual técnico y referencia del laboratorio cuantitativo de Esfuerzo vs. Resultado y cajas analíticas en NinjaTrader 8.
order: 6
category: indicators
---

# Logic Analytics

> **Laboratorio cuantitativo de diagnóstico microestructural y estadístico para NinjaTrader 8.**  
> Aísla cualquier fragmento de la acción del precio dentro de cajas interactivas para auditar el volumen, la curva continua de delta acumulado y las anomalías de esfuerzo contra resultado mediante desviación estándar.

---

## 1. Componentes Visuales en el Gráfico y su Interpretación

Cada caja analítica trazada en el gráfico se estructura en tres niveles analíticos complementarios:

### 1. Marco Principal y Nodos de Control Táctil
* **Sombreado y Borde de la Caja:** Delimita visualmente el rango temporal (eje X) y el rango de precios (eje Y) seleccionado para el estudio.
* **Nodo Izquierdo (`HitBoxLeft`):** Permite hacer clic y arrastrar con el ratón el punto de inicio de la caja hacia velas anteriores o posteriores.
* **Nodo Derecho (`HitBoxRight`):** Permite extender o acortar el límite final de la caja hacia velas presentes o futuras con recálculo instantáneo.
* **Botón de Cierre `[X]`:** Ubicado en la esquina superior para eliminar la caja del gráfico y del almacenamiento en disco con un solo clic.
* **Selector de Resaltado `[Highlight]`:** Alterna modos cromáticos locales (`Global`, `Off`, `Long`, `Short`, `Both`) para colorear velas específicas dentro de la caja que exhiban actividad anómala de Order Flow.

### 2. Sub-Panel 1: Histograma de Volumen Intra-Caja (`ShowVolumePanel`)
* **Qué dibuja:** Un histograma con las barras de volumen negociado correspondientes a cada una de las velas encerradas dentro de la caja.
* **Interpretación:** Permite evaluar rápidamente si el volumen decrece a medida que se desarrolla el rango (comportamiento típico de una acumulación/consolidación sana) o si emergen picos repentinos de absorción institucional.

### 3. Sub-Panel 2: Curva de Delta Acumulado (`ShowDeltaPanel`)
* **Qué dibuja:** Una curva continua que calcula la suma algebraica del delta barra a barra desde el inicio exacto de la caja. El área bajo la curva se colorea en **verde** cuando el delta acumulado neto es positivo (presión compradora) y en **rojo** cuando es negativo (presión vendedora).
* **Interpretación:** Herramienta clave para diagnosticar absorciones. Si el precio dentro de la caja se mantiene lateral pero la curva de delta cae fuertemente en negativo, los compradores pasivos están absorbiendo todas las órdenes de venta a mercado (acumulación oculta previa a una subida).

### 4. Sub-Panel 3: Panel de Estadísticas Cuantitativas (`ShowStatsPanel`)
* **Qué despliega:** Cuatro columnas matemáticas que calculan la media y la dispersión estadística dentro del rango:
  * **Volume:** Volumen promedio por vela ($\text{VolAvg}$) y Umbral de Alerta ($\text{VolAvg} + 1\text{ Desviación Estándar}$).
  * **Delta+:** Promedio de las barras con delta comprador y su umbral superior.
  * **Delta-:** Promedio de las barras con delta vendedor y su umbral inferior.
  * **Range:** Rango promedio en ticks de las velas y su umbral de expansión de volatilidad.
* **Interpretación:** Cualquier barra que supere la línea de umbral ($\mu + 1\sigma$) representa una **anomalía estadística objetiva**: allí ocurrió una inyección de esfuerzo institucional fuera de los parámetros habituales.

---

## 2. Herramientas y Controles Interactivos

* **Botón `[Draw]` en el panel de control de la suite (`LOF_Configuration`):**
  * Al hacer clic sobre `[Draw]`, el cursor entra en modo de dibujo analítico.
  * Haz un clic en la vela inicial y un segundo clic en la vela final para generar la caja al instante sobre el gráfico.
* **Redimensionamiento Táctil en Vivo:**
  * Haz clic sobre los bordes laterales de la caja para arrastrar y ajustar el rango con el ratón. Todas las estadísticas, el histograma y la curva de delta se recalculan de inmediato al soltar el cursor.
* **Eliminación con un Clic:**
  * Haz clic en el icono `[X]` en la esquina de la caja para retirarla del gráfico permanentemente.
* **Persistencia Total en Disco:**
  * Todas las cajas dibujadas a mano se guardan en un archivo de configuración local. Puedes cambiar la temporalidad del gráfico, cerrar NinjaTrader 8 o reiniciar tu PC sin perder tus análisis.

---

## 3. Opciones de Configuración (Parámetro por Parámetro)

### Grupo: Auto Box Settings (Cajas Automáticas Programadas)
* **`1. Enable Auto Box`** *(Bool | Default: False)*:  
  Genera automáticamente una caja analítica todos los días en la franja horaria programada, sin necesidad de trazarla manualmente.  
  * *Recomendación:* Activar en `True` si operas metódicamente el Opening Range o la primera hora de sesión.
* **`2. Start Time (HH:mm)`** *(String | Default: "09:30")*:  
  Hora exacta de inicio de la caja en formato de 24 horas (ej. `09:30` para la apertura de Nueva York, o `08:00` para Londres).
* **`3. End Time (HH:mm)`** *(String | Default: "10:30")*:  
  Hora de cierre de la caja automática (ej. `10:30` para cubrir los primeros 60 minutos del Initial Balance).

### Grupo: Graphic Settings (Personalización Visual y Paneles)
* **`Box Background`** *(Brush | Default: Silver)*: Color de fondo de la caja analítica.
* **`Background Opacity`** *(Int | Default: 15 | Rango: 5 a 100)*: Opacidad del fondo de la caja (un 15% mantiene el gráfico limpio sin tapar la acción del precio).
* **`Box Border`** *(Brush | Default: DodgerBlue)*: Color del marco exterior de la caja.
* **`Volume Color`** *(Brush | Default: Goldenrod)*: Color de las barras del histograma de volumen.
* **`Positive Delta Color`** *(Brush | Default: MediumSeaGreen)*: Color asignado a la curva y métricas de presión compradora.
* **`Negative Delta Color`** *(Brush | Default: Red)*: Color asignado a la curva y métricas de presión vendedora.
* **`Text Color`** *(Brush | Default: Silver)*: Color de las etiquetas y valores numéricos en los paneles de texto.
* **`Font Size`** *(Int | Default: 12)*: Tamaño de la tipografía para las métricas estadísticas.
* **`Abbreviate Values (K, M)`** *(Bool | Default: False)*: Si es `True`, abrevia números grandes para facilitar la lectura rápida (ej. `1.5K` en vez de `1500`, o `2.3M` en vez de `2300000`).
* **`Show Volume Panel`** *(Bool | Default: True)*: Activa o desactiva el sub-panel de histograma de volumen.
* **`Show Delta Panel`** *(Bool | Default: True)*: Activa o desactiva la curva de Delta Acumulado.
* **`Show Statistics Panel`** *(Bool | Default: True)*: Activa o desactiva las 4 columnas de desviación estándar en la base de la caja.
* **`Volume Box Height (px)`** *(Int | Default: 0)*: Altura en píxeles del panel de volumen (si es 0, se autoajusta de forma proporcional).
* **`Delta Box Height (px)`** *(Int | Default: 80)*: Altura en píxeles asignada a la curva de Delta Acumulado.
* **`Stats Box Height (px)`** *(Int | Default: 80)*: Altura en píxeles asignada a la tabla de estadísticas cuantitativas.
* **`Histogram Internal Margin (%)`** *(Int | Default: 10)*: Margen vertical interno para que las barras del histograma no toquen los bordes.
* **`Width: Match Candle`** *(Bool | Default: False)*: Si es `True`, el ancho de cada barra del histograma se sincroniza exactamente con el ancho de las velas del gráfico.
* **`Width: Percentage (%)`** *(Int | Default: 80)*: En caso de no sincronizar con las velas, porcentaje de ancho asignado a cada barra del histograma.

### Grupo: General Settings
* **`Instance Name`** *(String | Default: "Logic Analytics")*: Identificador de la instancia en el panel de control.
* **`Instance Color`** *(Brush | Default: Cyan)*: Color de identificación en la barra de control maestro.
* **`Visuals Enabled`** *(Bool | Default: True)*: Interruptor maestro para encender o pausar el renderizado de todas las cajas sin perder los datos guardados.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Modalidad de cálculo de los ticks. Mantener siempre en `BidAsk` para obtener datos de delta reales de mercado.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Regula la cadencia de refresco gráfico. En operativas normales, `Disabled` o `Balanced` ofrece la máxima fluidez.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Posición de capa respecto a las velas. `Normal` permite interactuar con los nodos de la caja sin que queden ocultos detrás del precio.
* **`Priority (Offset)`** *(Int | Default: 0)*: Prioridad de renderizado frente a otros indicadores de la suite.

---

## 4. Mejores Prácticas y Consejos de Trading

### A. Diagnóstico de Esfuerzo vs. Resultado (Lógica Wyckoff con Delta)
Uno de los usos más potentes de **Logic Analytics** es evaluar si el esfuerzo de los participantes produce el resultado esperado:
* **Escenario de Absorción / Acumulación:** Si encierras un rango lateral donde el precio no avanza y observas que la **Curva de Delta se hunde profundamente en negativo (vendedores agresivos atacando)**, pero el precio se niega a romper el suelo de la caja, estás ante una **absorción pasiva institucional**. Las manos fuertes están comprando todas las ventas con órdenes límite. La salida de la caja al alza tiene una altísima probabilidad de éxito.
* **Escenario de Agotamiento de Ruptura:** Si el precio intenta romper el techo de la caja pero la curva de delta se aplana o cae, la ruptura carece de respaldo institucional y es propensa a fallar en forma de trampa.

### B. El Filtro Cuantitativo de la Desviación Estándar ($\mu + 1\sigma$)
* No todas las barras con volumen merecen tu atención. Observa la columna **Volume** y la columna **Delta+ / Delta-** en el panel estadístico de la caja.
* Cuando una vela en particular supera el umbral marcado como **Threshold** ($\text{Promedio} + 1\text{ Desviación Estándar}$), esa vela representa una **barra de anomalía**. Si esa anomalía coincide con el testeo de un extremo de la caja (techo o suelo), tienes una confirmación matemática de que el dinero institucional intervino en ese nivel.

### C. Estrategia con Auto Box: El Initial Balance (09:30 a 10:30)
1. Activa `Enable Auto Box` con inicio a las `09:30` y fin a las `10:30`.
2. Todos los días a las 10:30 tendrás automáticamente calculado el rango de la primera hora de Nueva York.
3. Observa el valor final del Delta Acumulado en el encabezado de la caja:
   * Si el delta terminó fuertemente positivo y el precio cotiza por encima del techo de la caja, el sesgo del día es predominantemente alcista (*Trend Day*). Busca compras en los retrocesos al techo de la caja.
   * Si el delta terminó fuertemente negativo y el precio cotiza por debajo del suelo, busca ventas de continuación.
   * Si el delta es cercano a cero y el precio oscila en el centro de la caja, el día es de rango (*Rotational Day*); opera reversiones entre los extremos de la caja.

### D. Consejos de Orden Visual en el Gráfico
* Para no sobrecargar la vista si tienes múltiples cajas manuales abiertas, puedes apagar selectivamente sub-paneles secundarios (por ejemplo, desactivar `Show Volume Panel` y dejar únicamente la `Curva de Delta` y el `Panel de Estadísticas`).
* Utiliza el botón `[X]` de cada caja para borrarla una vez que la estructura ha sido rota y superada por el mercado, manteniendo tu espacio de trabajo despejado y enfocado en la acción actual del precio.

---

## Siguientes Pasos y Herramientas Relacionadas

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Visualiza la distribución interna de compras y ventas tick a tick dentro de cada vela.
* **[Logic BigTrades](/dashboard/docs/indicators/logic-bigtrades):** Detecta las órdenes a mercado institucionales de gran tamaño dentro de tu caja analítica.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a utilizar el panel maestro `LOF_Configuration` y a gestionar tus plantillas en NinjaTrader 8.
