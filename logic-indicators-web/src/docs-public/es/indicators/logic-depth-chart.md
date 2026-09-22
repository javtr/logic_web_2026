---
title: Logic Depth Chart
description: El mapa térmico de liquidez institucional en tiempo real directamente sobre tus velas en NinjaTrader 8.
order: 8
category: indicators
public: true
---

# Logic Depth Chart

> **Resumen público** — para acceder al manual técnico completo (todos los parámetros de NinjaTrader 8, opciones de configuración y mejores prácticas), [inicia sesión en tu cuenta](/login?next=/dashboard/docs/indicators/logic-depth-chart).

## ¿Qué problema resuelve?

El libro de órdenes tradicional (DOM estático o numérico) sufre de tres deficiencias críticas para el trader profesional:

1. **Agotamiento cognitivo y ceguera temporal:** Los números en un DOM parpadean cientos de veces por segundo. El ojo humano es incapaz de recordar cuántos contratos había minutos atrás en un soporte clave. El DOM tradicional no tiene memoria histórica.
2. **La trampa del Spoofing y órdenes fantasmas:** Los algoritmos institucionales colocan y retiran liquidez de forma continua para inducir al error al minorista. En un DOM numérico convencional es imposible saber si un muro de 1.000 contratos lleva media hora defendiendo el precio o si fue colocado hace dos segundos para fingir interés y retirarse antes de la ejecución.
3. **Desconexión contextual:** Analizar el DOM en una ventana flotante separada y las velas en otra fragmenta la atención en los momentos de mayor volatilidad.

**La solución de Logic Depth Chart:** Proyecta todo el historial de profundidad de mercado (Level 2) directamente en el fondo de tus velas mediante un **mapa de calor térmico continuo**. Te permite ver con total claridad cuándo apareció la liquidez, si el precio fue atraído magnéticamente hacia ella, si los grandes operadores mantuvieron sus órdenes ante la embestida del mercado (absorción) o si huyeron retirando contratos (manipulación/spoofing).

## ¿Qué es?

**Logic Depth Chart** es un indicador de grado institucional para NinjaTrader 8 que fusiona la profundidad de mercado histórica y en vivo con el gráfico de precios estándar. Desarrollado sobre un motor de alto rendimiento que aprovecha la aceleración gráfica de tu equipo, proyecta cada cambio del libro de órdenes como bandas térmicas de color con total fluidez detrás de tus velas japonesas, de rango o de volumen, acompañadas de un **Live DOM lateral de alta legibilidad**. El resultado es una visión transparente y continua de la oferta y la demanda pasiva sin ralentizar tu plataforma ni provocar caídas de fotogramas.

## Características principales

- **Mapa Térmico Histórico Continuo:** Registra y dibuja la presencia, persistencia y retirada de órdenes límite pasivas detrás de cada barra de tu sesión.
- **Proyección de Liquidez Activa Extendida (*Extend Passive Liquidity*):** Proyecta la liquidez pasiva confirmada hacia adelante para anticipar con precisión matemática los puntos de inflexión y techos/suelos de liquidez antes del impacto.
- **Live DOM Lateral Integrado con Lectura Digital:** Un histograma de profundidad contemporáneo situado en el margen derecho que exhibe de forma gráfica y numérica el número exacto de contratos en cada tick.
- **Rendimiento Zero-Lag a 60 FPS:** Optimizado para procesar eventos macroeconómicos de alta volatilidad (FOMC, NFP, CPI) manteniendo una visualización fluida y estable sin caídas de rendimiento.
- **Control HUD Flotante On-Chart:** Permite calibrar filtros de volumen mínimo, referencias máximas, agrupar ticks y alternar elementos en caliente mediante clics rápidos directamente sobre el gráfico, sin pausar el flujo de datos.
- **Paletas Cromáticas de Alta Densidad (Dual & Single Heatmap):** Modos especializados de alto contraste para separar nítidamente soportes (Bids) de resistencias (Asks) o mapas monocromáticos de intensidad para una estética limpia.
- **Compatibilidad Multi-Marco Temporal y Multi-Estilo:** Funciona con precisión en futuros de alta liquidez (ES, NQ, YM, RTY, CL, GC, ZN, FDAX) y en cualquier periodicidad (velas de minutos, segundos, Ticks, Volumen o Rango).

## ¿Para quién es?

- **Day Traders y Operadores de Futuros:** Que necesitan validar si los niveles técnicos clave (soportes, resistencias, máximos y mínimos de sesión) están respaldados por órdenes límite institucionales auténticas.
- **Traders de Order Flow y Subasta:** Que buscan combinar la liquidez pasiva (Depth Chart) con la liquidez agresiva ejecutada (Footprint / BigTrades) para confirmar giros de mercado con máxima probabilidad.
- **Scalpers:** Que requieren identificar de un vistazo las zonas de baja fricción (vacíos de liquidez para impulsos rápidos) y los muros de bloqueo donde el precio tenderá a frenar.

## Accede a la documentación completa

El manual técnico completo — con el desglose parámetro por parámetro de NinjaTrader 8, opciones de configuración y mejores prácticas para detectar spoofing y absorción — está disponible para los miembros de la suite.

[Inicia sesión para acceder al manual técnico →](/login?next=/dashboard/docs/indicators/logic-depth-chart)
