# Chapter 13 Status — पृष्ठीय क्षेत्रफल एवं आयतन

## Completed
- `src/chapter13Learning.js`: 24 structured Hindi-first learning steps with formulas, examples, visual learning cards, daily-life applications, and quick checks.
- `src/chapter13Practice.js`: 40 practice questions with explanations and checked answer indexes.
- `src/SurfaceVolumeEngine.jsx`: practice, challenge, and test flow with answer feedback and XP.

## Language rule
Student-facing Chapter 13 teaching content is Hindi only. Mathematical notation such as `r`, `h`, `l`, `π`, `cm²`, and `cm³` is standard notation.

## Scope
The chapter follows the Class 9 sequence for Unit 13, पृष्ठीय क्षेत्रफल एवं आयतन, including cuboid, cube, cylinder, cone, sphere, hemisphere, unit discipline, and volume preservation during remoulding.

## Remaining wiring
`src/App.jsx` must still import `chapter13Learning` and `SurfaceVolumeEngine`, add `पृष्ठीय क्षेत्रफल एवं आयतन` to the Maths chapter list, and route its Learn/Practice/Challenge/Test modes before Chapter 13 is considered visible and complete.

## QA rule
Before claiming completion, verify the App wiring and run the local Vite build. Do not repeat the earlier `lessons` vs `sections` mismatch; Chapter 13 learning data already uses `lessons`.
