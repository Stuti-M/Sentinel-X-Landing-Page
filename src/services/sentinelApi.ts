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
  simulated: true;
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
  // Integration boundary: replace this local response with the secured Node.js → n8n webhook.
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    ...SIMULATED_POLICY,
    primaryRisk: request.crisisOverride
      ? `Override priority: ${SIMULATED_POLICY.primaryRisk}`
      : SIMULATED_POLICY.primaryRisk,
  };
}