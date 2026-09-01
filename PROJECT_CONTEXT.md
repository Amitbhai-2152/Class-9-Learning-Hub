# Class 9 Learning Hub — Persistent Project Context

## Purpose
Build a Class 9 BSEB/NCERT-oriented Learning Hub that is beautiful, responsive on mobile and laptop, engaging for students, and organized subject-by-subject and chapter-by-chapter.

## Core product rules
- Main home page should keep the focused sections/buttons: **All Classes, All Tests, Preparation Meter** plus the Smart Tutor entry point.
- Include an XP/level/streak system to make studying engaging without distracting from learning.
- Include Smart Tutor AI entry point.
- UI/system language may be **English or Hinglish**.
- **Student-facing chapter teaching content must be Hindi only** (simple, clear Hindi). Mathematical notation can remain standard (x, y, √, equations, etc.).
- Use Hindi-medium NCERT terminology as the reference for chapter wording. Do not copy long textbook passages verbatim; explain concepts simply in original wording.
- Prioritize **content quality and quantity**, not decorative features. Visuals/animations should aid understanding, not be random decoration.
- Every chapter should ultimately have: Learn, Practice, Challenge, Test, explanations/review, responsive behavior, and syntax/build QA.
- Practice should have meaningful difficulty progression (easy → medium → hard/HOTS), not merely more questions.
- After a student answers a question, explain why the selected answer is right/wrong.

## Development workflow
- Repository: https://github.com/Amitbhai-2152/Class-9-Learning-Hub
- User develops locally in VS Code.
- Normal update workflow:
  ```powershell
  git pull
  npm.cmd run dev
  ```
- User previously had PowerShell script policy trouble with `npm`; `npm.cmd` is the reliable command.
- User had an old non-git folder and then got Git working; current project should be updated through `git pull`.
- Do not claim a fix is visible until the corresponding GitHub commit is actually successful.
- Syntax errors have occurred in `StudyEngine.jsx`; always be alert for JSX/JavaScript syntax issues before claiming completion.

## Important architecture discovered
- `src/App.jsx` routes subjects → chapters → modes.
- Shared `src/LearningEngine.jsx` displays chapter learning content.
- `LearningEngine` originally expected `data.lessons`.
- Several chapter data files use `sections` instead of `lessons`; this caused Learn screens to show “अभी सामग्री उपलब्ध नहीं है”.
- Current intended compatibility fix: support both `data.lessons` and `data.sections` in the learning layer OR normalize chapter data at the routing layer.
- Chapter 6 and 7 blank Learn issue was traced to this `lessons` vs `sections` mismatch. Verify in the actual repository before making future claims.

## Work completed / chapter status
### Maths
1. **अध्याय 1 — संख्या पद्धति**
   - Expanded practice bank (reported as 40 questions in the latest work).
   - Added engagement hooks / “today’s question / why learn / think first” layer.
   - Learning content foundation includes rational/irrational numbers, decimals, number line, square roots, number families, common traps, etc.
   - Student-facing engagement file `src/chapter1Engagement.js` historically contained accidental English; do not treat that as acceptable final content. It must be Hindi in chapter content.

2. **अध्याय 2 — बहुपद**
   - Dedicated learning foundation and practice bank.
   - Routed through `PolynomialEngine`.
   - Content should be simple Hindi; UI controls can remain English/Hinglish.

3. **अध्याय 3 — निर्देशांक ज्यामिति**
   - Learning + practice foundation and dedicated engine reported complete.

4. **अध्याय 4 — दो चरों वाले रैखिक समीकरण**
   - Learning + practice + challenge/test engine reported complete, but an earlier challenge question had inconsistent options and needed QA. Do not assume fully frozen without checking.

5. **अध्याय 5 — यूक्लिड की ज्यामिति का परिचय**
   - Learning content + practice + challenge/test engine and App wiring reported complete.
   - Student-facing content must be Hindi only.

6. **अध्याय 6 — रेखाएँ और कोण**
   - `src/chapter6Learning.js` contains substantial Hindi lesson content using `sections`.
   - Dedicated `LinesAnglesEngine.jsx` exists.
   - A blank Learn issue was traced to `LearningEngine` expecting `lessons` while chapter data used `sections`.
   - Must verify the final fix actually exists on GitHub before proceeding.

7. **अध्याय 7 — त्रिभुज**
   - `src/chapter7Learning.js` contains substantial Hindi lesson content using `sections`.
   - Dedicated `TrianglesEngine.jsx` exists.
   - Same historical `sections` vs `lessons` blank Learn issue as Chapter 6.

8. **अध्याय 8 — चतुर्भुज**
   - `src/chapter8Learning.js` exists with `lessons` and rich Hindi content.
   - `src/chapter8Practice.js` exists.
   - `src/QuadrilateralEngine.jsx` exists with practice/challenge/test.
   - `App.jsx` had NOT been visibly wired to Chapter 8 in one verified snapshot; Chapter 8 was not in the Maths chapter array at that snapshot. Verify before claiming it is connected.
   - An earlier challenge file had a defective question; it was later corrected in the verified content snapshot.

9. **अध्याय 9 — समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल**
   - `src/chapter9Learning.js` and `src/chapter9Practice.js` exist.
   - `src/AreaEngine.jsx` was created.
   - A verified `App.jsx` snapshot still listed Maths chapters only through Chapter 7 and imports only through `chapter7Learning`, so Chapter 9 was NOT yet verified as wired into the visible menu in that snapshot.
   - Do not claim Chapter 9 is connected until App wiring is verified.

## Important code snapshots / facts from repository verification
- A verified `App.jsx` snapshot showed:
  - Maths chapter array: `['संख्या पद्धति','बहुपद','निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण','यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण','त्रिभुज']`
  - Imports through `chapter7Learning` only.
  - Routing handlers existed for polynomial, coordinate, linear equation, Euclid, lines/angles, triangles.
  - Chapter mode UI labels included some English/Hinglish strings such as `सरल explanation + examples`, `Concept समझने...`, `self-assessment`. This is acceptable for system/UI, but chapter teaching content itself must stay Hindi.
- `src/LearningEngine.jsx` in a verified snapshot still had `const lessons=data?.lessons||[];` before a failed replacement attempt. A later successful commit was made in another path, but the exact current file must be fetched/verified before relying on that state.

## Known mistakes to avoid
1. **Do not claim a GitHub change succeeded if the connector returned a conflict/error.**
2. **Do not assume a file exists just because a previous assistant said it was created.** Fetch it and verify.
3. **Do not say Chapter 6/7 Learn is fixed without verifying current repository state.**
4. **Do not use English/Hinglish inside actual chapter teaching content.**
5. **Do not invent NCERT chapter scopes.** Verify current NCERT Hindi material when scope matters.
6. **Do not over-focus on features; finish chapters with strong explanations, examples, questions, review, and QA.**
7. **Keep question answer indexes consistent with options.** Audit hard/challenge questions carefully.
8. **Be careful with large `App.jsx` / `LearningEngine.jsx` updates** because whole-file replacement is required and can hit SHA conflicts. Fetch the latest blob/file SHA before replacing.

## User’s preferred interaction pattern
- User frequently says “ok next” and expects work to continue sequentially without requiring long explanations each time.
- They want the project completed efficiently and then to move chapter-by-chapter.
- They care strongly about content quality, quantity, interesting/simple explanations, visuals, and practice questions.
- They want Hindi chapters based on Hindi NCERT wording/terminology, while UI/system can use English/Hinglish.

## Future continuation protocol
At the start of a new chat about this project:
1. Read this file first.
2. Inspect the latest GitHub `main` branch and relevant current files before claiming status.
3. Continue from the verified state, not from old chat claims.
4. Keep all student-facing chapter content in Hindi.
5. For each new chapter, build content → connect Learn → build Practice/Challenge/Test → verify data shape → verify App wiring → syntax/build QA → then move on.
6. Record major changes, commits, bugs discovered, and fixes back into this file as the project evolves.

## Current strategic target
Finish the entire Class 9 book systematically, subject-by-subject and chapter-by-chapter, with simple Hindi explanations, strong examples, meaningful visuals/animations, large high-quality practice sets, and robust responsive behavior. Avoid stopping at superficial menu wiring.
