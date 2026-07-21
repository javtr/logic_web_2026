---
title: Logic Algorithms
description: Suite avanzada de reconocimiento de patrones de Order Flow que detecta Desequilibrios, Absorciones, Agotamientos y más.
order: 7
category: indicators
---

# Logic Algorithms

> Si todavía no instalaste la suite de Logic Indicators, consultá la [Guía de instalación](/docs/installation) primero.

El indicador **Logic Algorithms** es la herramienta definitiva de reconocimiento de patrones micro-estructurales para traders de Order Flow. En lugar de mirar fijamente un gráfico footprint intentando detectar manualmente la actividad institucional oculta, este indicador escanea automáticamente la cinta y dibuja marcadores visuales precisos directamente en tu gráfico.

Ya sea que busques traders atrapados, bloques agresivos de "ballenas" o absorciones pasivas, Logic Algorithms traduce la compleja data tick-a-tick en figuras visuales simples y procesables.

## Componentes Principales

Este indicador agrupa 11 algoritmos de detección independientes. Cada algoritmo dibuja un marcador visual específico en tu gráfico cuando se activa:

1. **Imbalance Zones (Desequilibrios):** Dibuja rectángulos semitransparentes proyectados hacia adelante cuando los compradores agresivos superan a los vendedores (o viceversa) en diagonal.

2. **Advanced Clusters:** Resalta niveles de precio específicos dentro de una vela donde se concentró un volumen o delta masivo (Caja interna).

3. **Exhaustion (Agotamiento):** Coloca un Triángulo en el extremo (máximo/mínimo) de una vela cuando el volumen se seca por completo, señalando falta de interés.

4. **Absorption Finder:** Identifica cuándo las órdenes agresivas a mercado son absorbidas por órdenes pasivas limitadas de gran tamaño (Caja con una Flecha Institucional).

5. **Unfinished Auctions (Subastas Incompletas):** Extiende una línea sólida desde el extremo de una vela si la subasta en ese precio no se completó adecuadamente (Naked POCs / Bid-Ask extremos).

6. **Zero Nodes (Nodos Cero):** Resalta niveles de precio donde el volumen operado fue cero (vacíos), actuando como zonas magnéticas (Caja delgada).

7. **Volume Spikes:** Detecta ticks aislados con un volumen anormalmente alto en comparación con sus vecinos inmediatos (Marcador de Diamante).

8. **Whale Blocks (Bloques Ballena):** Encuentra órdenes institucionales individuales masivas o promedios de tamaño de orden inusualmente altos (Marcador de Círculo).

9. **Trapped Traders (Traders Atrapados):** Resalta el extremo de una vela con un Cuadrado cuando un gran volumen queda atrapado en el lado equivocado de una reversión del precio.

10. **Delta Reversals (Reversiones de Delta):** Colorea el fondo del gráfico cuando una vela se mueve en una dirección pero el delta se revierte bruscamente al final.

11. **Delta Divergences (Divergencias de Delta):** Colorea el fondo cuando la dirección de cierre de la vela contradice completamente el delta general.

## Herramientas Interactivas (Barra superior)

Para evitar la saturación en el gráfico, Logic Algorithms incluye una barra de "Botones Rápidos" totalmente personalizable:

- **Quick Buttons (1 a 4):** Puedes asignar cualquiera de los 11 algoritmos a estos cuatro botones. Esto te permite encender o apagar patrones específicos al instante con un solo clic, sin tener que abrir la configuración del indicador.

## Opciones de Configuración

Debido al enorme alcance de este indicador, la configuración está dividida en categorías específicas para cada algoritmo:

### 1. Configuración General (General Settings)

- **Zero-Lag Engine Mode:** Controla la tasa de refresco gráfico para ahorrar CPU. Las opciones son **Smooth**, **Balanced**, **Max Performance** o **Disabled** (tiempo real). Mantenelo en **Balanced** para un rendimiento óptimo.

- **Signals Margin (Ticks):** Ajusta qué tan lejos del extremo de la vela se dibujan las figuras (como los triángulos de Exhaustion o los cuadrados de Trapped).

### 2. Configuración por Algoritmo

Cada algoritmo tiene su propio menú dedicado (ej. *Imbalance Zones*, *Exhaustion*, *Absorptions Finder*) donde puedes configurar los umbrales matemáticos y colores:

- **Enable/Show Toggle:** Enciende o apaga el algoritmo de forma global.

- **Volume / Delta Thresholds:** Define el mínimo de contratos o delta requerido para disparar la señal.

- **Filter Modes:** Aplica filtros estrictos como la dirección de la vela, filtros de atenuación (fading) o un mínimo de ticks de desplazamiento para validar una absorción.

- **Visuales:** Personaliza completamente los Colores, Opacidad, Ancho de la caja (alineación **Left**, **Center**, **Right**) y grosor del borde para cada patrón individual.

### 3. Configuración de Botones Rápidos (Quick Buttons)

- **Button 1 to 4:** Selecciona qué algoritmo (ej. **Imbalances**, **Absorptions**, **TrappedTraders**) quieres vincular a la barra superior para acceso rápido. Selecciona **None** para ocultar el botón.

## Mejores Prácticas y Tips

- **Menos es Más:** No enciendas los 11 algoritmos al mismo tiempo. El gráfico se volverá ilegible. Enfócate en 2 o 3 patrones que se adapten a tu estrategia operativa (ej. Exhaustions + Absorptions si operas reversiones).

- **Usa los Botones Rápidos:** Asigna tus patrones favoritos a los Quick Buttons. Mantén tu gráfico limpio y enciende los algoritmos SOLO cuando el precio se acerque a tus zonas clave de soporte/resistencia para buscar confirmación.

- **El Contexto manda:** Una señal aislada (como un Imbalance) en medio de un rango suele ser ruido. Combina estas señales con el contexto de temporalidades mayores (como Volume Profiles) para obtener entradas de alta probabilidad.

## Ver también

- [Logic Footprint](/docs/indicators/logic-footprint) — Análisis de Order Flow por vela para ver el interior de los algoritmos.

- [Logic BigTrades](/docs/indicators/logic-bigtrades) — Detección dedicada de grandes bloques institucionales.
