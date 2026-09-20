# SENTINEL-X Command Center

## Build
- Replace the placeholder with a dark, responsive environmental intelligence control room.
- Create reusable command-center panels for scenario input, agent orchestration, policy intelligence, activity logs, agents, architecture, map, impact, ethics, and roadmap.
- Add a sticky mission navigation with direct access to each major area.

## Interactive demo
- Add preset crisis selection, custom scenario input, and a crisis override.
- Run a paced 10–15 second simulated analysis that advances workflow nodes, status messages, evidence, policy output, and terminal logs.
- Add demo mode, raw structured-output viewing, and mission replay.
- Keep all generated intelligence visibly labeled as simulated.

## Visual system
- Implement the supplied near-black, cyan, green, amber, and critical-red palette as semantic theme tokens.
- Use a precise mission-control composition with subtle grid/topographic layers, thin glass borders, restrained glows, mono telemetry, and reduced-motion support.
- Ensure the experience remains usable across desktop, tablet, and mobile layouts.

## Technical details
- Use React, TypeScript, Tailwind CSS, Lucide icons, and existing interface components.
- Add a typed API service boundary so a future n8n webhook can replace the local simulation without exposing credentials.
- Add route-specific page metadata and remove template branding.
- Verify the final page visually at desktop and mobile sizes, including the complete demo flow.
