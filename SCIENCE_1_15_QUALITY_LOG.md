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

**Commits:** `fd4d1c5` (Ch7), `a47fc7c` (shared Ch8–11 engine), `3581378` (Ch12), `8a56b43` (Ch13), `08a0a9c` (Ch14), `34a9075` (Ch15), followed by this log update.

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
- [ ] Final CI verification of this batch is still pending.
- [ ] Full browser/device interaction test is still not available in this environment.

### Status
- [x] Quality-pass log created.
- [x] Automated content/data-shape audit.
- [x] Runtime render recovery added.
- [x] CI QA + build verification before the Practice fix.
- [x] Science subject landing visual energy upgrade.
- [x] Practice bank visibility correction implemented across Science 7–15.
- [ ] Final CI verification of the current head.
- [ ] Deeper manual content-quality pass for every chapter.
- [ ] Browser/device verification when an interactive browser environment is available.

## Notes

This log is intentionally kept in the repository so future chapter work can continue from a recorded state instead of relying only on chat history.
