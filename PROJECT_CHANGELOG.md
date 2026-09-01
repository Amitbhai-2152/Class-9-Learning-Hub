# Class 9 Learning Hub — Change Log

## 2026-09-01

### Persistent continuation setup
- Added `PROJECT_CONTEXT.md` as the main handoff document for continuing the project in future chats.
- The project standard is: UI/system language may be English or Hinglish; student-facing chapter teaching content must be simple Hindi only; standard mathematical notation is allowed.
- All future chapter work must verify data shape, routing, syntax/build, question answers, and responsive behavior before claiming completion.

### Maths chapters completed / in progress
- Chapters 1–10 have learning/practice assets at various levels of completeness.
- Chapter 6 and 7 Learn blank issue was traced to `sections` vs `lessons`. The current learning engine expects `lessons`; always verify the repository before adding new chapter data.
- Chapter 9 learning data was normalized to `lessons` so the Learn screen can render.
- Chapter 10 (`वृत्त`) has learning and assessment assets and is wired in `App.jsx`.
- Chapter 11 (`रचनाएँ`) now has:
  - `src/chapter11Learning.js` — Hindi learning content.
  - `src/chapter11Practice.js` — Hindi practice bank.
  - `src/ConstructionsEngine.jsx` — practice/challenge/test engine with answer explanations.
- Chapter 11 is NOT yet wired into `App.jsx` as of this entry. Do not claim it is visible until the latest `App.jsx` is successfully updated and verified.

### Quality rules reinforced
- Do not put English/Hinglish inside actual chapter teaching explanations merely for style. Use Hindi terminology from Hindi-medium NCERT where appropriate.
- Do not claim a GitHub fix succeeded after a conflict or failed write.
- For large files such as `App.jsx`, fetch the latest file/blob SHA before replacement; concurrent updates can cause a 409 conflict.
- Prefer small, isolated new files for new chapter content and engines, then wire them carefully.
- User updates local project in VS Code using:
  ```powershell
  git pull
  npm.cmd run dev
  ```
