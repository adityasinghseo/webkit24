import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Zap, Play, Lock, AlertCircle, BarChart3, Settings, Users, Terminal, Activity, Layers, Bot, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

// --- DATA TYPES ---
type Step = 1 | 2 | 3 | 4 | 5; // 5 is Result
type SystemStatus = "LOCKED" | "SCANNING" | "CALIBRATING" | "ACTIVE" | "READY" | "PENDING";

interface SelectionState {
  businessContext: string;
  growthStage: string;
  budget: string;
  primaryGoal: string;
}

interface Blueprint {
  coreSystem: { name: string; desc: string; icon: React.ReactNode; color: string };
  supportingSystems: { name: string; desc: string }[];
  deferredSystems: { name: string; reason: string }[];
  insight: string;
}

// --- CONSTANTS ---
const BUSINESS_CONTEXTS = [
  { id: "service", title: "Service Business", desc: "Consulting, agencies, professional services", icon: <Users className="w-5 h-5 text-blue-400" /> },
  { id: "clinic", title: "Clinic / Healthcare", desc: "Doctors, hospitals, wellness centers", icon: <div className="w-5 h-5 text-red-400 font-bold flex items-center justify-center">+</div> },
  { id: "startup", title: "Startup / SaaS", desc: "Early-stage or scaling software products", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
  { id: "local", title: "Local Business", desc: "Location-based services & stores", icon: <Settings className="w-5 h-5 text-green-400" /> },
  { id: "ecommerce", title: "E-commerce", desc: "Online product businesses", icon: <BarChart3 className="w-5 h-5 text-purple-400" /> },
];

const GROWTH_STAGES = [
  { id: "early", title: "Early Stage", desc: "Limited traffic, inconsistent leads" },
  { id: "growth", title: "Growth Stage", desc: "Leads coming in, systems breaking" },
  { id: "scaling", title: "Scaling Stage", desc: "High volume, optimization required" },
];

const BUDGETS = [
  { id: "starter", title: "₹10k – ₹25k", desc: "Starter" },
  { id: "growth", title: "₹25k – ₹50k", desc: "Growth" },
  { id: "scale", title: "₹50k – ₹1L", desc: "Scale" },
  { id: "enterprise", title: "₹1L+", desc: "Enterprise" },
];

const GOALS = [
  { id: "leads", title: "Predictable Leads" },
  { id: "sales", title: "Sales Automation" },
  { id: "revenue", title: "Revenue Growth" },
  { id: "validation", title: "Market Validation" },
];

// --- RULE ENGINE LOGIC ---

const SYSTEM_DEFS = {
  website: { name: "Growth Website", desc: "Conversion Foundation", icon: <Globe className="w-5 h-5" />, color: "blue" },
  leads: { name: "Lead Automation", desc: "24/7 Capture Engine", icon: <Bot className="w-5 h-5" />, color: "purple" },
  scale: { name: "Scale System", desc: "Optimization Engine", icon: <BarChart3 className="w-5 h-5" />, color: "green" },
  retention: { name: "Retention Loops", desc: "Revenue Compounding", icon: <Layers className="w-5 h-5" />, color: "orange" },
  mvp: { name: "Rapid MVP", desc: "Validation Engine", icon: <Zap className="w-5 h-5" />, color: "yellow" },
};

function generateBlueprint(s: SelectionState): Blueprint {
  let core = SYSTEM_DEFS.leads; // Default Safety Net
  let supporting: typeof SYSTEM_DEFS[keyof typeof SYSTEM_DEFS][] = [];
  let deferred = [];
  let insight = "System alignment complete.";

  // 1. CORE SYSTEM SELECTION (Priority Logic)

  // PRIORITY A: Validation (Goal or Stage)
  if (s.primaryGoal === 'validation' || (s.businessContext === 'startup' && s.growthStage === 'early')) {
    core = SYSTEM_DEFS.mvp;
    insight = s.primaryGoal === 'validation'
      ? "Your primary goal is 'Validation'. Building complex automation now is premature. We prioritize 'Rapid MVP' to test your offer before scaling."
      : "Early-stage startups risk failure by scaling too fast. Your OS prioritizes 'Rapid Validation' to ensure market fit first.";
  }
  // PRIORITY B: Trust & Conversion (Service/Clinic/Local Early)
  else if (['service', 'clinic', 'local'].includes(s.businessContext) && s.growthStage === 'early') {
    core = SYSTEM_DEFS.website;
    if (s.businessContext === 'local') {
      insight = "For local businesses, 'Trust' equates to 'Foot Traffic'. Your 'Growth Website' (and Maps presence) must capture high-intent local searches before you run ads.";
    } else {
      insight = "Service businesses rely on trust. Without a high-conversion 'Growth Website', expensive traffic will bounce. This is your foundation.";
    }
  }
  // PRIORITY C: Revenue & LTV (E-commerce or Revenue Goal)
  else if (s.businessContext === 'ecommerce' || (s.primaryGoal === 'revenue' && s.growthStage !== 'early')) {
    if (s.growthStage === 'early' && s.businessContext === 'ecommerce') {
      core = SYSTEM_DEFS.website;
      insight = "For early e-commerce, your store IS the product. We prioritize a 'Growth Website' to ensure maximum conversion on every click.";
    } else {
      core = SYSTEM_DEFS.retention;
      insight = s.primaryGoal === 'revenue'
        ? "To maximize 'Revenue Growth', we shift focus to LTV. 'Retention Loops' compound your profit by monetizing past customers."
        : "For e-commerce, profit is in the second purchase. 'Retention Loops' will automatically increase LTV.";
    }
  }
  // PRIORITY D: Scale (High Volume + High Budget)
  else if (['scale', 'enterprise'].includes(s.budget) && s.growthStage === 'scaling') {
    core = SYSTEM_DEFS.scale;
    insight = "At your volume, manual optimization fails. The 'Scale System' will algorithmically optimize ad spend to stabilize CAC.";
  }
  // PRIORITY E: Lead Capture (Default for Growth/Service)
  else {
    core = SYSTEM_DEFS.leads;
    if (s.businessContext === 'local') {
      insight = "You have local traffic, but inquiries are slipping through the cracks. 'Lead Automation' ensures 24/7 response to every call and form fill.";
    } else {
      insight = s.primaryGoal === 'sales'
        ? "To achieve 'Sales Automation', you need a reliable pipeline. 'Lead Automation' installs a 24/7 capture engine to feed your sales team."
        : "You have traffic but need systemized follow-up. 'Lead Automation' fills the gap between interest and booking.";
    }
  }

  // 2. SUPPORTING SYSTEM SELECTION (Dynamic Builder)

  // Always add Foundation if not Core
  if (core.name !== "Growth Website") supporting.push(SYSTEM_DEFS.website);

  // Add Lead Gen if not Core and not very early/low-budget
  if (core.name !== "Lead Automation") {
    if (s.growthStage !== 'early' || s.primaryGoal === 'leads' || s.businessContext === 'service') {
      supporting.push(SYSTEM_DEFS.leads);
    }
  }

  // Add Retention if valid context
  if (core.name !== "Retention Loops") {
    if (s.businessContext === 'ecommerce' || s.primaryGoal === 'revenue' || s.growthStage === 'scaling') {
      supporting.push(SYSTEM_DEFS.retention);
    }
  }

  // Add MVP if Startup/Validation (as support)
  if (core.name !== "Rapid MVP") {
    if (s.businessContext === 'startup' || s.primaryGoal === 'validation') {
      supporting.push(SYSTEM_DEFS.mvp);
    } else {
      deferred.push({ name: "Rapid MVP", reason: s.businessContext === 'startup' ? "Not immediate priority" : "Validation Phase Complete" });
    }
  }

  // 3. CONSTRAINTS & DEFERRED

  // Scale System Logic (Strict Budget Lock)
  if (core.name !== "Scale System") {
    if (['starter', 'growth'].includes(s.budget)) {
      deferred.push({ name: "Scale System", reason: "Requires > ₹50k ad spend" });
    } else {
      // Only add as support if context justifies it
      if (s.growthStage === 'scaling' || s.primaryGoal === 'revenue') {
        supporting.push(SYSTEM_DEFS.scale);
      } else {
        deferred.push({ name: "Scale System", reason: "Reserved for high-volume scaling" });
      }
    }
  }

  // Fix Ghost Systems: Add anything not Core, Supporting, or Deferred to Deferred
  const allSystems = Object.values(SYSTEM_DEFS);
  allSystems.forEach(sys => {
    const isCore = core.name === sys.name;
    const isSupporting = supporting.find(s => s.name === sys.name);
    const isDeferred = deferred.find(d => d.name === sys.name);

    if (!isCore && !isSupporting && !isDeferred) {
      deferred.push({ name: sys.name, reason: "Inactive for current model" });
    }
  });

  // Sort Supporting: Website first, then others
  supporting.sort((a, b) => (a.name === "Growth Website" ? -1 : 1));

  return {
    coreSystem: { ...core, color: core.color },
    supportingSystems: supporting,
    deferredSystems: deferred,
    insight
  };
}


// --- COMPONENT ---

export default function GrowthGenerator() {
  const [step, setStep] = useState<Step>(1);
  const [selections, setSelections] = useState<SelectionState>({
    businessContext: "",
    growthStage: "",
    budget: "",
    primaryGoal: "",
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as Step);
    } else {
      runSimulation();
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    const generated = generateBlueprint(selections);
    setBlueprint(generated);

    // Simulation Logs
    const steps = [
      "Attaching context: " + BUSINESS_CONTEXTS.find(c => c.id === selections.businessContext)?.title + "...",
      "Analyzing growth vectors...",
      "Validating budget constraints...",
      "Optimizing system topology...",
      "Compiling final blueprint..."
    ];

    let delay = 0;
    steps.forEach((log, index) => {
      delay += 800; // 800ms per log
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setStep(5);
          }, 1000);
        }
      }, delay);
    });
  };

  const handleSelect = (key: keyof SelectionState, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (step === 1) return !!selections.businessContext;
    if (step === 2) return !!selections.growthStage;
    if (step === 3) return !!selections.budget;
    if (step === 4) return !!selections.primaryGoal;
    return false;
  };

  // Helper for Panel Status
  const getSystemStatus = (sysName: string): SystemStatus => {
    // If blueprint exists (Step 5), use it directly
    if (step === 5 && blueprint) {
      if (blueprint.coreSystem.name === sysName) return "ACTIVE";
      if (blueprint.supportingSystems.find(s => s.name === sysName)) return "READY";
      if (blueprint.deferredSystems.find(s => s.name === sysName)) return "LOCKED";
      return "PENDING";
    }

    // Live States Forecast (Mirroring generateBlueprint logic)
    // This ensures we don't show "Ready" for a system that will be "Inactive" in the blueprint

    // 1. Forecast Core System based on current inputs
    let anticipatedCore = "";
    if (['startup', 'early'].includes(selections.businessContext) && selections.growthStage === 'early') anticipatedCore = "Rapid MVP";
    else if (selections.primaryGoal === 'validation') anticipatedCore = "Rapid MVP";
    else if (['service', 'clinic', 'local'].includes(selections.businessContext) && selections.growthStage === 'early') anticipatedCore = "Growth Website";
    else if (['ecommerce'].includes(selections.businessContext) && (selections.primaryGoal === 'revenue' || selections.growthStage === 'scaling')) anticipatedCore = "Retention Loops";
    else if (['scale', 'enterprise'].includes(selections.budget) && selections.growthStage === 'scaling') anticipatedCore = "Scale System";
    else anticipatedCore = "Lead Automation"; // Default forecast

    const isForecastCore = anticipatedCore === sysName;

    if (sysName === "Growth Website") return step >= 1 ? (isForecastCore ? "SCANNING" : "READY") : "PENDING";

    if (sysName === "Lead Automation") {
      if (step < 2) return "LOCKED";
      if (isForecastCore) return "CALIBRATING";
      // Allow as READY if stage/goal/context aligns
      if (selections.growthStage !== 'early' || selections.primaryGoal === 'leads' || selections.businessContext === 'service' || selections.businessContext === 'local') return "READY";
      return "LOCKED";
    }

    if (sysName === "Scale System") {
      if (step < 3) return "LOCKED";
      if (isForecastCore) return "SCANNING";
      if (selections.growthStage === 'scaling' || selections.primaryGoal === 'revenue') return "READY";
      return "LOCKED";
    }

    if (sysName === "Retention Loops") {
      if (step < 4) return "LOCKED";
      if (isForecastCore) return "CALIBRATING";
      if (selections.businessContext === 'ecommerce' || selections.primaryGoal === 'revenue') return "READY";
      return "LOCKED";
    }

    if (sysName === "Rapid MVP") {
      if (step < 1) return "LOCKED";
      if (isForecastCore) return "SCANNING";
      if (selections.businessContext === 'startup' || selections.primaryGoal === 'validation') return "READY";
      return "LOCKED";
    }

    return "PENDING";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight text-gray-900">Build Your Growth OS</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-2">Assemble the systems your business needs to grow — in the right order.</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
            System Architecture Mode
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT PANEL - WIZARD */}
          <div className="lg:col-span-7 space-y-8 min-h-[500px]">
            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {step === 1 && (
                <StepContainer key="step1" step={1} title="Define Your Business Context" subtext="Growth systems depend on how your business actually operates.">
                  <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-wider">Select one option to continue</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BUSINESS_CONTEXTS.map(ctx => (
                      <div
                        key={ctx.id}
                        onClick={() => handleSelect("businessContext", ctx.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group
                          ${selections.businessContext === ctx.id
                            ? "bg-gradient-to-b from-blue-50/50 to-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            : "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                          }`}
                      >
                        {selections.businessContext === ctx.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                        )}
                        <div className="mb-3">{ctx.icon}</div>
                        <h3 className="font-bold mb-1">{ctx.title}</h3>
                        <p className="text-sm text-gray-400">{ctx.desc}</p>
                      </div>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <StepContainer key="step2" step={2} title="Select Your Growth Stage" subtext="Systems evolve as your business grows.">
                  <div className="space-y-4">
                    {GROWTH_STAGES.map(stage => (
                      <div
                        key={stage.id}
                        onClick={() => handleSelect("growthStage", stage.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between relative overflow-hidden
                          ${selections.growthStage === stage.id
                            ? "bg-gradient-to-b from-blue-50/50 to-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            : "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                          }`}
                      >
                        {selections.growthStage === stage.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                        )}
                        <div>
                          <h3 className="font-bold text-lg">{stage.title}</h3>
                          <p className="text-gray-500">{stage.desc}</p>
                        </div>
                        {selections.growthStage === stage.id && <CheckCircle2 className="text-blue-500" />}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-gray-500 text-center italic">Your Growth OS will adapt based on this stage.</p>
                </StepContainer>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <StepContainer key="step3" step={3} title="Monthly Growth Investment" subtext="Budget doesn’t create growth. Systems decide how effectively it’s used.">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BUDGETS.map(budget => (
                      <div
                        key={budget.id}
                        onClick={() => handleSelect("budget", budget.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center relative overflow-hidden
                           ${selections.budget === budget.id
                            ? "bg-gradient-to-b from-blue-50/50 to-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            : "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                          }`}
                      >
                        {selections.budget === budget.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                        )}
                        <h3 className="font-bold text-xl mb-1">{budget.title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{budget.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-gray-500 font-mono uppercase tracking-widest text-center">Higher budgets accelerate systems — they don’t replace them.</p>
                </StepContainer>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <StepContainer key="step4" step={4} title="Primary Growth Objective" subtext="Choose one main outcome. All systems will align to support it.">
                  <div className="grid grid-cols-1 gap-4">
                    {GOALS.map(goal => (
                      <div
                        key={goal.id}
                        onClick={() => handleSelect("primaryGoal", goal.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden
                          ${selections.primaryGoal === goal.id
                            ? "bg-gradient-to-b from-blue-50/50 to-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            : "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                          }`}
                      >
                        {selections.primaryGoal === goal.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                        )}
                        <h3 className="font-bold text-center">{goal.title}</h3>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-gray-500 text-center">One clear goal prevents system conflicts.</p>
                </StepContainer>
              )}

              {/* STEP 5 - RESULT (BLUEPRINT) */}
              {step === 5 && blueprint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono uppercase tracking-widest">
                        Blueprint Ready
                      </div>
                    </div>

                    <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Your Growth OS Blueprint</h2>

                    <div className="space-y-8 relative z-10">
                      {/* Core System */}
                      <div>
                        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Core System (Priority #1)</h3>
                        <div className={`p-6 rounded-xl bg-${blueprint.coreSystem.color}-50 border border-${blueprint.coreSystem.color}-200 flex items-center justify-between shadow-sm`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-16 bg-${blueprint.coreSystem.color}-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]`} />
                            <div>
                              <div className="font-bold text-2xl mb-1 text-gray-900">{blueprint.coreSystem.name}</div>
                              <div className="text-sm text-gray-600">{blueprint.coreSystem.desc}</div>
                            </div>
                          </div>
                          <CheckCircle2 className={`text-${blueprint.coreSystem.color}-600 w-8 h-8`} />
                        </div>
                      </div>

                      {/* Supporting Systems */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blueprint.supportingSystems.map((sys, i) => (
                          <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-bold text-gray-900">{sys.name}</div>
                              <div className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-500">SUPPORT</div>
                            </div>
                            <div className="text-xs text-gray-500">{sys.desc}</div>
                          </div>
                        ))}
                      </div>

                      {/* Deferred Systems */}
                      {blueprint.deferredSystems.length > 0 && (
                        <div>
                          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Deferred Systems (Inactive)</h3>
                          <div className="space-y-2">
                            {blueprint.deferredSystems.map((sys, i) => (
                              <div key={i} className="flex items-center gap-3 text-gray-500 p-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/50">
                                <Lock className="w-4 h-4 text-gray-400" />
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                  <span className="text-sm font-medium">{sys.name}</span>
                                  <span className="text-xs opacity-70">Reason: {sys.reason}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 mb-4 shadow-sm">
                      <Button
                        size="lg"
                        variant="premium"
                        className="h-14 px-12 text-lg rounded-full w-full sm:w-auto shadow-2xl shadow-blue-500/20"
                        onClick={() => window.open('https://calendly.com/', '_blank')}
                      >
                        <Zap className="w-5 h-5 mr-2 fill-current" />
                        Build This Growth OS
                      </Button>
                    </div>
                    <div>
                      <Link href="/ideas">
                        <Button variant="link" className="text-gray-500 hover:text-gray-900">
                          Diagnose My Current System <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons (only for Wizard steps) */}
            {step < 5 && (
              <div className="flex justify-end pt-4">
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`${canProceed() ? "bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/10" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  {step === 4 ? "Assemble System" : "Next Step"}
                  {step !== 4 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - LIVE SIMULATION */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="sticky top-32">
              <div className="rounded-3xl border border-blue-100/50 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.08)] bg-gradient-to-b from-white to-gray-50 relative">

                {/* Grid Background */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

                {/* Header */}
                <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200/50 p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? "bg-yellow-400" : "bg-green-500"}`}></span>
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulating ? "bg-yellow-500" : "bg-green-500"}`}></span>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-medium">
                      {isSimulating ? "Compiling..." : "Live Environment"}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono border border-gray-200 px-2 py-0.5 rounded">OS v2.4.0</div>
                </div>

                <div className="p-6 space-y-8">

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <MetricBox label="Traffic" value={step > 1 ? "Active" : "..."} active={step > 1} />
                    <MetricBox label="Qual. Leads" value={step > 2 ? "Tracking" : "..."} active={step > 2} />
                    <MetricBox label="Revenue" value={step > 3 ? "Projected" : "..."} active={step > 3} />
                  </div>

                  {/* System Stack Status */}
                  <div className="space-y-3">
                    <h4 className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-2 flex justify-between">
                      <span>System Stack</span>
                      <span className="text-gray-400">STATE</span>
                    </h4>
                    <SystemToggle label="Growth Website" status={getSystemStatus("Growth Website")} active={["ACTIVE", "READY", "SCANNING"].includes(getSystemStatus("Growth Website"))} />
                    <SystemToggle label="Lead Automation" status={getSystemStatus("Lead Automation")} active={["ACTIVE", "READY", "CALIBRATING"].includes(getSystemStatus("Lead Automation"))} color="purple" />
                    <SystemToggle label="Scale System" status={getSystemStatus("Scale System")} active={["ACTIVE", "SCANNING"].includes(getSystemStatus("Scale System"))} color="green" />
                    <SystemToggle label="Retention Loops" status={getSystemStatus("Retention Loops")} active={["ACTIVE", "READY"].includes(getSystemStatus("Retention Loops"))} color="orange" />
                  </div>

                  {/* Dynamic Insight Panel */}
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-3 h-3" /> System Insight
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed font-light min-h-[60px]">
                      {step === 5 && blueprint ? blueprint.insight : (
                        <>
                          {step === 1 && !selections.businessContext && "Different businesses require different growth foundations."}
                          {step === 1 && selections.businessContext && `Analysis: ${BUSINESS_CONTEXTS.find(c => c.id === selections.businessContext)?.title} models require specific conversion infrastructure.`}

                          {step === 2 && !selections.growthStage && "Systems must evolve to match traffic volume."}
                          {step === 2 && selections.growthStage === 'early' && "Early Stage: Priority shift to Validation and Traffic."}
                          {step === 2 && selections.growthStage === 'growth' && "Growth Stage: Priority shift to Capture and Nurture."}
                          {step === 2 && selections.growthStage === 'scaling' && "Scaling Stage: Priority shift to Optimization and Automation."}

                          {step === 3 && "Budget allocations determine system complexity and ad-spend capability."}
                          {step === 4 && "Aligning all systems to a single primary objective prevents conflict."}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Simulation Overlay */}
                {isSimulating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-start justify-center p-8 z-50 font-mono text-sm"
                  >
                    <div className="space-y-4 w-full">
                      {logs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-green-600 border-l-2 border-green-500 pl-3"
                        >
                          <span className="text-gray-400 mr-2">{`>`}</span>
                          {log}
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-3 h-5 bg-green-500 ml-4 mt-2"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="h-32 bg-gradient-to-b from-white to-gray-50 w-full" />
      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StepContainer({ step, title, subtext, children }: { step: number, title: string, subtext: string, children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-200/40 relative overflow-hidden"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-600 font-bold uppercase tracking-widest text-xs">Step {step} of 4</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${s <= step ? "bg-blue-600" : "bg-gray-100"}`} />
            ))}
          </div>
        </div>
        <h2 className="text-3xl md:text-3xl font-display font-semibold mb-3 text-gray-900">{title}</h2>
        <p className="text-lg text-gray-500">{subtext}</p>
      </div>
      {children}
    </motion.div>
  );
}

function MetricBox({ label, value, active }: { label: string, value: string, active: boolean }) {
  return (
    <div className={`p-3 rounded-xl border text-center transition-colors ${active ? "bg-white border-blue-100 shadow-sm" : "bg-gray-50/50 border-gray-100 opacity-60"}`}>
      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-semibold">{label}</div>
      <div className={`font-mono text-sm ${active ? "text-blue-600 font-bold" : "text-gray-400"}`}>{value}</div>
    </div>
  )
}

function SystemToggle({ label, status, active, color = "blue" }: { label: string, status: SystemStatus, active: boolean, color?: string }) {

  let statusColor = "text-gray-400";
  if (status === "ACTIVE") statusColor = `text-${color}-600`;
  if (status === "LOCKED") statusColor = "text-gray-400";
  if (status === "SCANNING") statusColor = "text-yellow-600";

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${active ? "bg-white border-blue-100 shadow-md shadow-blue-500/5 scale-[1.02]" : "bg-transparent border-transparent opacity-60"}`}>
      <span className={`font-medium text-sm ${active ? "text-gray-900 font-bold" : "text-gray-500"}`}>{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-mono uppercase tracking-wider ${statusColor} ${active ? "font-bold" : ""}`}>{status}</span>
        <div className={`w-2 h-2 rounded-full ${active ? `bg-${color}-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]` : "bg-gray-300"}`} />
      </div>
    </div>
  )
}
