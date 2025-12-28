
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GrowthSimulator } from "@/components/home/GrowthSimulator";
import { InteractiveSystemCard } from "@/components/home/InteractiveSystemCard";
import { DecisionSection } from "@/components/home/DecisionSection";
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar systemState={isSystem ? "automated" : "manual"} />

      {/* Interactive Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT COLUMN: Text & Hook */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400"
              >
                Most businesses don’t have a growth problem. They have a system problem.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter mb-6 text-white leading-[1.1]"
              >
                We don’t market.<br />
                We build <span className="text-blue-500">Growth OS.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-8 font-light leading-relaxed"
              >
                Stop relying on chaotic ads and manual tasks.
                We engineer a self-regulating growth machine for your business.
              </motion.p>

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
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Webkit24 OS</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-lg max-w-xl">
                  Hover over a system to see how it works.
                </p>
                <div className="hidden md:flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-400 tracking-wider">
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
            <div className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-2xl flex flex-col items-center justify-center border border-white/10 group cursor-pointer hover:bg-white/5 transition-all text-center">
              <Link href="/generator" className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Assemble My Growth OS</h3>
                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">Start the Planner &rarr;</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Section (Replaces Contact Form) */}
      <DecisionSection />

      <Footer />
    </div>
  );
}

