# Class 9 Learning Hub — Persistent Project Context

## Purpose
Build a Class 9 BSEB/NCERT-oriented Learning Hub that is beautiful, responsive on mobile and laptop, engaging for students, and organized subject-by-subject and chapter-by-chapter.

## Core product rules
- Main home page should keep focused sections/buttons: All Classes, All Tests, Preparation Meter plus Smart Tutor entry point.
- Include an XP/level/streak system to make studying engaging without distracting from learning.
- Include Smart Tutor AI entry point.
- UI/system language may be English or Hinglish.
- **Student-facing chapter teaching content must be Hindi only** (simple, clear Hindi). Mathematical notation can remain standard (x, y, √, equations, etc.).
- Use Hindi-medium NCERT terminology as the reference for chapter wording. Do not copy long textbook passages verbatim; explain concepts simply in original wording.
- Prioritize content quality and quantity, not decorative features. Visuals/animations must aid understanding, not be random decoration.
- Every chapter should ultimately have Learn, Practice, Challenge, Test, explanations/review, responsive behavior, and syntax/build QA.
- Practice should have meaningful difficulty progression (easy → medium → hard/HOTS), not merely more questions.
- After a student answers a question, explain why the selected answer is right/wrong.
- **Every chapter must show a clear content list/outline beside the chapter content on desktop, and in a compact full-width form on mobile.** This is now a hard implementation standard, not an optional enhancement.

## Development workflow
- Repository: https://github.com/Amitbhai-2152/Class-9-Learning-Hub
- User develops locally in VS Code.
- Normal update workflow:
  ```powershell
  git pull
  npm.cmd run dev
  ```
- User previously had PowerShell script policy trouble with `npm`; `npm.cmd` is the reliable command.
- User wants repository work done through Git and will inspect locally in VS Code.
- Do not claim a fix is visible until the corresponding GitHub commit is actually successful.
- Syntax errors have occurred in `StudyEngine.jsx`; always be alert for JSX/JavaScript syntax issues before claiming completion.

## Important architecture discovered
- `src/App.jsx` routes subjects → chapters → modes.
- Shared `src/LearningEngine.jsx` displays chapter learning content.
- `LearningEngine` reads `data.lessons`.
- Several older chapter data files used `sections` instead of `lessons`; this caused Learn screens to show “अभी सामग्री उपलब्ध नहीं है”.
- Current intended approach is to normalize chapter data before it reaches LearningEngine or otherwise support both shapes.
- Chapter 6 and 7 blank Learn issue was traced to this mismatch; current repository routing provides the expected lesson shape. Verify current branch before future claims.
- `src/ChapterContents.jsx` + `src/chapter-contents.css` already provide a reusable chapter outline component. Future chapter engines should reuse it rather than reimplementing lists.

## Work completed / chapter status
### Maths
1. अध्याय 1 — संख्या पद्धति: learning foundation, engagement layer, expanded practice bank.
2. अध्याय 2 — बहुपद: dedicated learning foundation, practice, PolynomialEngine.
3. अध्याय 3 — निर्देशांक ज्यामिति: learning, practice, dedicated engine.
4. अध्याय 4 — दो चरों वाले रैखिक समीकरण: learning, practice, challenge/test engine; earlier answer-option QA issue noted.
5. अध्याय 5 — यूक्लिड की ज्यामिति का परिचय: learning, practice, challenge/test, App wiring.
6. अध्याय 6 — रेखाएँ और कोण: substantial Hindi lesson content, dedicated engine; historical sections/lessons bug fixed in routing.
7. अध्याय 7 — त्रिभुज: substantial Hindi lesson content, dedicated engine; historical sections/lessons bug fixed.
8. अध्याय 8 — चतुर्भुज: learning, practice, QuadrilateralEngine, App wiring.
9. अध्याय 9 — समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल: learning, practice, AreaEngine, App wiring; historical Learn data-shape bug fixed.
10. अध्याय 10 — वृत्त: 18 learning steps, 40-question practice bank, CirclesEngine, App wiring.
11. अध्याय 11 — रचनाएँ: learning, practice, ConstructionsEngine; App wiring status must be verified before claiming complete.
12. अध्याय 12 — हीरोन का सूत्र: learning, practice, HeronEngine; answer-index QA needed before freezing; App wiring should be verified.
13. अध्याय 13 — पृष्ठीय क्षेत्रफल एवं आयतन: learning, practice, SurfaceVolumeEngine; App wiring should be verified.
14. अध्याय 14 — सांख्यिकी: learning, practice, StatisticsEngine; App wiring/QA should be verified.
15. अध्याय 15 — प्रायिकता: learning, practice, ProbabilityEngine; answer-index QA was noted; App wiring has been added but verify current state.

### Science
1. अध्याय 1 — हमारे आसपास के पदार्थ: dedicated Hindi learning, concept visuals, practice/test engine, App wiring.
2. अध्याय 2 — क्या हमारे आसपास के पदार्थ शुद्ध हैं?: dedicated Hindi learning, separation-technique visuals, practice/test engine, App wiring.
3. अध्याय 3 — परमाणु एवं अणु: Hindi learning file, concept visual, dedicated assessment engine, App wiring; QA fixed oxygen-valency and challenge molecular-mass answer keys. A wrapper now places the chapter outline on the side on larger screens and above on mobile.
4. अध्याय 4 — परमाणु की संरचना: 24 Hindi learning lessons, concept visual, visible content outline, 29-question bank with Practice 15 / Challenge 12 / Test 20; App wiring added. Final-answer scoring was corrected and stylesheet import was matched to the real `src/scienceChapter4.css`. The page now has a responsive side outline using the chapter's actual lesson titles.

## Science Chapter 3/4 routing milestone
- `src/App.jsx` imports Science Chapter 3 and 4 learning/engine modules.
- Science subject chapter list includes Chapters 1–4.
- Subject chapter cards use dedicated Ch3/Ch4 learning goals.
- ChapterPage routes Ch3 to `ScienceChapter3Engine` and Ch4 to `ScienceChapter4Engine`.
- Latest App wiring commit before the current layout work: `e935f5ca70038774b75f9fe35e78a3849b827052`.
- Science Chapter 3 QA/fix commit: `3c9eb57330bdc9b3dd7b572b4f3612810dc0e1f6`.
- Science Chapter 3 layout wrapper commit: `59ecb965901bf2344f676938dc0b5e1409eac5bf`.
- Reusable Science sidebar styling commits: `98b3d1e9978d628acd70b36f36e046ece6d66225` and `073edf10b6663f3a9cf424894ee38cc291fa693e`.
- Science Chapter 4 side-outline commits: `3ae491829b0388dc074bec66569cd936a4ba4906` and `c686ba5a3c14216a429d2bee65fbceb85778cc50`.
- `src/ChapterContents.jsx` is the standard reusable outline component; the Science Chapter 3 wrapper now uses it.
- Ch4 currently uses a responsive CSS-generated outline because its engine is self-contained; future refactoring should migrate it to `ChapterContents` rather than adding more one-off CSS content lists.
- GitHub Actions/status checks did not report a workflow run for the direct main-branch updates, so browser/build QA is not claimed.

## Recent Science bug lessons — IMPORTANT
- Do not assume an engine is clean because it renders. Audit imports, stylesheet filenames, answer indices, score update timing, and layout containment.
- Do not put the chapter content list inside the normal lesson column when the user asked for it on the side. Use a two-column layout on desktop and a stacked compact layout on mobile.
- Do not create duplicate engine files without a clear compatibility reason. When a temporary `*Fixed.jsx` compatibility wrapper exists, document it and avoid branching logic between two competing engines.
- For quiz score handling, remember React state updates are asynchronous: if the final answer increments `score`, do not immediately read the old `score` value when recording the final session. Use a derived next-score or functional calculation.
- Verify every stylesheet import against the actual filename in the repository before committing.
- Verify every answer index against the exact option array. A correct explanation with a wrong index is still a bug.
- Keep Learn, Practice, Challenge, and Test flows visually and structurally consistent. Avoid adding a mode in one engine with a completely different information architecture unless intentional.
- Before moving to the next Science chapter, inspect Chapters 1–4 for the same side-outline, responsive, import, answer-key, and score-timing patterns so the same class of bug is not repeated.

## Maths visual/animation layer
- Added `src/MathSectionVisuals.jsx` and `src/math-section.css` to make the Maths subject landing page visually distinctive and animated.
- Added `src/MathChapterVisual.jsx` and `src/math-chapter-visual.css` for chapter-specific visual demonstrations inside the learning page.
- Visual coverage includes chapter-specific concepts such as triangle/base/height, coordinate point movement, circle/radius, statistics bars, probability outcomes, quadrilateral diagonals, angles, solids, polynomial terms, constructions, number-line, and related scenes.
- `LearningEngine.jsx` imports `MathChapterVisual` and renders a chapter visual at the start of Maths learning pages.
- Important design rule from user: do **not** use meaningless shaking/pulsing animation. Animation should communicate the mathematical action (build, measure, move, compare, reveal) and then hold so the learner can interpret it.
- Current CSS was cleaned toward meaningful animation sequences, but browser-level visual QA must still be done locally in VS Code because the assistant cannot directly run the user's Windows browser environment.
- Reduced-motion support is maintained via `prefers-reduced-motion`.
- Latest verified animation cleanup commit: `ff2f6efb4ec14d9382b1ed9a5710f2c886cfe81e`.
- Latest verified LearningEngine connection commit: `bbde7cfd14c45656b54eb1b1e8cbc4a3c5658d85`.
- Latest verified Maths chapter visual behavior commit: `3c7047ddebb8489e69c8915fc0f85414efeae7ab`.

## Important visual quality direction
- Maths should feel like a dedicated study environment, not a decorated card list.
- Prefer actual concept visualizations over generic decorative motion.
- For future visuals, target: step-by-step construction, parameter change, relation highlighting, graph/shape transformation, and visible cause → effect.
- Avoid repeated use of the same generic visual across unrelated lessons.
- User specifically asked to remove animations that only shake or pulse without meaning; meaningful sequences should replace them.

## Known mistakes to avoid
1. Do not claim a GitHub change succeeded if the connector returned a conflict/error.
2. Do not assume a file exists because an earlier assistant said it was created; fetch and verify.
3. Do not say Chapter 6/7 Learn is fixed without checking current repository state.
4. Do not use English/Hinglish inside actual chapter teaching content.
5. Do not invent NCERT chapter scopes. Verify current Hindi NCERT material when scope matters.
6. Do not over-focus on features; finish chapters with strong explanations, examples, questions, review, and QA.
7. Keep question answer indexes consistent with options. Audit challenge/test questions carefully.
8. Be careful with large `App.jsx` / `LearningEngine.jsx` updates because whole-file replacement is required and SHA conflicts can occur; fetch the latest blob/file SHA before replacing.
9. Do not add animation just to make something move. Every animation must have an educational interpretation.
10. Do not claim production/browser QA without actually running or observing it.
11. When updating an existing file, never send a partial replacement. `update_file` replaces the whole file; fetch the current blob first and preserve all existing content unless intentionally changing it.
12. **Do not make the user repeat the chapter content-list requirement.** It is a hard project standard and must be checked automatically on every new chapter.
13. **Do not move forward after discovering a Science layout bug without checking whether the same pattern exists in earlier Science chapters.**

## User interaction pattern
- User frequently says “ok next” and expects work to continue sequentially without long explanations each time.
- User wants efficient progress and then movement to the next subject.
- User cares strongly about content quality, quantity, interesting/simple explanations, visuals, animations, and practice questions.
- User wants Hindi chapters based on Hindi NCERT wording/terminology, while UI/system can be Hinglish/English.

## Future continuation protocol
At the start of a new chat about this project:
1. Read this file first.
2. Inspect the latest GitHub main branch and relevant current files before claiming status.
3. Continue from the verified state, not from old chat claims.
4. Keep all student-facing chapter content in Hindi.
5. For each new chapter, build content → connect Learn → build Practice/Challenge/Test → verify data shape → verify App wiring → verify side content outline → verify responsive layout → syntax/build QA → then move on.
6. Before starting a new Science chapter, compare it against the existing Science chapter UI pattern and reuse the established layout instead of inventing another structure.
7. For visual work, build subject/chapter-specific concept demonstrations, not generic motion.
8. Record major changes, commits, bugs discovered, and fixes back into this file as the project evolves.

## Current strategic target
Finish the entire Class 9 book systematically, subject-by-subject and chapter-by-chapter, with simple Hindi explanations, strong examples, meaningful visuals/animations, large high-quality practice sets, and robust responsive behavior. Science must now be treated as a standardized chapter system rather than four unrelated custom pages. Before Chapter 5, audit Chapters 1–4 for shared layout/QA issues so the same bug is not fixed repeatedly one chapter at a time.
