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
                ? "bg-white border-blue-500/20 scale-[1.02] shadow-xl shadow-blue-500/5 z-10"
                : isDimmed
                    ? "bg-gray-50 border-gray-200 opacity-50 blur-[1px] scale-95"
                    : "bg-white border-gray-200 hover:border-blue-500/30 hover:shadow-lg"
                }`}
            layout
            onClick={onToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${isExpanded ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    }`}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold font-display mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-800">
                    {desc}
                </p>

                {systemRole && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                            System Role: <span className="text-gray-700 font-semibold">{systemRole}</span>
                        </div>
                        {systemTier && (
                            <div className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-widest ${systemTier === "FOUNDATION"
                                ? "bg-blue-50 border-blue-200 text-blue-600"
                                : "bg-gray-100 border-gray-200 text-gray-500"
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
                    <div className="pt-4 border-t border-gray-100 space-y-4">

                        {/* How it Works */}
                        <div>
                            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">How it works</div>
                            <div className="space-y-2">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-snug">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-[10px] text-blue-700">
                                            {i + 1}
                                        </div>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What Breaks Without This */}
                        {whatBreaks && whatBreaks.length > 0 && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                                <div className="text-xs font-mono text-red-600 uppercase tracking-widest mb-2">Without this system:</div>
                                <div className="space-y-1 mb-3">
                                    {whatBreaks.map((breakPoint, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-red-700 leading-snug">
                                            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                            <span>{breakPoint}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-red-200 text-[10px] text-red-500 font-mono uppercase tracking-wider">
                                    Why your simulation fails without this layer.
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="pt-2">
                            <button
                                className="flex items-center text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors"
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
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"
                animate={{ opacity: isExpanded ? 0.1 : 0 }}
            />
        </motion.div>
    );
}
