---
name: Execution Trace
description: A bold, pastel portfolio that behaves like a running agent graph; the visit is the query.
colors:
  cool-paper: "#f5f5f8"
  sheet-white: "#ffffff"
  mist: "#eeeef3"
  hairline: "#e1e2ea"
  edge-gray: "#a3a6b8"
  ink: "#101118"
  slate: "#5b5e6e"
  hero-lavender: "#d9d4fb"
  router-violet: "#5b4ddb"
  retriever-sky: "#2a8fd0"
  validator-leaf: "#5f9a22"
  human-coral: "#e2583a"
  warn-amber: "#c77712"
  lane-violet: "#e9e5fd"
  lane-lime: "#eef8c8"
  lane-peach: "#fde4d9"
  lane-sky: "#dcf0fb"
  night-navy: "#090b1a"
  night-panel: "#12152b"
  night-violet: "#9184ff"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.4rem + 4.8vw, 6rem)"
    fontWeight: 790
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 2.8vw, 4.25rem)"
    fontWeight: 780
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.25rem + 1.1vw, 2.25rem)"
    fontWeight: 780
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 450
    lineHeight: 1.5
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  pill: "999px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s5: "48px"
  section: "136px"
  section-mobile: "88px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  chip:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.slate}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  agent-node:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "14px"
    width: "136px"
    height: "52px"
  project-card:
    backgroundColor: "{colors.lane-violet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "28px"
  input:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "50px"
---

# Design System: Execution Trace

## Overview

**Creative North Star: "The Launch Console"**

The page is a product launch for one engineer, run on an agent graph. A huge two-line headline and a portrait open it, with the skills gliding underneath on an endless circuit strip where current flows pad to pad; projects open one at a time from a thumbnail rail, wired into a big preview of their architecture; certificates come forward in a wired carousel; checkpoints run along a horizontal timeline; the page closes on "Let's talk": underline fields beside a hairline list of direct lines. A small mascot agent answers questions from anywhere on the page.

Light is the default world: cool paper, ink type, a lavender hero field with a node-editor dot grid, and four pastel lanes. Dark is a deep navy with violet light. Both share one grammar of pills, rounded cards and dashed edges with packets.

**Key Characteristics:**
- Heavy, tight display type (Bricolage Grotesque 780–790, −0.04em) at up to 96px.
- Pastel lanes (violet, lime, peach, sky) give each project, tool group and product its own color identity.
- Five agent hues carry meaning inside the graph, the trace rail and section glyphs.
- Pill-shaped controls everywhere; cards at 24–32px corners; nodes at 14px.
- Motion is data moving: current flowing through the skills strip and project wire, packets through architecture diagrams, the trace packet stepping node to node.

## Colors

A neutral paper ground with a violet voice, four pastel lanes, and five signal hues for the agents.

### Primary
- **Router Violet** (router-violet): the brand voice. Brand mark, the role line of the headline, the Router agent, focus rings, the experience timeline, link-highlight outlines. Dark mode lifts it to Night Violet (night-violet).
- **Retriever Sky** (retriever-sky): the Retriever agent, retrieved context cards, Work and Experience section glyphs.
- **Validator Leaf** (validator-leaf): the Validator, passed checks, the availability dot, the activity heatmap ramp, shipped status.
- **Human Coral** (human-coral): the Human agent, form errors.
- **Warn Amber** (warn-amber): the Validator's warning state and "in progress" status only.

### Secondary
- **Lanes** (lane-violet, lane-lime, peach, sky): card and pill fields. Each lane also has a line tone and an ink tone (in `tokens.css`) for borders, signatures, dots and tinted secondary text.

### Neutral
- **Cool Paper** (cool-paper): page ground. **Sheet White** (sheet-white): panels, nodes, pills. **Mist** (mist): inputs, canvas, empty heatmap cells. **Hairline** (hairline): borders. **Edge Gray** (edge-gray): graph edges at rest, dashed outlines. **Ink** (ink): text and primary buttons. **Slate** (slate): secondary text.
- **Night Navy / Night Panel** (night-navy, night-panel): the dark theme's ground and surfaces.

### Named Rules
**The Lane Identity Rule.** A lane color belongs to one item for the whole page: a project's lane tints its card and its architecture packets. Lanes rotate in order (violet, lime, peach, sky); never hand-pick one for decoration.

**The Tinted Secondary Rule.** On a lane field, secondary text is mixed from the lane's ink, never plain slate gray.

**The Two Inks Rule.** Agent colors have a graphics value (3:1 or better) and a text ink (4.5:1 or better). Agent-colored text always uses the ink.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui)
**Body Font:** Bricolage Grotesque, optical sizing on
**Label/Mono Font:** JetBrains Mono

**Character:** A friendly, slightly quirky grotesk pushed to heavy weights for presence, calm at text sizes thanks to its optical-size axis; a crisp mono for the machine's voice.

### Hierarchy
- **Display** (790, up to 96px, 0.96): the hero headline only, name on one line and role in violet on the next.
- **Headline** (780, up to 68px, 1.0): section headings, with the owning agent's glyph before them.
- **Title** (780, up to 36–48px): project names and role titles.
- **Body** (400, 17px, 1.6): reading text; About's lead paragraph runs at 21–24px, weight 560.
- **Label** (mono, 12px; 11px inside graph nodes): function signatures, run status, trace logs, record field labels (Based in, Currently).

### Named Rules
**The Machine Voice Rule.** Mono is for things a system would print: signatures, run status, trace logs, record field labels, and the contact form's field labels and contact-list labels. Buttons, tags, headings, values and human messages stay in the sans.

**The No Kicker Rule.** Nothing sits above a heading. The availability pill lives below the hero buttons, never as an eyebrow.

## Layout

A centered 1232px container with fluid gutters (16–48px). A floating pill nav sits 14px from the top. Sections are separated by 136px (88px on phones). The hero is two columns (copy left, portrait right) and stacks below 900px; the skills circuit strip closes the hero at container width. Projects put thumbnails and details left and the preview right. The page has no native scrollbar: the trace rail on the right is the scrollbar.

Responsive changes:
- 768px and up: the trace rail shows on the right edge (20px in from 1280px, 14px below).
- Under 1024px: skills, projects and experience go single column; the project wire hides.
- The skills strip uses a tighter geometry under 560px (48px nodes, 128px steps).
- Under 768px the certificate carousel shows one card at a time.
- Under 960px: nav links move behind a menu button.
- Under 768px: the rail becomes a 3px progress bar at the top; the agent chat opens as a bottom sheet.
- Architecture diagrams flip from left-to-right to top-to-bottom when their panel is narrower than 440px (container query).

## Elevation & Depth

Mostly flat tone-on-tone, with two shadows. Floating layers (nav when scrolled, chat panel, launcher, project cards, photo tags) take the large shadow and drop their border in light mode; resting panels take the small one. In dark mode floating layers keep a hairline, since shadows vanish on navy.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgb(16 17 24 / .06), 0 4px 12px -6px rgb(16 17 24 / .12)`): run panel, nav at rest, activity card.
- **Float** (`0 2px 4px rgb(16 17 24 / .04), 0 24px 48px -24px rgb(16 17 24 / .28)`): chat, launcher, stacked project cards, photo tags.

## Shapes

Pills for every control (buttons, chips, tags, inputs, nav). Cards at 24px (tool groups, activity) and 32px (project cards, run panel at 28px); achievement cards at 24px. Architecture boxes at 12px. Graph edges are 1.3–1.5px dashed curves with open chevron arrowheads; they go solid in the lane or agent color once a packet has passed.

## Components

### Buttons
The hero carries no buttons or social icons: the name, intro and availability pill do the work, the "Let's talk" pill in the nav is the primary action, and contact details (résumé as "View") live in the contact list.
- **Primary:** ink pill, white text, lifts 1px on hover. One per area (Let's talk, Send message, chat send).
- **Ghost:** transparent pill with a 1.5px ink border.
- **Placeholder slot:** dashed and dimmed, not clickable, until the link is filled in.

### Skills strip (signature)
A dark circuit strip in both themes, under the hero. Every skill sits on one unbroken circuit: 56px rings zig-zagging between two rows (logo or monogram, name below), joined by 3px light-gray traces that run flat, bend 45°, and run flat again, at an even 168px step. Dots of current flow along the whole trace, colored by the lane of the group they're passing through, so groups read as color changes, never as breaks. The circuit is copied end to end and the last skill wires straight into the first, so the loop has no seam (an odd count adds a small via to keep the zig-zag rhythm). It glides left forever (34px/s); hovering stops it so a name can be read, a drag scrubs it, and it pauses off screen. Skills are read straight off the strip (no hover card); a hovered ring lifts and glows in its lane. With reduced motion it stands still and scrolls sideways by hand or keyboard.

### Project browser (signature)
A rail of 136px thumbnails (screenshot, or lane-gradient art with initials) acting as tabs. The chosen one gets a lane ring; its details open below (signature, title, status, summary, tags, links) and its big preview opens on the right (screenshot, or the architecture diagram on a dot grid, with a switch when both exist). A wire with flowing current runs from the chosen thumbnail down and across into the preview, redrawing itself on every pick.

### Certificate carousel (signature)
One certificate in focus with a blue-to-violet gradient border; neighbours either side, smaller, desaturated, offset low and high. A dashed blue wire with a dot links the previous card in; a solid violet wire with a ring leads out to the next. Arrows, dots, arrow keys, swipe, or a click on a neighbour move it; phones show one card at a time. Missing images draw a paper stand-in (ribbon, seal, issuer, title, date); the seal carries the issuer's real logo on a white disc when one is set (Postman, GDSC's bracket mark, AWS), or the issuer's initials.

### Chat assistant (signature)
A floating robot in the bottom-right corner: glossy blue-to-violet head, dark visor with glowing eyes and a smile, antenna ball, ear pieces, a waving arm, and a soft shadow; it floats gently and blinks. A white "Hello!" speech bubble (heavy blue type) always sits beside the robot like a label (clicking it opens the chat) and hides while the chat is open; the robot waves on hover. It opens a 390px chat (a bottom sheet on phones): a header with the robot avatar, "<first name>'s assistant" and a live dot; agent bubbles on the left, visitor bubbles in ink on the right; while an answer is being worked out, the four agent glyphs pulse in turn. Replies stream in word by word with a safe markdown subset (paragraphs, lists, bold) and links only to page anchors or URLs that appear in the content.

### Checkpoints (horizontal timeline)
One line runs left to right, oldest to latest, ending in an arrowhead. Each milestone is a hollow node on the line, ringed in its type's lane (education sky, award peach, publication violet, certification lime), with a short stem to its card; cards alternate above and below the line, and the year sits on the free side of each node. Cards are lane-tinted (20px radius, lane border, lane-tinted secondary text): a small icon tile and the type, the title, the detail and a link pill ("Read paper"). Columns are at least 200px; with too many milestones the timeline scrolls sideways. The one authored moment: the line draws forward when first seen and each milestone arrives as it passes. Phones turn it vertical, newest at the top, with the year inside each card.

### Contact
No boxes. A 6rem "Let's talk." headline and the lead, then two columns. Left: the form as underline fields (mono labels Name, Email, Message; 1.125rem text; violet underline on focus, coral on error), then an ink "Send message →" pill. A sent message clears the form; the button reads "Message sent" with a leaf outline for a few seconds, and a line of thanks stays below. Right: the direct lines as a list separated by hairlines: a mono label over a large value (email, LinkedIn, GitHub, résumé "View"); long links wrap after slashes and before the @.

### Inputs
Hero and chat: pill inputs on mist, violet border on focus. Contact: transparent underline fields as described above.

### Navigation
Floating pill: violet brand mark plus name, section links, theme toggle and a "Let's talk" primary pill. The right-edge trace rail replaces the native scrollbar and logs the visit: hollow upcoming dots, filled done dots, and a haloed active dot holding the packet, which glides to the next node when the section changes. Drag along the rail to scrub the page; click the wire to jump; click a node to go to its section.

## Do's and Don'ts

### Do:
- **Do** give every new section an owning agent and put its glyph before the heading.
- **Do** keep new items in the lane rotation so color stays an identity, not a decoration.
- **Do** animate only when something moves through the system (current, a packet, a check), and give every animation a reduced-motion state.
- **Do** keep all biography in `src/content.js`; empty arrays hide sections.

### Don't:
- **Don't** put labels or pills above headings.
- **Don't** use gray text on lane fields; tint it from the lane ink.
- **Don't** set tags, dates, values or headings in mono (the contact form's field labels are the one exception).
- **Don't** add a second accent color outside the agents and lanes.
- **Don't** link a placeholder; slots stay visibly dead until filled.
