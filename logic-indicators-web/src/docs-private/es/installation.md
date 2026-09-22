---
title: Instalación y Actualización
description: Guía paso a paso para instalar por primera vez o actualizar Logic Indicators en NinjaTrader 8.
order: 2
category: intro
---

# Instalación y Actualización

Esta guía describe el procedimiento oficial para instalar por primera vez o actualizar la suite de **Logic Indicators** en NinjaTrader 8. El proceso completo toma menos de cinco minutos siguiendo los pasos en el orden indicado.

---

## Requisitos Previos

Antes de comenzar, asegúrate de cumplir con los siguientes puntos:
* **NinjaTrader 8** instalado en tu equipo (versión oficial de 64 bits).
* **Windows 10 u 11** con permisos de administrador.
* Una cuenta activa en **Logic Indicators** con tu producto disponible para descarga en la [Zona de miembros](/dashboard).
* Tu **NinjaTrader ID (Machine ID)** vinculado en el Dashboard para validar la licencia.

---

## ¿Es tu primera instalación o una actualización?

* **Si es tu primera vez:** No tienes ninguna versión previa de Logic Indicators en tu NinjaTrader 8. Puedes saltar directamente a la sección [2. Proceso de Instalación](#2-proceso-de-instalacion).
* **Si estás actualizando una versión previa:** Es **fundamental y obligatorio** desinstalar primero los ensamblados antiguos antes de importar el nuevo archivo para evitar conflictos en la memoria de NinjaTrader 8. Comienza por la sección [1. Desinstalación de Versiones Anteriores](#1-desinstalacion-de-versiones-anteriores).

---

## 1. Desinstalación de Versiones Anteriores (Solo en Actualizaciones)

Si ya tenías instalada una versión anterior de los indicadores en tu equipo, sigue estos tres pasos para dejar tu plataforma completamente limpia:

1. **Accede a la herramienta de desinstalación de NinjaTrader 8:**  
   Abre NinjaTrader 8. En la ventana del Centro de Control (Control Center), ve al menú superior **Tools** y haz clic en **Remove NinjaScript Assembly...**.

2. **Remueve todos los archivos que comienzan con LOF:**  
   En la lista que aparece en pantalla, selecciona y remueve **TODOS** los archivos y paquetes que comiencen con las letras **LOF** (por ejemplo: `LOF_FullPack`, `LOF_BasicPack`, `LOF_DepthPack` o cualquier paquete previo). Haz clic en el botón **Remove** para eliminarlos por completo.

3. **Reinicia NinjaTrader 8:**  
   Una vez removidos los archivos, **cierra por completo NinjaTrader 8 y vuelve a abrirlo** antes de instalar el nuevo paquete. Este reinicio previo es indispensable para que la memoria de NinjaScript se limpie de librerías antiguas.

---

## 2. Proceso de Instalación

Sigue este procedimiento tanto si es tu primera instalación como si acabas de desinstalar una versión previa:

1. **Descarga tu archivo de producto:**  
   Ingresa a tu [Zona de miembros](/dashboard), ubica la tarjeta de tu producto adquirido y haz clic en el botón **Descargar**.  
   * El archivo se descargará con extensión `.zip`.  
   * **No descomprimas el archivo:** NinjaTrader 8 debe recibir el paquete `.zip` comprimido tal como se descargó. Guárdalo en una carpeta fácil de recordar (por ejemplo, el Escritorio o la carpeta Descargas).

2. **Importa el archivo en NinjaTrader 8:**  
   Con NinjaTrader 8 abierto, dirígete al menú superior **Tools**, coloca el cursor sobre **Import** y selecciona **NinjaScript Add-On...**.

3. **Selecciona el archivo `.zip`:**  
   Navega hasta la carpeta donde guardaste tu archivo descargado, selecciónalo y pulsa **Open (Abrir)**.

4. **Acepta el aviso de seguridad de NinjaTrader (si aparece):**  
   Si NinjaTrader 8 muestra un mensaje de advertencia recordando que solo debes instalar scripts de desarrolladores de confianza, haz clic en **Don't show this message again** y pulsa **OK** para continuar.

5. **Confirma la instalación exitosa:**  
   Al cabo de unos segundos, NinjaTrader 8 mostrará un diálogo de confirmación indicando: *"NinjaTrader successfully imported all scripts contained in the NinjaScript Archive file"*. Haz clic en **OK**.

6. **Reinicia NinjaTrader 8 (Paso Obligatorio):**  
   **Cierra NinjaTrader 8 por completo y vuelve a abrirlo.**  
   *Importante:* NinjaTrader compila y registra los indicadores únicamente tras un reinicio completo. Si no reinicias la aplicación, los indicadores no aparecerán en la lista de gráficos.

---

## 3. Carga y Verificación en el Gráfico

Tras el reinicio, verifica que la instalación haya finalizado correctamente:

1. Abre cualquier gráfico de precios en NinjaTrader 8.
2. Haz clic derecho sobre el gráfico y selecciona **Indicators** (o utiliza el atajo `Ctrl + I`).
3. En la lista superior izquierda de indicadores disponibles, busca la categoría **Logic Indicators** o aquellos que inician con el nombre del producto (ej. `Logic Footprint`, `Logic Profile`, `Logic Depth Chart`, etc.).
4. Selecciona el indicador deseado, haz clic en **Add** para agregarlo a la lista de indicadores activos (abajo a la izquierda), calibra los parámetros necesarios y pulsa **OK**.

Si el indicador carga y dibuja la información en tu gráfico, la instalación ha concluido con éxito.

---

## 4. Gestión y Sincronización del Machine ID

La suite de Logic Indicators está vinculada al **Machine ID** generado por NinjaTrader 8 en tu equipo. Este identificador puede variar en las siguientes situaciones:
* Formateo o reinstalación del sistema operativo Windows.
* Cambio o migración a un ordenador nuevo.
* Renovación o reemplazo de componentes principales del ordenador.
* Reinstalación completa de NinjaTrader 8.

### Si tus indicadores no cargan o muestran alerta de licencia:
1. Abre NinjaTrader 8 y ve a **Help → About**.
2. Copia la cadena alfanumérica que aparece en el campo **Machine ID**.
3. Abre tu [Zona de miembros](/dashboard) y compárala con el campo **NinjaTrader ID** en la tarjeta superior izquierda.
4. Si los valores difieren, pega el valor actual de NinjaTrader en tu dashboard y haz clic en guardar.
5. Una vez guardado y tras el siguiente reinicio de NinjaTrader 8 con conexión a internet, los indicadores volverán a cargar normalmente.

---

## ¿Necesitas ayuda adicional?

* Consulta nuestra guía de **[Solución de problemas](/dashboard/docs/troubleshooting)** para ver errores frecuentes de importación o compilación.
* Aprende a configurar temas y plantillas en **[Configuración general](/dashboard/docs/configuration)**.
* Contacta a nuestro equipo mediante el [Soporte oficial por WhatsApp](https://wa.me/573113006826).
