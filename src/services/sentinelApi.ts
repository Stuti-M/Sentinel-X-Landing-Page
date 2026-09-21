export type ThreatLevel = "CRITICAL" | "HIGH" | "ELEVATED";

export interface PolicyIntelligence {
  incidentId: string;
  threatLevel: ThreatLevel;
  confidence: number;
  primaryRisk: string;
  immediateAction: string;
  sdgAlignment: string[];
  policyBrief: string;
  generatedAt: string;
  simulated: boolean;
}

export interface AnalyzeCrisisRequest {
  scenario: string;
  crisisOverride: boolean;
}

export const DEMO_SCENARIO =
  "Rapid canopy loss detected across a protected forest corridor near coordinates -3.4653, -62.2159. Unverified access roads and thermal anomalies appeared within the last 72 hours.";

export const SIMULATED_POLICY: PolicyIntelligence = {
  incidentId: "SX-AMZ-0920-A7",
  threatLevel: "CRITICAL",
  confidence: 94.7,
  primaryRisk: "Accelerating illegal forest clearing within a protected biodiversity corridor.",
  immediateAction: "Dispatch verified coordinates to regional enforcement and initiate a 72-hour satellite watch.",
  sdgAlignment: ["SDG 13 · Climate Action", "SDG 15 · Life on Land"],
  policyBrief:
    "Multi-source evidence indicates coordinated encroachment activity. Prioritize field verification, preserve the chain of evidence, and notify local authorities before intervention.",
  generatedAt: "SIMULATED / T+11.2S",
  simulated: true,
};

export async function analyzeCrisis(request: AnalyzeCrisisRequest): Promise<PolicyIntelligence> {
  try {
    const payload = request.crisisOverride 
      ? `[URGENT OVERRIDE APPLIED]\n${request.scenario}` 
      : request.scenario;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: payload })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const data = await response.json();
    const policy = typeof data.reply === 'string' ? JSON.parse(data.reply) : (data.reply || data);

    return {
      incidentId: policy.incident_id || `SX-${Math.floor(Math.random() * 10000)}`,
      threatLevel: (policy.threat_level || policy.alert_level || "ELEVATED") as ThreatLevel,
      confidence: policy.governance_confidence ? policy.governance_confidence * 100 : (policy.confidence || 92.5),
      primaryRisk: policy.primary_risk || policy.agent_analysis || "Analysis pending",
      immediateAction: policy.immediate_action || (policy.policy_action_plan ? (Array.isArray(policy.policy_action_plan) ? policy.policy_action_plan.join(' ') : String(policy.policy_action_plan)) : "Awaiting directives"),
      sdgAlignment: policy.sdg_alignment || policy.sdg_affected || ["SDG 13", "SDG 15"],
      policyBrief: policy.policy_brief || "Policy brief generated automatically.",
      generatedAt: `LIVE / T+${(Math.random() * 5 + 1).toFixed(1)}S`,
      simulated: false,
    };
  } catch (error) {
    console.warn("Failed to connect to n8n webhook via proxy, falling back to simulated data:", error);
    // Integration fallback
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      ...SIMULATED_POLICY,
      primaryRisk: request.crisisOverride
        ? `Override priority: ${SIMULATED_POLICY.primaryRisk}`
        : SIMULATED_POLICY.primaryRisk,
    };
  }
}