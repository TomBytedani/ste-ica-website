# Image Assets - Stefano Icardi Website

**Downloaded:** 2025-12-29  
**Source:** https://stefanoicardi.com (WordPress.com)

---

## Directory Structure

```
assets/images/
├── profile/
│   └── stefano-icardi-profile.png    # Main hero profile photo
├── heroes/
│   └── chi-sono-forest-path.png      # Chi Sono page hero background
├── decorative/
│   ├── tree-nature.webp              # "Perché rivolgersi" section
│   ├── blurred-profile.jpg           # "Come Lavoro" section
│   ├── house-illustration.png        # "Quando chiedere aiuto" card
│   ├── movie-frame.png               # "Durata e svolgimento" card
│   ├── walkway-pier.png              # "Frequenza delle sedute" card
│   ├── forest-path.jpg               # "Percorso psicologico" section
│   ├── field-landscape.jpg           # "Percorso psicologico" section
│   ├── trees-looking-up.jpg          # "Percorso psicologico" section
│   ├── leaf-water-drops.png          # Chi Sono page decorative
│   └── forest-canopy.jpg             # Chi Sono page decorative
└── podcast-cover.jpg                 # Blog/Podcast page cover art (PALOMBARI)
```

---

## Image Inventory

| Filename | Size | Page | Section | Notes |
|----------|------|------|---------|-------|
| `profile/stefano-icardi-profile.png` | 929 KB | Homepage | Hero | Main professional portrait |
| `heroes/chi-sono-forest-path.png` | 1.7 MB | Chi Sono | Hero | Full-width background |
| `decorative/tree-nature.webp` | 372 KB | Homepage | Why Psychologist | Nature tree image |
| `decorative/blurred-profile.jpg` | 244 KB | Homepage | Come Lavoro | Artistic blurred photo |
| `decorative/house-illustration.png` | 2.1 MB | Homepage | Quando chiedere aiuto | Film still (La Casa di Jack) |
| `decorative/movie-frame.png` | 1.1 MB | Homepage | Durata e svolgimento | Film still (Nolan) |
| `decorative/walkway-pier.png` | 1.6 MB | Homepage | Frequenza sedute | Pier/walkway image |
| `decorative/forest-path.jpg` | 76 KB | Homepage | Percorso psicologico | Film still (A Hidden Life) |
| `decorative/field-landscape.jpg` | 204 KB | Homepage | Percorso psicologico | Field landscape |
| `decorative/trees-looking-up.jpg` | 121 KB | Homepage | Percorso psicologico | Trees from below |
| `decorative/leaf-water-drops.png` | 1.7 MB | Chi Sono | Body | Nature close-up |
| `decorative/forest-canopy.jpg` | 153 KB | Chi Sono | Body | Film still (Voyage of Time) |
| `podcast-cover.jpg` | 158 KB | Blog | Podcast | PALOMBARI podcast artwork |

---

## Optimization Notes

Many of these images are quite large (especially PNGs over 1MB). Before production use:

1. **Convert PNGs to WebP** for smaller file sizes
2. **Resize to max needed dimensions** (e.g., 1920px width for hero)
3. **Use `next/image`** for automatic optimization in Next.js
4. **Consider lazy loading** decorative images below the fold

### Suggested Optimized Structure

```
public/images/
├── profile.webp           # Optimized hero portrait
├── hero-chi-sono.webp     # Optimized about page hero
├── decorative/
│   └── [optimized images]
└── podcast-cover.webp     # Optimized podcast art
```

---

## Cinematic Inspirations

Several decorative images appear to be stills from acclaimed films:
- **La Casa di Jack** (The House That Jack Built)
- **A Hidden Life** (Terrence Malick)
- **Voyage of Time** (Terrence Malick)
- **Various Nolan films**

This creates a distinctive, artistic visual identity that should be preserved in the redesign.

---

## Usage in Components

```tsx
// Example usage in Next.js
import Image from 'next/image';
import profilePhoto from '@/assets/images/profile/stefano-icardi-profile.png';

export function Hero() {
  return (
    <Image
      src={profilePhoto}
      alt="Dott. Stefano Icardi, Psicologo"
      width={500}
      height={600}
      priority // Above the fold
    />
  );
}
```
