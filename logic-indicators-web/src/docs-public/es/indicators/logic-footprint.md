---
title: Logic Footprint
description: La radiografía definitiva de la subasta vela a vela con arquitectura multi-columna en NinjaTrader 8.
order: 1
category: indicators
public: true
---

# Logic Footprint

> **La radiografía definitiva de la subasta vela a vela con arquitectura multi-columna.**  
> *Abre las velas y observa la verdadera batalla en el Bid y el Ask: detecta desbalances diagonales, perfiles intrayectorios y el Point of Control exacto donde combaten compradores y vendedores.*

---

## ¿Qué problema resuelve?

Operar únicamente con velas tradicionales deja al trader expuesto a la desinformación en momentos decisivos:

1. **La ilusión de los cierres de vela:** Dos velas japonesas con cuerpos y mechas idénticos pueden esconder realidades totalmente opuestas. Una puede haberse formado por compras agresivas limpias, mientras que la otra puede ser el resultado de una absorción institucional masiva donde el 80% de los contratos se transaron en el último tick antes del cierre.
2. **Desbalances invisibles a simple vista:** Las agresiones cruzadas del mercado (cuando los compradores al Ask superan por 3 o 4 veces a los vendedores en el Bid diagonal) son completamente invisibles en un gráfico estándar. Sin un Footprint, el trader compra justo cuando las compras ya se han agotado.
3. **Plataformas lentas y gráficos ilegibles:** La mayoría de herramientas de Footprint sufren de sobrecarga visual. Al alejar el zoom, los números se amontonan de forma ilegible y la plataforma comienza a sufrir retrasos y caídas drásticas en los fotogramas por segundo.

### La solución de Logic Footprint

Transforma cada vela en una ventana transparente de flujo de órdenes en tiempo real. Su **arquitectura modular de hasta 3 columnas independientes por vela** te permite personalizar qué dato ver en cada mitad de la barra (Bid x Ask tradicional, Delta neto, Delta %, Volumen o Perfiles internos). Además, gracias a su **Nivel de Detalle Inteligente (LOD Zoom Out)**, cuando te alejas en el gráfico el indicador transforma fluidamente los números en mini-perfiles estilizados y luego en velas japonesas limpias, garantizando máxima legibilidad y fluidez total.

---

## ¿Qué es exactamente el indicador?

**Logic Footprint** es el buque insignia de lectura microestructural para NinjaTrader 8. Revela la distribución matemática exacta de las órdenes de compra (Ask) y venta (Bid) ejecutadas en cada nivel de precio dentro de cada barra. Cuenta con cálculo automático de desbalances por ratio diagonal y por diferencia neta, detección y marcado del Point of Control (POC) de la vela, mapas de calor graduados de 5 niveles para identificar de inmediato zonas de alto esfuerzo y un botón flotante en pantalla (`[VP]`) para alternar al instante entre la huella numérica y el perfil de volumen intra-vela.

---

## Características Principales

* **Arquitectura Modular de hasta 3 Columnas por Vela:** Personaliza cada vela para mostrar combinaciones profesionales únicas (ej. Columna 1: *Delta*, Columna 2: *Bid x Ask*, Columna 3: *Mini Perfil de Volumen*), asignando alineaciones, anchos y tipos de celda independientes.
* **Celdas Híbridas (Full vs. Perfil Integrado):** Elige entre celdas rectangulares clásicas o micro-histogramas horizontales dibujados dentro de la propia vela para visualizar la concentración de volumen de un vistazo sin depender exclusivamente de la lectura de números.
* **Detección Dual de Desbalances (Ratio Diagonal y Diferencia Neta):** Resalta instantáneamente en colores brillantes cuando la demanda supera a la oferta diagonal (ej. ratio 3:1) o cuando la diferencia neta de contratos sobrepasa un umbral crítico.
* **Point of Control (POC) y Zonas de Valor por Vela:** Destaca con marcos de alta visibilidad el nivel de mayor volumen o mayor delta de la vela, permitiendo identificar giros inmediatos cuando el POC migra a los extremos de rechazo.
* **Mapas de Calor Térmicos de 5 Niveles (Volumen, Delta, Bid y Ask):** Gradientes cromáticos inteligentes que asignan mayor intensidad de color a los niveles donde se concentró la verdadera liquidez institucional.
* **Nivel de Detalle Adaptativo (LOD Zoom Out):** Transiciona automáticamente a tres niveles según el alejamiento del gráfico: *Huella Numérica Completa* $\rightarrow$ *Mini Perfil Intrayectorio* $\rightarrow$ *Vela Japonesa Estándar*, manteniendo tu espacio de trabajo siempre limpio y ágil.
* **Tipografía con Auto-Contraste Inteligente:** Conmuta automáticamente los números entre blanco y negro según la luminosidad del fondo de la celda para que cada cifra sea legible bajo cualquier esquema de color.
* **Renderizado Ultrarrápido a 60 FPS:** Motor gráfico optimizado para actualizar ráfagas de datos en tiempo real sin congelamientos de pantalla ni sobrecarga de memoria.

---

## ¿Para qué perfil de trader es?

* **Scalpers Profesionales de Futuros (ES, NQ, CL, GC, FDAX):** Que necesitan validar la entrada en el micro-nivel antes de presionar el gatillo, observando el agotamiento del Bid/Ask.
* **Day Traders de Ruptura y Re-testeo:** Que buscan comprobar si las rupturas de niveles clave vienen acompañadas de desbalances agresivos de compra o si se trata de un simple barrido de liquidez.
* **Especialistas en Subasta y Order Flow:** Que requieren auditar la migración del POC vela a vela para confirmar la continuación o el freno de una tendencia.

---

## Acceso al Manual Técnico Completo

Si ya eres miembro de Logic Indicators, consulta los parámetros paso a paso, configuración de columnas modulares y la tabla de calibración recomendada por instrumento en el manual privado:

[Acceder al Manual Técnico de Logic Footprint →](/dashboard/docs/indicators/logic-footprint)
