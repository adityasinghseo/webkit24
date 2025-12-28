import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Bot, BarChart3, Layers, TrendingUp, ArrowRight, X, Check, MousePointer2 } from "lucide-react";

const steps = [
    { id: "traffic", label: "Traffic In", icon: MousePointer2 },
    { id: "growth", label: "Growth Website", icon: Globe },
    { id: "leads", label: "Lead Automation", icon: Bot },
    { id: "scale", label: "Scale System", icon: BarChart3 },
    { id: "retention", label: "Retention Loops", icon: Layers },
    { id: "revenue", label: "Revenue Compounding", icon: TrendingUp },
];

interface ContentItem {
    title: string;
    desc?: string;
    whatHappens?: string[];
    eliminates?: string[];
    tags?: string[];
    isCounter?: boolean;
}

const content: Record<string, ContentItem> = {
    default: {
        title: "Your Growth Engine, Fully Connected",
        desc: "Each system below works independently — but together, they form a predictable growth machine. Hover to explore how each layer removes chaos from your business."
    },
    traffic: {
        title: "Traffic In",
        desc: "The fuel for your growth engine. Intent-driven visitors arrive ready to engage.",
        whatHappens: [
            "Organic Search (SEO)",
            "Paid Campaigns",
            "Social Channels",
            "Referral Networks"
        ],
        eliminates: ["Empty funnels", "Low-quality clicks", "Unpredictable volume"],
        tags: ["SEO", "Ads", "Content", "Social"]
    },
    growth: {
        title: "Growth Website Activated",
        desc: "High-intent traffic is routed to pages designed for conversion — not aesthetics.",
        whatHappens: [
            "Users land on intent-optimized pages",
            "Behavior is tracked automatically",
            "Content adapts to maximize conversion"
        ],
        eliminates: ["Random redesigns", "Guesswork CRO", "High bounce rates"],
        tags: ["SEO", "CRO", "UX", "AI Content", "Tracking"]
    },
    leads: {
        title: "Lead Automation Activated",
        desc: "Every lead is captured, qualified, and followed up — automatically.",
        whatHappens: [
            "Leads are scored by AI",
            "CRM syncs in real-time",
            "Follow-ups trigger without manual work"
        ],
        eliminates: ["Missed inquiries", "Slow responses", "Manual follow-ups"],
        tags: ["AI Agents", "CRM", "WhatsApp", "Email", "Lead Scoring"]
    },
    scale: {
        title: "Scale System Activated",
        desc: "Ad performance improves itself using real data — not assumptions.",
        whatHappens: [
            "Creatives are tested continuously",
            "Budgets reallocate to winners",
            "Underperforming ads pause automatically"
        ],
        eliminates: ["Burning ad spend", "Emotional decisions", "Manual optimization"],
        tags: ["Meta Ads", "Google Ads", "AI Testing", "Analytics"]
    },
    retention: {
        title: "Retention Loops Activated",
        desc: "Customers return automatically — increasing lifetime value.",
        whatHappens: [
            "Post-purchase sequences trigger",
            "Loyalty actions are automated",
            "Repeat purchases increase over time"
        ],
        eliminates: ["One-time buyers", "Discount dependency", "Revenue plateaus"],
        tags: ["Email", "Loyalty", "Automation", "Segmentation"]
    },
    revenue: {
        title: "Revenue Compounding Engine",
        desc: "Growth becomes predictable, scalable, and repeatable. This is what happens when systems replace chaos.",
        isCounter: true
    }
};

export function SystemFlow() {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    return (
        <div className="w-full">
            {/* Top Label */}
            <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 mb-2 rounded border border-white/10 bg-white/5 text-xs font-mono text-blue-300 uppercase tracking-widest">
                    The Webkit24 Growth OS
                </div>
                <p className="text-xs text-gray-500">Hover over each system to see how it works together.</p>
            </div>

            {/* Visual Flow */}
            <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 gap-4 md:gap-0">

                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0">
                    {activeStep && (
                        <motion.div
                            className="h-full bg-blue-500/50"
                            layoutId="flow-line"
                            transition={{ duration: 0.5 }}
                            style={{
                                width: `${(steps.findIndex(s => s.id === activeStep) / (steps.length - 1)) * 100}%`
                            }}
                        />
                    )}
                </div>

                {steps.map((step, index) => {
                    const isActive = activeStep === step.id;
                    const isPast = activeStep ? steps.findIndex(s => s.id === activeStep) > index : false;

                    return (
                        <div
                            key={step.id}
                            className="relative z-10 flex flex-col items-center group cursor-pointer"
                            onMouseEnter={() => setActiveStep(step.id)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            <motion.div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${isActive
                                        ? "bg-black border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110"
                                        : isPast
                                            ? "bg-blue-900/20 border-blue-500/30 text-blue-400"
                                            : "bg-black border-white/10 text-gray-500 hover:border-white/30"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                <step.icon className={`w-8 h-8 ${isActive ? "text-blue-400" : isPast ? "text-blue-400" : "text-gray-500"}`} />
                            </motion.div>
                            <div className={`mt-4 text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-white font-bold" : "text-gray-500"
                                }`}>
                                {step.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dynamic Panel */}
            <div className="min-h-[300px] relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep || "default"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative"
                    >
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            {/* Left Side: Info */}
                            <div>
                                <h3 className="text-3xl font-display font-bold mb-6 text-white leading-tight">
                                    {content[activeStep || "default"].title}
                                </h3>

                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    {content[activeStep || "default"].desc}
                                </p>

                                {activeStep && content[activeStep].isCounter ? (
                                    <CounterComponent />
                                ) : (activeStep && (
                                    <>
                                        <div className="mb-6">
                                            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">What happens:</h4>
                                            <div className="space-y-2">
                                                {content[activeStep].whatHappens?.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                        <Check className="w-4 h-4 text-blue-500 mt-0.5" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                            {content[activeStep].tags?.map(tag => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-blue-200/80 font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ))}
                            </div>

                            {/* Right Side: Eliminates */}
                            {!(!activeStep || (activeStep && content[activeStep]?.isCounter)) && (
                                <div className="bg-black/40 rounded-xl p-8 border border-white/5">
                                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">ELIMINATES THE CHAOS OF:</h4>
                                    <div className="space-y-4">
                                        {content[activeStep!]?.eliminates?.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-400">
                                                <X className="w-5 h-5 text-red-500/70" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Default State Graphic (Optional - just kept simple for now) */}
                            {!activeStep && (
                                <div className="hidden md:flex items-center justify-center opacity-30">
                                    <Layers className="w-48 h-48 text-white" />
                                </div>
                            )}

                            {/* Revenue Counter Graphic for the last step */}
                            {activeStep && content[activeStep].isCounter && (
                                <div className="flex items-center justify-center">
                                    <div className="text-center space-y-2">
                                        <div className="text-6xl font-bold text-blue-500 tabular-nums">12x</div>
                                        <div className="text-sm text-gray-400 font-mono uppercase tracking-widest">Compounding Growth</div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function CounterComponent() {
    const stages = [
        { label: "Month 1", status: "Stable foundation", color: "text-gray-400" },
        { label: "Month 3", status: "Predictable leads", color: "text-blue-300" },
        { label: "Month 6", status: "Scalable systems", color: "text-blue-400" },
        { label: "Month 12", status: "Compounding revenue", color: "text-blue-500" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % stages.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-6">
            {stages.map((stage, index) => (
                <motion.div
                    key={index}
                    animate={{
                        opacity: index === currentIndex ? 1 : 0.3,
                        scale: index === currentIndex ? 1.05 : 1,
                        x: index === currentIndex ? 20 : 0
                    }}
                    className="flex items-center gap-6"
                >
                    <div className={`w-24 text-sm font-mono ${index === currentIndex ? "text-white" : "text-gray-600"}`}>
                        {stage.label}
                    </div>
                    <ArrowRight className={`w-4 h-4 ${index === currentIndex ? "text-blue-500" : "text-gray-700"}`} />
                    <div className={`text-xl font-bold ${stage.color}`}>
                        {stage.status}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
