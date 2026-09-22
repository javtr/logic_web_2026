---
title: Configuración general
description: Panel maestro, gestión de presets y optimización de espacios de trabajo en NinjaTrader 8.
order: 1
category: configuration
---

# Configuración General

Esta guía detalla los controles compartidos, la administración de plantillas (*Presets*) y las mejores prácticas para optimizar el rendimiento y la legibilidad de la suite de **Logic Indicators** en NinjaTrader 8.

---

## 1. Barra de Control Maestro (`LOF_Configuration`)

La suite incluye un indicador central denominado **`LOF_Configuration`** que añade una barra de herramientas minimalista e interactiva en la parte superior de tu gráfico.

### Funciones Principales:
* **Botón `[HUD]`:** Muestra u oculta instantáneamente los paneles táctiles de calibración flotantes (disponibles en herramientas como `Logic Depth Chart` y `Logic Depth Live`) para modificar filtros de volumen en caliente sin necesidad de abrir la ventana de propiedades.
* **Botón `[Reset]`:** Purga la memoria local de órdenes acumuladas y reinicia el renderizado gráfico al instante si experimentas desconexiones o congelamientos temporales del proveedor de datos de tu bróker.
* **Monitoreo de Indicadores Activos:** Cada indicador de la suite que agregas a tu gráfico muestra una pequeña píldora de color identificativa en esta barra, permitiéndote saber de un vistazo qué herramientas están procesando datos en esa ventana.

---

## 2. Gestión de Plantillas y Presets (Templates)

Para evitar configurar cada color, filtro y tamaño de letra cada vez que abres un gráfico nuevo, NinjaTrader 8 permite guardar y aplicar plantillas (*Templates*).

### Cómo guardar tu propia configuración personalizada:
1. Con el indicador abierto en tu gráfico, pulsa `Ctrl + I` (o haz clic derecho → **Indicators**).
2. Selecciona el indicador en la lista inferior izquierda y calibra los parámetros a tu gusto.
3. En la esquina inferior derecha de la ventana de propiedades, haz clic en el botón **Template**.
4. Selecciona **Save**:
   * Si eliges guardarlo con el nombre **Default**, cada vez que agregues este indicador a un nuevo gráfico, se abrirá automáticamente con estos ajustes.
   * Si asignas un nombre personalizado (por ejemplo: `ES_Scalping` o `NQ_Dark`), podrás cargarlo en cualquier momento.

### Cómo cargar los Presets Oficiales de Logic Indicators:
1. Ingresa a la sección de [Presets y Plantillas](/resources/presets) en la web y descarga el archivo de configuración correspondiente.
2. Copia el archivo descargado en la carpeta de plantillas de NinjaTrader 8 de tu equipo:  
   `Documentos\NinjaTrader 8\templates\Indicator\`
3. En NinjaTrader 8, abre la ventana de propiedades del indicador (`Ctrl + I`), pulsa en **Template → Load** y selecciona la plantilla descargada.

---

## 3. Parámetros Globales Comunes en la Suite

Los siguientes parámetros están presentes en la mayoría de indicadores de la suite y comparten la misma lógica funcional:

### `Zero-Lag Engine Mode` (Gestión de Rendimiento)
Ajusta el modo de refresco visual del motor Zero-Lag para optimizar el rendimiento y equilibrar la máxima fluidez gráfica con los recursos de tu equipo:
* **`Balanced` *(Recomendado por defecto)*:** Equilibrio óptimo entre fluidez visual continua y bajo consumo de recursos; diseñado para el uso diario y para operar con múltiples gráficos abiertos a la vez.
* **`Smooth`:** Máxima suavidad visual para estaciones de trading con procesadores potentes.
* **`MaxPerformance`:** Modo de ultra bajo consumo de recursos; ideal para portátiles o sesiones con extrema volatilidad de mercado.
* **`Disabled`:** Visualización continua a 60 FPS en tiempo real sin restricción para equipos de alto desempeño.

### `Layer Mode` (Orden de Capas Visuales)
Determina en qué plano se dibujan los elementos respecto a las velas y dibujos del gráfico:
* **`BehindPrice` *(Recomendado)*:** Dibuja el mapa de calor, perfiles o fondos por detrás de las barras. Garantiza que las velas de precio, los números del Footprint y tus líneas de soporte sigan siendo 100% legibles.
* **`Normal`:** Dibuja al mismo nivel que las barras de precio.
* **`TopMost`:** Superpone los elementos por encima de cualquier otro indicador o dibujo.

### `Ticks per Level` (Agrupación de Ticks)
Consolida múltiples ticks de precio en una sola fila visual para adaptar el análisis a la volatilidad de cada instrumento:
* **`1` (Sin agrupación):** Recomendado para mercados densos y con spreads estables como **ES (S&P 500)**, **ZN (Bonos del Tesoro)** o **FDAX**.
* **`2` a `4` ticks:** Recomendado para mercados volátiles y con movimientos rápidos como **NQ (Nasdaq)**, **CL (Petróleo)** o **Bitcoin**, evitando que las filas numéricas se vuelvan diminutas y dispersas.

---

## 4. Buenas Prácticas en tus Espacios de Trabajo (Workspaces)

Para garantizar que NinjaTrader 8 funcione con máxima velocidad y sin retrasos durante la sesión de trading:

1. **Limita los días de carga histórica (`Days to load`):**  
   En la ventana de tu gráfico, presiona `Ctrl + F` para abrir la configuración de la serie de datos (*Data Series*). Para operativa intradía, fija el campo **Days to load** entre **3 y 5 días**. Cargar 30 o 60 días de ticks históricos obliga a NinjaTrader a procesar millones de transacciones en memoria RAM que no tienen utilidad en tu operativa diaria.
2. **Utiliza Workspaces organizados:**  
   Guarda tu espacio de trabajo en **Workspaces → Save Workspace As...**. Evita tener más de 4 a 6 gráficos con indicadores de Order Flow pesados en un solo espacio de trabajo si tu equipo tiene 8 GB o 16 GB de memoria RAM.
3. **Cierra pestañas secundarias en horario de mercado:**  
   Las ventanas minimizadas de gráficos continúan recibiendo y procesando flujos de datos en segundo plano, consumiendo ciclos de tu procesador.

---

## Siguientes Pasos
* Consulta el desglose técnico de cada indicador en los **[Manuales de Indicadores](/dashboard/docs/indicators/logic-footprint)**.
* Si experimentas caídas de rendimiento o alertas de conexión, revisa la guía de **[Solución de problemas](/dashboard/docs/troubleshooting)**.
