
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GrowthSimulator } from "@/components/home/GrowthSimulator";
import { InteractiveSystemCard } from "@/components/home/InteractiveSystemCard";
import { SystemFlow } from "@/components/home/SystemFlow";
import { BuilderSection } from "@/components/home/BuilderSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, Globe, Layers, Zap } from "lucide-react";

export default function Home() {
  const [isSystem, setIsSystem] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [exploredLayers, setExploredLayers] = useState<Set<string>>(new Set(["Growth Website"])); // Start with 1 explored

  const toggleCard = (title: string) => {
    setExpandedCard(prev => prev === title ? null : title);
  };

  const handleMouseEnter = (title: string) => {
    if (window.matchMedia("(hover: hover)").matches) {
      setExpandedCard(title);
      setExploredLayers(prev => new Set(prev).add(title));
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setExpandedCard(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-100 selection:text-blue-900">
      <Navbar systemState={isSystem ? "automated" : "manual"} />

      {/* Interactive Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Layer 1: Background Signal Grid - Refined & High Density */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base Grid - Invisible paths (very faint) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

          {/* High Density Signal Generation */}
          {/* We generate these deterministically to prevent hydration mismatches */}
          {[...Array(30)].map((_, i) => {
            const isHorizontal = i % 2 === 0;
            const colorClass = i % 3 === 0 ? "text-green-500" : "text-blue-500"; // Use text color for currentColor
            const delay = (i * 0.7) % 5; // Spread delays
            const duration = 5 + (i % 5); // Varying speeds (5-10s)

            // Grid alignment logic (keep them on 40px grid lines)
            const topPos = isHorizontal ? `${(i * 10) % 100}%` : `${(i * 5 * 2) % 100}%`;
            const leftPos = !isHorizontal ? `${(i * 10) % 100}%` : `${(i * 3 * 7) % 100}%`;

            return (
              <div
                key={i}
                className={`absolute overflow-hidden ${isHorizontal ? "w-full h-[1px] top-0 left-0" : "h-full w-[1px] top-0 left-0"
                  }`}
                style={{
                  top: isHorizontal ? topPos : 0,
                  left: !isHorizontal ? leftPos : 0,
                }}
              >
                <div
                  className={`${isHorizontal ? "w-[10%] h-full" : "h-[10%] w-full"} ${colorClass} bg-current ${isHorizontal ? "animate-grid-signal-h" : "animate-grid-signal-v"
                    }`}
                  style={{
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity: 0.15 // Target opacity as per brief
                  }}
                />
              </div>
            );
          })}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT COLUMN: Text & Hook */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-mono text-blue-600"
              >
                Most businesses don’t have a growth problem. They have a system problem.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter mb-6 text-gray-900 leading-[1.1]"
              >
                We don’t market.<br />
                We build <span className="font-bold animate-text-shine">Growth OS.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 font-light leading-relaxed"
              >
                Stop relying on chaotic ads and manual tasks.
                We engineer a self-regulating growth machine for your business.
              </motion.p>

              {/* Layer 4: Signal Flow (Hero -> Simulator) */}
              <div className="hidden lg:block absolute top-[20%] left-[40%] w-[200px] h-px overflow-hidden pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-grid-signal-h" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Link href="/generator">
                  <Button variant="premium" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-2xl shadow-blue-900/20">
                    <Zap className="w-5 h-5 mr-2" />
                    Build My System
                  </Button>
                </Link>
                <Link href="/ideas">
                  <Button variant="glass" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                    Diagnose My Growth
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: The Simulator (Hero Object) */}
            <div className="relative">
              {/* Glow Effect reacting to state */}
              <div className={`absolute top - 1 / 2 left - 1 / 2 - translate - x - 1 / 2 - translate - y - 1 / 2 w - [120 %] h - [120 %] rounded - full blur - [100px] transition - colors duration - 1000 ${isSystem ? "bg-blue-900/20" : "bg-red-900/10"} `} />

              <div className="relative z-10 transform lg:scale-95 lg:origin-right">
                <GrowthSimulator isAutomated={isSystem} onToggle={setIsSystem} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Living Systems Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Webkit24 OS</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-500 text-lg max-w-xl">
                  Hover over a system to see how it works.
                </p>
                <div className="hidden md:flex px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-mono text-blue-600 tracking-wider">
                  System Assembly Progress: {exploredLayers.size} of 5 layers active
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractiveSystemCard
              icon={<Globe />}
              title="Growth Website"
              desc="High-performance digital HQ designed for conversion."
              systemRole="Conversion Foundation"
              steps={[
                "High-intent traffic flows to landing page",
                "User behavior analyzed via heatmaps",
                "Content adapts dynamically to convert"
              ]}
              whatBreaks={[
                "Visitors bounce without taking action",
                "Brand looks outdated and untrustworthy",
                "Marketing budget yields zero ROI"
              ]}
              ctaText="Install Conversion Foundation"
              isExpanded={expandedCard === "Growth Website"}
              isDimmed={expandedCard !== null && expandedCard !== "Growth Website"}
              systemTier="FOUNDATION"
              onToggle={() => toggleCard("Growth Website")}
              onMouseEnter={() => handleMouseEnter("Growth Website")}
              onMouseLeave={handleMouseLeave}
            />
            <InteractiveSystemCard
              icon={<Bot />}
              title="Lead Automation"
              desc="Capture and nurture leads 24/7 without lifting a finger."
              systemRole="24/7 Lead Capture Engine"
              steps={[
                "Leads captured instantly 24/7",
                "AI qualifies and scores intent",
                "Perfectly timed follow-ups sent"
              ]}
              whatBreaks={[
                "Leads cool down and buy elsewhere",
                "Manual data entry eats your time",
                "No organized pipeline for sales"
              ]}
              ctaText="Enable Lead Engine"
              isExpanded={expandedCard === "Lead Automation"}
              isDimmed={expandedCard !== null && expandedCard !== "Lead Automation"}
              systemTier="AUTOMATION"
              onToggle={() => toggleCard("Lead Automation")}
              onMouseEnter={() => handleMouseEnter("Lead Automation")}
              onMouseLeave={handleMouseLeave}
            />
            <InteractiveSystemCard
              icon={<BarChart3 />}
              title="Scale System"
              desc="Data-driven ad campaigns that optimize themselves — not your stress."
              systemRole="Optimization & Scaling Engine"
              steps={[
                "High-performing creatives identified automatically",
                "Audiences refined based on conversion signals",
                "Budget reallocated to maximize ROI in real time"
              ]}
              whatBreaks={[
                "Budgets scale losses, not profit",
                "Winning ads get buried",
                "Manual optimization slows growth"
              ]}
              ctaText="Activate Scaling Engine"
              isExpanded={expandedCard === "Scale System"}
              isDimmed={expandedCard !== null && expandedCard !== "Scale System"}
              systemTier="OPTIMIZATION"
              onToggle={() => toggleCard("Scale System")}
              onMouseEnter={() => handleMouseEnter("Scale System")}
              onMouseLeave={handleMouseLeave}
            />
            <InteractiveSystemCard
              icon={<Layers />}
              title="Retention Loops"
              desc="Turn one-time buyers into repeat customers — automatically."
              systemRole="Revenue Compounding Layer"
              steps={[
                "Purchase behavior captured in real time",
                "Personalized post-purchase journeys triggered",
                "Loyalty incentives deployed to drive repeat sales"
              ]}
              whatBreaks={[
                "Customers buy once and disappear",
                "Rising acquisition costs kill margins",
                "No lifetime value growth"
              ]}
              ctaText="Turn On Revenue Loop"
              isExpanded={expandedCard === "Retention Loops"}
              isDimmed={expandedCard !== null && expandedCard !== "Retention Loops"}
              systemTier="COMPOUNDING"
              onToggle={() => toggleCard("Retention Loops")}
              onMouseEnter={() => handleMouseEnter("Retention Loops")}
              onMouseLeave={handleMouseLeave}
            />
            <InteractiveSystemCard
              icon={<Zap />}
              title="Rapid MVP"
              desc="Launch, test, and validate software ideas in weeks — not months."
              systemRole="Experimentation & Expansion Engine"
              steps={[
                "Core problem and scope defined",
                "Agile sprint cycles with real user feedback",
                "MVP launched, measured, and iterated"
              ]}
              whatBreaks={[
                "Ideas die in planning",
                "Months wasted on unvalidated builds",
                "No feedback until it’s too late"
              ]}
              ctaText="Launch Experiment Engine"
              isExpanded={expandedCard === "Rapid MVP"}
              isDimmed={expandedCard !== null && expandedCard !== "Rapid MVP"}
              systemTier="EXPANSION"
              onToggle={() => toggleCard("Rapid MVP")}
              onMouseEnter={() => handleMouseEnter("Rapid MVP")}
              onMouseLeave={handleMouseLeave}
            />

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl flex flex-col items-center justify-center border border-gray-100 group cursor-pointer hover:shadow-lg transition-all text-center">
              <Link href="/generator" className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Assemble My Growth OS</h3>
                <p className="text-gray-500 text-sm group-hover:text-blue-600 transition-colors">Start the Planner &rarr;</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - System Flow */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">From Traffic to Revenue — Automatically</h2>
            <p className="text-gray-500 text-lg uppercase tracking-widest font-mono text-sm">
              A self-regulating growth engine that replaces manual work with connected systems.
            </p>
          </div>

          <SystemFlow />

          <div className="mt-20 text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              This Isn’t a Template. It’s Built for Your Business.
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Your industry, budget, and goals determine how the Growth OS is architected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/generator">
                <Button variant="premium" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                  <Zap className="w-5 h-5 mr-2" />
                  Build My Growth OS
                </Button>
              </Link>
              <Link href="/ideas">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100">
                  Diagnose My Current System
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Free strategy consultation • No sales pressure</p>
              <p className="text-xs text-gray-600 font-mono">
                Webkit24 doesn’t run campaigns.
                <br />
                We engineer growth systems.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Builder Section (Replaces Contact/Decision) */}
      <BuilderSection />

      <Footer />
    </div>
  );
}

