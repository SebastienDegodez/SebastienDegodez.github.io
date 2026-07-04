# 🎨 Design System — SebastienDegodez.github.io

Système visuel **Tech Glass** — sombre, glassmorphism, animations subtiles.

Palette et classes de référence : [`assets/css/tech-glass.css`](./assets/css/tech-glass.css) (palette verte).
`design-tokens.css` réutilise la même palette et les mêmes tokens glass, en y ajoutant les
variables spécifiques aux présentations Marp (dimensions, typographie de slides, etc.), afin
de garder une identité visuelle cohérente entre le site et les présentations.

Sources originales :
- [`SebastienDegodez/slide-marp`](https://github.com/SebastienDegodez/slide-marp) — thème de base
- [`SebastienDegodez/MCP.Pack`](https://github.com/SebastienDegodez/MCP.Pack) — thème étendu

---

## 🖌️ Palette de couleurs

### Palette unique (Tech Glass Green)

Fichier de référence : [`assets/css/tech-glass.css`](./assets/css/tech-glass.css).
[`design-tokens.css`](./design-tokens.css) reprend exactement les mêmes valeurs pour rester cohérent.

| Rôle | Nom | Hex | Aperçu |
|---|---|---|---|
| Fond principal | `--color-background` | `#0e1618` | Noir profond bleu-vert |
| Texte principal | `--color-foreground` | `#e9f7ef` | Blanc menthe |
| Accent primaire | `--color-primary` | `#4ed58a` | Vert vif |
| Highlight / liens | `--color-highlight` | `#8be5b1` | Vert clair |
| Muted / footer | `--color-dimmed` | `#b8d0c1` | Vert grisé |
| Accent technique | `--color-tech-mint` | `#80cbc4` | Vert menthe |
| Rayure tableau | `--color-stripe` | `rgba(139,229,177,0.14)` | Vert translucide |

```
Fond         : #0e1618  ██████  noir profond bleu-vert
Texte        : #e9f7ef  ██████  blanc menthe
Accent       : #4ed58a  ██████  vert vif
Highlight    : #8be5b1  ██████  vert clair
Muted        : #b8d0c1  ██████  vert grisé
Tech mint    : #80cbc4  ██████  vert menthe
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
| Titre (première slide) | Image + overlay | `bg.jpg` à 70% d'opacité sur fond `#0e1618` |
| Présentation auteur | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slide de fin | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slides de contenu | Fond uni + gradient | `#0e1618` + gradient 135° subtil |

### Image de fond

- **Fichier** : `bg.jpg` (photo sombre, ambiance tech/nature, 138 KB)
- **URL** : `https://raw.githubusercontent.com/SebastienDegodez/slide-marp/refs/heads/main/presentation/images/bg.jpg`
- **Application** : opacité `0.7` — l'image ne sature pas le contenu textuel

### Gradient de fond (slides de contenu)

```css
background-image: linear-gradient(
  135deg,
  rgba(78, 213, 138, 0.08) 0%,
  rgba(78, 213, 138, 0.03) 50%,
  rgba(0, 0, 0, 0)    50%,
  rgba(0, 0, 0, 0.2) 100%
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
Fond (code inline) : #b8d0c1  (--color-dimmed)
Texte code inline  : #0e1618  (--color-dark)
Fond pre           : #e9f7ef  (--color-foreground)
Police             : Fira Code, monospace
Font-size inline   : 0.8 em  (Gaia natif)
Font-size pre      : 0.6 em  (surcharge MCP.Pack)
Padding pre        : 0.5 em
border-radius      : aucun défini
```

### Blockquote

```
Padding  : 0 1 em
Guillemets décoratifs (::before / ::after) : Times New Roman, bold, #b8d0c1
```

### Tableau

```
Bordures  : 1 px solid #e9f7ef
En-tête   : fond #e9f7ef, texte #0e1618
Rayures   : rgba(139,229,177, 0.14)
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
| Bordures | Glass border : `rgba(139,229,177,0.22)` |
| Glassmorphism | `backdrop-filter: blur(14px)` + fond semi-transparent + bordure lumineuse |
| Couleur d'accentuation | Vert `#8be5b1` pour les liens, `<strong>` |
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
  background-color: var(--color-background); /* #0e1618 */
  color: var(--color-foreground);            /* #e9f7ef */
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

a { color: var(--color-link); }             /* #8be5b1 */

code {
  font-family: var(--font-mono);
  background: var(--color-code-bg);          /* #b8d0c1 */
  color: var(--color-code-text);             /* #0e1618 */
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

| Token | Valeur |
|---|---|
| `--glass-bg` | `rgba(15,27,24,0.9)` |
| `--glass-bg-strong` | `rgba(10,20,18,0.95)` |
| `--glass-border` | `rgba(139,229,177,0.22)` |
| `--glass-border-strong` | `rgba(139,229,177,0.34)` |
| `--glass-highlight` | `rgba(233,247,239,0.12)` |
| `--glass-blur` | `14px` |
| `--glass-shadow` | `0 18px 60px rgba(0,0,0,0.42)` |
| `--glass-shadow-hover` | `0 24px 70px rgba(0,0,0,0.55)` |
| `--motion-fast` | `160ms ease` |
| `--motion-medium` | `260ms ease` |

### En Figma

Créer les styles de couleurs suivants :

**Palette Tech Glass (vert) :**

| Style | Hex |
|---|---|
| Background/Primary | `#0e1618` |
| Text/Primary | `#e9f7ef` |
| Text/Muted | `#b8d0c1` |
| Accent/Primary | `#4ed58a` |
| Accent/Highlight | `#8be5b1` |

Styles de texte :
- **Heading 1** : Lato 900, 63 px, `#e9f7ef`
- **Heading 2** : Lato 900, 52 px, `#e9f7ef`
- **Body** : Lato 400, 35 px, `#e9f7ef`, line-height 1.35
- **Code** : Fira Code 400, 21 px, `#0e1618` sur fond `#b8d0c1`
- **Footer** : Lato 400, 23 px, `#b8d0c1`
