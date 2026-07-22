---
title: Instalación
description: Guía paso a paso para instalar Logic Indicators en NinjaTrader 8.
order: 2
category: intro
---

# Instalación

Seguí estos pasos para instalar Logic Indicators en NinjaTrader 8. El proceso completo lleva unos 5 minutos.

## Requisitos

- **NinjaTrader 8** instalado (se recomienda la última versión).
- **Windows 10 u 11.**
- Una suscripción activa a **Logic Indicators**.
- Una cuenta de **Logic Indicators** con al menos un producto asignado.

## Pasos de instalación

1. **Descargá el archivo.** Andá a tu [Zona de miembros](/dashboard) y hacé clic en el botón **Descargar** del producto que querés instalar. El archivo es un `.zip` — no lo descomprimas.

2. **Importalo en NinjaTrader 8.** Abrí NinjaTrader 8, andá a la pestaña **Tools**, hacé clic en **Import** y elegí **Ninja Script Add-on**. Seleccioná el archivo `.zip` que acabás de descargar.

3. **Reiniciá NinjaTrader 8.** Este paso es **obligatorio**. NinjaTrader solo registra los indicadores después de un reinicio. Si te lo saltás, los indicadores no van a aparecer en la lista y cualquier gráfico donde intentes agregarlos va a tirar error.

4. **Cargá los indicadores en un gráfico.** Una vez que NinjaTrader haya reiniciado, abrí un gráfico, hacé clic derecho sobre él, elegí **Indicators**, buscá el indicador de Logic que quieras (por ejemplo `Logic Footprint`, `Logic Profile`) y agregalo al gráfico.

Si los indicadores aparecen en la lista y cargan sin errores, la instalación está lista.

## Si los indicadores dejan de funcionar

Los indicadores de Logic están licenciados a un Machine ID específico (dentro de NinjaTrader se llama **MatchingID**). Este ID puede cambiar sin aviso si:

- Formateás el equipo.
- Te cambiás de computadora.
- Hacés un cambio importante en Windows (cambio de motherboard, swap de hardware, actualización grande de Windows).
- Reinstalás NinjaTrader desde cero.

Cuando eso pasa, el MatchingID de NinjaTrader ya no coincide con el que tenemos registrado en tu cuenta, y los indicadores se niegan a cargar. Para arreglarlo:

1. **Buscá el MatchingID dentro de NinjaTrader 8.** Normalmente aparece en **Help → About** o en el panel de configuración del indicador.
2. **Abrí tu [Zona de miembros](/dashboard)** y comparalo con el **NinjaTrader ID** que aparece en la card de arriba a la izquierda.
3. **Si no coinciden**, copiá el valor de NinjaTrader al campo **NinjaTrader ID** del dashboard y guardá. El dashboard es la fuente de verdad — cuando ambos lados coincidan, los indicadores van a funcionar de nuevo después del próximo reinicio de NinjaTrader.

> **Tip:** si cada vez que agregás un indicador de Logic ves un warning de `Matching ID` dentro de NinjaTrader, ese es el síntoma. Solo sincronizá los IDs como se describe arriba.

## ¿Necesitás más ayuda?

- Consultá la guía de [Solución de problemas](/dashboard/docs/troubleshooting) para otros errores comunes.
- [Ir a la Zona de miembros](/dashboard) para descargar indicadores o gestionar tu suscripción.
- [Contactar a soporte](https://wa.me/573113006826) si nada de esta guía te funciona.
