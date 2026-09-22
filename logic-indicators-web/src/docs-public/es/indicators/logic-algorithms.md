---
title: Logic Algorithms
description: Inteligencia automatizada de Order Flow que detecta giros, trampas y absorciones institucionales en tiempo real en NinjaTrader 8.
order: 7
category: indicators
public: true
---

# Logic Algorithms

> **Inteligencia automatizada de Order Flow que detecta giros, trampas y absorciones institucionales en tiempo real.**  
> *Deja de buscar patrones a ciegas en la cinta: 11 algoritmos escanean el flujo de órdenes tick a tick para proyectar desbalances, trampas y acumulaciones directamente sobre tus velas.*

---

## ¿Qué problema resuelve?

El análisis de Order Flow tradicional exige un esfuerzo visual y mental extremo:

1. **Sobrecarga de datos y fatiga mental:** Un gráfico de Footprint contiene cientos de números por vela. Intentar detectar al mismo tiempo si hay 3 desbalances apilados, si el delta divergió del precio, si hubo una absorción pasiva o si el volumen se secó en la mecha termina provocando parálisis por análisis y entradas tardías.
2. **Señales tardías con indicadores técnicos convencionales:** Los osciladores tradicionales (RSI, MACD, Estocástico) se calculan con medias del precio pasado; siempre van con retraso. Para cuando confirman un giro, el movimiento institucional ya ocurrió.
3. **Incapacidad de ver las trampas en tiempo real:** Los traders minoristas compran en las rupturas de máximos porque la vela se ve fuerte, sin advertir que en ese mismo tick los grandes participantes absorbieron todas las compras pasivamente y atraparon a la masa.

### La solución de Logic Algorithms

Automatiza por completo la lectura microestructural del mercado. Su motor algorítmico escanea cada contrato ejecutado y destaca de manera gráfica, limpia y personalizable los **11 eventos de subasta más rentables del trading profesional**: absorciones de órdenes límite, compradores y vendedores atrapados, subastas que quedaron abiertas y desbalances diagonales masivos.

---

## ¿Qué es exactamente el indicador?

**Logic Algorithms** es una estación completa de reconocimiento de patrones de Order Flow para NinjaTrader 8. Funciona como un copiloto cuantitativo que procesa la interacción entre las órdenes de compra y venta en cada nivel de precio y proyecta señales visuales intuitivas (zonas de soporte/resistencia dinámicas, cajas de absorción confirmadas, marcas de agotamiento y alertas de trampas) exactamente donde el dinero inteligente está tomando posiciones, liberando al trader de la necesidad de interpretar números minúsculos a gran velocidad.

---

## Características Principales

* **11 Algoritmos Institucionales en un Solo Indicador:** Consolida en una sola herramienta la detección de desbalances apilados, absorciones pasivas, traders atrapados, agotamiento en extremos, subastas inacabadas, divergencias de delta, reversiones intrayectorias, picos de volumen aislados, vacíos de liquidez y bloques de ballenas.
* **Sistema de Absorción con Confirmación en Dos Fases:** Algoritmo exclusivo que identifica cuándo un muro de órdenes límite frena el precio (*Fase Activa*) y confirma la señal únicamente cuando la siguiente vela valida el rechazo (*Fase Aprobada*), filtrando señales falsas en momentos de alta volatilidad.
* **Zonas de Desbalance Apilado con Extensión Automática:** Dibuja rectángulos dinámicos de oferta y demanda cuando se detectan 3 o más agresiones consecutivas, extendiéndolos hacia el futuro como soportes y resistencias institucionales hasta que el mercado los mitiga.
* **Detección Quirúrgica de Operadores Atrapados (*Trapped Traders*):** Alerta cuando el mayor volumen o el Point of Control (POC) de la vela se concentra en el 20%-25% extremo y el mercado cierra en sentido contrario, señalando liquidaciones forzadas inminentes.
* **4 Botones de Acción Rápida en Pantalla (*Quick Buttons*):** Permite anclar hasta 4 de tus algoritmos favoritos directamente en la barra flotante del gráfico para activarlos o desactivarlos con un solo clic según las condiciones del mercado.
* **Proyección de Subastas Inacabadas (*Unfinished Auctions*):** Marca los extremos exactos donde compradores y vendedores transaron en el último tick de la vela, proyectando niveles magnéticos a los que el precio suele regresar a completar el ciclo de subasta.
* **Máxima Fluidez Visual y Cero Congelamientos:** Diseñado para actualizarse de manera instantánea y limpia en velas de minutos, ticks, volumen o rango, optimizado para mantener 60 FPS estables sin provocar caídas de rendimiento en NinjaTrader 8.

---

## ¿Para qué perfil de trader es?

* **Scalpers y Day Traders de Futuros (ES, NQ, CL, GC, FDAX):** Que necesitan gatillos de entrada inmediatos y confirmaciones de rechazo sin tener que leer manualmente tablas numéricas densas.
* **Traders que operan con Velas Japonesas o de Rango:** Que no desean saturar su pantalla con gráficos de Footprint pero quieren aprovechar el 100% de la información del flujo de órdenes en su gráfico tradicional.
* **Operadores de Reversión y Caza de Trampas:** Que buscan operar en los extremos del mercado cuando las manos fuertes barren stops y atrapan a los participantes tardíos.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta los parámetros paso a paso, combinaciones estratégicas y guías de calibración por activo en el manual privado:

[Acceder al Manual Técnico de Logic Algorithms →](/dashboard/docs/indicators/logic-algorithms)
