import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DecisionSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Choose Your Path</h2>
                <p className="text-gray-400">There are two ways to grow. Which one matches your ambition?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* Option A: The Old Way */}
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col opacity-60 hover:opacity-100 transition-opacity">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-400 mb-2">The Manual Grind</h3>
                        <p className="text-sm text-gray-500">Hiring freelancers, guessing ads, manual data entry.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-gray-500 text-sm">
                            <X className="w-4 h-4 text-red-900" /> Unpredictable Results
                        </li>
                        <li className="flex items-center gap-3 text-gray-500 text-sm">
                            <X className="w-4 h-4 text-red-900" /> High Staff Costs
                        </li>
                        <li className="flex items-center gap-3 text-gray-500 text-sm">
                            <X className="w-4 h-4 text-red-900" /> 24/7 Stress
                        </li>
                    </ul>
                    <Button variant="ghost" className="w-full text-gray-600 cursor-not-allowed">
                        Continue Risking It
                    </Button>
                </div>

                {/* Option B: The Webkit24 Way */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-8 rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-black relative overflow-hidden flex flex-col shadow-2xl"
                >
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">The Automated Future</h3>
                        <p className="text-sm text-gray-300">Custom software, AI agents, and data-driven scale.</p>
                    </div>

                    <ul className="relative z-10 space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-white text-sm">
                            <Check className="w-4 h-4 text-blue-400" /> Predictable Revenue
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <Check className="w-4 h-4 text-blue-400" /> Automated Leads
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <Check className="w-4 h-4 text-blue-400" /> Total Control
                        </li>
                    </ul>

                    <div className="relative z-10">
                        <Button className="w-full bg-white text-black hover:bg-gray-200 h-12 text-base font-semibold" onClick={() => window.open('https://calendly.com/', '_blank')}>
                            Build My System <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-center text-xs text-gray-500 mt-3">Free 15-min Strategy Consultation</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
