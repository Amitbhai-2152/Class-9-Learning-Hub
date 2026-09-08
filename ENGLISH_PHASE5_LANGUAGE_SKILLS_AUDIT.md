# Phase 5 — English Language, Writing & Reading Audit

**Date:** 8 September 2026  
**Repository:** `Amitbhai-2152/Class-9-Learning-Hub`  
**Status:** IMPLEMENTED — pending production verification in CI

## Scope

Phase 5 establishes a dedicated English language-skills layer separate from the Panorama prose lessons. It covers the central Grammar, Writing, Translation and Unseen Reading preparation that the prose pages alone do not provide.

## Implemented

### Grammar Lab

The new hub provides dedicated revision guidance for:

1. Tenses
2. Modals
3. Active & Passive Voice
4. Reporting
5. Subject–Verb Agreement
6. Clauses
7. Determiners
8. Prepositions

### Writing Studio

The new hub provides format guidance for:

- Formal Letter
- Informal Letter
- Notice
- Report
- Speech
- Message
- Paragraph / Essay
- Composition

### Reading Lab

The new hub separates three unseen-reading modes:

- Factual passage
- Literary passage
- Poetry passage

Each reading type includes an evidence-first strategy and a specific error-avoidance reminder.

### Translation

A dedicated Hindi → English translation focus explains that tense, subject, meaning and natural English must be preserved rather than translated mechanically word-for-word.

### Assessment

A fresh **36-question Language Skills Final Check** uses the existing `PanoramaTimedQuiz` engine in Challenge mode, giving a 36-minute timed cumulative check. The shared option-shuffling and all-answered/timer/review behavior remain unchanged.

## Navigation and routing

The English Panorama area now exposes a dedicated **English Language & Skills Hub** entry. It routes through `languageSkills=1` and is handled independently from the Whole Prose Revision route.

## Release decision

Phase 5 is complete only when the normal Verify Learning Hub workflow passes the permanent Phase-5 QA and production build. The prose subsystem is not modified by this phase.
