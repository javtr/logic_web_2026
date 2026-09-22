---
title: Logic Footer
description: La telemetría cuantitativa definitiva de Order Flow al pie de cada una de tus velas en NinjaTrader 8.
order: 2
category: indicators
public: true
---

# Logic Footer

> **La telemetría cuantitativa definitiva de Order Flow al pie de cada una de tus velas.**  
> *Convierte tu gráfico en un centro de datos institucional: calcula y audita en tiempo real hasta 27 métricas de volumen, delta acumulado, agresiones y absorción barra a barra.*

---

## ¿Qué problema resuelve?

El análisis visual exclusivo de las velas japonesas oculta información decisiva sobre quién domina realmente la subasta:

1. **La mentira del cuerpo de las velas:** Una vela alcista de gran tamaño puede aparentar fuerza extrema, pero si su delta interno fue profundamente negativo o si las compras agresivas se secaron por completo en los máximos, esa vela es una trampa de liquidez. Mirar solo el gráfico de velas tradicionales es operar a ciegas.
2. **Incapacidad de auditar la fuerza intrayectoria:** El trader común no puede ver cuál fue el punto de máximo esfuerzo comprador (*Max Delta*) o vendedor (*Min Delta*) antes del cierre de la vela, ni cuánto volumen agresivo entró desde que se tocó el máximo o mínimo de la barra (*COT High / Low*).
3. **Pies de gráfico rígidos e invasivos:** La mayoría de herramientas solo ofrecen tablas estáticas que consumen un tercio del gráfico, sin mapas de calor proporcionales y sin posibilidad de anclar las métricas directamente a las velas.

### La solución de Logic Footer

Proporciona un cuadro de mando cuantitativo con **27 métricas de subasta calculadas tick a tick** para cada barra. Su diseño híbrido te permite alternar entre un **pie de página fijo tradicional (Fixed Footer)** alineado en la base del gráfico o una **caja flotante dinámica (Floating DataBox)** que acompaña el movimiento de cada vela, complementada con **mapas de calor térmicos de 5 niveles** que iluminan de inmediato las lecturas verdaderamente extraordinarias.

---

## ¿Qué es exactamente el indicador?

**Logic Footer** es una suite cuantitativa de telemetría y diagnóstico barra a barra para NinjaTrader 8. Mide, clasifica y desglosa en tiempo real el comportamiento del volumen, el sesgo de las órdenes de mercado y los desequilibrios entre compradores y vendedores para cada vela de tu gráfico. Gracias a su algoritmo de contraste adaptativo y sus escalas relativas personalizadas (por sesión, por barras visibles o manuales), permite identificar con precisión objetiva si una tendencia tiene combustible para continuar o si se está produciendo una divergencia de agotamiento.

---

## Características Principales

* **Catálogo Exhaustivo de 27 Métricas Institucionales:** Supervisa en tiempo real Volúmenes (Total, Compra, Venta, Acumulado), Deltas (Neto, %, Acumulado, Cambio, Máximo, Mínimo, Top, Bottom), Transacciones (Trades Totales, Compras, Ventas), Métricas COT (*Commitment of Traders* High/Low), Desbalances (Ratio y Diferencia), Rango en Ticks y Duración en segundos.
* **Modalidad Visual Dual (Fixed Footer & Floating DataBox):** Elige entre una tabla fija anclada en la base del gráfico o cajas flotantes compactas adheridas directamente a cada vela para no desviar la mirada de la acción del precio.
* **Mapas de Calor Cuantitativos de 5 Niveles:** Aplica gradientes térmicos inteligentes sobre las celdas para que las cifras extraordinarias (altos volúmenes, deltas extremos o anomalías de trades) resalten visualmente al instante.
* **Tipografía con Auto-Contraste Dinámico:** Cambia automáticamente el color del texto entre blanco y negro según la luminancia del fondo térmico, garantizando una lectura perfecta sin importar la paleta de colores.
* **Métricas de Microestructura Avanzada (COT High y COT Low):** Registra el delta exacto que entró al mercado desde que la vela marcó su precio máximo o mínimo, revelando absorciones y rechazos violentos en tiempo real.
* **Nivel de Detalle Adaptativo (LOD Zoom Out):** Oculta de forma inteligente textos, etiquetas o paneles cuando alejas el zoom del gráfico, manteniendo la pantalla despejada y 100% fluida.
* **Botón de Acción Rápida `[FT]` en Pantalla:** Enciende o apaga el pie de página fijo con un solo clic desde la barra flotante de la suite para alternar entre análisis cuantitativo profundo y visión limpia del gráfico.
* **Máxima Eficiencia Gráfica a 60 FPS:** Diseñado para actualizar datos tick a tick de alta velocidad sin ralentizar la plataforma ni consumir recursos excesivos de CPU.

---

## ¿Para qué perfil de trader es?

* **Day Traders y Scalpers Cuantitativos:** Que fundamentan sus entradas en confirmaciones numéricas objetivas (Delta positivo, Max Delta en expansión, Delta % superior a umbrales).
* **Traders de Order Flow que operan con Velas Tradicionales:** Que no desean utilizar gráficos de Footprint pero necesitan tener exactamente la misma información microestructural en un formato tabular limpio.
* **Operadores de Continuación y Tendencia:** Que necesitan comprobar si el Delta Acumulado y el volumen de compras/ventas acompañan los nuevos máximos y mínimos de la sesión.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta el desglose de las 27 métricas, configuraciones del DataBox flotante y estrategias de validación con COT en el manual privado:

[Acceder al Manual Técnico de Logic Footer →](/dashboard/docs/indicators/logic-footer)
