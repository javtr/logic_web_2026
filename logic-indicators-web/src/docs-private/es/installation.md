---
title: Instalación
description: Guía paso a paso para instalar Logic Indicators en NinjaTrader 8.
order: 2
category: intro
---

# Instalación

Esta guía describe el procedimiento de instalación de Logic Indicators sobre NinjaTrader 8. El proceso completo se completa en aproximadamente cinco minutos.

## Requisitos

- **NinjaTrader 8** instalado (se recomienda la versión estable más reciente).
- **Windows 10 u 11** con permisos de administrador.
- Una suscripción activa a **Logic Indicators**.
- Una cuenta de **Logic Indicators** con al menos un producto asignado.

## Pasos de instalación

1. **Descargue el archivo.** Acceda a la [Zona de miembros](/dashboard) y haga clic en el botón **Descargar** correspondiente al producto que desea instalar. El archivo es un archivo `.zip` y no debe descomprimirlo.

2. **Importe el archivo en NinjaTrader 8.** Abra NinjaTrader 8, diríjase a la pestaña **Tools**, seleccione **Import** y, a continuación, elija **Ninja Script Add-on**. Seleccione el archivo `.zip` descargado en el paso anterior.

3. **Reinicie NinjaTrader 8.** Este paso es **obligatorio**. NinjaTrader registra los indicadores únicamente tras un reinicio completo de la aplicación. Si omite este paso, los indicadores no aparecerán en el listado y cualquier intento de agregarlos a un gráfico generará un error.

4. **Cargue los indicadores en un gráfico.** Una vez que NinjaTrader haya reiniciado, abra un gráfico, haga clic derecho sobre él, seleccione **Indicators**, localice el indicador de Logic que desee agregar (por ejemplo, `Logic Footprint` o `Logic Profile`) y confírmelo.

Si los indicadores aparecen en el listado y se cargan correctamente, la instalación ha finalizado.

## Si los indicadores dejan de funcionar

Los indicadores de Logic se licencian a un Machine ID específico (denominado **MachineID** dentro de NinjaTrader). Este identificador puede modificarse sin previo aviso en las siguientes situaciones:

- Formateo del equipo.
- Migración a un equipo nuevo.
- Cambios relevantes en el sistema operativo (sustitución de placa base, intercambio de hardware o actualizaciones importantes de Windows).
- Reinstalación completa de NinjaTrader.

Cuando esto ocurre, el MachineID de NinjaTrader deja de coincidir con el que se encuentra registrado en su cuenta, y los indicadores se niegan a cargar. Para resolver la incidencia:

1. **Localice el MachineID dentro de NinjaTrader 8.** Este valor suele encontrarse en **Help → About** o en el panel de configuración del indicador.
2. **Abra la [Zona de miembros](/dashboard)** y compare el valor con el campo **NinjaTrader ID** que aparece en la tarjeta superior izquierda.
3. **Si los valores no coinciden**, copie el valor que muestra NinjaTrader y péguelo en el campo **NinjaTrader ID** del dashboard para guardarlo. El dashboard constituye la fuente de referencia; una vez que ambos valores coincidan, los indicadores volverán a funcionar tras el siguiente reinicio de NinjaTrader.

## Soporte adicional

- Para incidencias adicionales, consulte la guía de [Solución de problemas](/dashboard/docs/troubleshooting).
- [Acceda a la Zona de miembros](/dashboard) para descargar indicadores o gestionar su suscripción.
- Si el problema persiste, [contacte al equipo de soporte](https://wa.me/573113006826).
