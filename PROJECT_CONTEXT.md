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
- Chapter 6 and 7 blank Learn issue was traced to this `lessons` vs `sections` mismatch. The project later added the needed routing/data handling; verify the actual current repository state before future claims.

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
   - The App routing/data layer has since been updated to provide the expected lesson shape; verify the latest repository before future claims.

7. **अध्याय 7 — त्रिभुज**
   - `src/chapter7Learning.js` contains substantial Hindi lesson content using `sections`.
   - Dedicated `TrianglesEngine.jsx` exists.
   - Same historical `sections` vs `lessons` blank Learn issue as Chapter 6.

8. **अध्याय 8 — चतुर्भुज**
   - `src/chapter8Learning.js` exists with `lessons` and rich Hindi content.
   - `src/chapter8Practice.js` exists.
   - `src/QuadrilateralEngine.jsx` exists with practice/challenge/test.
   - The current verified App state now imports/routs Chapter 8 through `QuadrilateralEngine`; verify current branch before relying on this later.
   - An earlier challenge file had a defective question; it was later corrected in the verified content snapshot.

9. **अध्याय 9 — समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल**
   - `src/chapter9Learning.js` and `src/chapter9Practice.js` exist.
   - `src/AreaEngine.jsx` exists.
   - The current verified App state now imports/routs Chapter 9 through `AreaEngine`; verify current branch before relying on this later.

10. **अध्याय 10 — वृत्त**
   - Added `src/chapter10Learning.js` with 18 structured learning steps in simple Hindi, including वृत्त की परिभाषा, केंद्र, त्रिज्या, व्यास, जीवा, चाप, केंद्र से जीवा की दूरी, जीवा के मध्यबिंदु/लंब संबंध, चित्र-पठन, प्रमाण रणनीति, and quick checks.
   - Added `src/chapter10Practice.js` with 40 questions spanning basic → medium → hard reasoning, each with a correct-answer explanation.
   - Added `src/CirclesEngine.jsx` for Practice / Challenge / Test modes with immediate explanations and XP.
   - Updated `src/App.jsx` to add **वृत्त** as Maths Chapter 10, import its learning data and engine, and route Learn/Practice/Challenge/Test to the new content.
   - The Chapter 10 title/order follows the Class 9 Maths chapter sequence where Chapter 10 is **वृत्त**. This matches current NCERT-related listings and the NCERT Hindi textbook ecosystem. citeturn977275search0turn977275search1
   - Latest Chapter 10 App wiring commit: `420700cd62242c142d0d74c3efa9a1e59b2a4d29`.
   - Chapter 10 learning-content commit: `32e7db7e3c77bea1c7d99a136ecd1b7f788f2191`.
   - Chapter 10 practice commit: `c87f26fd4f244542470d4c2175c1e509246780b9`.
   - Chapter 10 engine commit: `4a6aba5b689ebf64c9b8db3eeac680fc841725a3`.

## Important code snapshots / facts from repository verification
- A current verified `App.jsx` snapshot contains imports for Chapter 8 and Chapter 9 and routes those chapters to `QuadrilateralEngine` and `AreaEngine` respectively.
- A current verified `App.jsx` snapshot before Chapter 10 wiring listed Maths through Chapter 9; Chapter 10 was then added in commit `420700cd62242c142d0d74c3efa9a1e59b2a4d29`.
- `src/QuadrilateralEngine.jsx` exists and exposes its challenge/test rendering; `src/AreaEngine.jsx` exists for Chapter 9.
- `src/chapter8Learning.js` uses a `lessons` array, while `src/chapter6Learning.js` and `src/chapter7Learning.js` historically used `sections`.

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
