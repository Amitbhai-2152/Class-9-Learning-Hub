# Science Chapters 1–15 Quality & QA Log

यह फ़ाइल Science 1–15 quality pass के बड़े चरणों को रिकॉर्ड करती है। हर बड़े बदलाव के साथ यहाँ तारीख, जाँच, पाई गई समस्या, किए गए सुधार और verification दर्ज किए जाएँगे।

## 2026-09-02 — Quality pass शुरू

- Scope: Science Chapters 1–15.
- Standard: `SCIENCE_CONTENT_STANDARD.md` के content, UI, answer-checking और QA नियम लागू रहेंगे।
- इस pass में content depth, Hindi clarity, concept-specific visuals/animations, question/answer-key consistency, routes/imports, responsive safety और build/CI verification जाँचे जाएँगे।
- Browser-level testing उपलब्ध नहीं होने पर उसे पूर्ण browser verification नहीं माना जाएगा।
- Major steps इस file में क्रमशः दर्ज किए जाएँगे।

### Step 1 — Permanent progress tracking + safer runtime recovery

**Committed:** `c3b5393` → `661daa7` → `1d1c30f`

- [x] QA log created in the repository.
- [x] `AppErrorBoundary` added around the whole React app so render-time chapter failures show a recovery screen instead of a blank page.
- [x] Existing local progress is not cleared by the recovery screen.
- [x] `main2.jsx` now mounts the app through the recovery boundary.
- [x] Science content standard remains the acceptance checklist.

### Step 2 — Automated Science content sanity checks

**Committed:** `9758ab1` → `a38fa92` → `36fc17b`

- [x] Added `scripts/qaScienceContent.mjs`.
- [x] QA checks all 15 `scienceChapter*Learning.js` files.
- [x] Checks for missing lesson arrays, suspiciously small lesson/body counts, and invalid numeric answer indices where options are present.
- [x] Added `npm run qa:science`.
- [x] CI workflow now runs Science content QA before the Vite build.

### Step 3 — QA scanner false-positive correction

**Committed:** `d849c5d` → `bc016f6`

- [x] First scanner run exposed valid alternate lesson data shapes in Chapters 11 and 14; the scanner was corrected rather than changing valid chapter content.
- [x] Second scanner run exposed the intentional empty fallback object in Chapter 12 assessment (`options:[]`, `answer:-1`); this is not a real bank question, so the scanner now explicitly ignores that safe fallback.
- [x] The corrected scanner completed successfully across the Science learning files and engine scans.

### Step 4 — CI verification

**Workflow run:** `33632136958` (run #304)

- [x] Dependencies installed successfully.
- [x] `npm run qa:science` passed.
- [x] `npm run build` passed.
- [x] This verifies repository-level content sanity and compile/build integrity for the current Science 1–15 state.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 5 — Science subject landing visual energy upgrade

**Committed:** `dcd6cf5` → log recorded in `14dc19d`

- [x] Added a dedicated Science visual treatment to the subject landing page through `subject-overrides.css`, which is already globally loaded by the project entry point.
- [x] Upgraded the Science header with a deep science-inspired gradient, subtle particle field, glow, and exploration/mastery messaging.
- [x] Added a focused animated energy rail above the chapter grid.
- [x] Restyled Science chapter cards with a cohesive laboratory/environment palette, stronger depth, hover lift, accent variation, and clearer chapter hierarchy.
- [x] Added lightweight staggered entry motion so the 15 chapters feel like an interactive learning journey rather than a plain list.
- [x] Added mobile-specific sizing and `prefers-reduced-motion` protection.
- [x] Existing chapter routing and lesson logic were left untouched by this visual-only pass.

### Step 6 — Post-visual CI verification

**Workflow run:** `33632684524` (run #307, commit `14dc19d`)

- [x] Science QA passed.
- [x] Vite application build passed.
- [x] Visual-only Science landing changes are compile/build verified.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 7 — Practice bank visibility correction

**Commits:** `fd4d1c5` (Ch7), `a47fc7c` (shared Ch8–11 engine), `3581378` (Ch12), `8a56b43` (Ch13), `08a0a9c` (Ch14), `34a9075` (Ch15).

- [x] Audited the Science assessment engines instead of assuming the UI was the only problem.
- [x] Found the real issue: later Science Practice mode was artificially capped at 15 questions even when the underlying bank contained more questions.
- [x] Ch7 Practice now uses its full 23-question bank.
- [x] Ch8–11 shared Practice engine now uses the full chapter question bank; Test remains capped at 20.
- [x] Ch12 Practice now uses all 20 available questions.
- [x] Ch13 Practice now uses all 20 available questions.
- [x] Ch14 Practice now uses all 20 available questions.
- [x] Ch15 Practice now uses all 20 available questions.
- [x] Practice/Challenge/Test launch cards now show the real available counts instead of misleading fixed “15” labels where applicable.
- [x] Test mode remains limited to 20 questions, while Challenge remains limited to 10.
- [x] Final CI run #316 (`33634264854`) passed both Science content QA and the Vite application build.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 8 — Science mode action routing correction

**Commits:** `06b135f` → `7659128`

- [x] Found a separate interaction defect: the four labels `📖 सीखें`, `📝 अभ्यास`, `🔥 चुनौती`, and `🎯 टेस्ट` on Science chapter cards were only visual spans inside one parent chapter button.
- [x] Clicking a visible mode label therefore triggered the parent chapter-open action instead of launching the selected mode.
- [x] Added `scienceModeRouter.js` to capture Science chapter-card mode clicks, remember the selected mode, open the chapter normally, then launch the matching mode button after the chapter page mounts.
- [x] Wired the router from `main2.jsx` without changing chapter content or assessment data.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 9 — Chapter exit/completion navigation hardening

**Commit:** `66ee97a`

- [x] Re-audited Science navigation across the chapter stack: chapter launch → mode → assessment/learning → chapter menu → subject chapter list.
- [x] Found a real Chapter 1 defect: the completed `सीखें` screen wired its `अभ्यास पर जाएँ →` action to the outer chapter `onBack`, which incorrectly exited the chapter instead of returning to the chapter menu.
- [x] Added a guarded interaction fix so that exact completion action returns to the Chapter 1 menu (`← अध्याय`) rather than jumping to the subject-level screen.
- [x] Hardened the Science mode router so delayed mode-launch observers are cancelled on navigation changes and only `.science-mode-grid`/known Science mode buttons can be targeted; chapter-card buttons can no longer be accidentally re-triggered by a stale pending mode request.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 10 — Science navigation animation + responsive button structure

**Commits:** `f3b0844` → `1daf65a`

- [x] Added a dedicated `science-navigation.css` layer so navigation/button improvements stay isolated from chapter-content engines.
- [x] Added a restrained science-themed animated orbit treatment to Science chapter navigation and learning navigation.
- [x] Added stronger hover, active, focus-visible and touch feedback to Science navigation buttons.
- [x] Reworked the four Science mode cards into a clearer icon → title → count → action structure using the existing DOM, without introducing nested interactive controls.
- [x] Added mobile-specific sizing so the mode controls remain compact and tappable on narrow screens.
- [x] Added `prefers-reduced-motion` handling so decorative motion is disabled for users who request reduced motion.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 11 — Science subject action interaction hardening

**Commits:** `c145b0e` → `f6d382e` → `681519b`

- [x] Fixed the actual entry-point integration so `subject-overrides.css` is loaded from `main2.jsx`, the real application entry used by `index.html`.
- [x] Kept the existing React DOM tree intact rather than performing unsupported runtime DOM replacement.
- [x] Science chapter-card mode labels now receive `role="button"`, keyboard focus, and explicit mode accessibility labels at runtime.
- [x] Click events on `📖 सीखें`, `📝 अभ्यास`, `🔥 चुनौती`, and `🎯 टेस्ट` are isolated from the parent chapter button so the selected mode is not accidentally replaced by a plain chapter open.
- [x] Added Enter/Space keyboard activation for the mode controls.
- [x] Added a small press-feedback animation while preserving reduced-motion behavior.
- [x] Existing delayed mode-launch routing remains guarded and scoped to Science chapter mode controls.
- [x] Latest application CI run #329 (`33658382058`) passed Science content QA and the Vite build for commit `681519b`.
- [ ] Full browser/device interaction test is still not available in this environment.

### Step 12 — Final Science mode/exit audit

**Commit:** `6310e3c`

- [x] Re-verified the Chapter 1 and Chapter 2 wrapper/core routing contracts.
- [x] Confirmed the shared `ScienceNextChapterEngine` returns assessments directly to the chapter menu through its `onBack` contract; this covers the later shared-engine chapters using that component.
- [x] Found the remaining Chapter 2-specific defect: the core `Quiz` was hardcoding assessment back navigation to `setMode('learn')`, which could send Practice/Challenge/Test users into the Learn page instead of the chapter menu.
- [x] Replaced that hardcoded Learn fallback with the core `onBack` callback supplied by the Chapter 2 wrapper.
- [x] Removed the temporary Chapter 2-specific router interception that had become unnecessary after the clean core fix.
- [x] Verified the Chapter 2 subject launch still passes `initialMode` into the core, so direct `अभ्यास / चुनौती / टेस्ट` launch remains mode-specific.
- [ ] Full browser/device interaction test is still not available in this environment.

### Status
- [x] Quality-pass log created.
- [x] Automated content/data-shape audit.
- [x] Runtime render recovery added.
- [x] CI QA + build verification.
- [x] Science subject landing visual energy upgrade.
- [x] Practice bank visibility correction implemented across Science 7–15.
- [x] Science chapter-card mode routing correction implemented.
- [x] Science chapter exit/completion navigation hardening implemented.
- [x] Science navigation animation + responsive button structure implemented.
- [x] Science subject action interaction hardening implemented.
- [x] Chapter 2 assessment exit routing corrected at the core component level.
- [ ] Full browser/device verification when an interactive browser environment is available.
- [ ] Deeper manual content-quality pass for every chapter.

## Notes

This log is intentionally kept in the repository so future chapter work can continue from a recorded state instead of relying only on chat history.
