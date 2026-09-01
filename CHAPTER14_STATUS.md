# Chapter 14 — सांख्यिकी

## Added
- `src/chapter14Learning.js` — 20 Hindi learning stages.
- `src/chapter14Practice.js` — 40 practice questions.
- `src/StatisticsEngine.jsx` — practice, challenge and test flow.

## QA
- Corrected a challenge question whose answer index did not match the stated explanation.
- Student-facing chapter content is Hindi only; mathematical notation remains standard.
- The content follows the Class 9 Hindi-medium topic scope of सांख्यिकी, using original explanations rather than copied textbook passages.

## Wiring status
- Chapter 14 is prepared but must be connected to `src/App.jsx` before it will appear in the visible Maths chapter menu.
- Before claiming completion, verify App imports, chapter list entry, Learn data shape (`lessons`), Practice/Challenge/Test routing, and syntax/build.

## User update
Run after a successful wiring commit:
```powershell
git pull
npm.cmd run dev
```
