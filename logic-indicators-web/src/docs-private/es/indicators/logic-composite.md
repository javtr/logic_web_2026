---
title: Logic Composite
description: Herramienta de Volume y TPO Profile de nivel macro. Dibuja perfiles manuales o ancla bloques históricos masivos al borde de la pantalla.
order: 4
category: indicators
---

# Logic Composite

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Composite** está diseñado para el análisis macro-estructural. Mientras que el Logic Profile estándar es perfecto para desgloses sesión por sesión, el Composite está construido para analizar bloques masivos de datos históricos o áreas de consolidación trazadas manualmente con alta precisión.

Los traders usan el Logic Composite para construir "Perfiles Compuestos" que abarcan múltiples días, semanas o incluso meses, fijándolos a un lado de la pantalla para identificar zonas históricas de soporte y resistencia que los perfiles intradiarios estándar simplemente no pueden ver.

## Componentes Principales

El motor Composite comparte la poderosa arquitectura de doble columna del Logic Profile, pero altera drásticamente cómo se enmarcan y anclan los datos a la pantalla:

1. **Macro Data Columns:** Muestra datos de Volumen, Delta o TPO (Market Profile). En lugar de adjuntarse a velas específicas, abarca un bloque masivo del gráfico.

2. **Anclaje Fijo en Pantalla:** Puedes bloquear el perfil en el borde **Izquierdo** (Left) o **Derecho** (Right) de tu pantalla para que permanezca visible mientras te desplazas por el gráfico.

3. **Área de Valor (VA) y POC:** Calcula el Point of Control y Value Area de nivel macro. Al analizar conjuntos de datos más grandes, estas líneas actúan como fronteras históricas mayores.

4. **Panel de Métricas (Metrics):** Un bloque de texto flotante opcional que resume el Volumen total, el Delta y el Rango de toda la estructura compuesta.

## Herramientas Interactivas (Barra superior y Ratón)

Logic Composite introduce un sistema de dibujo manual exclusivo, permitiéndote tratar los perfiles como herramientas de dibujo (similar a un retroceso de Fibonacci):

- **Draw (Dibujar):** Haz clic en este botón de la barra de herramientas, luego haz clic y arrastra horizontalmente en tu gráfico para trazar un perfil personalizado sobre un impulso o zona de consolidación específica. El perfil calculará instantáneamente el volumen dentro de esa caja.

- **Edit (Editar):** Habilita el Modo Edición. Puedes hacer clic y arrastrar los bordes izquierdo o derecho de cualquier perfil manual para ajustar su lapso de tiempo. Haz clic en la 'X' roja flotante sobre el perfil para eliminarlo.

- **Reset (Restaurar):** Elimina todos los dibujos manuales y restaura los perfiles automáticos predeterminados.

## Opciones de Configuración

### 1. Configuración General (General Settings)

- **Zero-Lag Engine Mode:** Controla la velocidad de renderizado para optimizar el uso de CPU al calcular perfiles históricos masivos. Usa **Balanced** o **Max Performance** si estás calculando meses de datos.

- **Layer Mode & Priority:** Define si el composite se sitúa detrás de las velas del precio, delante de ellas, o por encima de todo (**TopMost**).

### 2. Configuración del Composite (Composite Settings)

Esta es la sección más importante, define *qué* datos analiza el perfil:

- **Range Mode:** 

  - **VisibleBars:** Calcula un perfil dinámicamente usando SOLAMENTE las velas visibles actualmente en tu pantalla. Se transforma a medida que haces scroll.

  - **AllLoadedBars:** Calcula un perfil masivo usando todas y cada una de las velas cargadas en el gráfico.

  - **DaysBack / WeeksBack / MonthsBack:** Genera un perfil que abarca los últimos X periodos.

  - **ManualDraw:** Apaga completamente los perfiles automáticos y solo calcula los perfiles que dibujes a mano usando el botón Draw.

- **Periods Back:** Trabaja en conjunto con la configuración de Días/Semanas/Meses (ej. configurado en 5 Días Atrás).

- **Total Width & Margin (Pixels):** Define exactamente qué tan ancho debe ser el perfil fijo en tu pantalla, y qué tan lejos del borde debe flotar.

- **Alignment:** Fija el composite al lado **Izquierdo** o **Derecho** de tu monitor.

### 3. Multiplicadores y Compresión (Multipliers)

- **Tick Multiplier:** Comprime los datos. Para perfiles macroscópicos (ej. 3 meses de datos de ES), se recomienda encarecidamente un multiplicador de 10 o 20 para suavizar la forma y evitar la sobrecarga de la CPU.

### 4. C1 & C2 General (Configuración de Columnas)

Al igual que el Logic Profile, tienes dos columnas independientes:

- **Profile Type:** Elige entre **Volume**, **Delta**, **TPO**, **VolumeAndDelta**, etc.

- **Column Width & Fill Percentage:** Ajusta el grosor de la columna en tu pantalla.

- **Highlight Open/Close:** Coloca marcadores visuales en los precios de apertura y cierre del rango compuesto.

### 5. Sub-Componentes (VP, Delta, TPO, VA, POC, Frame)

Para cada columna, puedes configurar la lógica de dibujo interna:

- **Draw Style:** Elige entre barras tradicionales (**Bars**) o polígonos suaves (**Geometry**).

- **Alignment:** Puedes voltear el perfil (ej. hacer que las barras de Volumen crezcan de Derecha a Izquierda para apuntar hacia el precio).

- **Líneas y Extensiones (VA & POC):** Puedes configurar las líneas del POC y VA para que se extiendan hasta el borde de la **Column**, abarquen toda la **CompositeBox**, o disparen a través de todo el gráfico hasta **ScreenLeft**.

- **Frame & Background:** Dibuja una caja sólida y semitransparente detrás del composite para que no se pierda visualmente si se superpone con las velas del precio.

### 6. Métricas (Metrics)

- **Enable Metrics:** Muestra un bloque de texto que detalla las estadísticas exactas del perfil macro.

- **Block Position:** Fija el bloque de texto en la parte Superior (**Top**) o Inferior (**Bottom**) de la estructura compuesta.

- **Show...:** Enciende u oculta individualmente métricas como Volumen Total, Delta, Rango, Delta Máximo y precios específicos de POC/VAH.

## Mejores Prácticas y Tips

- **El Perfil Visible Dinámico:** Configura tu *Range Mode* en **VisibleBars**, alinea el composite a la Izquierda (**Left**), y establece la opacidad del *Frame Background* al 10%. A medida que te desplazas hacia la izquierda y derecha por tu gráfico, el perfil se actualizará al instante, dándote una lectura perfecta de la estructura que estás viendo en ese momento.

- **Usa el Modo Manual para Análisis de Swings:** Cambia el *Range Mode* a **ManualDraw**. Siempre que el mercado entre en un rango estrecho o consolidación, haz clic en **Draw** en la barra de herramientas y arrastra una caja sobre ella. Verás instantáneamente dónde está atrapado el volumen pesado (el POC) dentro de esa caja, prediciendo dónde podría originarse la ruptura.

- **Optimización de Datos Pesados:** Si estás usando **AllLoadedBars** en un gráfico de 1-Minuto con 100 días de historia, aumenta tu **Tick Multiplier** a 10. Esto comprime los datos y mantiene a NinjaTrader funcionando sin problemas ni bloqueos.

## Ver también

- [Logic Profile](/docs/indicators/logic-profile) — El generador estándar de perfiles sesión por sesión.

- [Logic Footprint](/docs/indicators/logic-footprint) — Haz zoom para ver la distribución exacta del volumen dentro de las velas individuales.
