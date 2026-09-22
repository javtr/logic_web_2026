---
title: Logic Depth Live
description: Visualización continua de libro de órdenes HD estilo Bookmap con microestructura sub-milisegundo en NinjaTrader 8.
order: 9
category: indicators
public: true
---

# Logic Depth Live

> **Resumen público** — para acceder al manual técnico completo (todos los parámetros de NinjaTrader 8, opciones de configuración y mejores prácticas), [inicia sesión en tu cuenta](/login?next=/dashboard/docs/indicators/logic-depth-live).

## ¿Qué problema resuelve?

Para el scalper de alta velocidad y el operador de subasta profesional, el gráfico tradicional de velas presenta un defecto crítico: **la compresión del tiempo oculta la verdad microestructural**.

1. **La ceguera dentro de la vela:** En una vela de 1 minuto que recorre 15 puntos pueden haber ocurrido miles de ejecuciones a nivel de microsegundo. Una vela solo muestra cuatro datos (Apertura, Máximo, Mínimo y Cierre), pero oculta completamente la interacción interna: ¿se barrió el libro agresivamente o hubo un forcejeo violento en un solo tick?
2. **Incapacidad de ver emparejamiento pasivo vs. agresivo simultáneo:** La mayoría de plataformas separan el Time & Sales (cinta de ejecuciones) de la profundidad del DOM. El trader debe mirar dos pantallas y procesar mentalmente números a velocidades imposibles.

**La solución de Logic Depth Live:** Genera un **lienzo temporal continuo y fluido** donde el libro de órdenes (órdenes límite pasivas) y las agresiones de mercado (órdenes agresivas en burbujas térmicas) conviven de forma sincronizada al milisegundo. Podrás ver en tiempo real la trayectoria del Mejor Bid y Mejor Ask navegando a través de los muros de liquidez.

## ¿Qué es?

**Logic Depth Live** es un entorno gráfico avanzado de ejecución y lectura de flujo de órdenes en tiempo real, diseñado para operar como un sub-gráfico de ultra alta velocidad directamente en tu espacio de trabajo de NinjaTrader 8. Incorpora un motor de precisión temporal continuo o basado en eventos (*Event-Based*), visualización térmica HD del libro de órdenes, trazado de trayectorias activas del Best Bid/Ask, burbujas de trades con fusión magnética inteligente y **Smart Columns** en el DOM (profundidad pasiva, volumen ejecutado y delta acumulado por nivel).

## Características principales

- **Lienzo Térmico Continuo Sub-Milisegundo:** Representación fluida de la liquidez viva con interpolación cromática que actualiza cada cambio del libro de órdenes a 60 FPS estables.
- **Burbujas de Ejecución Agresiva con Fusión Magnética (*Smart Bubbles*):** Muestra cada transacción agresiva como una burbuja cuyo tamaño y opacidad son proporcionales al volumen. Fusiona transacciones instantáneas contiguas para evitar el solapamiento visual y mostrar el volumen institucional acumulado real.
- **Trayectoria Continua de Mejor Bid y Mejor Ask (*Best Bid/Ask Lines*):** Traza las líneas exactas del spread del mercado en tiempo real, permitiendo apreciar deslizamientos (slippage), aperturas de spread y el comportamiento de los Market Makers ante noticias.
- **Smart Columns en el DOM (Trilogía de Microestructura):** Integra 3 columnas inteligentes en el margen derecho:
  1. *DOM Pasivo:* Profundidad viva de órdenes pendientes.
  2. *Executed Volume (Footprint integrado):* Volumen total absorbido en cada precio durante la ventana visible.
  3. *Delta:* Balance neto comprador o vendedor ejecutado en ese nivel.
- **Navegación Temporal Interactiva en Pantalla (HUD Time Machine):** Permite retroceder en el tiempo, pausar el flujo, hacer zoom milisegundo a milisegundo o regresar al mercado vivo con los controles táctiles del gráfico.
- **Modo de Flujo Constante vs. Basado en Eventos (*Constant vs. Event-Based*):** Elige entre un desplazamiento temporal uniforme o una aceleración/detención automática del tiempo según la densidad de eventos de mercado.
- **Auto-Centrado Inteligente de Precio (*Auto-Center Sync*):** Mantiene el precio siempre en el punto focal del gráfico comunicándose directamente con el bus de pantalla de NinjaTrader.

## ¿Para quién es?

- **Scalpers Profesionales de Futuros:** Que ejecutan operaciones con objetivos de 4 a 12 ticks en instrumentos altamente líquidos y requieren anticipar el agotamiento antes de que la vela termine de formarse.
- **Especialistas en Microestructura y Detección de Fricción:** Traders que buscan identificar dónde se están absorbiendo contratos masivos en los extremos de una subasta intradía.
- **Operadores de Noticias y Aperturas (RTH Opens):** Que necesitan vigilar la apertura y cierre del spread y la retirada repentina de liquidez pasiva en momentos de máxima aceleración.

## Accede a la documentación completa

El manual técnico completo — con el desglose parámetro por parámetro de NinjaTrader 8, opciones de configuración de Smart Columns y mejores prácticas de trading — está reservado para los miembros de la suite.

[Inicia sesión para acceder al manual técnico →](/login?next=/dashboard/docs/indicators/logic-depth-live)
