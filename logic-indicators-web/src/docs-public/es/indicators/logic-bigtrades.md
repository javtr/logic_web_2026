---
title: Logic BigTrades
description: El rastreador de órdenes institucionales masivas y niveles de defensa en tiempo real para NinjaTrader 8.
order: 5
category: indicators
public: true
---

# Logic BigTrades

> **El rastreador de órdenes institucionales masivas y niveles de defensa en tiempo real.**  
> *Descubre al instante las transacciones de las verdaderas ballenas del mercado: proyecta burbujas de volumen proporcionales, niveles de mitigación automática y zonas de defensa no testeadas.*

---

## ¿Qué problema resuelve?

En los mercados financieros actuales, la gran mayoría del volumen minorista no mueve el precio. Quienes mueven las cotizaciones son las instituciones ejecutando bloques de cientos o miles de contratos:

1. **La ilusión de la cinta tradicional (Time & Sales):** La cinta de órdenes corre a una velocidad inasimilable para el ojo humano. Los algoritmos de alta frecuencia fragmentan órdenes masivas en cientos de micro-órdenes de 1 o 2 contratos para ocultarse en el flujo general. Detectar manualmente cuándo una institución barrió 1.000 contratos en un segundo es prácticamente imposible.
2. **Desconocimiento de los niveles de defensa:** Cuando una ballena entra al mercado con 500 contratos en un precio específico, ese nivel se convierte en su trinchera defensiva. En un gráfico común no queda rastro alguno de dónde se produjo esa inyección de capital una vez que la vela se cierra.
3. **Señales falsas por dispersión de volumen:** Existen momentos en que muchas órdenes pequeñas se confunden con una orden institucional real, induciendo a operaciones prematuras y entradas en falso.

### La solución de Logic Big Trades

Escanea continuamente cada transacción agresiva y la representa mediante **burbujas proporcionales dinámicas** directamente en el precio exacto donde ocurrió. Gracias a su algoritmo de **Agrupación Magnética (*Magnetic Clustering*)**, consolida las órdenes divididas por los algoritmos en una sola mega-orden institucional. Además, proyecta automáticamente **Líneas Desnudas (*Naked Lines*) y Áreas de Mitigación** hacia el futuro, revelando con precisión matemática dónde las manos fuertes defenderán su posición.

---

## ¿Qué es exactamente el indicador?

**Logic Big Trades** es un radar institucional de flujo de órdenes para NinjaTrader 8. Detecta, filtra y visualiza las ejecuciones extraordinarias de mercado que entran al Bid (ventas agresivas) y al Ask (compras agresivas). Integra burbujas visuales escalables, mapas térmicos de 3 niveles por volumen, líneas de soporte y resistencia que se cortan automáticamente al ser mitigadas (*CutOnTouch*), un sub-panel inferior de histograma institucional acumulado y un escáner de cinta en vivo que notifica la entrada de ballenas en tiempo real.

---

## Características Principales

* **Agrupación Magnética Inteligente (*Magnetic Clustering*):** Fusión algorítmica que detecta cuando un bloque institucional ha sido fragmentado en milisegundos en el mismo tick o ticks contiguos, reconstruyendo la orden completa en una sola burbuja transparente y limpia.
* **Líneas Desnudas Automáticas con Áreas de Defensa (*Auto Naked Lines & Areas*):** Proyecta automáticamente líneas horizontales desde los grandes bloques hacia el futuro con una zona sombreada de tolerancia en ticks. Las líneas se cortan exactamente cuando el precio regresa a mitigar el nivel (*CutOnTouch*).
* **Escalado Proporcional y Mapas de Calor (3 Niveles Ask / Bid):** Modos visuales básicos o térmicos donde las burbujas no solo crecen en tamaño según el volumen, sino que intensifican su color para destacar al instante compras agresivas de absorción o ventas de pánico.
* **Histograma Institucional Integrado:** Sub-panel inferior que muestra el volumen de Big Trades acumulado por vela en formatos apilado (*Stacked*), bidireccional (*Bidirectional*) o lado a lado (*SideBySide*).
* **Escáner de Cinta Institucional en Vivo (HUD Scanner):** Mini-terminal integrado en el gráfico que reporta en texto claro cada bloque institucional que impacta el mercado (hora, dirección, volumen y precio).
* **Herramienta Interactiva de Trazado de Líneas:** Botón de acción rápida en pantalla (`[Line]`) que permite al trader hacer clic sobre cualquier clúster histórico para proyectar manualmente su línea de defensa institucional.
* **Alertas Sonoras Personalizadas:** Disparo inmediato de señales acústicas configurables cuando entra una orden que supera el umbral institucional deseado.
* **Renderizado Fluido a 60 FPS:** Motor visual optimizado para procesar ráfagas de datos de alta velocidad en sub-milisegundo sin provocar caídas de rendimiento ni congelamientos en NinjaTrader 8.

---

## ¿Para qué perfil de trader es?

* **Day Traders y Scalpers de Futuros (ES, NQ, YM, RTY, CL, GC):** Que buscan seguir las huellas del dinero inteligente y entrar en la misma dirección que las grandes inyecciones de liquidez.
* **Operadores de Soporte y Resistencia Dinámicos:** Que desean trazar niveles clave basados en volumen real transado por ballenas en lugar de simples líneas de máximos y mínimos pasados.
* **Traders de Momentum y Ruptura:** Que requieren confirmar si una ruptura de rango viene respaldada por verdadero volumen institucional o si se trata de un engaño minorista sin volumen.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta los parámetros paso a paso, interpretación del escáner HUD y la tabla de calibración recomendada por instrumento en el manual privado:

[Acceder al Manual Técnico de Logic Big Trades →](/dashboard/docs/indicators/logic-bigtrades)
