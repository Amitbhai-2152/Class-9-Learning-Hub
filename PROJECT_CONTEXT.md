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

## User interaction pattern
- User frequently says “ok next” and expects work to continue sequentially without long explanations each time.
- User wants efficient progress and then movement to the next subject.
- User cares strongly about content quality, quantity, interesting/simple explanations, visuals, animations, and practice questions.
- User wants Hindi chapters based on Hindi NCERT wording/terminology, while UI/system can use English/Hinglish.

## Future continuation protocol
At the start of a new chat about this project:
1. Read this file first.
2. Inspect the latest GitHub main branch and relevant current files before claiming status.
3. Continue from the verified state, not from old chat claims.
4. Keep all student-facing chapter content in Hindi.
5. For each new chapter, build content → connect Learn → build Practice/Challenge/Test → verify data shape → verify App wiring → syntax/build QA → then move on.
6. For visual work, build subject/chapter-specific concept demonstrations, not generic motion.
7. Record major changes, commits, bugs discovered, and fixes back into this file as the project evolves.

## Current strategic target
Finish the entire Class 9 book systematically, subject-by-subject and chapter-by-chapter, with simple Hindi explanations, strong examples, meaningful visuals/animations, large high-quality practice sets, and robust responsive behavior. Finish Maths visual QA before moving deeply into Science, but do not let decorative work block the larger curriculum build.
