## Changes to `src/routes/index.tsx`

**1. Hero headline on 2 lines**
- Constrain the `<h1>` width (e.g. `max-w-2xl mx-auto`) so "Building the layer between LLMs and real-world use." wraps to exactly 2 lines at md+ breakpoints instead of 3. Keep all other hero styling untouched.

**2. Stop terminal card from pushing the page down**
- The `TerminalCard` body currently uses `min-h-[180px]` but its `history` array grows from 0 → 3 entries while typing, so the card silently expands by ~3 lines and shifts the whole page (and footer) downward as the user reads.
- Replace the inner body with a fixed-height, internally-clipped container:
  - Use `h-[220px] overflow-hidden` on the `px-5 py-4 font-mono ...` div (line 185), and reserve the outer card height so its total height never changes between the first render (empty history) and steady state (3 history rows).
- No other terminal logic/animation changes.

**3. Project card updates**
- `RepairMate` (and the fallback "currently building" label on line 655): change the placeholder badge text shown on cards without a link from `currently building` to `Proprietary Lab Project`. After change #3b below, RepairMate is the only featured card without a link, so this label only affects RepairMate.
- `Critique-Enhanced RAG` (line 584 entry): add `link: "https://github.com/subhan75/Critique-Based-Retrieval-Augemented-Generation-RAG-"` so the arrow icon opens the repo (and the "Proprietary Lab Project" label no longer appears on it).
- `SectionLabel` on line 691: change `Selected Work` → `Featured Work` (rendered uppercase by the existing `.section-label` style, matching the requested "FEATURED WORK").

Note: the separate `Articulr` card's explicit `badge: "currently building"` (line 683) is a distinct featured-badge field and is left unchanged since the request was scoped to RepairMate.

## Out of scope
No changes to other sections, styles, animations, or `src/styles.css`.