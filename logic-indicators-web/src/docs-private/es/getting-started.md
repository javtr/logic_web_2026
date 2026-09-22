---
title: Primeros pasos
description: Guía inicial para poner en marcha tu suite de Logic Indicators en NinjaTrader 8.
order: 1
category: intro
---

# Primeros pasos

Bienvenido a la suite de **Logic Indicators**. Esta guía te muestra el camino más directo para configurar tu cuenta, descargar tus productos y tener tus primeros gráficos de Order Flow operativos en NinjaTrader 8 en menos de 10 minutos.

---

## Requisitos Previos

Antes de comenzar la instalación, asegúrate de contar con:

1. **NinjaTrader 8** instalado (se recomienda la versión oficial de 64 bits más reciente).
2. **Conexión de datos de futuros en vivo o simulada** (por ejemplo: NinjaTrader Continuum/CQG, Rithmic, Kinetick, etc.). Los indicadores de Order Flow y profundidad requieren datos de mercado a nivel de tick para calcular volúmenes y deltas con precisión.
3. **Windows 10 u 11 (64-bit)** con permisos de administrador en tu equipo.

---

## Estado de tu Cuenta y Licencia

Al haber recibido tu correo de bienvenida e ingresar a tu [Zona de miembros](/dashboard), tu cuenta ya se encuentra completamente configurada y tus productos adquiridos están activos y licenciados para tu NinjaTrader 8 con el Machine ID registrado tras tu compra.

> **¿Cambiaste de equipo o formateaste tu PC?**  
> Si en el futuro cambias de ordenador o reinstalas Windows, tu Machine ID variará. Podrás actualizarlo tú mismo en cualquier momento editando el campo **NinjaTrader ID** en la tarjeta superior izquierda de tu [Dashboard](/dashboard) sin necesidad de contactar a soporte.

---

## Tu Ruta Rápida en 4 Pasos

### Paso 1: Descarga tu Producto
* En tu [Zona de miembros](/dashboard), ubica la tarjeta de tu producto y haz clic en el botón **Descargar**.
* El archivo se descargará en formato `.zip`.
* **Muy importante:** **No descomprimas el archivo `.zip`.** NinjaTrader 8 requiere el archivo comprimido intacto para procesar la importación.

### Paso 2: Instala o Actualiza en NinjaTrader 8
* **Si es tu primera instalación:** En NinjaTrader 8, ve a `Tools → Import → NinjaScript Add-On...`, selecciona el archivo `.zip` descargado y reinicia la plataforma al finalizar.
* **Si estás actualizando una versión previa:** Es fundamental y obligatorio desinstalar primero los ensamblados anteriores que comiencen con las letras `LOF` en `Tools → Remove NinjaScript Assembly...` y reiniciar NinjaTrader 8 antes de importar el nuevo paquete.
* Consulta el tutorial completo con capturas en la [Guía de instalación y actualización](/dashboard/docs/installation).

### Paso 3: Carga tus Indicadores en un Gráfico
Una vez reiniciado NinjaTrader 8:
1. Abre cualquier gráfico de precios (por ejemplo, ES o NQ).
2. Haz clic derecho sobre el gráfico y selecciona **Indicators** (o pulsa `Ctrl + I`).
3. En la lista alfabética de indicadores disponibles, busca la categoría **Logic Indicators** o los nombres con prefijo `Logic...` (como `Logic Footprint`, `Logic Profile`, `Logic Depth Chart`, etc.).
4. Selecciona el indicador, haz clic en **Add**, calibra los parámetros que desees y pulsa **OK**.

### Paso 4: Aplica Presets y Plantillas
Para no tener que configurar colores, fuentes o filtros desde cero:
* Descarga nuestras plantillas prediseñadas desde la sección de [Presets y Plantillas](/resources/presets).
* Encontrarás configuraciones optimizadas para Scalping, Day Trading, temas oscuros de alto contraste y modos ligeros para menor consumo de recursos.
* Consulta la sección de [Configuración general](/dashboard/docs/configuration) para aprender a cargar y guardar tus plantillas en un clic.

---

## Siguientes Pasos Recomendados

* **[Guía de Instalación y Actualización](/dashboard/docs/installation):** Tutorial detallado paso a paso con las mejores prácticas para mantener tu suite al día.
* **[Configuración General](/dashboard/docs/configuration):** Aprende a utilizar la barra de control maestro `LOF_Configuration` y a gestionar presets en NinjaTrader 8.
* **[Manuales de Indicadores](/dashboard/docs/indicators/logic-footprint):** Explora la explicación parámetro por parámetro de cada herramienta de la suite.
* **[Solución de Problemas](/dashboard/docs/troubleshooting):** Respuestas inmediatas ante incidencias de licencia, gráficos lentos o cambio de equipo.
