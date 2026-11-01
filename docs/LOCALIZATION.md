# Unified Game Localization Architecture

Documentation of the multi-language localization framework and translation protocols for **PokéSurvivor**.

---

## 1. Supported Languages & Architecture

The game supports seamless dynamic localization with zero runtime performance cost:
- **Spanish (`es`)**: Base authoring language, bundled inside `app.min.js`.
- **English (`en`)**: Primary international language, bundled inside `app.min.js` (`js/data/lang-en.js`). Also acts as the universal fallback layer for any missing translation keys in other languages.
- **Vietnamese (`vi`)**: Dedicated Asian locale (`js/data/lang-vi.js`), dynamically compiled into `js/lang/vi.js` via `tools/build_langs.js` and loaded ahead-of-time by `js/core/locales.js`.

---

## 2. Strict Translation Rules & Canonical Standards

1. **Canon English Move Names (Universal Rule)**:
   - **All Pokémon move names MUST remain strictly in official canon English** across all languages (e.g., *Thousand Arrows*, *Plasma Fists*, *Core Enforcer*, *Dragon Ascent*, *Earthquake*, *Close Combat*, *Thunder Punch*).
   - Move names are NEVER translated into Vietnamese or Spanish in user-facing HUDs, level-up cards, or Pokédex tooltips.
   - **Move Descriptions** MUST be faithfully translated into the player's active language.
2. **Player Names & Protected Tokens**:
   - Player usernames and chat messages use `translate="no"` and are drawn via `rawCanvas` to prevent machine translation from corrupting nicknames.
   - Text patterns with `{name}` preserve the player's username without translation.
   - Text patterns with `{x}` translate the dynamic payload inside the slot.
3. **Move Affinity Warnings (`fitNote`)**:
   - Incompatible moves (penalty when physical/special damage does not match the Pokémon's best offensive stat) must clearly display warning badges:
     * English: `⚠ (Reduced to {x}% effectiveness: this Pokémon performs better with {x} attacks)`
     * Vietnamese: `⚠ (Giảm hiệu suất còn {x}%: Pokémon này đánh mạnh hơn bằng chiêu {x})`

---

## 3. Localization Pipeline & Tools

### Compiling Language Dictionaries
When adding or updating translations in `js/data/lang-vi.js` or `js/data/lang-en.js`:
```bash
node tools/build_langs.js
```
This script validates dictionary integrity and writes the production distribution to `js/lang/vi.js`.

### Validating Coverage & Placeholder Contracts
```bash
node --test tests/i18n.test.cjs
```
This automated test suite verifies:
- Complete key coverage between source strings and target dictionaries.
- Exact match of `{x}` and `{name}` placeholder counts in every sentence.
- Changelog entry translation pairs in both Spanish and Vietnamese.
- Locale precedence and fallback behavior.

---

## 4. DOM and Canvas Translation Lifecycle

- `js/core/locales.js`: Runs before main game scripts, determines active locale from `localStorage.getItem('ps.lang')`, URL pathname (`/en/`), or browser navigator language.
- `js/core/i18n.js`:
  - Hooks into `CanvasRenderingContext2D.prototype.fillText` and `measureText` to translate canvas UI strings on the fly with string caching (>4000 entries).
  - Uses a `MutationObserver` on `document.body` to auto-translate dynamic DOM elements (badges, modals, tooltips) while respecting `translate="no"`.
- Locale Switching: Selecting a new language in Settings writes `ps.lang` and reloads the page.
