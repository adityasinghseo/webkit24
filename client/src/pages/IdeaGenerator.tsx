import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, AlertCircle, CheckCircle2, BarChart3, Globe, Bot, Layers, Zap, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// --- Types ---
interface Question {
  id: number;
  label: string;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
  impact: {
    system: "traffic" | "leads" | "scale" | "retention";
    status: "critical" | "warning" | "optimized";
  };
}

interface SystemHealth {
  id: string;
  name: string;
  status: "critical" | "warning" | "optimized" | "unknown";
  score: number;
  icon: any;
}

// --- Data ---
const questions: Question[] = [
  {
    id: 1,
    label: "What best describes your business model?",
    options: [
      { id: "service", text: "Service / Agency / Coaching", impact: { system: "leads", status: "warning" } },
      { id: "ecom", text: "E-commerce / DTC", impact: { system: "retention", status: "warning" } },
      { id: "saas", text: "SaaS / Software", impact: { system: "scale", status: "warning" } },
      { id: "local", text: "Local Business / Clinic", impact: { system: "traffic", status: "warning" } },
    ]
  },
  {
    id: 2,
    label: "Where is your biggest growth bottleneck right now?",
    options: [
      { id: "traffic", text: "Not enough qualified traffic", impact: { system: "traffic", status: "critical" } },
      { id: "leads", text: "Traffic visits but doesn't convert", impact: { system: "leads", status: "critical" } },
      { id: "closing", text: "Leads are low quality or slow to close", impact: { system: "leads", status: "critical" } },
      { id: "retention", text: "Churn is high / LTV is low", impact: { system: "retention", status: "critical" } },
    ]
  },
  {
    id: 3,
    label: "How do you currently handle this process?",
    options: [
      { id: "manual", text: "Manual work / Spreadsheets", impact: { system: "scale", status: "critical" } },
      { id: "disconnected", text: "Multiple tools that don't talk", impact: { system: "leads", status: "warning" } },
      { id: "agency", text: "Hired an agency (expensive)", impact: { system: "scale", status: "warning" } },
      { id: "automation", text: "Basic automations (Zapier)", impact: { system: "scale", status: "optimized" } },
    ]
  },
  {
    id: 4,
    label: "What is your primary goal for the next 90 days?",
    options: [
      { id: "stabilize", text: "Stabilize revenue & remove chaos", impact: { system: "retention", status: "optimized" } },
      { id: "scale", text: "Scale aggressively (Ads/Volume)", impact: { system: "traffic", status: "optimized" } },
      { id: "automate", text: "Remove myself from operations", impact: { system: "leads", status: "optimized" } },
    ]
  }
];

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Initial System State
  const [systems, setSystems] = useState<SystemHealth[]>([
    { id: "traffic", name: "Traffic System", status: "unknown", score: 100, icon: Globe },
    { id: "leads", name: "Lead Capture", status: "unknown", score: 100, icon: Bot },
    { id: "scale", name: "Conversion Engine", status: "unknown", score: 100, icon: BarChart3 },
    { id: "retention", name: "Retention Loops", status: "unknown", score: 100, icon: Layers },
  ]);

  // Handle Answer Selection
  const handleAnswer = (option: Option) => {
    // Save answer
    setAnswers(prev => ({ ...prev, [currentStep + 1]: option.text }));

    // Simulate "System Scan" effect
    setIsDiagnosing(true);

    // Update System Health Logic
    setTimeout(() => {
      setSystems(prev => prev.map(sys => {
        if (sys.id === option.impact.system) {
          let newScore = sys.score;
          if (option.impact.status === "critical") newScore = 45;
          if (option.impact.status === "warning") newScore = 70;

          return { ...sys, status: option.impact.status, score: newScore };
        }
        return sys;
      }));

      setIsDiagnosing(false);

      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 600); // Slight delay for scan effect
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar systemState={isComplete ? "manual" : undefined} />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* Header */}
        {!isComplete && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-mono text-blue-700 uppercase tracking-widest mb-6">
              <Activity className="w-3 h-3" />
              <span>System Diagnostic</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-gray-900">
              Diagnose Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Growth System Health</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Identify where you're losing revenue and discover the exact systems needed to fix it.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT: Diagnostic Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key={questions[currentStep].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl shadow-gray-200/50 relative overflow-hidden"
                >
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-500" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />

                  <span className="text-sm font-mono text-gray-400 mb-2 block">Question {currentStep + 1} of {questions.length}</span>
                  <h3 className="text-2xl font-bold mb-8">{questions[currentStep].label}</h3>

                  <div className="space-y-3">
                    {questions[currentStep].options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center justify-between"
                        disabled={isDiagnosing}
                      >
                        <span className="font-medium text-gray-700 group-hover:text-blue-900">{option.text}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>

                  {isDiagnosing && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex items-center gap-2 text-blue-600 font-mono text-sm">
                        <Activity className="w-4 h-4 animate-spin" />
                        Scanning System Impact...
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <ResultsView answers={answers} systems={systems} />
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Live System Monitor */}
          <div className="lg:col-span-5 sticky top-32">
            <div className={`bg-gray-50 border border-gray-100 rounded-3xl p-6 transition-colors duration-500 ${isComplete ? "bg-white shadow-xl shadow-blue-900/5 border-blue-100" : ""}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold font-display text-gray-900">System Health Panel</h3>
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-2 w-2`}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-mono text-gray-500">LIVE</span>
                </div>
              </div>

              <div className="space-y-4">
                {systems.map((sys) => (
                  <motion.div
                    key={sys.id}
                    layout
                    className={`p-4 rounded-2xl border transition-all duration-500 ${sys.status === "critical" ? "bg-red-50 border-red-100" :
                      sys.status === "warning" ? "bg-yellow-50 border-yellow-100" :
                        sys.status === "optimized" ? "bg-green-50 border-green-100" :
                          "bg-white border-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${sys.status === "critical" ? "bg-red-100 text-red-600" :
                          sys.status === "warning" ? "bg-yellow-100 text-yellow-600" :
                            sys.score < 100 ? "bg-green-100 text-green-600" :
                              "bg-gray-100 text-gray-400"
                          }`}>
                          <sys.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{sys.name}</div>
                          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                            {sys.status === "unknown" ? "Waiting for input..." : sys.status}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xl font-bold font-mono ${sys.status === "critical" ? "text-red-500" :
                        sys.status === "warning" ? "text-yellow-600" :
                          sys.score < 100 ? "text-green-600" :
                            "text-gray-300"
                        }`}>
                        {sys.score}%
                      </div>
                    </div>
                    {/* Health Bar */}
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${sys.status === "critical" ? "bg-red-500" :
                          sys.status === "warning" ? "bg-yellow-500" :
                            "bg-green-500"
                          }`}
                        initial={{ width: "100%" }}
                        animate={{ width: `${sys.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- Results Sub-Component ---
function ResultsView({ answers, systems }: { answers: Record<number, string>; systems: SystemHealth[] }) {
  const criticalSystems = systems.filter(s => s.status === "critical");
  const primaryIssue = criticalSystems.length > 0 ? criticalSystems[0].name : "Growth Optimization";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-mono text-red-600 uppercase tracking-widest mb-6">
            <AlertCircle className="w-3 h-3" />
            <span>Diagnosis Complete</span>
          </div>

          <h2 className="text-3xl font-display font-bold mb-4 text-gray-900">
            Your Growth System Has <br />
            <span className="text-red-600">Critical Fractures in {primaryIssue}</span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Based on your answers, manual processes and disconnected tools are throttling your revenue.
            Your current setup is serving your current size, but it will break if you try to scale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
              <span className="text-xs font-mono text-red-600 uppercase">Primary Bottleneck</span>
              <div className="font-bold text-red-900 mt-1">{answers[2] || "Lead Conversion"}</div>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <span className="text-xs font-mono text-blue-600 uppercase">Revenue Opportunity</span>
              <div className="font-bold text-blue-900 mt-1">High – With automation</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/generator">
              <Button size="lg" className="h-14 px-8 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto">
                Fix My Growth System <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" className="h-14 text-gray-500 hover:text-gray-900">
              Email Me Full Report
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400 font-mono uppercase tracking-widest mb-4">Recommended Systems to Install</p>
        <div className="flex flex-wrap justify-center gap-2">
          {systems.filter(s => s.status !== "optimized").map(s => (
            <span key={s.id} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600 font-medium">
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
