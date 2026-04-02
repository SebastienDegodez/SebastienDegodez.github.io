# 🎨 Design System — SebastienDegodez.github.io

Synthèse des éléments visuels extraits des dépôts source :
- [`SebastienDegodez/slide-marp`](https://github.com/SebastienDegodez/slide-marp) — thème de base
- [`SebastienDegodez/MCP.Pack`](https://github.com/SebastienDegodez/MCP.Pack) — thème étendu

Thème Marp utilisé : **Gaia** (mode `invert`) + surcharges `custom-default.css`.  
Format prêt à l'emploi : voir [`design-tokens.css`](./design-tokens.css).

---

## 🖌️ Palette de couleurs

| Rôle | Nom | Hex | Aperçu |
|---|---|---|---|
| Fond principal (invert) | `--color-dark` | `#455a64` | Bleu-gris ardoise |
| Texte principal (invert) | `--color-light` | `#fff8e1` | Blanc chaud / Cream |
| Accent primaire | `--color-primary` | `#0288d1` | Bleu vif |
| Accent secondaire / Highlight | `--color-secondary` | `#81d4fa` | Bleu clair |
| Muted / footer / code bg | `--color-dimmed` | `#dad8c8` | Cream grisé |
| Fond variante gaia | `--color-gaia-bg` | `#0288d1` | Bleu primaire |
| Muted variante gaia | `--color-gaia-dimmed` | `#cce2de` | Bleu-vert pâle |
| Rayure tableau | `--color-stripe` | `rgba(255,248,225,0.10)` | Cream translucide |

### Mode principal utilisé : `invert` (sombre)

```
Fond         : #455a64  ██████  bleu-gris ardoise
Texte        : #fff8e1  ██████  blanc chaud
Liens/strong : #81d4fa  ██████  bleu clair
Muted/footer : #dad8c8  ██████  cream grisé
Code bg      : #dad8c8  ██████  (même que muted)
Code text    : #455a64  ██████  (même que fond)
```

### Mode clair (light) — slides secondaires

```
Fond         : #fff8e1  ██████  blanc chaud
Texte        : #455a64  ██████  bleu-gris
Liens/strong : #0288d1  ██████  bleu vif
Muted        : #dad8c8  ██████  cream grisé
```

### Variante Gaia (accent bleu — slides spéciaux)

```
Fond         : #0288d1  ██████  bleu vif
Texte        : #fff8e1  ██████  blanc chaud
Highlight    : #81d4fa  ██████  bleu clair
Muted        : #cce2de  ██████  bleu-vert pâle
```

---

## 🖼️ Fonds de page

| Slide | Type de fond | Détail |
|---|---|---|
| Titre (première slide) | Image + overlay | `bg.jpg` à 70% d'opacité sur fond `#455a64` |
| Présentation auteur | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slide de fin | Image + overlay | `bg.jpg` à 70% d'opacité |
| Slides de contenu | Fond uni + gradient | `#455a64` + gradient 135° subtil |

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
| Code inline | 0.8 em | ~28 px |
| Bloc de code | 0.6 em | ~21 px |
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
Fond (code inline) : #dad8c8  (--color-dimmed)
Texte code inline  : #455a64  (--color-dark)
Fond pre           : #fff8e1  (--color-foreground)
Police             : Fira Code, monospace
Font-size pre      : 0.6 em
Padding pre        : 0.5 em
border-radius      : aucun défini
```

### Blockquote

```
Padding  : 0 1 em
Guillemets décoratifs (::before / ::after) : Times New Roman, bold, #dad8c8
```

### Tableau

```
Bordures  : 1 px solid #fff8e1
En-tête   : fond #fff8e1, texte #455a64
Rayures   : rgba(255,248,225, 0.10)
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
| Arrondis | `50%` pour les avatars uniquement — pas d'arrondi général sur les cards |
| Ombres | Aucune (design plat) |
| Bordures | Uniquement dans les tableaux (`1px solid`) |
| Couleur d'accentuation | Bleu clair `#81d4fa` pour les liens, `<strong>` dans les titres |
| Effet de fond | Gradient subtil 135° quasi-invisible |
| Superposition image | `opacity: 0.7` pour laisser lisible le texte par-dessus |
| Style global | **Flat design, sombre, minimaliste** |
| Thème Marp | Gaia + classe `invert` (dark mode par défaut) |

---

## 🚀 Utilisation pour le prototypage

### En CSS

Importer [`design-tokens.css`](./design-tokens.css) et utiliser les variables CSS :

```css
@import './design-tokens.css';

body {
  background-color: var(--color-background); /* #455a64 */
  color: var(--color-foreground);            /* #fff8e1 */
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

a { color: var(--color-link); }             /* #81d4fa */

code {
  font-family: var(--font-mono);
  background: var(--color-code-bg);          /* #dad8c8 */
  color: var(--color-code-text);             /* #455a64 */
}
```

### En Figma

Créer les styles de couleurs suivants :

| Style | Hex |
|---|---|
| Background/Primary | `#455a64` |
| Background/Accent | `#0288d1` |
| Text/Primary | `#fff8e1` |
| Text/Muted | `#dad8c8` |
| Accent/Primary | `#0288d1` |
| Accent/Highlight | `#81d4fa` |

Styles de texte :
- **Heading 1** : Lato 900, 63 px, `#fff8e1`
- **Heading 2** : Lato 900, 52 px, `#fff8e1`
- **Body** : Lato 400, 35 px, `#fff8e1`, line-height 1.35
- **Code** : Fira Code 400, 21 px, `#455a64` sur fond `#dad8c8`
- **Footer** : Lato 400, 23 px, `#dad8c8`
