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

### External curriculum reference used for the audit

NCERT's current textbook portal lists Class IX Science textbook material separately from older/exemplar chapter lists. The official portal currently exposes 13 chapters for the rationalised Class IX Science book, while NCERT's exemplar page still contains the older 15-unit structure. Therefore this project’s 15-chapter Science sequence is treated as the project’s intended curriculum mapping rather than silently changing its chapter order during QA. See the official NCERT references noted in the QA conversation.

### Status
- [x] Quality-pass log created.
- [ ] Chapters 1–15 content audit.
- [x] Answer-key/data-shape audit tooling added.
- [ ] Shared engine/navigation audit.
- [ ] Visual/animation audit.
- [x] Runtime render recovery added.
- [ ] Fix pass.
- [ ] Final build/CI verification.

## Notes

This log is intentionally kept in the repository so future chapter work can continue from a recorded state instead of relying only on chat history.
