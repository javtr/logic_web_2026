---
title: Logic Composite
description: La arquitectura macro de Perfil de Volumen, Delta y TPO anclada a tu gráfico en NinjaTrader 8.
order: 4
category: indicators
public: true
---

# Logic Composite

> **La arquitectura macro de Perfil de Volumen, Delta y TPO anclada a tu gráfico.**  
> *Descubre la verdadera estructura del mercado a largo plazo: consolida semanas, meses o rangos personalizados en perfiles de doble columna sin perder de vista tu operativa intradiaria.*

---

## ¿Qué problema resuelve?

La gran mayoría de traders minoristas pierden dinero porque operan a ciegas respecto al contexto mayor del mercado:

1. **La trampa del corto plazo:** Operar exclusivamente con gráficos de 1 o 5 minutos hace que los niveles intradiarios parezcan gigantescos, cuando en realidad el precio está chocando contra un muro de volumen institucional generado semanas atrás que el trader ni siquiera puede ver.
2. **Plataformas que colapsan al cargar historiales amplios:** Intentar generar un Perfil de Volumen que abarque 60 o 90 días en NinjaTrader suele ralentizar la plataforma, congelar el gráfico o desalinear las velas operativas.
3. **Pérdida de la referencia visual al desplazarse:** Los perfiles convencionales se mueven o deforman cuando el trader navega por el historial, obligándolo a hacer zoom continuo y perdiendo la perspectiva del precio actual frente a los grandes bloques de valor macro.

### La solución de Logic Composite

Ancla un perfil institucional permanente en el margen derecho o izquierdo de tu pantalla con un ancho en píxeles fijo, independientemente de cómo navegues por tus velas. Te permite condensar meses de negociación en **dos columnas simultáneas personalizables** (ej. Volumen Total + Delta o Volumen + TPO Market Profile), proyectando los verdaderos precios de control institucional (**POC**) y las zonas de alto valor (**VAH / VAL**) directamente a través de todo tu gráfico hacia el pasado y el futuro.

---

## ¿Qué es exactamente el indicador?

**Logic Composite** es una estación de perfilado estructural multisesión para NinjaTrader 8. Diseñado para el análisis de subasta de mediano y largo plazo, permite calcular y consolidar datos de volumen, delta sesgado y tiempo-precio-oportunidad (TPO / Market Profile) sobre cualquier horizonte temporal: desde las velas visibles en pantalla hasta días, semanas, meses atrás o rangos delimitados interactivamente con el ratón. Su exclusiva arquitectura de **doble columna sincronizada** y sus **líneas de extensión hacia la pantalla (*ScreenLeft*)** convierten un gráfico intradiario en un mapa estratégico integral de oferta y demanda macro.

---

## Características Principales

* **Anclaje Fijo en Pantalla (*Screen Margin Docking*):** El perfil permanece elegantemente acoplado al margen derecho o izquierdo de tu espacio de trabajo con un ancho fijo en píxeles, manteniendo intactas tus referencias macro mientras te desplazas libremente por las velas intradiarias.
* **Arquitectura de Doble Columna Sincronizada:** Muestra dos análisis complementarios lado a lado dentro del mismo perfil (por ejemplo: Columna 1 con *Volume Profile* estructural y Columna 2 con *Delta Profile* o *TPO Market Profile* con letras y bloques).
* **7 Modos Flexibles de Selección de Rango:** Elige entre consolidar solo las barras visibles (`VisibleBars`), todo el historial cargado (`AllLoadedBars`), días atrás (`DaysBack`), semanas (`WeeksBack`), meses (`MonthsBack`), fecha específica (`CustomDate`) o dibujo manual táctil (`ManualDraw`).
* **Líneas de Extensión Total a Pantalla (*ScreenLeft*):** Proyecta los niveles de POC, VAH y VAL del perfil macro horizontalmente a través de todo el gráfico hacia la izquierda, permitiendo ver con precisión quirúrgica cómo las velas intradiarias rebotan sobre los niveles de semanas anteriores.
* **Visualización Dual: Barras Clásicas o Geometría Suave:** Elige entre histogramas tradicionales de barras o contornos poligonales continuos de alta definición que destacan de inmediato los nodos de alto volumen (HVN) y los vacíos de bajo volumen (LVN).
* **TPO Market Profile Macro con Mapas de Calor:** Agrupa brackets de tiempo configurables (ej. 30, 60 o 240 minutos) con visualización por letras, bloques y gradientes térmicos cronológicos para auditar el desarrollo temporal de la subasta a gran escala.
* **Caja de Métricas Cuantitativas Integrada:** Resumen estadístico desplegable en la parte superior o inferior con el cómputo exacto de Volumen Total, Delta Acumulado, Rango en ticks y precios clave de la estructura consolidada.
* **Carga Histórica Ultrarrápida:** Algoritmos de agregación optimizados para procesar semanas o meses de datos en segundos sin caídas de fotogramas ni bloqueos de memoria.

---

## ¿Para qué perfil de trader es?

* **Swing Traders y Operadores de Posición:** Que toman decisiones basadas en los grandes balances de semanas y meses y necesitan identificar con exactitud los puntos de inflexión institucionales.
* **Day Traders y Scalpers:** Que necesitan una brújula macro en su gráfico rápido para evitar comprar en máximos de perfiles de semanas previas o vender justo encima de un Punto de Control (POC) institucional masivo.
* **Especialistas en Teoría de Subasta (AMT):** Que combinan la aceptación por volumen con el tiempo (TPO) para identificar transiciones entre fases de balance y desbalance macro.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta los parámetros paso a paso, configuración de columnas y estrategias de soporte/resistencia con HVN/LVN en el manual privado:

[Acceder al Manual Técnico de Logic Composite →](/dashboard/docs/indicators/logic-composite)
