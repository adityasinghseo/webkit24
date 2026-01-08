import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LayoutTemplate, PlayCircle, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function BuilderSection() {
    const steps = [
        {
            icon: LayoutTemplate,
            stepLabel: "System Audit",
            title: "Diagnose Your Current System",
            desc: "We map where growth breaks, leaks money, or fails to scale."
        },
        {
            icon: Zap,
            stepLabel: "System Assembly",
            title: "Architect Your Growth OS",
            desc: "Systems are assembled based on your industry, budget, and goals."
        },
        {
            icon: PlayCircle,
            stepLabel: "System Live",
            title: "Deploy & Automate",
            desc: "Your growth engine runs 24/7 — with measurable outcomes."
        }
    ];

    return (
        <section className="py-32 bg-zinc-950 text-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Start Building Your Growth OS</h2>
                    <p className="text-gray-400 text-lg">
                        No contracts. No templates.<br />
                        Just a system designed for how your business grows.
                    </p>
                </div>

                {/* 3 Step Visual */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-white/5 z-0 overflow-hidden">
                        <motion.div
                            className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                            animate={{ x: ["-100%", "400%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-4 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <step.icon className="w-6 h-6" />
                                </div>
                            </div>

                            {/* System Label */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300">
                                    {step.stepLabel}
                                </span>
                            </div>

                            <div className="text-sm font-mono text-gray-500 mb-2">Step {i + 1}</div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Panel */}
                <div className="max-w-3xl mx-auto text-center bg-black rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex flex-col gap-4 items-center">
                            <p className="text-xs text-blue-300/80 font-mono mb-2">Designed for businesses ready to scale with systems — not hacks.</p>
                            <Link href="/generator">
                                <Button variant="premium" size="lg" className="h-16 px-10 text-xl w-full sm:w-auto shadow-2xl shadow-blue-500/20">
                                    Build My Growth OS
                                </Button>
                            </Link>

                            <Link href="/ideas" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group mt-2">
                                Diagnose My Current Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-2">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Free strategy consultation • No sales pressure</p>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                    <span>Average build time: 14–30 days</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                    <span>Used by startups, clinics, & service businesses</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                    <span>Built by engineers, not marketers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
