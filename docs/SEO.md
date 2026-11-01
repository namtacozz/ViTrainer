# SEO, Indexación y Optimización de PokéSurvivor

Estrategia técnica de posicionamiento en motores de búsqueda (SEO) y metadatos del juego para `pokesurvivor.com`.

---

## 1. Arquitectura Técnica de Páginas SEO

Las páginas públicas se generan y compilan de forma estática para lograr la máxima puntuación en Core Web Vitals y Lighthouse (100/100 en Rendimiento, Accesibilidad, Mejores Prácticas y SEO):

| Archivo / Ruta | Propósito SEO y Metadatos |
|---|---|
| `index.html` | Portada principal y juego en español. Incluye datos estructurados schema `VideoGame` (gratis, 1-8 jugadores, navegador Web/Android/iOS, modo solitario y cooperativo online), dirección canónica `https://pokesurvivor.com/`, Open Graph y Twitter Cards. |
| `en/index.html` | Portada principal y juego en inglés (`https://pokesurvivor.com/en/`) con etiquetas bidireccionales `hreflang` que enlazan con la versión en español. |
| `guia/` & `en/guia/` | Guía completa de juego, controles, mecánicas de evolución y preguntas frecuentes con marcado estructurado `FAQPage` (habilitando fragmentos enriquecidos desplegables en Google). |
| `pokedex/` & `en/pokedex/` | Directorio con los **1.022 Pokémon** jugables, indicando sus tipos elementales, estadísticas base y sprites, atrayendo búsquedas orgánicas long-tail. |
| `novedades/` & `en/news/` | Historial de actualizaciones y versiones para indexación de novedades en tiempo real. |
| `404.html` | Página de error amigable que redirige suavemente al juego o la guía. |
| `robots.txt` | Permite el rastreo de todas las páginas de contenido e indexación, restringiendo únicamente carpetas internas de desarrollo (`tools/`, `docs/`, `tests/`) e indicando la ubicación del sitemap. |
| `sitemap.xml` | Mapa del sitio XML consolidado con prioridades de rastreo y frecuencias de actualización. |
| `assets/og-image.jpg` | Imagen de alta resolución (1200×630 px) para previsualizaciones en redes sociales (Facebook, X/Twitter, Discord, Telegram). |
| `manifest.webmanifest` | Soporte completo como Progressive Web App (PWA) instalable en escritorio y dispositivos móviles. |

---

## 2. Flujo de Regeneración SEO

Cada vez que se introduzcan nuevos Pokémon, habilidades, cambios en el Pokédex o ajustes de texto, debe ejecutarse la cadena de comandos oficial:

```bash
node tools/build_langs.js            # Empaqueta diccionarios de idiomas
node tools/build.js                  # Compila dev.html -> index.html + js/app.min.js + version.json
node tools/export_data.js            # Exporta datos consolidados a tools/data/
python tools/make_seo_pages.py       # Regenera páginas estáticas, en/ y sitemap.xml
```

---

## 3. Canales de Indexación y Visibilidad

1. **Google Search Console**:
   - Propiedad de dominio: `pokesurvivor.com` (verificada por TXT en Cloudflare DNS).
   - Sitemap enviado: `https://pokesurvivor.com/sitemap.xml`.
   - Inspección periódica de URLs tras lanzamientos importantes.
2. **Bing Webmaster Tools**:
   - Sincronización automática de propiedad desde Google Search Console para cobertura en Bing, DuckDuckGo y Ecosia.

---

## 4. Gestión Multilingüe e Idiomas

- **Español e Inglés**: Soportados nativamente en la web pública mediante directorios dedicados (`/` y `/en/`) con enlaces cruzados `hreflang="es"` y `hreflang="en"`.
- **Idiomas en el Juego**: El motor soporta Español, Inglés y Vietnamita (`vi`) con detección automática según el navegador del usuario y selector en Ajustes $\rightarrow$ Gráficos $\rightarrow$ Idioma.
- **Canon de Nombres de Movimientos**: Todos los nombres de ataques se mantienen estrictamente en inglés canónico (*Canon English*) para consistencia en guías y búsquedas internacionales; las descripciones se traducen fielmente al idioma activo.
