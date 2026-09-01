# Chapter 15 — प्रायिकता

## Current status
- `src/chapter15Learning.js` added with Hindi-only student-facing learning content.
- `src/chapter15Practice.js` added with 40 practice questions and explanations.
- `src/ProbabilityEngine.jsx` added for अभ्यास, चुनौती, and टेस्ट modes.
- One practice answer-key issue was caught during QA; the intended correct option is 1/2 for the question asking for the probability of a die result greater than 1 and less than 5. The source currently needs the answer index corrected from 1 to 2.
- `src/App.jsx` still needs Chapter 15 import, chapter-list entry, and routing to `ProbabilityEngine`.

## Required next steps
1. Correct the practice answer index.
2. Wire Chapter 15 into `App.jsx`.
3. Verify Learn/Practice/Challenge/Test routing.
4. Run syntax/build QA before calling Chapter 15 complete.

## Content rule
Student-facing Chapter 15 teaching content must remain in simple Hindi. Website/system labels may remain English or Hinglish.

## Important regression prevention
Always use the `lessons` property for data passed to `LearningEngine`; do not use `sections` unless an adapter explicitly maps it to `lessons`.
