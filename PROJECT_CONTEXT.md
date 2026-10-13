# PROJECT_CONTEXT.md — Charles Portfolio: Vision, Architecture, Roadmap & Handover

**Project:** `charles-portfolio`  
**Environment:** Windows, Visual Studio Code, React/Vite local development  
**Last planning update:** 2026-10-13  
**Status:** Public baseline published to `https://github.com/ST10296198/charles-portfolio` on 2026-10-13. Production build and lint pass with existing warnings; Contact and Agri case-study runtime smoke checks passed at a 390px viewport. Full visual QA and Contact destination details remain outstanding.

## 1. Product vision
Create an original, premium personal portfolio for Charles, a web developer/software engineer with systems architecture, backend, DevOps, and project-delivery experience. The experience should feel like a carefully art-directed digital studio site rather than a conventional template: cinematic scroll storytelling, expressive large typography, restrained blur/glass surfaces, refined transitions, generous whitespace, excellent imagery, and smooth interaction.

**Primary inspiration:** https://anubi.io/ — reference for the *quality and character* of motion, image transitions, scrolling, and visual polish; do not copy its assets, code, exact design, or branding.

**Design character:** modern, minimal, editorial, immersive, Apple-like refinement where appropriate; clean typography; responsive desktop/tablet/mobile; purposeful animation rather than effects for their own sake. Hero wording established in `Home.jsx`: “CHARLES BUILDS DIGITAL EXPERIENCES.” Supporting theme: thoughtful interfaces backed by real engineering.

**User journey:** land on immersive hero → introduction → discover four rotating featured projects → capabilities → code/engineering teaser → contact CTA. Visitors can also explore Work, Code, Profile, Contact, and detailed case studies.

## 2. Scope and site pages
Main pages currently known:
- `src/pages/Home.jsx` — hero, introduction, ProjectOrbit, capabilities, code teaser, contact CTA.
- `src/pages/Work.jsx` — portfolio work overview.
- `src/pages/Code.jsx` — engineering / code capabilities.
- `src/pages/Profile.jsx` — background and profile.
- `src/pages/Contact.jsx` — contact.

Case-study pages:
- `src/pages/projects/TCI.jsx`
- `src/pages/projects/BCC.jsx`
- `src/pages/projects/Eddie.jsx`
- `src/pages/projects/AgriEnergy.jsx`

**Routing compatibility:** `/work/{tci,bcc,eddie,agri-energy}` and `/projects/{tci,bcc,eddie,agri-energy}` were both used historically. A previous route rewrite broke `/work/tci`; aliases for both families were recommended. Codex must confirm actual current routes and preserve compatibility.

## 3. Four featured projects and content intent
1. **TCI** — church/organisation website, https://tciweb.netlify.app/ ; visually expressive website showcase.
2. **BCC (Bethal Computer Center)** — https://bethalcomputercenter.netlify.app/ ; service/business website showcase.
3. **Eddie** — educational/study **Android app**, not a desktop website. Showcase mobile UI, learning/product design, authentication, features, and relevant engineering without fabricating unverified features.
4. **Agri-Energy Connect / AgriConnect** — farmer/product web application connecting agricultural participants; farmer/employee workflows, products, filtering, data and architecture. Preserve actual app terminology from repository.

Each case study was planned around **four project visuals**: hero, homepage/main UI, mobile, and detail, supported by editorial copy, challenges, solutions, technical approach, and project navigation. The four visuals are not necessarily four equal-sized sections; inspect current components.

## 4. Existing architecture (historical inventory — verify)
```text
src/
  animations/
    homeAnimations.js
    projectAnimations.js
  components/
    project/                    # existing project-specific components
    ArchitectureDiagram.jsx
    BlurImage.jsx
    CodeBlock.jsx
    CustomCursor.jsx
    Footer.jsx
    MagneticButton.jsx
    Navbar.jsx
    PageTransition.jsx
    ProjectCard.jsx
    ProjectNavigation.jsx
    ProjectOrbit.jsx
    RevealText.jsx
    SmoothScroll.jsx
    SplitText.jsx
  data/
    projects.js
  hooks/
  pages/
    projects/
      AgriEnergy.jsx
      BCC.jsx
      Eddie.jsx
      TCI.jsx
    Home.jsx
    Work.jsx
    Code.jsx
    Profile.jsx
    Contact.jsx
  styles/
    home.css
    project.css
    ...
  App.jsx
  main.jsx
```
Project-specific components previously discussed: `components/project/ProjectHero.jsx`, `ProjectShowcase.jsx`, `ProjectDetails.jsx`, `TechStory.jsx`, `NextProject.jsx`. Verify actual names and props before changing.

**Technology:** React, Vite, React Router, Framer Motion, GSAP + ScrollTrigger, Lenis, lucide-react; verify package versions and whether GSAP/Lenis were actually installed.

**Separation of responsibility:**
- `homeAnimations.js`: homepage-only GSAP scroll effects.
- `projectAnimations.js`: TCI/BCC/Eddie/Agri-Energy case-study GSAP scroll effects.
- `SmoothScroll.jsx`: Lenis scrolling and lifecycle.
- `ProjectOrbit.jsx` + `ProjectCard.jsx`: orbit layout, rotation, card animation and selection.
- `ArchitectureDiagram.jsx`: architecture visuals and eventual node/connector animation.
- `RevealText.jsx`, `SplitText.jsx`: typography animation.
- `CodeBlock.jsx`: code presentation/typing if supported by existing implementation.
- `CustomCursor.jsx`, `MagneticButton.jsx`: pointer microinteractions.
- `PageTransition.jsx`: navigation transitions.
- `BlurImage.jsx`: image loading/visual reveal.

**Do not add parallel animation utilities** such as `useScrollEffects.js`, `useArchitectureAnimation.js`, `AnimatedArchitecture.jsx`, `AnimatedPage.jsx`, `TypingCode.jsx`, or `ScrollReveal.jsx`. Those were previously proposed in error and explicitly rejected as duplicate architecture. If such files now exist, inspect imports before proposing removal.

## 5. Assets and imagery
Keep assets in the existing `public/images/` folders and use root-relative `/images/...` URLs:
```text
public/images/
  tci/    tci-hero.png, tci-home.png, tci-mobile.png, tci-detail.png
  bcc/    bcc-hero.png, bcc-home.png, bcc-mobile.png, bcc-detail.png
  eddie/  eddie-hero.png, eddie-home.png, eddie-mobile.png, eddie-detail.png
  agri/   agri-hero.png, agri-home.png, agri-mobile.png, agri-detail.png
```
These filenames are **historical intended names, not a verified file listing**. Images were originally downloaded as PNG; simply renaming `.png` to `.webp` caused file-type mismatch. Check the actual bytes/extensions before editing paths. `src/data/projects.js` controls homepage orbit imagery.

**Approved image decision (2026-10-13):** Images currently displayed across the portfolio are correct and approved. Do not rename, replace, reorder or swap them based solely on filenames or historical naming conventions. Investigate broken references while preserving the intended displayed image. Image sizing and positioning will be reviewed only after the animation foundation is working. This decision supersedes the historical preference for `*-home.png` orbit images.

## 6. Homepage structure and approved Project Orbit
The supplied `Home.jsx` structure:
1. `<main className="home">` outer page container (GSAP `pageRef` belongs here).
2. Navbar.
3. Hero with Framer Motion `useScroll` / `useTransform` controlling background word Y and hero opacity, plus `RevealText` headlines.
4. Introduction (`#introduction`).
5. `<ProjectOrbit />`.
6. Capabilities preview linking to Code/Profile.
7. Code teaser, code-window (`charles.js` sample), magnetic CTA.
8. Contact CTA and Footer.

**Ref wiring:** `useRef(null)` + `useLayoutEffect(() => initHomeAnimations(pageRef.current), [])`; attach `ref={pageRef}` to the **outer `<main>`**, not `.code-window`. Do not assign the same ref twice. Confirm current code before editing.

**Project Orbit behaviour (implemented previously, user-approved layout):**
- Four projects placed around an orbit (top/right/bottom/left), active project cycles every **4200 ms**.
- Pause rotation while hovered; clicking cards/counters changes active selection; Next button advances.
- Framer Motion fades/slides/blurs the centre project information; inactive cards scaled/softened.
- CSS positions cards and circular rings; original orbit stage ~900px desktop, responsive smaller heights.
- User specifically approved larger card sizing and adjustments. Historical targets: desktop card image `width: clamp(220px, 22vw, 400px); height: clamp(155px, 15.5vw, 280px)`; tablet ~185×130px; mobile ~145×104px. User adjusted bottom/right positions to avoid overlap. **Current `home.css` is authoritative; do not overwrite these dimensions or placements.**
- Avoid GSAP transforms on `.orbit-card` because Framer Motion already owns its transform/scale and CSS handles positional transforms.

## 7. Project case-study visual system
Historical `src/styles/project.css` included:
- `:root` variables: pale background `#f2f3f7`, dark text `#11131a`, muted text, indigo, blue, gold, green; rounded corners and 1380px container.
- `.project-page`, `.case-container`, `.case-hero` / meta / heading / subtitle / links / visual.
- `.showcase-section`, `.showcase-header`, `.showcase-image`, `.showcase-caption`.
- `.story-points`, `.story-point`.
- `.project-details`, `.detail-row`.
- `.tech-story`, `.tech-story__item`.
- `.architecture-section`, `.architecture-flow`, `.architecture-node`, `.architecture-line`.
- `.next-project` with background zoom and arrow interactions.
- Responsive breakpoints around **1000px and 650px**.

**Animation conflict decision:** `.reveal` should not be permanently hidden by CSS when JS/reduced-motion is unavailable; GSAP should own reveal transforms/opacity. `.image-reveal` wrapper should have `overflow: hidden`; GSAP should own scroll-linked image scaling, not competing CSS `imageReveal` keyframes or hover transforms on the same image. Check whether a previously provided full `project.css` replacement was actually applied and audit all selectors before changing.

## 8. Motion design roadmap (agreed scope; implementation status requires audit)
### Stage 1 — Baseline / inventory
- Audit React tree, routes, assets, dependencies, existing animations, CSS and mobile.
- Confirm existing implementation before editing; preserve working UI.

### Stage 2 — Smooth scrolling with Lenis
- Use existing `SmoothScroll.jsx`; initialize exactly one Lenis instance and clean up correctly.
- Coordinate Lenis with GSAP ScrollTrigger if needed (ticker/refresh), with reduced-motion and touch-safe behaviour.
- Test anchor links, navigation resets, scroll restoration and page transitions.

### Stage 3 — GSAP ScrollTrigger foundation
- `homeAnimations.js`: scoped section reveals, restrained parallax, image scale where appropriate.
- `projectAnimations.js`: scoped case-study reveals and scroll-linked image scaling.
- Clean up via `gsap.context(...).revert()`; prevent duplicate triggers on route changes.
- Avoid overlap with existing `RevealText` and Framer Motion animations.

### Stage 4 — Orbit microinteractions
- Preserve approved orbit sizing, position and 4200ms cycle.
- Enhance hover/mouse-follow/parallax subtly **without** disturbing card layout or Framer Motion transforms.
- Provide pointer/touch/reduced-motion fallbacks and avoid constant expensive effects.

### Stage 5 — Cinematic project image storytelling
- Scroll-linked scale, masked/clip reveals where suitable, refined loading transitions, consistent aspect ratios.
- Ensure hero, homepage UI, mobile and detail images remain correct for each project.
- No competing CSS hover transforms on GSAP-controlled images.

### Stage 6 — Sticky editorial storytelling
- Introduce/enable sticky visual-plus-copy sequences using existing project sections where possible.
- Use GSAP pinning only where necessary; mobile should stack naturally without fragile pinning.
- Test scroll length, overflow ancestors, route navigation, and responsive behaviour.

### Stage 7 — Split typography / scroll reveals
- Reuse `RevealText.jsx` and `SplitText.jsx` rather than creating new components.
- Apply expressive line/word reveals to key headings, avoiding simultaneous Framer/GSAP ownership.
- Preserve semantic reading order and reduced-motion fallback.

### Stage 8 — Animated system architecture
- Reuse `ArchitectureDiagram.jsx` for Eddie and Agri-Energy technical storytelling.
- Animate nodes and connections progressively on scroll or in view; clarify real systems from verified project code/content.
- Ensure accessible labels and mobile diagram layout; no fabricated backend integrations.

### Stage 9 — Cursor, magnetic and hover polish
- Reuse `CustomCursor.jsx`, `MagneticButton.jsx`, and existing interactive elements.
- Subtle magnetic CTAs, responsive cursor effects, hover feedback; disable custom cursor on touch and respect keyboard focus.

### Stage 10 — Page/route transitions
- Reuse `PageTransition.jsx`; coordinate React Router, Framer Motion `AnimatePresence`, scroll reset and Lenis.
- Avoid blank screens, route mismatches and animation lifecycle leaks.
- Preserve both `/work/...` and `/projects/...` aliases.

### Stage 11 — Mobile, accessibility and reduced motion
- Validate desktop, tablet and **390px mobile** as an explicit target.
- Touch navigation, hover alternatives, overflow, readable type, contrast, focus, reduced-motion and performance.
- Avoid large pinned scenes and heavy filter/blur animations on small devices.

### Stage 12 — Final performance / production polish
- Audit image formats/sizes, lazy loading, animation cost, layout shift, keyboard usability, links, route refreshes, console errors.
- Run production build and appropriate checks; test in actual browsers.
- Compare finished feel with inspiration without copying it.

## 9. Implementation status — honest handover
| Item | Last known state | Codex verification needed |
|---|---|---|
| React/Vite site and main page structure | Existing | Confirm actual files and render |
| Four case-study pages | Existing | Confirm contents, links and images |
| Homepage Project Orbit | Working; user approved current sizing | Preserve and inspect |
| `homeAnimations.js` | Originally empty; initial GSAP code supplied later | Confirm saved contents and actual wiring |
| `projectAnimations.js` | Originally empty; initial GSAP code supplied later | Confirm saved contents and page wiring |
| Home outer `pageRef` | User was instructed to move ref from code window to `<main>` | Confirm current placement |
| GSAP page refs on TCI/BCC/Eddie/Agri | Instructed, not confirmed | Inspect imports/effects/refs |
| GSAP imports on Contact/Work/Code/Profile | Removed in approved Phase 1, including accidental effects and page refs | Production build verified; existing Framer/component animations retained in source; browser QA pending |
| `project.css` | Full GSAP-compatible replacement discussed/provided | Inspect actual local version; do not assume applied |
| Lenis / `SmoothScroll.jsx` | Existing component name; full integration not confirmed | Inspect lifecycle and wiring |
| Architecture diagram animation | Planned, existing component | Inspect implementation |
| Sticky storytelling | Planned | Inspect current markup and CSS |
| Split typography effects | Existing components; final integration unknown | Inspect and avoid duplicates |
| Custom cursor / magnetic | Existing components; final integration unknown | Inspect behaviour |
| Page transitions | Existing component; final integration unknown | Inspect router integration |
| Reduced-motion / mobile polish | Planned | Audit |
| Production build and visual QA | Phase 1 build passes; lint exits 0 with existing Footer warning | Bundle-size warning remains; browser visual/runtime QA pending |

**Critical lesson:** Prior chat suggestions are not proof that code was pasted, saved, wired or tested. Codex must distinguish each state.

## 10. Known historical problems to guard against
- Wrong relative import from `src/pages/Contact.jsx`: `../../animations/projectAnimations` is incorrect there; nested `src/pages/projects/*.jsx` uses `../../`, while `src/pages/*.jsx` uses `../`. Contact/Work/Code/Profile do not need the project initializer under current design.
- Home `pageRef` accidentally attached to `.code-window`; it should be on the existing outer `<main className="home">`.
- Route mismatch: links to `/work/tci` failed after replacing them with only `/projects/tci` routes. Preserve both.
- Generated image PNGs incorrectly renamed to `.webp` without conversion; inspect file types.
- Duplicate proposed animation files caused architecture confusion; reuse existing files.
- CSS keyframes for `.reveal` / `.image-reveal` can compete with GSAP; audit actual CSS.
- Potential GSAP/Framer Motion transform collision on orbit cards and other components.

## 11. Implementation strategy with Codex in VS Code
**Role split:** ChatGPT = research, creative/technical direction, architecture reviews and acceptance criteria. Codex = repository inspection, targeted code edits, build/debug and implementation reports. Browser = visual and interaction QA.

**Workflow:**
1. Put `AGENTS.md` and `PROJECT_CONTEXT.md` beside `package.json` at repository root.
2. Open the `charles-portfolio` folder in VS Code, then open Codex in that workspace.
3. Run the read-only audit specified in `AGENTS.md`. Do **not** implement changes in the first pass.
4. Review audit results and reconcile this document with actual code.
5. Make a Git checkpoint (after reviewing status) before implementing animations.
6. Implement one stage at a time, starting with wiring/lifecycle correctness and Lenis/ScrollTrigger, then visuals and advanced interactions.
7. After each stage, run checks, visually review, record actual results and update this document.

## 12. Acceptance criteria
- No broken routes, missing imports, missing images or runtime errors.
- Homepage orbit visually matches user-approved design and still rotates, pauses and responds to clicks.
- All four case studies are navigable, accurate and responsive.
- Scroll and hover animations feel polished without stutter or layout jumping.
- GSAP, Framer Motion, Lenis and CSS have clear ownership and correct cleanup.
- Content remains accessible and visible with reduced motion or limited JavaScript.
- Desktop, tablet and 390px mobile are usable.
- A production build succeeds, and visual QA results are recorded truthfully.

## 13. Decision / milestone log template
Add an entry only after a meaningful, confirmed change:

```text
### YYYY-MM-DD — Milestone title
- Objective:
- Files inspected:
- Files modified:
- Implementation:
- Verification (commands/results):
- Visual QA (device/viewport/results or pending):
- Known issues:
- Decisions and next stage:
```

## 14. Immediate next action
**Await Phase 2 approval.** The read-only audit and approved Phase 1 build restoration are complete. Do not implement the animation foundation until approved.

**Approved implementation priorities (2026-10-13):**
1. Restore the production build.
2. Establish GSAP, ScrollTrigger and Lenis.
3. Implement cinematic scroll effects, typography and image transitions.
4. Implement sticky storytelling, animated architecture diagrams, orbit polish, cursor interactions and route transitions.
5. After the animation foundation works, revisit case-study image sizes and layouts, including alternating left/right compositions.
6. Complete responsive refinement, accessibility, performance and final visual polish.

## 15. Verified milestone log

### 2026-10-13 — Phase 1: production build restoration
- Objective: Remove accidental case-study animation wiring from the four main pages and restore production compilation.
- Files inspected: `AGENTS.md`, `PROJECT_CONTEXT.md`, `package.json`, `src/pages/Contact.jsx`, `src/pages/Work.jsx`, `src/pages/Code.jsx`, `src/pages/Profile.jsx`.
- Files modified: The four page files above and `PROJECT_CONTEXT.md`.
- Implementation: Removed incorrect `../../animations/projectAnimations` imports, `useLayoutEffect` initializer calls, `useRef` page refs and corresponding JSX ref attributes. Existing Framer Motion animations, page transitions, RevealText, magnetic CTAs and Work hover-preview behavior were retained in source. No changes to Home, orbit, images, CSS, case studies, routes or dependencies.
- Verification: `npm.cmd run build` exited 0 (Vite 8.3.1; 2333 modules transformed); generated production output in `dist/`. Non-blocking warning: JavaScript chunk is 554.09 kB minified (183.20 kB gzip), above the 500 kB threshold. `npm.cmd run lint` exited 0 with the existing `react(purity)` warning for `new Date()` at `src/components/Footer.jsx:11`.
- Visual QA: Desktop/tablet/390px mobile and runtime interaction checks pending; no browser verification performed.
- Known issues: Workspace has no Git repository; `git status --short` reports "not a git repository". Prior audit found unwired case-study GSAP, no matching Home GSAP targets, empty SmoothScroll/Lenis implementation, and a broken Agri detail reference (`agri-detail.png` requested; `.agri-detail.png` exists). These remain outside Phase 1 and were not changed.
- Decisions: Preserve approved imagery regardless of historical filenames; follow the implementation priorities above. Phase 2 requires separate approval. No packages installed and no commit/push performed.

### 2026-10-13 — Pre-upload baseline fixes
- Objective: Resolve the audited runtime and asset-reference blockers, and make the repository metadata suitable for a baseline GitHub upload.
- Files inspected: `Contact.jsx`, `AgriEnergy.jsx`, `index.html`, `.gitignore`, `README.md`, route definitions, and the actual public image files.
- Files modified: `src/pages/Contact.jsx`, `src/pages/projects/AgriEnergy.jsx`, `index.html`, `.gitignore`, `README.md`, and `PROJECT_CONTEXT.md`.
- Implementation: Removed the accidental project-animation setup from Contact (which referenced missing React hooks); corrected the Agri detail image URL to match the existing hidden-dot PNG filename without moving or renaming the approved asset; replaced the Vite starter README, set a portfolio-specific document title and description, and ignored `.env*` while allowing `.env.example`.
- Verification: `npm.cmd run build` exited 0 (Vite 8.3.1; 2333 modules transformed), with the existing >500 kB JavaScript chunk warning. `npm.cmd run lint` exited 0 with the pre-existing `react(purity)` warning in `src/components/Footer.jsx:11`. Editor diagnostics reported no issues in the changed source files. Browser smoke checks at 390px covered `/contact` and `/projects/agri-energy`: no page errors or horizontal overflow; all four Agri images loaded, including the corrected detail image.
- Visual QA: Route rendering and mobile overflow checked; detailed desktop/mobile visual review remains pending.
- Known issues: Contact still has placeholder email and social links that require Charles's real destinations before the portfolio is presented as finished. The workspace still has no Git repository or remote. GitHub repository creation and push are pending visibility choice and GitHub authentication. The zero-byte interaction files and unwired animation foundation remain outside this upload-preparation change.
- Decisions and next stage: Do not invent contact information. Confirm repository visibility before creating it, then initialize Git, review staged contents for secrets/build artifacts, and push the approved baseline. No repository was created and no commit or push was performed in this milestone.

### 2026-10-13 — Public GitHub baseline published
- Objective: Create and publish the approved initial portfolio repository.
- Files inspected: All staged project files, asset paths, `.gitignore`, and the remote repository after creation.
- Files modified: `PROJECT_CONTEXT.md` (this publication record).
- Implementation: Created the public repository [charles-portfolio](https://github.com/ST10296198/charles-portfolio) and pushed `main`. The initial baseline contains 72 files; generated `dist/` output and `node_modules/` were excluded. The staged-text credential-pattern scan found no matches, and no `.env` files were included.
- Verification: GitHub reports repository visibility `PUBLIC`; remote `main` matched local commit `123a66f04f7331454414230cfd6fd4a6c72efc41`. The working tree was clean after the push. Build, lint, and route/image smoke-check results are recorded in the pre-upload milestone above.
- Visual QA: Contact and Agri routes were loaded at 390px with no page errors or horizontal overflow; the Agri case-study images all loaded. Full visual inspection remains pending.
- Known issues: The public Contact page still contains placeholder email/social links; replace them with the owner's intended destinations. The lint purity warning, chunk-size warning, empty interaction files, and animation wiring gaps remain.
- Decisions and next stage: Treat the published repository as the initial baseline. Make further changes as separate commits; do not claim complete visual QA or a finished Contact page until their outstanding work is resolved.
