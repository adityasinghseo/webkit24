import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

interface Props {
    icon: React.ReactNode;
    title: string;
    desc: string;
    steps: string[];
    systemRole?: string;
    whatBreaks?: string[];
    ctaText?: string;
    isExpanded: boolean;
    isDimmed?: boolean;
    systemTier?: string;
    onToggle: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function InteractiveSystemCard({
    icon,
    title,
    desc,
    steps,
    systemRole,
    whatBreaks,
    ctaText = "Activating System",
    isExpanded,
    isDimmed,
    systemTier,
    onToggle,
    onMouseEnter,
    onMouseLeave
}: Props) {
    return (
        <motion.div
            className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${isExpanded
                ? "bg-black border-white/30 scale-[1.02] shadow-2xl z-10"
                : isDimmed
                    ? "bg-white/5 border-white/5 opacity-50 blur-[1px] scale-95"
                    : "bg-white/5 border-white/10 hover:bg-black hover:border-white/20"
                }`}
            layout
            onClick={onToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${isExpanded ? "bg-white text-black" : "bg-white/5 text-white group-hover:bg-white group-hover:text-black"
                    }`}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold font-display mb-2 text-white">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300">
                    {desc}
                </p>

                {systemRole && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                            System Role: <span className="text-gray-400">{systemRole}</span>
                        </div>
                        {systemTier && (
                            <div className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-widest ${systemTier === "FOUNDATION"
                                ? "bg-blue-500/10 border-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                : "bg-white/10 border-white/10 text-gray-400"
                                }`}>
                                Tier: {systemTier}
                            </div>
                        )}
                    </div>
                )}

                {/* Expanded Content */}
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="pt-4 border-t border-white/10 space-y-4">

                        {/* How it Works */}
                        <div>
                            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">How it works</div>
                            <div className="space-y-2">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-snug">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
                                            {i + 1}
                                        </div>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What Breaks Without This */}
                        {whatBreaks && whatBreaks.length > 0 && (
                            <div className="p-4 rounded-lg bg-red-900/10 border border-red-900/30">
                                <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">Without this system:</div>
                                <div className="space-y-1 mb-3">
                                    {whatBreaks.map((breakPoint, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-red-200/70 leading-snug">
                                            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                            <span>{breakPoint}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-red-500/20 text-[10px] text-red-400/60 font-mono uppercase tracking-wider">
                                    Why your simulation fails without this layer.
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="pt-2">
                            <button
                                className="flex items-center text-white text-sm font-semibold hover:text-blue-400 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open('https://calendly.com/', '_blank');
                                }}
                            >
                                {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                animate={{ opacity: isExpanded ? 0.1 : 0 }}
            />
        </motion.div>
    );
}
