import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Crosshair,
  Database,
  ExternalLink,
  Eye,
  FileJson,
  Globe2,
  Network,
  Orbit,
  Play,
  Radar,
  Radio,
  RefreshCw,
  Satellite,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trees,
  Waypoints,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  analyzeCrisis,
  DEMO_SCENARIO,
  SIMULATED_POLICY,
  type PolicyIntelligence,
} from "@/services/sentinelApi";
import { cn } from "@/lib/utils";

const STAGES = [
  { label: "WEBHOOK RECEIVED", log: "> webhook.received()", node: 0 },
  { label: "FIELD RESEARCHER ACTIVATED", log: "> field_researcher.activate()", node: 1 },
  { label: "SEARCHING EXTERNAL CONTEXT", log: "> serpapi.query()", node: 1 },
  { label: "VALIDATING EVIDENCE", log: "> wikipedia.verify()", node: 2 },
  { label: "RESEARCH COMPLETE", log: "> evidence.synthesized()", node: 2 },
  { label: "POLICY DIRECTOR ACTIVATED", log: "> policy_director.activate()", node: 3 },
  { label: "GENERATING RESPONSE", log: "> sdg_alignment.evaluate()", node: 3 },
  { label: "ANALYSIS COMPLETE", log: "> response.serialize()", node: 4 },
] as const;

const PRESETS = [
  "Illegal Deforestation",
  "Forest Encroachment",
  "Rapid Forest Loss",
  "Wildlife Habitat Disturbance",
];

const NAV = ["COMMAND", "INTELLIGENCE", "AGENTS", "ORCHESTRATION", "ARCHITECTURE", "IMPACT"];

type RunState = "idle" | "running" | "complete";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase text-primary">
      <span className="text-muted-foreground">{index}</span>
      <span className="h-px w-8 bg-primary/50" />
      <span>{children}</span>
    </div>
  );
}

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("panel-bevel overflow-hidden rounded-md border border-border", className)}>{children}</div>;
}

function PanelHeader({ icon: Icon, title, meta }: { icon: typeof Activity; title: string; meta?: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-secondary/35 px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon className="size-4 shrink-0 text-primary" />
        <span className="truncate font-mono text-[11px] font-medium uppercase text-foreground">{title}</span>
      </div>
      {meta && <span className="shrink-0 font-mono text-[9px] uppercase text-muted-foreground">{meta}</span>}
    </div>
  );
}

function StatusDot({ active = false, warning = false }: { active?: boolean; warning?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        warning ? "bg-warning" : active ? "bg-eco shadow-[0_0_12px_var(--eco)]" : "bg-muted-foreground/40",
      )}
    />
  );
}

function IntelligenceMap({ running }: { running: boolean }) {
  return (
    <Panel className="relative min-h-[470px]" >
      <PanelHeader icon={Satellite} title="Environmental Intelligence Map" meta="SIMULATED DATA" />
      <div className="relative h-[420px] overflow-hidden bg-background/40">
        <svg viewBox="0 0 800 430" className="absolute inset-0 h-full w-full text-primary" aria-label="Simulated satellite intelligence map">
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity=".09" strokeWidth="1" />
            </pattern>
            <radialGradient id="scan-fade">
              <stop offset="0" stopColor="currentColor" stopOpacity=".13" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="430" fill="url(#map-grid)" />
          <g className="text-eco" fill="currentColor" fillOpacity=".10" stroke="currentColor" strokeOpacity=".5">
            <path d="M16 92C105 28 187 81 237 45c65-46 116 10 178 2 91-12 129 55 222 35 79-17 125 44 170 89v212c-80 19-129-15-207 10-82 27-139-25-214 4-95 37-166-26-249 5-55 21-95-7-121-28Z" />
            <path d="M127 143c55-50 112-18 148-46 49-38 94 12 133 2 64-16 92 35 151 24 66-12 94 40 128 73-44 32-30 82-89 98-66 18-98-28-157-5-63 24-118-30-171-1-57 31-108-2-143 11-22-48 22-103 0-156Z" fillOpacity=".15" />
          </g>
          <g fill="none" stroke="currentColor" strokeOpacity=".24">
            <path d="M58 176c102-71 182 33 280-24s172 24 263-29 141 10 183 37" />
            <path d="M22 231c104-70 183 33 281-24s172 23 263-30 141 11 183 37" />
            <path d="M56 289c103-70 182 33 280-24s172 23 263-30 141 11 183 37" />
          </g>
          <circle cx="462" cy="215" r="128" fill="url(#scan-fade)" className={running ? "radar-sweep" : ""} />
          <circle cx="462" cy="215" r="94" fill="none" stroke="currentColor" strokeOpacity=".24" strokeDasharray="5 7" />
          <circle cx="462" cy="215" r="52" fill="none" stroke="currentColor" strokeOpacity=".4" />
          <path d="M462 215L462 86A129 129 0 0 1 564 135Z" fill="currentColor" fillOpacity=".13" className={running ? "radar-sweep" : ""} />
          {[[462,215],[511,189],[401,247],[578,266]].map(([x,y],i) => (
            <g key={i} className={i === 0 ? "text-destructive" : "text-warning"}>
              <circle cx={x} cy={y} r={i === 0 ? 8 : 5} fill="currentColor" />
              <circle cx={x} cy={y} r={i === 0 ? 18 : 12} fill="none" stroke="currentColor" strokeOpacity=".45" />
            </g>
          ))}
          <path d="M167 109v-18h18M167 109h18M692 344v18h-18M692 344h-18" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="absolute left-4 top-4 rounded-sm border border-border bg-background/80 p-3 font-mono text-[9px] uppercase text-muted-foreground backdrop-blur-sm">
          <p className="mb-2 text-foreground">SCAN REGION // AMZ-07</p>
          <p>LAT −3.4653</p><p>LON −62.2159</p><p className="mt-2 text-warning">4 ANOMALIES DETECTED</p>
        </div>
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-border bg-border font-mono text-[9px] uppercase">
          {[["CANOPY DELTA", "−18.4%"], ["CONFIDENCE", "94.7%"], ["SCAN AREA", "284 KM²"]].map(([label,value]) => (
            <div key={label} className="bg-background/90 p-3"><p className="text-muted-foreground">{label}</p><p className="mt-1 text-foreground">{value}</p></div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Workflow({ activeNode, running }: { activeNode: number; running: boolean }) {
  const nodes = [
    { name: "INPUT", icon: Radio, sub: "WEBHOOK" },
    { name: "FIELD RESEARCHER", icon: Search, sub: "4 TOOLS" },
    { name: "EVIDENCE", icon: Database, sub: "VERIFIED" },
    { name: "POLICY DIRECTOR", icon: Bot, sub: "REASONING" },
    { name: "RESPONSE", icon: ShieldCheck, sub: "JSON" },
  ];
  return (
    <div className="flex flex-col items-stretch justify-between gap-2 lg:flex-row lg:items-center">
      {nodes.map((node, index) => {
        const isActive = index === activeNode && running;
        const isDone = activeNode > index || (!running && activeNode === 4);
        const Icon = node.icon;
        return (
          <div key={node.name} className="contents">
            <div className={cn("relative min-w-0 flex-1 rounded-sm border p-3 transition-all duration-500", isActive ? "border-primary bg-signal-soft shadow-command" : isDone ? "border-eco/40 bg-eco-soft" : "border-border bg-background/30")}>
              <div className="flex items-center gap-2"><Icon className={cn("size-4 shrink-0", isActive ? "text-primary" : isDone ? "text-eco" : "text-muted-foreground")} /><span className="truncate font-mono text-[9px] font-medium">{node.name}</span></div>
              <div className="mt-2 flex items-center gap-2 font-mono text-[8px] text-muted-foreground"><StatusDot active={isActive || isDone} />{isActive ? "ACTIVE" : isDone ? "COMPLETE" : node.sub}</div>
            </div>
            {index < nodes.length - 1 && <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground/60 lg:block" />}
          </div>
        );
      })}
    </div>
  );
}

function PolicyPanel({ policy, showJson, onToggleJson }: { policy: PolicyIntelligence | null; showJson: boolean; onToggleJson: () => void }) {
  return (
    <Panel className="h-full">
      <PanelHeader icon={Braces} title="Policy Intelligence" meta="STRUCTURED OUTPUT" />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between rounded-sm border border-border bg-background/40 p-3">
          <div><p className="font-mono text-[9px] uppercase text-muted-foreground">Threat Level</p><p className={cn("mt-1 font-mono text-lg font-medium", policy ? "text-destructive" : "text-muted-foreground/40")}>{policy?.threatLevel ?? "PENDING"}</p></div>
          <AlertTriangle className={cn("size-5", policy ? "text-destructive" : "text-muted-foreground/30")} />
        </div>
        {[
          ["PRIMARY RISK", policy?.primaryRisk],
          ["IMMEDIATE ACTION", policy?.immediateAction],
          ["SDG ALIGNMENT", policy?.sdgAlignment.join("  /  ")],
          ["POLICY BRIEF", policy?.policyBrief],
        ].map(([label,value]) => (
          <div key={label} className="border-l border-border pl-3">
            <p className="font-mono text-[9px] text-muted-foreground">{label}</p>
            <p className={cn("mt-1 text-xs leading-5", value ? "text-foreground" : "text-muted-foreground/30")}>{value ?? "Awaiting agent output..."}</p>
          </div>
        ))}
        {policy && <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-[8px] text-muted-foreground"><span>{policy.generatedAt}</span><span className="text-warning">SIMULATED</span></div>}
        <Button variant="console" size="sm" className="w-full" onClick={onToggleJson} disabled={!policy}><FileJson /> VIEW RAW JSON</Button>
        {showJson && policy && (
          <pre className="max-h-56 overflow-auto rounded-sm border border-border bg-background p-3 font-mono text-[9px] leading-5 text-eco">{JSON.stringify(policy, null, 2)}</pre>
        )}
      </div>
    </Panel>
  );
}

function TerminalPanel({ logs, running }: { logs: readonly string[]; running: boolean }) {
  return (
    <Panel>
      <PanelHeader icon={Terminal} title="Agent Activity" meta={running ? "LIVE STREAM" : "EVENT LOG"} />
      <div className="min-h-52 p-4 font-mono text-[10px] leading-7">
        {logs.length === 0 ? <p className="text-muted-foreground/50">&gt; awaiting_mission_input<span className="animate-pulse">_</span></p> : logs.map((log, i) => <p key={`${log}-${i}`} className={i === logs.length - 1 ? "text-primary" : "text-muted-foreground"}>{log} <span className="text-muted-foreground/40">··· {i === logs.length - 1 && running ? "running" : "ok"}</span></p>)}
      </div>
    </Panel>
  );
}

export function SentinelCommandCenter() {
  const [scenario, setScenario] = useState("");
  const [override, setOverride] = useState(false);
  const [runState, setRunState] = useState<RunState>("idle");
  const [stage, setStage] = useState(-1);
  const [policy, setPolicy] = useState<PolicyIntelligence | null>(null);
  const [showJson, setShowJson] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const runAnalysis = useCallback((demo = false) => {
    clearTimers();
    const input = demo || !scenario.trim() ? DEMO_SCENARIO : scenario;
    if (demo) setScenario(DEMO_SCENARIO);
    setRunState("running");
    setStage(-1);
    setPolicy(null);
    setShowJson(false);
    STAGES.forEach((_, index) => {
      timers.current.push(setTimeout(() => {
        setStage(index);
        if (index === STAGES.length - 1) {
          void analyzeCrisis({ scenario: input, crisisOverride: override }).then((result) => {
            setPolicy(result);
            setRunState("complete");
          });
        }
      }, 500 + index * 1450));
    });
  }, [clearTimers, override, scenario]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const activeNode = stage >= 0 ? STAGES[stage].node : -1;
  const visibleLogs = stage >= 0 ? STAGES.slice(0, stage + 1).map((item) => item.log) : [];

  return (
    <main className="console-grid min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3 font-mono text-sm font-medium"><span className="grid size-7 shrink-0 place-items-center border border-primary/50 bg-signal-soft text-primary"><Orbit className="size-4" /></span><span className="truncate">SENTINEL-X</span></a>
          <div className="hidden items-center gap-5 xl:flex">{NAV.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-[9px] text-muted-foreground transition-colors hover:text-primary">{item}</a>)}</div>
          <div className="flex shrink-0 items-center gap-3"><span className="hidden items-center gap-2 font-mono text-[9px] text-eco sm:flex"><StatusDot active />SYSTEM ONLINE</span><Button variant="command" size="sm" onClick={() => scrollTo("command")}><Zap /> LAUNCH</Button></div>
        </div>
      </nav>

      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} id="top" className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1600px] items-center px-4 py-16 md:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1200 700" className="absolute right-[-10%] top-[5%] h-[90%] w-[80%] text-primary opacity-30">
            <g fill="none" stroke="currentColor"><ellipse cx="700" cy="350" rx="300" ry="150" strokeOpacity=".25" /><ellipse cx="700" cy="350" rx="230" ry="115" strokeOpacity=".2" /><ellipse cx="700" cy="350" rx="370" ry="185" strokeOpacity=".12" /><path d="M390 350h620M700 115v470" strokeOpacity=".12" strokeDasharray="4 10" /><path d="M486 226c90 52 210 52 428 0M486 474c90-52 210-52 428 0" strokeOpacity=".2" /><circle cx="873" cy="272" r="7" fill="currentColor" className="animate-pulse" /></g>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 flex w-fit items-center gap-3 border border-eco/30 bg-eco-soft px-3 py-2 font-mono text-[9px] text-eco"><StatusDot active /> SENTINEL NETWORK ONLINE <span className="text-muted-foreground">// GLOBAL GRID</span></div>
          <p className="mb-4 font-mono text-xs uppercase text-primary">Autonomous Environmental Intelligence</p>
          <h1 className="font-mono text-5xl font-medium leading-none text-foreground sm:text-7xl lg:text-8xl">SENTINEL<span className="text-primary">-X</span></h1>
          <p className="mt-7 max-w-2xl text-2xl font-medium text-foreground sm:text-4xl">Detect. Verify. Reason. Respond.</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">A multi-agent response network turning crisis signals into verified evidence, accountable decisions, and immediate environmental action.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button variant="command" size="lg" onClick={() => scrollTo("command")}><Play /> LAUNCH COMMAND CENTER</Button><Button variant="console" size="lg" onClick={() => scrollTo("architecture")}><Network /> VIEW ARCHITECTURE</Button></div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 font-mono text-[9px] text-muted-foreground"><span>AGENTS: <b className="text-foreground">02</b></span><span>ORCHESTRATION: <b className="text-foreground">n8n</b></span><span>MODE: <b className="text-eco">AUTONOMOUS ANALYSIS</b></span></div>
        </div>
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[8px] text-muted-foreground lg:flex">ENTER CONTROL ROOM<ArrowDown className="size-4 animate-bounce" /></div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="command" className="border-y border-border bg-background/65 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><SectionLabel index="01">Mission Control</SectionLabel><h2 className="text-3xl font-semibold sm:text-4xl">Command Center</h2><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Inject a crisis signal and observe two autonomous agents transform uncertainty into an accountable response.</p></div><span className="hidden font-mono text-[9px] text-warning sm:block">SIMULATION ENVIRONMENT</span></div>
          <div className="mt-8 grid gap-4 xl:grid-cols-[.9fr_1.45fr_1fr]">
            <Panel>
              <PanelHeader icon={Crosshair} title="Scenario Injection" meta="INPUT" />
              <div className="p-4">
                <Textarea value={scenario} onChange={(e) => setScenario(e.target.value)} disabled={runState === "running"} placeholder="Describe an environmental crisis..." className="min-h-36 resize-none bg-background/40 font-mono text-xs leading-6" />
                <p className="mb-2 mt-4 font-mono text-[9px] text-muted-foreground">PRESET SCENARIOS</p>
                <div className="grid grid-cols-2 gap-2">{PRESETS.map((preset) => <Button key={preset} type="button" variant="console" disabled={runState === "running"} onClick={() => setScenario(`${preset} reported near a protected ecological zone. Verify the incident, assess the risk, and recommend an immediate response.`)} className="h-auto min-h-12 justify-start whitespace-normal px-3 py-2 text-left font-mono text-[9px] text-muted-foreground">{preset}</Button>)}</div>
                <label className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-y border-border py-3"><span className="min-w-0"><span className="block font-mono text-[10px] text-foreground">CRISIS OVERRIDE</span><span className="block text-[10px] text-muted-foreground">Escalate response priority</span></span><Switch checked={override} onCheckedChange={setOverride} disabled={runState === "running"} /></label>
                <Button variant="command" className="mt-4 h-11 w-full" onClick={() => runAnalysis(false)} disabled={runState === "running" || !scenario.trim()}>{runState === "running" ? <RefreshCw className="animate-spin" /> : <Zap />} {runState === "running" ? "ANALYSIS IN PROGRESS" : "INITIATE ANALYSIS"}</Button>
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel>
                <PanelHeader icon={Waypoints} title="Agent Orchestration" meta="n8n WORKFLOW" />
                <div className="p-4">
                  <Workflow activeNode={activeNode} running={runState === "running"} />
                  <div className="mt-5 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <span className={cn("grid size-7 shrink-0 place-items-center rounded-full border", runState === "running" ? "border-primary text-primary" : runState === "complete" ? "border-eco text-eco" : "border-border text-muted-foreground")}>
                        {runState === "complete" ? <Check className="size-3.5" /> : <Activity className={cn("size-3.5", runState === "running" && "animate-pulse")} />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-mono text-[10px] text-foreground">{stage >= 0 ? STAGES[stage].label : "AWAITING MISSION"}</p>
                        <p className="mt-1 font-mono text-[8px] text-muted-foreground">{runState === "running" ? `STEP ${stage + 1} / ${STAGES.length}` : runState === "complete" ? "MISSION COMPLETE" : "SYSTEM READY"}</p>
                      </div>
                    </div>
                    <progress className="mt-3 h-0.5 w-full accent-primary" value={stage < 0 ? 0 : stage + 1} max={STAGES.length} />
                  </div>
                </div>
              </Panel>
              <TerminalPanel logs={visibleLogs} running={runState === "running"} />
            </div>
            <PolicyPanel policy={policy} showJson={showJson} onToggleJson={() => setShowJson((value) => !value)} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border bg-panel/70 p-3"><p className="font-mono text-[9px] text-muted-foreground"><span className="text-warning">DEMO MODE</span> runs a complete simulated mission in approximately 12 seconds.</p><div className="flex gap-2"><Button variant="console" size="sm" onClick={() => runAnalysis(true)} disabled={runState === "running"}><Sparkles /> DEMO MODE</Button>{runState === "complete" && <Button variant="command" size="sm" onClick={() => runAnalysis(true)}><RefreshCw /> MISSION REPLAY</Button>}</div></div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="intelligence" className="px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="02">Persistent Watch</SectionLabel><div className="mb-8 grid gap-4 lg:grid-cols-2"><h2 className="text-3xl font-semibold sm:text-4xl">Environmental intelligence, mapped.</h2><p className="max-w-xl text-sm leading-7 text-muted-foreground">Simulated geospatial monitoring layers protected boundaries, scan zones, anomaly clusters, and confidence signals into one operational view.</p></div><IntelligenceMap running={runState === "running"} /></div></motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="agents" className="border-y border-border bg-panel/30 px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="03">Agent Network</SectionLabel><h2 className="text-3xl font-semibold sm:text-4xl">Specialized intelligence. Shared mission.</h2><div className="mt-8 grid gap-4 lg:grid-cols-2">{[
        { code:"AGENT / 01", name:"FIELD RESEARCHER", quote:"Evidence before action.", icon:Search, color:"text-primary", roles:["Gathers environmental evidence and context","Identifies anomalies across external sources","Verifies and synthesizes research"], tools:["SerpAPI","Wikipedia","HTTP","Calculator"] },
        { code:"AGENT / 02", name:"POLICY DIRECTOR", quote:"Reasoning before response.", icon:Bot, color:"text-eco", roles:["Determines threat level and primary risk","Aligns action with SDG 13 and SDG 15","Produces structured JSON policy output"], tools:["Threat Assessment","Risk","Policy","SDG","Action"] },
      ].map((agent) => { const Icon = agent.icon; return <Panel key={agent.name} className="group transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40"><div className="p-6 md:p-8"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5"><div className="min-w-0"><p className="font-mono text-[9px] text-muted-foreground">{agent.code}</p><h3 className="mt-3 truncate font-mono text-xl font-medium group-hover:text-primary transition-colors">{agent.name}</h3><p className={cn("mt-2 font-mono text-xs", agent.color)}>{agent.quote}</p></div><div className="grid size-12 shrink-0 place-items-center border border-border bg-background/50 group-hover:bg-primary/10 transition-colors"><Icon className={cn("size-5", agent.color)} /></div></div><div className="my-6 h-px bg-border group-hover:bg-primary/20 transition-colors" /><div className="grid gap-6 sm:grid-cols-2"><div><p className="mb-3 font-mono text-[9px] text-muted-foreground">DIRECTIVES</p>{agent.roles.map((role) => <p key={role} className="mb-2 flex gap-2 text-xs leading-5"><ChevronRight className={cn("mt-1 size-3 shrink-0", agent.color)} />{role}</p>)}</div><div><p className="mb-3 font-mono text-[9px] text-muted-foreground">CAPABILITIES</p><div className="flex flex-wrap gap-2">{agent.tools.map((tool) => <span key={tool} className="rounded-sm border border-border bg-background/40 px-2 py-1.5 font-mono text-[9px] text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary/80">{tool}</span>)}</div></div></div></div></Panel> })}</div></div></motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="orchestration" className="px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="04">Orchestration Layer</SectionLabel><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div><h2 className="text-3xl font-semibold sm:text-4xl">One signal.<br />A coordinated response.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">n8n routes each crisis through specialized reasoning stages while preserving an inspectable chain of decisions.</p><div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-foreground"><Network className="size-4 text-warning" />POWERED BY n8n</div></div><Panel><PanelHeader icon={Network} title="Live Node Graph" meta="AUTONOMOUS PIPELINE" /><div className="p-6"><div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">{["WEBHOOK","FIELD RESEARCHER","POLICY DIRECTOR","RESPONSE"].map((node,i) => <div key={node} className="contents"><div className="rounded-sm border border-border bg-background/50 p-4 text-center font-mono text-[9px]"><CircleDot className={cn("mx-auto mb-3 size-5", i === 0 ? "text-warning" : i === 3 ? "text-eco" : "text-primary")} />{node}</div>{i<3 && <ArrowRight className="mx-auto hidden size-4 text-muted-foreground sm:block" />}</div>)}</div><div className="mt-6 overflow-hidden rounded-md border border-border/50 shadow-2xl group relative"><div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" /><img src="/images/workflow.jpeg" alt="n8n workflow" className="w-full h-auto object-cover opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105" /></div></div></Panel></div></div></motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="architecture" className="border-y border-border bg-panel/30 px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="05">System Architecture</SectionLabel><h2 className="text-3xl font-semibold sm:text-4xl">Transparent by design.</h2><div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-6">{[[Globe2,"BROWSER"],[ShieldCheck,"NODE.JS PROXY"],[Network,"n8n WEBHOOK"],[Bot,"AGENTS"],[Braces,"STRUCTURED JSON"],[Eye,"BROWSER"]].map(([Icon,label],i) => { const I = Icon as typeof Globe2; return <div key={label as string} className="relative bg-panel p-5 text-center"><I className="mx-auto mb-3 size-5 text-primary" /><p className="font-mono text-[9px]">{label as string}</p>{i<5 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-background text-muted-foreground md:block" />}</div>})}</div><p className="mt-4 mb-12 font-mono text-[9px] text-muted-foreground">NO CLIENT-SIDE KEYS · SERVER-MEDIATED REQUESTS · TRACEABLE OUTPUT</p><div className="grid gap-8 lg:grid-cols-2"><div><Panel className="relative overflow-hidden group"><PanelHeader icon={Globe2} title="System Overview" meta="ARCHITECTURE" /><div className="p-1"><img src="/images/work.jpeg" alt="Architecture" className="w-full h-auto rounded opacity-80 mix-blend-lighten transition-transform duration-700 group-hover:scale-105" /></div></Panel></div><div><Panel className="relative overflow-hidden group"><PanelHeader icon={Terminal} title="Operator Interface" meta="DASHBOARD POC" /><div className="p-1"><img src="/images/front.jpeg" alt="Front End POC" className="w-full h-auto rounded opacity-80 mix-blend-lighten transition-transform duration-700 group-hover:scale-105" /></div></Panel></div></div></div></motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="impact" className="px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="06">Impact & Ethics</SectionLabel><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">Autonomy with accountability.</h2><blockquote className="mt-7 max-w-xl border-l-2 border-primary pl-5 text-lg leading-8 text-foreground">“Automation should accelerate environmental response — not remove human accountability.”</blockquote><div className="mt-8 grid grid-cols-2 gap-3">{["Evidence-backed reasoning","Transparent agent workflow","Structured outputs","Human oversight","Traceable decisions"].map((item) => <div key={item} className="flex items-center gap-2 border-b border-border py-3 text-xs"><Check className="size-3.5 shrink-0 text-eco" />{item}</div>)}</div></div><div className="grid gap-4 sm:grid-cols-2"><Panel className="group hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 transition-all"><div className="p-6"><p className="font-mono text-4xl text-primary">13</p><Trees className="my-8 size-7 text-primary group-hover:scale-110 transition-transform" /><p className="font-mono text-xs">SDG 13</p><p className="mt-2 text-sm text-muted-foreground">Climate Action</p></div></Panel><Panel className="group hover:-translate-y-1 hover:shadow-2xl hover:border-eco/40 transition-all"><div className="p-6"><p className="font-mono text-4xl text-eco">15</p><Globe2 className="my-8 size-7 text-eco group-hover:scale-110 transition-transform" /><p className="font-mono text-xs">SDG 15</p><p className="mt-2 text-sm text-muted-foreground">Life on Land</p></div></Panel></div></div></div></motion.section>

      <section className="border-t border-border bg-panel/30 px-4 py-20 md:px-8"><div className="mx-auto max-w-[1600px]"><SectionLabel index="07">Future Roadmap</SectionLabel><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[["NOW","Multi-agent environmental crisis analysis"],["NEXT","Satellite/GIS integration → Incident history → Authentication → Alert routing"],["VISION","Autonomous environmental early-warning network"]].map(([phase,text],i) => <div key={phase} className="bg-background p-6"><div className="flex items-center gap-3 font-mono text-[10px]"><span className={cn("grid size-6 place-items-center rounded-full border", i===0 ? "border-eco text-eco" : "border-border text-muted-foreground")}>{i===0 ? <Check className="size-3" /> : i+1}</span>{phase}</div><p className="mt-8 max-w-sm text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></div></section>

      <footer className="border-t border-border px-4 py-8 md:px-8"><div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="min-w-0"><p className="truncate font-mono text-sm">SENTINEL-X</p><p className="mt-1 font-mono text-[8px] text-muted-foreground">AUTONOMOUS ENVIRONMENTAL INTELLIGENCE</p></div><div className="flex shrink-0 items-center gap-2 font-mono text-[9px] text-eco"><StatusDot active /> NETWORK ONLINE</div></div></footer>
    </main>
  );
}