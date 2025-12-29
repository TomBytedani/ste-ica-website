# Visual and Design Enhancements

This document proposes visual and design improvements for the current website. It is scoped to the existing Next.js and Tailwind setup and aims to keep the tone calm, professional, and trustworthy.

## Goals
- Strengthen first impression with a more intentional hero composition
- Increase visual hierarchy and rhythm across sections
- Improve brand personality with a more cohesive color and typography system
- Add subtle motion to guide attention without feeling busy
- Maintain accessibility and readability across devices

## Quick Wins (Low Effort)
- Tighten typography scale and line lengths in key sections for readability
- Add a soft background gradient or texture to break up large white areas
- Introduce consistent section separators (subtle lines, shadows, or curved dividers)
- Improve button hierarchy (primary, secondary, and text variants) with clear spacing rules
- Add a short trust strip below the hero (registration, location, years of experience)

## Medium Effort Enhancements
- Create a simple brand palette with 2-3 supporting tones for backgrounds and accents
- Add a reusable icon set that matches the tone (thin stroke, rounded ends)
- Refine the card system with more distinct elevation and hover states
- Add a compact testimonial block or quote band for social proof
- Improve the contact form with inline validation and a clear success state

## Larger Bets
- Commission or create a custom illustration style to unify sections
- Build a minimal design system page that documents tokens and components
- Add a narrative scroll section on the homepage that blends text with imagery
- Explore a photography direction with consistent color grading and framing

## Section-Level Suggestions
- Hero: Add a soft gradient overlay or a subtle pattern behind the image to add depth. Consider a split layout with a short value statement and a single, strong CTA.
- Why Psychologist: Use a wider text column and add a small visual anchor (icon or photo) to reduce the block of text.
- Practical Info: Convert items to a compact card grid with matching icons and equal height.
- Journey: Present as a 3-step timeline with icons and short labels for scannability.
- Intervention Areas: Use pill chips or a two column layout with category headers.
- Contact: Add a short reassurance line about privacy and response time. Consider an alternate background to set it apart.

## Motion and Micro-Interactions
- Staggered reveal on section entry (fade up, 150-250ms)
- CTA hover that slightly elevates the button and increases contrast
- Image hover with subtle zoom (2-3 percent) for card images

## Accessibility and Clarity
- Keep body text at 16-18px with 1.6 line height
- Ensure color contrast meets WCAG AA for text and buttons
- Maintain visible focus states and skip-to-content link styling

## Implementation Notes
- Update design tokens in `src/app/globals.css`
- Apply layout and section changes in `src/components/sections/*`
- Adjust navigation and footer styling in `src/components/layout/*`
- Place new imagery or patterns in `public/images`

