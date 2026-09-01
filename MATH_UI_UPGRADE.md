# Maths Section UI Upgrade

## Current status
The Class 9 Mathematics section now has an immersive visual layer designed specifically for the maths landing page.

### Added
- `src/MathSectionVisuals.jsx`
  - `MathSectionHero` for the maths landing page
  - `MathChapterDecor` for chapter cards
  - animated geometry, formula, orbit, spark and progress decorations
- `src/math-section.css`
  - responsive maths hero styling
  - animated visual board
  - chapter-card hover depth and decorative glow
  - mobile layout and reduced-motion support
- `src/App.jsx`
  - imports the new maths visual components and stylesheet
  - displays the maths hero only for the Maths subject page
  - adds visual chapter art to each Maths chapter card
  - keeps all 15 Maths chapters visible and wired to their existing learning/assessment engines

## Design rule
- Student-facing chapter teaching content remains simple Hindi.
- Normal website/system labels may remain English or Hinglish.
- Visuals should explain mathematical ideas, not be decoration only.
- Animations must be subtle, responsive, and disabled/reduced when the user prefers reduced motion.

## Reference direction
A generated visual mockup was used as a design reference for the immersive Maths atmosphere: dark study-space background, glowing maths diagrams, chapter progress, rounded learning cards, motivational student-study scene, and decorative geometry.

## Next UI work
1. Add chapter-specific visual diagrams inside Learn lessons where useful.
2. Improve mathematical illustrations for coordinate geometry, triangles, circles, constructions, statistics and probability.
3. Audit the Maths section on mobile and laptop for spacing, touch targets, overflow and button layering.
4. Keep Learn data on the `lessons` property so it renders correctly in `LearningEngine`.
