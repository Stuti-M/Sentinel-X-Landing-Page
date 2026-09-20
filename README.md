# Sentinel Command

Build a futuristic, production-quality website for SENTINEL-X, a multi-agent autonomous environmental intelligence platform focused on detecting, analyzing, and responding to illegal deforestation and environmental crises.

CORE CONCEPT

Sentinel-X uses an n8n multi-agent workflow:

Crisis Input → Field Researcher Agent → Evidence Gathering & Verification → Policy Director Agent → Threat Assessment → SDG Alignment → Immediate Action → Policy Brief

The two agents are:

Field Researcher Agent

Gathers evidence and context

Uses SerpAPI, Wikipedia, HTTP Request and Calculator

Identifies anomalies and synthesizes research

Policy Director Agent

Consumes verified research

Determines threat level

Identifies primary risk

Generates immediate action

Aligns responses with SDG 13 and SDG 15

Produces structured JSON policy output

Tech stack:
React, TypeScript, Tailwind CSS, Node.js, n8n, Groq, SerpAPI.

VISUAL STYLE

Do NOT make this a generic environmental website or portfolio.

Make it feel like:

AI Command Center × Satellite Intelligence × Environmental Operations × Agentic AI

Visual references:

futuristic AI operations console

satellite monitoring platform

NASA-style mission control

premium AI startup dashboard

Use a dark interface:

Background: #05080D

Panels: #101923

Text: #E8F0F5

Muted: #7F919E

Cyan AI accent: #65D9FF

Green environmental accent: #39D98A

Amber warning: #FFB84D

Red critical: #FF5C5C

Use subtle grids, glass panels, thin borders, glowing indicators, monospace terminal text and smooth animations.

Avoid excessive neon, cartoon leaves, stock environmental imagery, clutter and generic SaaS styling.

HERO

Display:

SENTINEL-X
AUTONOMOUS ENVIRONMENTAL INTELLIGENCE

"Detect. Verify. Reason. Respond."

Include:

● SENTINEL NETWORK ONLINE

AGENTS: 02 | ORCHESTRATION: n8n | MODE: AUTONOMOUS ANALYSIS

Primary CTA:

LAUNCH COMMAND CENTER

Secondary:

VIEW ARCHITECTURE

Add a subtle animated satellite/topographic intelligence visualization in the background.

COMMAND CENTER — MAIN FEATURE

Make this the centerpiece of the website.

Left: Scenario Injection

Textarea:
"Describe an environmental crisis..."

Preset scenarios:

Illegal Deforestation

Forest Encroachment

Rapid Forest Loss

Wildlife Habitat Disturbance

Button:

INITIATE ANALYSIS

Include a Crisis Override toggle.

Center: Agent Orchestration

Create an animated workflow:

INPUT → FIELD RESEARCHER → EVIDENCE → POLICY DIRECTOR → RESPONSE

Show agent status and tools.

When analysis starts, animate:

WEBHOOK RECEIVED
FIELD RESEARCHER ACTIVATED
SEARCHING EXTERNAL CONTEXT
VALIDATING EVIDENCE
RESEARCH COMPLETE
POLICY DIRECTOR ACTIVATED
GENERATING RESPONSE
ANALYSIS COMPLETE

Right: Policy Intelligence

Display:

Threat Level

Primary Risk

Immediate Action

SDG Alignment

Policy Brief

Add VIEW RAW JSON with a syntax-highlighted JSON viewer.

Use mock/demo data unless a real backend is connected. Clearly label simulated information.

AGENT ACTIVITY

Add a terminal-style panel showing:

> webhook.received()
> field_researcher.activate()
> serpapi.query()
> wikipedia.verify()
> evidence.synthesized()
> policy_director.activate()
> sdg_alignment.evaluate()
> response.serialize()


AGENTS SECTION

Create two interactive cards:

FIELD RESEARCHER
"Evidence before action."

Show responsibilities and tools:
SerpAPI / Wikipedia / HTTP / Calculator

POLICY DIRECTOR
"Reasoning before response."

Show:
Threat Assessment / Risk / Policy / SDG Alignment / Action

ORCHESTRATION

Create a futuristic n8n-style node graph:

Webhook → Field Researcher → Policy Director → Response

Label:

POWERED BY n8n

Also show the complete architecture:

Browser → Node.js Proxy → n8n Webhook → Agents → Structured JSON → Browser

ENVIRONMENTAL INTELLIGENCE MAP

Add a simulated satellite/GIS visualization containing:

forest boundaries

protected zones

anomaly markers

scan areas

coordinates

confidence indicators

Clearly mark demo/simulated data.

IMPACT + ETHICS

Show:

SDG 13 — Climate Action
SDG 15 — Life on Land

Add an Autonomy With Accountability section:

Evidence-backed reasoning

Transparent agent workflow

Structured outputs

Human oversight

Traceable decisions

Use:

"Automation should accelerate environmental response — not remove human accountability."

FUTURE ROADMAP

Show:

NOW
Multi-agent environmental crisis analysis

NEXT
Satellite/GIS integration → Incident history → Authentication → Alert routing

VISION
Autonomous environmental early-warning network

DEMO MODE

Add a DEMO MODE button.

When activated:

Populate a sample crisis.

Activate Field Researcher.

Animate evidence gathering.

Activate Policy Director.

Generate policy output.

Populate threat/risk/action/SDG cards.

Show terminal logs.

Complete the demo in approximately 10–15 seconds.

Add MISSION REPLAY after execution to replay the complete agent workflow.

NAVIGATION

Sticky minimal navbar:

SENTINEL-X | COMMAND | INTELLIGENCE | AGENTS | ORCHESTRATION | ARCHITECTURE | IMPACT

Right side:

● SYSTEM ONLINE

LAUNCH

TECHNICAL REQUIREMENTS

Use:

React

TypeScript

Tailwind CSS

Lucide icons

Modular reusable components

Responsive desktop/tablet/mobile design

Create an API service layer such as:

/services/sentinelApi.ts

so the n8n webhook can easily be connected later.

Do not expose API keys.

FINAL GOAL

The website should NOT feel like a static project presentation.

It should feel like the visitor has entered:

"THE CONTROL ROOM FOR AN AI ENVIRONMENTAL RESPONSE NETWORK."

Prioritize:
interactivity + visual storytelling + multi-agent demonstration + technical credibility + memorable presentation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3a8e0b4-0297-4b18-9f22-9fcbdcf10e34).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
