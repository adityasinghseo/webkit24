import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Filter, DollarSign, Zap, BarChart3, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Log = { text: string; type: "success" | "error" | "info"; id: number };

interface GrowthSimulatorProps {
    isAutomated: boolean;
    onToggle: (checked: boolean) => void;
}

export function GrowthSimulator({ isAutomated, onToggle }: GrowthSimulatorProps) {
    const [stage, setStage] = useState<"idle" | "running" | "complete">("idle");
    const [metrics, setMetrics] = useState({ visitors: 0, leads: 0, sales: 0 });
    const [logs, setLogs] = useState<Log[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        if (stage === "running") {
            let counter = 0;
            const interval = setInterval(() => {
                counter++;
                setMetrics(prev => {
                    if (prev.visitors >= 1000) {
                        clearInterval(interval);
                        setStage("complete");
                        return prev;
                    }

                    // --- SIMULATION LOGIC ---
                    const isSystem = isAutomated;
                    const leadRate = isSystem ? 0.15 : 0.02; // 15% vs 2%
                    const saleRate = isSystem ? 0.05 : 0.005; // 5% vs 0.5%

                    const newVisitors = prev.visitors + 25;
                    const newLeads = Math.floor(newVisitors * leadRate);
                    const newSales = Math.floor(newVisitors * saleRate);

                    // --- EVENT LOGS ---
                    if (counter % 5 === 0) {
                        const newLog = generateLog(isSystem, newVisitors);
                        if (newLog) {
                            setLogs(prevLogs => [...prevLogs.slice(-4), { ...newLog, id: Date.now() }]);
                        }
                    }

                    return { visitors: newVisitors, leads: newLeads, sales: newSales };
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [stage, isAutomated]);

    const reset = () => {
        setMetrics({ visitors: 0, leads: 0, sales: 0 });
        setLogs([]);
        setStage("idle");
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="glass-card rounded-3xl border border-white/10 p-1 bg-black/50 backdrop-blur-xl overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col items-center">

                    {/* Header & Controls */}
                    <div className="text-center mb-8 max-w-2xl w-full">
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Simulate Your Growth Engine</h2>

                        <div className="flex items-center justify-center gap-4 mt-6 mb-4">
                            <span className={`text-sm ${!isAutomated ? "text-red-400 font-bold" : "text-gray-500"}`}>Manual Chaos</span>
                            <Switch checked={isAutomated} onCheckedChange={onToggle} disabled={stage === "running"} />
                            <span className={`text-sm ${isAutomated ? "text-green-400 font-bold" : "text-gray-500"}`}>Webkit24 System</span>
                        </div>
                        <p className="text-gray-400 text-xs">
                            {isAutomated ? "Simulating: AI Agents + CRM + Automated Follow-ups" : "Simulating: No Systems, Reliance on Luck"}
                        </p>
                    </div>

                    {/* Visualization Flow */}
                    <div className="w-full grid grid-cols-3 gap-3 md:gap-8 mb-8 relative">
                        {/* Connector Lines */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />

                        <Node
                            icon={<Users />}
                            label="Traffic"
                            value={metrics.visitors}
                            active={stage !== "idle"}
                            color="text-blue-400"
                            idleAnimation={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <Node
                            icon={isAutomated ? <Filter /> : <AlertTriangle />}
                            label="Qualified Leads"
                            value={metrics.leads}
                            active={stage !== "idle" && metrics.visitors > 100}
                            color={isAutomated ? "text-purple-400" : "text-red-400"}
                            warning={!isAutomated}
                            idleAnimation={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />

                        <Node
                            icon={<DollarSign />}
                            label="Revenue"
                            value={`$${metrics.sales * 100}`}
                            active={stage !== "idle" && metrics.leads > 5}
                            color={isAutomated ? "text-green-400" : "text-red-400"}
                            idleAnimation={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                        />
                    </div>

                    {/* Live System Feed */}
                    {stage !== 'idle' && (
                        <div className="w-full max-w-lg mb-8 h-32 bg-black/40 rounded-xl border border-white/5 p-4 overflow-y-auto relative" ref={scrollRef}>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 sticky top-0 bg-black/0 backdrop-blur-sm">System Events</div>
                            <AnimatePresence>
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex items-center gap-2 text-xs mb-2 ${log.type === 'success' ? 'text-green-400' : log.type === 'error' ? 'text-red-400' : 'text-gray-400'}`}
                                    >
                                        {log.type === 'success' && <CheckCircle2 className="w-3 h-3" />}
                                        {log.type === 'error' && <XCircle className="w-3 h-3" />}
                                        {log.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Controls & Outcome */}
                    <div className="min-h-[80px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {stage === "idle" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Button
                                        size="lg"
                                        className={`h-14 px-8 text-lg hover:scale-105 transition-transform ${isAutomated ? "bg-white text-black hover:bg-gray-200" : "bg-red-900/20 text-red-200 border border-red-900/50 hover:bg-red-900/40"}`}
                                        onClick={() => setStage("running")}
                                    >
                                        <Zap className="mr-2 w-5 h-5" /> Launch Simulation
                                    </Button>
                                </motion.div>
                            )}

                            {stage === "running" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
                                >
                                    <BarChart3 className="w-5 h-5 text-white animate-spin" />
                                    <span className="text-sm font-mono text-gray-300">PROCESSING DATA...</span>
                                </motion.div>
                            )}

                            {stage === "complete" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    {isAutomated ? (
                                        <>
                                            <div className="mb-2 text-green-400 font-mono text-sm font-bold">System Performance: EXCELLENT</div>
                                            <p className="text-gray-400 text-xs mb-6 max-w-md mx-auto">
                                                Achieving this requires coordinated systems across marketing, automation, design, and software.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-2 text-red-400 font-mono text-sm font-bold">System Performance: CRITICAL FAILURE</div>
                                            <p className="text-red-300/70 text-xs mb-6 max-w-md mx-auto">
                                                Traffic without systems leaks money. You just paid for 1000 visitors and lost 98% of them.
                                            </p>
                                        </>
                                    )}

                                    <div className="flex gap-4 justify-center">
                                        <Button variant="outline" onClick={reset}>Replay</Button>
                                        <Button className="bg-white text-black hover:bg-gray-200" onClick={() => window.open('https://calendly.com/', '_blank')}>
                                            {isAutomated ? "Build This System For Real" : "Stop Losing Money"}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}

// --- HELPER: Generate Logs ---
function generateLog(isSystem: boolean, visitors: number): Log | null {
    const systemLogs = [
        "✔ Traffic Captured via SEO + Ads",
        "✔ Lead Scored (AI Qualification)",
        "✔ Automation Triggered (WhatsApp)",
        "✔ Conversion Optimized (Landing + CRO)",
        "✔ CRM Updated Automatically",
        "✔ Follow-up Sequence Initiated"
    ];

    const manualLogs = [
        "⚠ Traffic Bounce (Slow Site)",
        "⚠ Lead Form Abandoned",
        "⚠ Missed Call (No Answer)",
        "⚠ Lead Lost (No CRM)",
        "📉 Revenue Leak Detected",
        "⚠ Manual Follow-up Delayed"
    ];

    const pool = isSystem ? systemLogs : manualLogs;
    const type = isSystem ? "success" : "error";

    return {
        text: pool[Math.floor(Math.random() * pool.length)],
        type: type as any,
        id: Date.now()
    };
}

function Node({ icon, label, value, active, color, warning, idleAnimation, transition }: {
    icon: any,
    label: string,
    value: string | number,
    active: boolean,
    color: string,
    warning?: boolean,
    idleAnimation?: any,
    transition?: any
}) {
    return (
        <div className="relative z-10 flex flex-col items-center">
            <motion.div
                animate={active ? {
                    scale: 1.1,
                    borderColor: warning ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.5)",
                    boxShadow: warning ? "0 0 30px rgba(239,68,68,0.2)" : "0 0 30px rgba(255,255,255,0.1)",
                    y: 0, opacity: 1
                } : (idleAnimation || {
                    scale: 1,
                    borderColor: "rgba(255,255,255,0.1)",
                    boxShadow: "none"
                })}
                transition={active ? { duration: 0.5 } : (transition || { duration: 0.5 })}
                className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-2 md:mb-4 transition-colors duration-500`}
            >
                <div className={`w-6 h-6 md:w-10 md:h-10 ${active ? color : "text-gray-600"} transition-colors duration-300`}>
                    {icon}
                </div>
            </motion.div>
            <div className="text-center">
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{label}</div>
                <div className={`text-lg md:text-2xl font-bold font-mono ${active ? (warning ? "text-red-400" : "text-white") : "text-gray-700"}`}>
                    {value}
                </div>
            </div>
        </div>
    );
}
