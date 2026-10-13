# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + vanilla JavaScript, no UI framework (user's choice, 2026-10-13). Builds to static files for any static host. Deploy target not yet decided.

## Users

Primary: recruiters and hiring managers scanning a candidate's portfolio, usually on a laptop between other tasks, sometimes on a phone from a link in a message. Their job is to judge quickly what the candidate has built, where they interned, and how to reach them.

Secondary (inferred from the theme, not confirmed): engineers on a hiring panel who want to see that the candidate understands agent / multi-step AI systems.

## Product Purpose

A personal portfolio for Sai Manoj Varikuntla. It presents internships, projects, skills, achievements and education, and gets the visitor to download the résumé, email, or send a message. Success: a recruiter finds the experience and a way to make contact within seconds, and remembers the site afterward.

## Positioning

The site works like a running agent graph ("Execution Trace"): the visit is a query moving through Router, Retriever, Validator, Writer and Human agents, and each section is a node. The hero answers questions about the work through that graph and doubles as navigation; a floating "Ask my agent" chat does the same from anywhere. The source plan is `~/Downloads/portfolio-ui-plan.md`.

On 2026-10-13 the owner asked for a refactor modeled on two references: https://bhuvansai-portfolio-mu.vercel.app/ (light, pastel, bold type, project cards with signature / hard part / result and architecture, GitHub heatmap, timeline, dark contact panel, mascot chat) and https://dribbble.com/shots/24570927 (dark navy and violet, photo-led, chatbot). Take patterns from them; do not copy their illustrations, mascots or copy lines. The owner later asked that the contact and checkpoint sections stop resembling the friend's site (Bhuvansai), tried a training-run chart and an API-request form, then settled (by request, with a screenshot) on a horizontal timeline for checkpoints and a box-free contact layout: underline fields beside a hairline list of direct lines (no Copy button, no assistant button). A sent message clears the form.

## Capabilities and Constraints

- The floating chat assistant (a robot mascot with a "Hello!" bubble) answers open questions about the owner's work with Groq (`openai/gpt-oss-120b` by default) via `/api/chat` (`server/chat.js`; Vercel function + Vite dev middleware), grounded only in the owner-edited knowledge base `kb/knowledge.md` (owner's choice, replacing Claude). Without `GROQ_API_KEY` it falls back to on-page answers from `src/content.js`. The hero "Ask the graph" panel, the hero résumé/agent buttons, and the hero and footer social icons were removed at the owner's request.
- Skills carry an optional 1–10 level and an icon (Simple Icons slug or own image); the owner asked for level bars, overriding the plan's "no skill bars".
- Skills are an endless circuit strip under the hero (no separate Skills section, by request). Projects open one at a time from a thumbnail rail; certificates sit in a carousel.
- The native page scrollbar is hidden; the trace rail is the scrollbar (drag to scrub, click to jump).
- Activity trace: GitHub contributions loaded in the visitor's browser from the public github-contributions-api.jogruber.de service once `log.githubUser` is set.
- Contact form with sent and error states, delivered by EmailJS (a message to the owner plus an optional auto-reply to the visitor). The IDs live in `.env.local` as `NEXT_PUBLIC_EMAILJS_*`; without them it falls back to `contact.endpoint`.
- All content lives in one data file so the owner can replace placeholders without touching UI code.
- Sections with no content are hidden from the page and the trace rail.
- Project buttons with no real URL are hidden, never linked to a placeholder.

## Brand Commitments

From the plan (still binding):
- Agent cast with fixed roles and glyphs: Router (diamond), Retriever (circle), Validator (hexagon), Writer (square), Human (ring). Their hues were re-tuned in the 2026-10-13 refactor (Router is now violet); see DESIGN.md.
- Follows the system theme with a header toggle; light is the default when the system has no preference (refactor decision).
- Sentence case, no labels above headings.
- Motion means data moving: current through the skills strip and project wire, packets. The strip's glide and its flowing current are continuous by request; both stop with reduced motion and pause off screen.
- Recruiter-friendly first: it must still scroll like a normal portfolio.

## Evidence on Hand

None yet. All content is placeholder by the owner's choice. Real material exists outside the project and is not yet used: `~/Downloads/VarikuntlaSaiManoj_Resume.pdf` (newest résumé, 2026-09-05) and `~/Downloads/Sai Manoj Varikuntla.png`. Do not invent employers, metrics, publications or awards.

## Product Principles

1. Recruiter speed beats spectacle: every section is reachable and readable without engaging with the graph.
2. Color and motion carry meaning; if they don't tell the visitor something, they don't ship.
3. Content is data: the owner fills slots, the UI never hard-codes biography.
4. Honest states: unknown questions, empty sections and missing links are handled visibly and truthfully.

## Accessibility & Inclusion

WCAG AA contrast for all agent colors on both themes, full keyboard support (Enter/Space expand, Esc collapse), visible focus rings in agent colors, text equivalents for every animation, and `prefers-reduced-motion` respected everywhere.
