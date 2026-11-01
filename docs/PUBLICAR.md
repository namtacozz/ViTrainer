# Guía de Publicación y Despliegue de PokéSurvivor

Normas fijas y flujo oficial de publicación del proyecto **PokéSurvivor**.

---

## 1. Reglas Estrictas de Edición y Despliegue

1. **Nunca editar `index.html`**:
   - `index.html` es un archivo generado automáticamente por `tools/build.js`.
   - Todas las modificaciones de estructura HTML, meta-etiquetas o llamadas a scripts se realizan exclusivamente en **`dev.html`**.
2. **Ciclo de Compilación y Publicación**:
   Antes de subir cualquier cambio o versión nueva, ejecutar obligatoriamente:
   ```bash
   node tools/build_langs.js
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
   - `build_langs.js`: Empaqueta los diccionarios de idiomas en `js/lang/*.js`.
   - `build.js`: Procesa `dev.html`, ofusca y minifica los scripts en `js/app.min.js`, genera `index.html` y actualiza la huella de versión en **`version.json`**.
   - `export_data.js`: Exporta los datos consolidados de Pokémon, movimientos y objetos para SEO.
   - `make_seo_pages.py`: Genera las páginas estáticas en español e inglés, `sitemap.xml` y páginas de error.
3. **Verificación de Pruebas**:
   ```bash
   node --test tests/i18n.test.cjs
   ```
   Asegura que no falte ninguna clave de traducción ni se rompan contratos de marcadores de posición (`{x}`).
4. **Commits y Control de Versiones**:
   - **Prohibido**: Incluir `"Co-Authored-By"` o cualquier firma o atribución de IA en los mensajes de commit.
   - Realizar `git push origin main` únicamente cuando el propietario del proyecto lo solicite o tras la validación final.

---

## 2. Actualización Automática de Jugadores (`version.json` & `updater.js`)

Todos los jugadores activos deben recibir la versión nueva automáticamente sin perder su progreso:
- `js/core/updater.js` consulta `version.json` cada **5 minutos**:
  - **Fuera de partida** (menú principal, lobby de cooperativo, tienda Kecleon, ajustes): Muestra un aviso de 5 segundos y recarga la página. Si el jugador está escribiendo o en el gacha, espera a que termine.
  - **En partida**: No interrumpe la run en curso. Al terminar la partida y registrarse los progresos, la página se recarga al volver al menú.
  - Antes de recargar, sube a la nube cualquier dato pendiente de sincronización.
- **Importante**: No eliminar `updater.js` ni deshabilitar la escritura de `version.json` en `tools/build.js`.

---

## 3. Novedades y Registro de Cambios (`changelog.js`)

Cada adición de contenido o corrección de fallos debe registrarse obligatoriamente en `js/data/changelog.js`:
- En español e inglés, bajo la fecha de hoy (`new`, `chg`, `fix`).
- **Exclusión**: Los cambios internos de infraestructura, servidores, base de datos o costes **NO** van en el changelog visible para los jugadores.

---

## 4. Infraestructura y Servidores Gratuitos (Zero Cost)

- **Firebase**:
  - Proyecto oficial: **`pokesurvivor-free`** (autenticación estándar con cuentas gratuitas ilimitadas).
  - **Nunca activar "Identity Platform"** ni funciones de bloqueo, MFA o "Actualizar para habilitar" (suponen costes por usuario activo).
  - El proyecto antiguo `pokesurvivor-jpter` con facturación fue eliminado el 13-10-2026.
- **Cloudflare**:
  - Exclusivamente para el DNS gratuito del dominio `pokesurvivor.com`.
  - Sin Cloudflare Workers de pago ni Cloudflare Realtime/TURN (eliminados el 15-10-2026).
  - El modo cooperativo opera 100% mediante conexión directa P2P (WebRTC DataChannels) utilizando los servidores STUN gratuitos de Google (`stun:stun.l.google.com:19302`).
- **Modo Mantenimiento**:
  - Se activa mediante la constante `MAINTENANCE` en `js/main.js`.
  - Añadiendo `?dev` a la URL se puede acceder para pruebas internas durante periodos de mantenimiento.

---

## 5. Licencias y Normativa de Sprites

- Los sprites proceden de la comunidad *SpriteCollab* bajo licencia **CC BY-NC 4.0** (Uso No Comercial).
- **Prohibido**: Añadir anuncios publicitarios, suscripciones de pago, microtransacciones, venta de monedas o paquetes de pago.
- No alterar los archivos de licencia del repositorio.
