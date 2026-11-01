# Poner pokesurvivor.com en marcha y estado del dominio

Información técnica y estado del dominio oficial **`pokesurvivor.com`**.

---

## 1. Estado Actual del Proyecto (Actualizado 2026)

- [x] **Dominio**: `pokesurvivor.com` comprado y gestionado en **Cloudflare** (DNS gratis, sin costes adicionales).
- [x] **Servidor Web**: Alojado de forma 100% gratuita en **GitHub Pages** (`https://namtacozz.github.io/ViTrainer/` $\rightarrow$ `https://pokesurvivor.com/`).
- [x] **Certificado HTTPS**: Activo con renovación automática mediante Let's Encrypt / GitHub Pages (**Enforce HTTPS** activo).
- [x] **Firebase**: Migrado definitivamente al proyecto **`pokesurvivor-free`** (el proyecto antiguo `pokesurvivor-jpter` con facturación se eliminó el 13-10-2026).
  - Autenticación normal ilimitada y gratuita.
  - Dominios autorizados en Firebase Auth: `pokesurvivor.com`, `www.pokesurvivor.com`, `localhost`, `namtacozz.github.io`.
- [x] **Cooperativo WebRTC Directo**: Sin costes de TURN ni Workers de pago (eliminados el 15-10-2026). Todo el tráfico P2P utiliza servidores STUN gratuitos de Google (`stun:stun.l.google.com:19302`).
- [x] **SEO y Páginas Estáticas**: 1.022 Pokémon, 133, 140 logros, 18 arenas generadas mediante `python tools/make_seo_pages.py`.

---

## 2. Configuración de DNS en Cloudflare

En <https://dash.cloudflare.com> $\rightarrow$ dominio **pokesurvivor.com** $\rightarrow$ **DNS → Records**:

Todos los registros deben mantener el estado **DNS only** (nube **gris**, no naranja) para evitar bucles de redirección SSL y permitir la emisión directa del certificado HTTPS por parte de GitHub Pages.

| Tipo | Nombre | Destino / IPv4 / IPv6 | Estado Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | DNS only (gris) |
| A | `@` | `185.199.109.153` | DNS only (gris) |
| A | `@` | `185.199.110.153` | DNS only (gris) |
| A | `@` | `185.199.111.153` | DNS only (gris) |
| AAAA | `@` | `2606:50c0:8000::153` | DNS only (gris) |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only (gris) |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only (gris) |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only (gris) |
| CNAME | `www` | `namtacozz.github.io` | DNS only (gris) |

> **Nota sobre seguridad y correo (gratis en Cloudflare):**
> - **DNSSEC**: Activado en DNS → Settings para prevenir suplantación de identidad DNS.
> - **Email Routing**: Redirección gratuita de `contacto@pokesurvivor.com` hacia la cuenta personal del administrador.

---

## 3. Verificación de Dominio en GitHub

1. Entrar en la configuración de la cuenta u organización: <https://github.com/settings/pages>.
2. En **Custom domain**, verificar `pokesurvivor.com` con el registro TXT provisto por GitHub en Cloudflare DNS (`_github-pages-challenge-namtacozz`).
3. El archivo raíz `CNAME` contiene:
   ```text
   pokesurvivor.com
   ```

---

## 4. Google Search Console y Bing Webmaster Tools

1. Propiedad de Dominio en Google Search Console: `pokesurvivor.com` verificada por registro TXT en Cloudflare DNS.
2. Mapa del sitio enviado: `https://pokesurvivor.com/sitemap.xml`.
3. URL canónicas principales inspeccionadas e indexadas:
   - Portada principal: `https://pokesurvivor.com/`
   - Portada en inglés: `https://pokesurvivor.com/en/`
   - Guía completa: `https://pokesurvivor.com/guia/`
   - Pokédex global: `https://pokesurvivor.com/pokedex/`
   - Novedades y changelog: `https://pokesurvivor.com/novedades/`
