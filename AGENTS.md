# AGENTS.md — Charles Portfolio Repository Instructions

> Scope: This file applies to the entire `charles-portfolio` repository. Read `PROJECT_CONTEXT.md` before planning or modifying code. Treat the actual repository as authoritative for what currently exists; treat `PROJECT_CONTEXT.md` as the documented intent and historical decisions. If they differ, report the discrepancy rather than silently rewriting code.

## Mission
Build and refine Charles's premium, highly interactive personal portfolio, inspired by the cinematic polish and interaction quality of https://anubi.io/ while retaining an original identity. The site presents a web/software developer and systems architect through polished UI, engineering depth, and four real project case studies: TCI, BCC, Eddie, and Agri-Energy Connect.

## Non-negotiable working rules
1. **Inspect before editing.** Read relevant existing JSX, CSS, animation modules, routes, project data, and dependencies. Never invent the contents of a file or assume a previously discussed feature is implemented.
2. **Do not duplicate architecture.** Reuse existing components and modules. In particular, do not create `useScrollEffects.js`, `useArchitectureAnimation.js`, `AnimatedArchitecture.jsx`, `AnimatedPage.jsx`, `TypingCode.jsx`, `ScrollReveal.jsx`, or other competing implementations without explicit approval. Existing equivalents are listed in `PROJECT_CONTEXT.md`.
3. **Preserve working UI.** Do not change the approved Project Orbit card sizes/positions, imagery, responsive design, page hierarchy, brand aesthetic, routes, or working behaviour unless the task explicitly requires it.
4. **Keep assets where they are.** Portfolio imagery lives in `public/images/{tci,bcc,eddie,agri}/` and is referenced by `/images/...`. Do not relocate it to `src/assets`. Check actual extensions: do not rename PNG files to `.webp` without real conversion.
5. **Preserve both project route families** unless a user-approved migration is explicitly requested: `/work/tci`, `/work/bcc`, `/work/eddie`, `/work/agri-energy` and `/projects/tci`, `/projects/bcc`, `/projects/eddie`, `/projects/agri-energy`. Confirm current route definitions before editing.
6. **Scope animations correctly.** `src/animations/homeAnimations.js` is for Home; `src/animations/projectAnimations.js` is for the four project case studies. Do not automatically import the project initializer into `Contact.jsx`, `Work.jsx`, `Code.jsx`, or `Profile.jsx`. Those pages may have their own existing Framer Motion/component animations.
7. **Avoid animation conflicts.** Do not animate the same `transform`, `opacity`, or other property on the same element simultaneously via GSAP, Framer Motion, and CSS keyframes. The orbit already uses Framer Motion and CSS positioning; do not attach GSAP transforms to `.orbit-card` without a specifically designed solution.
8. **Respect cleanup and accessibility.** Scope GSAP with `gsap.context(...)` and revert on unmount; clean up ScrollTriggers, observers, RAF loops, event listeners, and Lenis instances. Respect `prefers-reduced-motion`, keyboard navigation, focus indicators, and touch devices.
9. **Small, reviewable changes.** Implement one feature or coherent milestone at a time. Before editing, describe the affected files and approach. Do not perform unrelated refactors, broad dependency upgrades, or wholesale CSS rewrites.
10. **Verify before declaring success.** Run appropriate checks (at least `npm run build` if defined); report actual command outcomes, errors, and what remains untested. Never claim browser/visual verification unless it occurred.
11. **No destructive operations without approval.** Do not delete existing files, overwrite user work, force-push, reset, or commit/push automatically unless specifically requested. Inspect `git status` first; preserve unrelated changes.
12. **Document decisions.** After an approved, tested milestone, update `PROJECT_CONTEXT.md` with files changed, implementation state, validation performed, and outstanding work. Do not label unverified features complete.

## Preferred workflow for every coding task
1. Read this file and `PROJECT_CONTEXT.md`.
2. Inspect the relevant repository files and `package.json`; check `git status`.
3. Report **existing / missing / conflicting** behaviour and any mismatch with the project context.
4. Propose the smallest safe implementation, listing exact files to edit. Wait for approval if the task is an audit or if major design/architecture changes are involved.
5. Implement within existing files/components; keep changes narrowly scoped.
6. Run build/lint/tests as available, inspect errors, and fix regressions introduced by the task.
7. Where browser tools are available, test desktop and 390px mobile; otherwise clearly mark visual QA as pending.
8. Summarize changed files, behaviour, checks, and next steps; update the context after confirmation.

## Technical guardrails
- Existing stack: React + Vite, React Router, Framer Motion, GSAP + ScrollTrigger, Lenis, lucide-react (verify installed versions and actual usage in `package.json`).
- Existing `src/components/SmoothScroll.jsx` owns smooth-scrolling integration. Inspect it before changing Lenis; avoid duplicate instances or multiple animation frame drivers.
- Existing `src/components/ProjectOrbit.jsx` and `ProjectCard.jsx` own the homepage project orbit. The orbit's 4.2-second rotation, hover pause, click selection, centre content transition, and navigation should remain functional.
- Existing `src/components/ArchitectureDiagram.jsx` owns architecture visualization; enhance it rather than replacing it.
- Existing `RevealText.jsx`, `SplitText.jsx`, `CodeBlock.jsx`, `CustomCursor.jsx`, `MagneticButton.jsx`, `PageTransition.jsx`, `BlurImage.jsx`, and `ProjectNavigation.jsx` should be inspected and reused where relevant.
- Use `useLayoutEffect`/`useEffect` with correct scoped refs and cleanup. Attach page refs to the outermost existing page element (e.g. `<main>`), not a nested child. Never attach the same ref to multiple elements.
- A CSS `.reveal` rule must not hide content permanently before JS runs. `.image-reveal` wrappers should clip scaled images. Remove competing CSS keyframe animations only after checking all references.
- On project pages, ensure scrolling effects are scoped to the project page; avoid animating shared Navbar/Footer or elements already controlled by Framer Motion.
- Prefer performant `transform`/`opacity` animation; avoid expensive continuous blur/filter effects on mobile. Use responsive fallbacks for pinned/sticky scenes.
- Preserve semantic HTML and functional links; ensure keyboard and touch alternatives for hover-driven features.

## First task: READ-ONLY AUDIT (do not edit yet)
Inspect the entire workspace and produce:
- Actual file/folder tree for `src/`, `public/images/`, and root configuration.
- Installed dependencies, scripts, routing, and page/component wiring.
- Status of `homeAnimations.js`, `projectAnimations.js`, `SmoothScroll.jsx`, `ArchitectureDiagram.jsx`, `PageTransition.jsx`, and other interaction components: empty, implemented, wired, working evidence, or unknown.
- Existing GSAP/Framer Motion/CSS conflicts, duplicate animation initializations, incorrect relative imports, unused components, and likely runtime/build problems.
- Asset existence and correct extension checks, including `projects.js` image paths.
- Confirmation that both `/work/...` and `/projects/...` routes resolve.
- Current desktop/mobile responsiveness risks and reduced-motion gaps.
- Comparison with `PROJECT_CONTEXT.md`: confirmed, outdated, missing, or uncertain items.
- Prioritized implementation plan mapped to the existing files, with no new files unless justified.

**Do not change code, install dependencies, delete files, or run git push during this audit.** Running read-only inspection and existing build checks is permitted. Present findings and wait for approval.

## Communication standard
Be precise: name exact paths and functions, explain why changes are needed, and distinguish *planned*, *code present*, *build verified*, and *visually verified*. If an instruction contradicts an earlier decision, flag it first. The goal is faster delivery without losing project continuity.
