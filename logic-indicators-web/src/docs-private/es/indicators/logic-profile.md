---
title: Logic Profile
description: Generador avanzado de Volume Profile, Delta Profile y TPO (Market Profile) con periodos de sesión personalizados.
order: 3
category: indicators
---

# Logic Profile

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Profile** es una herramienta de gráficos de grado institucional que mapea el volumen operado, el delta y el tiempo (TPO) a través de niveles de precios específicos durante un período determinado. En lugar de ver solo lo que sucedió dentro de una sola vela, puedes observar el proceso de subasta macroscópico a lo largo de una sesión completa, una semana, o un área trazada manualmente.

Al identificar el Punto de Control (POC), el Área de Valor (VA) y el Balance Inicial (IB), los traders pueden determinar exactamente dónde encontró el mercado su valor justo y en qué niveles es probable que los participantes institucionales defiendan sus posiciones en el futuro.

## Componentes Principales

Logic Profile utiliza un potente sistema de múltiples columnas. Cada perfil puede mostrar hasta 2 columnas distintas lado a lado (por ejemplo, un perfil TPO a la izquierda y un Volume Profile a la derecha).

1. **Volume & Delta Profiles:** Mapea el volumen total o el delta neto operado en cada precio. Puede dibujarse como barras horizontales tradicionales (**Bars**) o como una forma geométrica sólida y suave (**Geometry**).

2. **TPO (Market Profile):** "Time Price Opportunity". Mapea cuánto *tiempo* pasó el mercado en un nivel de precio. Puede visualizarse usando **Letters** (Letras), **Blocks** (Bloques), o ambos.

3. **Área de Valor (VAH / VAL):** Resalta el rango de precios donde se concentró un porcentaje específico (generalmente el 70%) del volumen o tiempo.

4. **Point of Control (POC):** El nivel de precio único con el mayor volumen absoluto o tiempo invertido.

5. **Initial Balance (IB):** Una línea vertical que marca el rango de precios establecido durante los primeros X minutos de la sesión (ej. los primeros 60 minutos).

6. **Extremos High/Low:** Marca el techo y suelo absoluto de la sesión del perfil.

## Herramientas Interactivas (Barra superior y Ratón)

Logic Profile es altamente interactivo. Puedes manipular perfiles directamente en tu gráfico:

- **Draw (Dibujar):** Haz clic en la barra de herramientas para trazar manualmente un perfil personalizado sobre cualquier consolidación o impulso del precio.

- **Edit (Editar):** Habilita el Modo Edición. Puedes arrastrar los bordes de cualquier perfil para expandir/reducir su rango de tiempo, o hacer clic en la 'X' para eliminarlo.

- **Menú Contextual (Clic Derecho):** Haz clic derecho en el fondo de *cualquier* perfil para abrir un potente menú oculto:

  - **Fusionar Izquierda / Derecha:** Une el perfil seleccionado con el adyacente, recalculando todo el volumen y los TPOs en un solo perfil masivo.

  - **Modo Split TPO:** Separa instantáneamente un perfil TPO en bloques individuales de 30 minutos para ver claramente la estructura intradiaria.

  - **Extender Líneas (Naked / Infinity):** Dispara automáticamente las líneas del POC, Área de Valor o High/Low hacia el futuro. El modo **Naked** cortará la línea de forma automática en el instante exacto en que el precio futuro la toque (mitigación).

## Opciones de Configuración

### 1. Configuración General y de Perfil (Profile Settings)

- **Session Mode:** Elige **Continuo** para usar los cortes de sesión estándar de NinjaTrader, o **Custom** para definir tus propias horas de inicio y fin del día.

- **Profile Period:** Define la vida útil de los perfiles automáticos. Las opciones son diario (**Daily**), semanal (**Weekly**) o mensual (**Monthly**).

- **Historical Load Speed:** Para optimizar los tiempos de carga en gráficos inmensos, puedes agrupar ticks. *Nota: Los modos rápidos deshabilitarán los cálculos precisos de Delta Bid/Ask.*

- **Merge Overlapping Profiles:** Si dos perfiles manuales se superponen en el tiempo, se fusionarán automáticamente en uno solo.

### 2. Multiplicadores (Multipliers)

- **Tick Multiplier:** Agrupa múltiples ticks en una sola fila para hacer el perfil más suave y reducir el ruido visual (ej. ajusta a 4 en ES, o 10 en NQ).

### 3. Column 1 & Column 2 General

Tienes dos columnas independientes para construir tu estructura de perfil.

- **Profile Type:** Selecciona qué datos contendrá la columna: **Volume**, **Delta**, **TPO**, **VolumeAndDelta**, etc.

- **Column Width & Fill Percentage:** Ajusta qué tan ancha es la columna en la pantalla y cuánto espacio interno tienen permitido ocupar las barras o letras.

- **Highlight Open/Close:** Coloca marcadores visuales en el precio exacto donde la sesión del perfil abrió y cerró.

### 4. Sub-Componentes (VP, Delta, TPO, VA, POC, Initial Balance)

Para cada columna, puedes configurar de forma independiente:

- **Draw Style:** Alterna entre barras de histograma (**Bars**) o polígonos suaves (**Geometry**).

- **Alignment:** Ancla el perfil a la izquierda (**Left**) o derecha (**Right**).

- **Colores y Opacidad:** Control total sobre la opacidad del relleno, bordes y colores de mapas de calor (Heatmaps).

- **Stacked Mode (VP):** Si se activa, los Volume Profiles mostrarán el volumen Ask y Bid separados por colores dentro de la misma barra horizontal.

- **Líneas y Extensiones:** Para el VA, POC y High/Low, puedes definir el estilo de línea (Sólida, Punteada), grosor, y si la línea se extiende hasta el borde de la columna (**Column**), todo el perfil (**Profile**), o hasta el siguiente perfil (**NextProfile**).

- **Initial Balance:** Ajusta la duración (ej. 60 minutos) y el desplazamiento visual de la línea vertical del IB.

## Mejores Prácticas y Tips

- **El Setup de POC Naked:** Usa el menú de Clic Derecho para establecer el POC de una sesión en modo **Naked**. Esto dibujará una línea hacia el futuro que actúa como un poderoso objetivo magnético para el día siguiente. La línea se eliminará automáticamente en el momento en que el precio la toque.

- **Split TPO para Contexto:** Si un perfil TPO Diario parece una mancha desordenada, haz Clic Derecho sobre él y selecciona **Full Split**. Esto desglosa el día en columnas de letras de 30 minutos, permitiéndote ver exactamente cuándo y dónde ocurrieron los cambios de control institucional.

- **Dominio de Doble Columna:** Usa la Columna 1 como un perfil **TPO** (alineado a la izquierda) para comprender la estructura del mercado y el tiempo, y usa la Columna 2 como un perfil de **Volume** (alineado a la derecha, superpuesto) para ver dónde se ejecutó el volumen pesado.

## Ver también

- [Logic Footprint](/docs/indicators/logic-footprint) — Haz zoom para ver la distribución exacta del volumen dentro de las velas individuales.

- [Logic Analytics](/docs/indicators/logic-analytics) — Observa desgloses matemáticos y desviaciones estándar de áreas personalizadas.
