---
title: Logic Profile
description: La estación definitiva de Subasta con Volume Profile, Delta Profile y TPO Market Profile en doble columna para NinjaTrader 8.
order: 3
category: indicators
public: true
---

# Logic Profile

> **La estación definitiva de Subasta con Volume Profile, Delta Profile y TPO Market Profile en doble columna.**  
> *Descubre dónde se encuentra el valor real del mercado sesión a sesión: visualiza Zonas de Valor (VA), Puntos de Control (POC), Initial Balance (IB) y rechazos de TPO en una arquitectura visual de vanguardia.*

---

## ¿Qué problema resuelve?

El trader que opera únicamente con indicadores técnicos convencionales sufre de tres desventajas estructurales:

1. **La ceguera del "Precio Justo":** Un gráfico de velas muestra qué precios se tocaron, pero no indica si el mercado consideró esos precios como aceptados o como rechazados. Comprar en un nivel donde la subasta no tiene aceptación de volumen es una de las principales causas de pérdidas continuas.
2. **Desconexión entre Volumen y Tiempo:** El *Volume Profile* tradicional indica cuántos contratos se negociaron en cada precio, pero no cuánto tiempo pasó el mercado allí. Por el contrario, un *Market Profile* clásico basado en tiempo muestra cuánto duró la subasta, pero ignora el volumen real. Operar con solo uno de los dos es tener la mitad del mapa.
3. **Plataformas lentas e indicadores rígidos:** La mayoría de herramientas de perfilado en NinjaTrader exigen cargar dos o tres indicadores distintos para ver Volumen, Delta y TPO, consumiendo excesivos recursos, saturando la pantalla y obligando a reiniciar el gráfico ante cualquier cambio de configuración.

### La solución de Logic Profile

Fusiona en una sola herramienta de grado institucional el análisis completo de Teoría de Subasta (*Auction Market Theory*). Su **arquitectura de doble columna sincronizada por sesión** permite colocar lado a lado un *Volume Profile* geométrico y un *Delta Profile* o *TPO Market Profile* con letras tradicionales, proyectando con exactitud matemática el **Área de Valor (70%)**, los **POCs desnudos no mitigados**, el **Initial Balance (primeros 60 minutos)** y las **impresiones únicas de rechazo (*Single Prints*)**.

---

## ¿Qué es exactamente el indicador?

**Logic Profile** es la solución profesional de análisis de subasta sesión por sesión (diaria, semanal, mensual o por rangos personalizados) para NinjaTrader 8. Permite desglosar y comparar la interacción entre precio, volumen y tiempo en cada jornada operativa. Con soporte para perfiles automáticos por horario (sesión completa 24h / ETH o sesión regular RTH) y **trazado manual interactivo con el ratón**, Logic Profile identifica los niveles de soporte y resistencia naturales donde las instituciones defienden sus inventarios y donde el precio reacciona con mayor fuerza.

---

## Características Principales

* **Arquitectura de Doble Columna Sincronizada:** Dibuja dos perfiles complementarios por cada sesión dentro del mismo espacio visual (ej. Columna 1: *Volume Profile* en barras o geometría continua; Columna 2: *TPO Market Profile* o *Delta Profile*).
* **TPO Market Profile Completo con Letras y Bloques:** Agrupa brackets de tiempo configurables (estándar de 30 minutos) con representación en bloques limpios, letras clásicas (A, B, C...) o geometría continua, con detección automática de rechazos violentos (*Single Prints*).
* **Mapas de Calor Térmicos de Tiempo en el TPO:** Gradiente cronológico de 5 niveles que colorea las letras o bloques según el momento del día en que se formaron (desde la apertura en azul hasta el cierre en rojo), permitiendo reconstruir la película de la sesión en un instante.
* **Point of Control (POC) y Niveles Desnudos (*Naked POC*):** Resalta con máxima visibilidad el nivel de mayor consenso de la sesión y proyecta líneas de extensión hacia el futuro que se cortan de forma precisa al ser testeadas por el precio (*CutOnTouch*).
* **Delineación Automática del Initial Balance (IB):** Traza el rango de los primeros 60 minutos de la sesión regular junto con sus métricas para proyectar expansiones estadísticas de rango durante el resto del día.
* **Caja de Métricas de Sesión Flotante (HUD Box):** Cuadro resumen cuantitativo anclado en la esquina superior o inferior con el cómputo exacto de Volumen Total, Delta Acumulado, Rango en ticks, Rango de IB y niveles de POC/VAH/VAL.
* **Herramienta Interactiva de Trazado con el Ratón:** Botón `[Draw]` en pantalla para generar perfiles de volumen personalizados sobre cualquier impulso, consolidación o rango de velas con dos clics.
* **Rendimiento Fluido a 60 FPS:** Motor gráfico acelerado por hardware que permite cargar meses de sesiones históricas al instante mediante algoritmos de optimización de carga ultrarrápida.

---

## ¿Para qué perfil de trader es?

* **Day Traders de Futuros (ES, NQ, YM, RTY, CL, GC, FDAX):** Que inician cada sesión trazando sus niveles operativos a partir del Área de Valor (VAH/VAL) y el POC del día anterior.
* **Operadores de Subasta y Market Profile (AMT):** Que combinan el tiempo (TPO) y el volumen para identificar días de tendencia (*Trend Days*), días de balance (*Rotational Days*) y fallos de subasta.
* **Scalpers:** Que utilizan los extremos del Initial Balance (IB) y los POCs desnudos no mitigados como objetivos de toma de beneficios y zonas de reversión milimétricas.

---

## Acceso al Manual Técnico Completo

Si ya cuentas con tu licencia de Logic Indicators, accede a la documentación técnica detallada con la descripción de todos los parámetros, modos de cálculo y estrategias operativas avanzadas:

[Ir al manual técnico de Logic Profile (Área de Miembros) →](/dashboard/docs/indicators/logic-profile)
