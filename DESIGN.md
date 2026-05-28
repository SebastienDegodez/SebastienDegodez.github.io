# 🎨 Design System — SebastienDegodez.github.io

Système visuel **Tech Glass** — sombre, glassmorphism, animations subtiles.

Deux déclinaisons chromatiques :
- **Site web** (`assets/css/tech-glass.css`) — palette verte
- **Présentations Marp** (`design-tokens.css`) — palette bleue

Sources originales :
- [`SebastienDegodez/slide-marp`](https://github.com/SebastienDegodez/slide-marp) — thème de base
- [`SebastienDegodez/MCP.Pack`](https://github.com/SebastienDegodez/MCP.Pack) — thème étendu

---

## 🖌️ Palette de couleurs

### Site web (Tech Glass Green)

Fichier : [`assets/css/tech-glass.css`](./assets/css/tech-glass.css)

| Rôle | Nom | Hex | Aperçu |
|---|---|---|---|
| Fond principal | `--color-background` | `#0e1618` | Noir profond bleu-vert |
| Texte principal | `--color-foreground` | `#e9f7ef` | Blanc menthe |
| Accent primaire | `--color-primary` | `#4ed58a` | Vert vif |
| Highlight / liens | `--color-highlight` | `#8be5b1` | Vert clair |
| Muted / footer | `--color-dimmed` | `#b8d0c1` | Vert grisé |
| Rayure tableau | `--color-stripe` | `rgba(139,229,177,0.14)` | Vert translucide |

```
Fond         : #0e1618  ██████  noir profond bleu-vert
Texte        : #e9f7ef  ██████  blanc menthe
Accent       : #4ed58a  ██████  vert vif
Highlight    : #8be5b1  ██████  vert clair
Muted        : #b8d0c1  ██████  vert grisé
```

### Présentations (Tech Glass Blue)

Fichier : [`design-tokens.css`](./design-tokens.css)

| Rôle | Nom | Hex | Aperçu |
|---|---|---|---|
| Fond principal | `--color-dark` | `#0f1722` | Bleu nuit profond |
| Texte principal | `--color-light` | `#eef6ff` | Blanc glacé |
| Accent primaire | `--color-primary` | `#24b5ff` | Bleu électrique |
| Accent secondaire / Highlight | `--color-secondary` | `#7fd3ff` | Bleu clair |
| Muted / footer / code bg | `--color-dimmed` | `#b7c6d8` | Bleu-gris pâle |
| Accent technique | `--color-tech-mint` | `#80cbc4` | Vert menthe |
| Fond variante accent | `--color-gaia-bg` | `#24b5ff` | Bleu primaire |
| Muted variante accent | `--color-gaia-dimmed` | `#c8d8e6` | Bleu-gris pâle |
| Rayure tableau | `--color-stripe` | `rgba(127,211,255,0.16)` | Bleu translucide |

```
Fond         : #0f1722  ██████  bleu nuit profond
Texte        : #eef6ff  ██████  blanc glacé
Accent       : #24b5ff  ██████  bleu électrique
Highlight    : #7fd3ff  ██████  bleu clair
Muted        : #b7c6d8  ██████  bleu-gris pâle
Tech mint    : #80cbc4  ██████  vert menthe
```

### Variante accent (slides spéciaux)

```
Fond         : #24b5ff  ██████  bleu électrique
Texte        : #eef6ff  ██████  blanc glacé
Highlight    : #7fd3ff  ██████  bleu clair
Muted        : #c8d8e6  ██████  bleu-gris pâle
```

---

## 🖼️ Fonds de page

### Site web

```css
background-color: #0e1618;
background-image: radial-gradient(circle at 80% 10%, rgba(78, 213, 138, 0.12), transparent 28%),
                  linear-gradient(135deg, rgba(78, 213, 138, 0.08) 0%, rgba(78, 213, 138, 0.03) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.2) 100%);
```
> Fond noir profond avec halo vert subtil et gradient directionnel.

### Présentations

| Slide | Type de fond | Détail |
|---|---|---|
| Titre (première slide) | Image + overlay | `bg.jpg` à 70% d'opacité sur fond `#0f1722` |
| Présentation auteur | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slide de fin | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slides de contenu | Fond uni + gradient | `#0f1722` + gradient 135° subtil |

### Image de fond

- **Fichier** : `bg.jpg` (photo sombre, ambiance tech/nature, 138 KB)
- **URL** : `https://raw.githubusercontent.com/SebastienDegodez/slide-marp/refs/heads/main/presentation/images/bg.jpg`
- **Application** : opacité `0.7` — l'image ne sature pas le contenu textuel

### Gradient de fond (slides de contenu)

```css
background-image: linear-gradient(
  135deg,
  rgba(136, 136, 136, 0)     0%,
  rgba(136, 136, 136, 0.02)  50%,
  rgba(255, 255, 255, 0)     50%,
  rgba(255, 255, 255, 0.05) 100%
);
```
> Effet très subtil, quasiment invisible — donne juste une légère profondeur aux slides.

---

## ✍️ Typographie

### Polices

| Rôle | Famille | Source |
|---|---|---|
| Corps & titres | **Lato**, 'Avenir Next', Avenir, 'Trebuchet MS', 'Segoe UI', sans-serif | [Bunny Fonts](https://fonts.bunny.net) |
| Code & blocs | **Fira Code**, 'Roboto Mono', monospace | Surcharge `custom-default.css` |
| Citations (guillemets) | Times New Roman, serif | Gaia natif |

### Hiérarchie des tailles (base 35 px)

| Élément | Em | ≈ px |
|---|---|---|
| `h1` | 1.8 em | ~63 px |
| `h2` | 1.5 em | ~52 px |
| `h3` | 1.3 em | ~45 px |
| `h4` | 1.1 em | ~38 px |
| `h5` | 1.0 em | ~35 px |
| `h6` | 0.9 em | ~31 px |
| Code inline | 0.8 em | ~28 px | Gaia natif |
| Bloc de code (`pre`) | 0.6 em | ~21 px | Surcharge MCP.Pack |
| Footer / header | 66 % | ~23 px |

### Espacement texte

```
line-height    : 1.35
letter-spacing : 1.25 px
```

---

## 📐 Dimensions & Espacement

### Formats de slides

| Format | Largeur | Hauteur |
|---|---|---|
| 16:9 (défaut) | 1280 px | 720 px |
| 4:3 | 960 px | 720 px |

### Zones

```
Padding intérieur des slides : 70 px
Hauteur header/footer        : 70 px
Line-height header/footer    : 50 px
```

---

## 🔘 Composants

### Carte auteur (`div#presentation`)

```
Layout     : flexbox, centré horizontalement
Avatar     : 5rem × 5rem, border-radius 50% (cercle)
Espacement : margin-right 1.1 em entre avatar et texte
Nom (h1)   : margin-top 0, text-align left
Titre (h5) : text-align left
```

### Grille 2 colonnes (`.columns`)

```
display               : grid
grid-template-columns : repeat(2, minmax(0, 1fr))
gap                   : 1 rem
```

### Slide de fin (`div#end`)

```
Layout : flexbox, centré horizontalement
Usage  : QR code centré
```

### Blocs de code (`pre`, `code`)

```
Fond (code inline) : #b7c6d8  (--color-dimmed)
Texte code inline  : #0f1722  (--color-dark)
Fond pre           : #eef6ff  (--color-foreground)
Police             : Fira Code, monospace
Font-size inline   : 0.8 em  (Gaia natif)
Font-size pre      : 0.6 em  (surcharge MCP.Pack)
Padding pre        : 0.5 em
border-radius      : aucun défini
```

### Blockquote

```
Padding  : 0 1 em
Guillemets décoratifs (::before / ::after) : Times New Roman, bold, #b7c6d8
```

### Tableau

```
Bordures  : 1 px solid #eef6ff
En-tête   : fond #eef6ff, texte #0f1722
Rayures   : rgba(127,211,255, 0.16)
```

### Icônes

```
Library : Font Awesome 6.7.2
CDN     : https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css
Usage   : <i class="fa-brands fa-github"></i>
```

---

## 🔲 Principes de style globaux

| Principe | Valeur |
|---|---|
| Arrondis | `6px` général (`--radius`), `10px` cards (`--radius-card`), `50%` avatars, `999px` chips |
| Ombres | Glass shadow : `0 18px 60px rgba(0,0,0,0.42)` / hover `0 24px 70px rgba(0,0,0,0.55)` |
| Bordures | Glass border : `rgba(139,229,177,0.22)` site / `rgba(127,211,255,0.26)` slides |
| Glassmorphism | `backdrop-filter: blur(14px)` + fond semi-transparent + bordure lumineuse |
| Couleur d'accentuation | Vert `#8be5b1` (site) / Bleu `#7fd3ff` (slides) pour les liens, `<strong>` |
| Effet de fond | Radial gradient + overlay directionnel (site) / gradient 135° subtil (slides) |
| Superposition image | `opacity: 0.7` pour laisser lisible le texte par-dessus |
| Style global | **Tech Glass — sombre, glassmorphism, animations subtiles** |
| Transitions | `160ms ease` (fast) / `260ms ease` (medium) |
| Thème Marp | Gaia + classe `invert` (dark mode par défaut) |

---

## 🚀 Utilisation pour le prototypage

### En CSS (site web)

Importer [`assets/css/tech-glass.css`](./assets/css/tech-glass.css) — inclut le reset, les glass primitives, la nav et le footer :

```css
<link rel="stylesheet" href="/assets/css/tech-glass.css">
```

### En CSS (présentations)

Importer [`design-tokens.css`](./design-tokens.css) et utiliser les variables CSS :

```css
@import './design-tokens.css';

body {
  background-color: var(--color-background); /* #0f1722 */
  color: var(--color-foreground);            /* #eef6ff */
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

a { color: var(--color-link); }             /* #7fd3ff */

code {
  font-family: var(--font-mono);
  background: var(--color-code-bg);          /* #b7c6d8 */
  color: var(--color-code-text);             /* #0f1722 */
}
```

### Glass Primitives

Classes utilitaires pour le glassmorphism :

| Classe | Usage |
|---|---|
| `.glass-nav` | Barre de navigation fixe |
| `.glass-surface` | Surface vitrée générique |
| `.glass-card` | Carte avec hover (translateY + border glow) |
| `.glass-chip` | Badge / tag arrondi |

```css
/* Fallback automatique quand backdrop-filter n'est pas supporté */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  /* → background: var(--glass-bg-strong) + border-color: var(--glass-border-strong) */
}
```

### Tokens Glass V2

| Token | Valeur (site) | Valeur (slides) |
|---|---|---|
| `--glass-bg` | `rgba(15,27,24,0.9)` | `rgba(17,28,40,0.88)` |
| `--glass-bg-strong` | `rgba(10,20,18,0.95)` | `rgba(12,22,33,0.94)` |
| `--glass-border` | `rgba(139,229,177,0.22)` | `rgba(127,211,255,0.26)` |
| `--glass-border-strong` | `rgba(139,229,177,0.34)` | `rgba(127,211,255,0.4)` |
| `--glass-highlight` | `rgba(233,247,239,0.12)` | `rgba(238,246,255,0.12)` |
| `--glass-blur` | `14px` | `14px` |
| `--glass-shadow` | `0 18px 60px rgba(0,0,0,0.42)` | idem |
| `--glass-shadow-hover` | `0 24px 70px rgba(0,0,0,0.55)` | idem |
| `--motion-fast` | `160ms ease` | idem |
| `--motion-medium` | `260ms ease` | idem |

### En Figma

Créer les styles de couleurs suivants :

**Site web (vert) :**

| Style | Hex |
|---|---|
| Background/Primary | `#0e1618` |
| Text/Primary | `#e9f7ef` |
| Text/Muted | `#b8d0c1` |
| Accent/Primary | `#4ed58a` |
| Accent/Highlight | `#8be5b1` |

**Présentations (bleu) :**

| Style | Hex |
|---|---|
| Background/Primary | `#0f1722` |
| Background/Accent | `#24b5ff` |
| Text/Primary | `#eef6ff` |
| Text/Muted | `#b7c6d8` |
| Accent/Primary | `#24b5ff` |
| Accent/Highlight | `#7fd3ff` |

Styles de texte :
- **Heading 1** : Lato 900, 63 px, `#eef6ff`
- **Heading 2** : Lato 900, 52 px, `#eef6ff`
- **Body** : Lato 400, 35 px, `#eef6ff`, line-height 1.35
- **Code** : Fira Code 400, 21 px, `#0f1722` sur fond `#b7c6d8`
- **Footer** : Lato 400, 23 px, `#b7c6d8`
