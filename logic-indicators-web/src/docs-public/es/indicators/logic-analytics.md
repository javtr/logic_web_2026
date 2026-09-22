---
title: Logic Analytics
description: El laboratorio cuantitativo de Esfuerzo vs. Resultado para auditar volumen, delta acumulado y anomalías estadísticas en NinjaTrader 8.
order: 6
category: indicators
public: true
---

# Logic Analytics

> **El laboratorio cuantitativo de Esfuerzo vs. Resultado sobre cualquier rango de tu gráfico.**  
> *Aísla consolidaciones, rupturas o sesiones completas dentro de cajas interactivas para auditar al milímetro el volumen, la curva de delta y las anomalías estadísticas institucionales.*

---

## ¿Qué problema resuelve?

El análisis del gráfico completo a menudo abruma al trader con datos dispersos e interpretaciones subjetivas:

1. **Dificultad para medir el balance en zonas clave:** Cuando el precio entra en un rango lateral o consolidación, resulta sumamente complejo saber a simple vista quién tiene el control. ¿Se está acumulando o distribuyendo? ¿Las compras agresivas están logrando desplazar el precio o están siendo absorbidas pasivamente por órdenes límite?
2. **Cálculos manuales imprecisos y lentos:** Intentar sumar mentalmente el delta de 10 o 20 velas consecutivas para evaluar la presión neta de una estructura resulta agotador y propenso a errores costosos en tiempo real.
3. **Falta de rigor estadístico:** La mayoría de traders califica una vela de "gran volumen" de forma puramente intuitiva, sin una base matemática objetiva que determine si el esfuerzo rompió la media habitual de la sesión.

### La solución de Logic Analytics

Permite trazar cajas analíticas interactivas directamente sobre cualquier fragmento temporal del gráfico con solo hacer clic y arrastrar. Al instante, la caja desglosa el **Volumen Total**, la **Curva Continua de Delta Acumulado** y un **Panel Estadístico Cuantitativo basado en Desviación Estándar** que revela de forma objetiva las anomalías institucionales de esfuerzo contra resultado (principios clásicos de Wyckoff potenciados con Order Flow moderno).

---

## ¿Qué es exactamente el indicador?

**Logic Analytics** es una herramienta de diagnóstico estructural y estadístico para NinjaTrader 8. Permite aislar cualquier segmento de la acción del precio —ya sea una sesión completa, la primera hora de mercado (*Initial Balance*) o un rango lateral estrecho— dentro de cajas analíticas inteligentes. Cada caja integra tres paneles de lectura profunda (histograma de volumen relativo, curva geométrica de delta y telemetría de desviación estándar) con nodos táctiles para redimensionar, mover o eliminar cajas al vuelo, guardándose automáticamente en disco para que nunca pierdas tus análisis entre sesiones.

---

## Características Principales

* **Trazado Interactivo con un Solo Clic:** Activa el botón de dibujo en pantalla (`[Draw]`), selecciona el rango de barras deseado y obtén un diagnóstico microestructural completo sin abrir menús ni configurar fórmulas complejas.
* **Curva Geométrica de Delta Acumulado Intra-Caja:** Grafica la trayectoria exacta de la presión compradora o vendedora dentro del rango seleccionado, permitiendo detectar divergencias tempranas y absorciones antes del despegue del precio.
* **Panel de Telemetría Estadística ($\mu + 1\sigma$):** Calcula automáticamente el promedio y la desviación estándar de Volumen, Delta positivo, Delta negativo y Rango en ticks, iluminando en pantalla aquellas barras donde el esfuerzo institucional fue verdaderamente extraordinario.
* **Generación Automática de Cajas Diarias (*Auto Box*):** Programa cajas recurrentes para que se tracen solas cada día en franjas horarias estratégicas (ej. los primeros 60 minutos de la sesión RTH de Nueva York o la apertura de Londres).
* **Nodos de Edición Táctil en Tiempo Real:** Ajusta los extremos de inicio y fin de tus cajas directamente con el ratón sobre el gráfico; los cálculos matemáticos se recalculan de forma instantánea al soltar el cursor.
* **Persistencia Total en Disco:** Todas tus cajas, rangos y notas visuales se almacenan automáticamente en el disco duro. Al cerrar NinjaTrader o reiniciar tu ordenador, tus áreas de análisis permanecen intactas en el gráfico.
* **Alineación Visual Adaptativa:** Modos de ajuste para que el ancho de las barras de volumen coincida exactamente con las velas de tu gráfico o se muestre como un porcentaje estilizado y elegante.
* **Renderizado Ultrarrápido y Cero Lag:** Diseñado para actualizarse de manera instantánea y limpia a 60 FPS estables sin sobrecargar la CPU de tu equipo.

---

## ¿Para qué perfil de trader es?

* **Operadores de Rangos y Consolidaciones (Trading de Rango / Wyckoff):** Que necesitan determinar si un balance de precios es una acumulación previa a un rally alcista o una distribución previa a una caída.
* **Traders Cuantitativos y Metódicos:** Que buscan respaldar sus decisiones en métricas matemáticas objetivas (promedios y desviaciones estándar) en lugar de impulsos visuales.
* **Day Traders de Ruptura y Re-test:** Que utilizan la primera hora de mercado para proyectar el sesgo de la sesión y medir la fuerza de las salidas de rango.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta los parámetros paso a paso, interpretación de sub-paneles y estrategias con Auto Box en el manual privado:

[Acceder al Manual Técnico de Logic Analytics →](/dashboard/docs/indicators/logic-analytics)
