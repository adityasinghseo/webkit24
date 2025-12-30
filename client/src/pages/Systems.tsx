import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Zap, Globe, BarChart3, Layers, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Systems() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold track-tighter mb-6">
            Systems That Power <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Your Growth OS</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Each system solves a specific growth problem.
            <br />
            This page explains what they do, when you need them, and how they work together.
          </p>
          <Link href="/ideas">
            <Button size="lg" variant="premium" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-900/20">
              Diagnose My Current System <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Why Systems — Not Services</h2>
            <div className="text-lg md:text-xl text-gray-300 space-y-6 leading-relaxed">
              <p>
                Most businesses fail not because of bad marketing,
                but because growth relies on disconnected tools and manual work.
              </p>
              <p className="font-semibold text-white">
                Webkit24 replaces chaos with engineered systems —
                designed to run together, scale together, and improve automatically.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Systems Layer 01-05 */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-8">

        {/* SYSTEM 01 - Foundation */}
        <SystemCard
          id="01"
          title="Growth Website"
          subtitle="Conversion Foundation"
          whatSolves="If traffic comes but conversions don’t, this layer is missing."
          icon={<Globe className="w-6 h-6 text-blue-400" />}
          color="blue"
          whatItDoes={[
            "Builds trust instantly",
            "Adapts content based on visitor behavior",
            "Converts traffic into qualified actions"
          ]}
          whoNeedsThis={[
            "Businesses running ads or SEO",
            "Brands with high bounce rates",
            "Outdated or static websites"
          ]}
          whatYouGet={[
            "Conversion-optimized pages",
            "Behavior tracking setup",
            "Dynamic content logic"
          ]}
          integratesWith={["Lead Automation", "Scale System"]}
          ctaText="Build My Growth OS"
          ctaLink="/generator"
          defaultExpanded={true}
        />

        {/* SYSTEM 02 - Capture */}
        <SystemCard
          id="02"
          title="Lead Automation"
          subtitle="24/7 Lead Capture Engine"
          whatSolves="Leads are coming — but follow-ups are slow, inconsistent, or manual."
          icon={<Bot className="w-6 h-6 text-purple-400" />}
          color="purple"
          whatItDoes={[
            "Captures leads instantly",
            "Scores them using AI",
            "Starts automated follow-ups"
          ]}
          whoNeedsThis={[
            "Service businesses",
            "Clinics, agencies, consultants",
            "High-inquiry businesses"
          ]}
          whatYouGet={[
            "AI lead qualification",
            "CRM automation",
            "Email + WhatsApp workflows"
          ]}
          integratesWith={["Growth Website", "Retention Loops"]}
          ctaText="Build My Growth OS"
          ctaLink="/generator"
        />

        {/* SYSTEM 03 - Optimization */}
        <SystemCard
          id="03"
          title="Scale System"
          subtitle="Optimization & Scaling Engine"
          whatSolves="Ad performance drops when optimization is manual."
          icon={<BarChart3 className="w-6 h-6 text-green-400" />}
          color="green"
          whatItDoes={[
            "Tests creatives automatically",
            "Optimizes targeting",
            "Reallocates budget in real time"
          ]}
          whoNeedsThis={[
            "Businesses spending on ads",
            "Brands stuck with inconsistent ROI"
          ]}
          whatYouGet={[
            "Campaign testing framework",
            "Performance-based budget logic",
            "Scaling rules"
          ]}
          integratesWith={["Growth Website", "Lead Automation"]}
          ctaText="Build My Growth OS"
          ctaLink="/generator"
        />

        {/* SYSTEM 04 - Compounding */}
        <SystemCard
          id="04"
          title="Retention Loops"
          subtitle="Revenue Compounding Layer"
          whatSolves="Most revenue is lost after the first purchase."
          icon={<Layers className="w-6 h-6 text-orange-400" />}
          color="orange"
          whatItDoes={[
            "Automates post-purchase engagement",
            "Drives repeat sales",
            "Builds loyalty"
          ]}
          whoNeedsThis={[
            "E-commerce",
            "Subscription businesses",
            "High CAC brands"
          ]}
          whatYouGet={[
            "Post-purchase workflows",
            "Re-engagement sequences",
            "Loyalty logic"
          ]}
          integratesWith={["Lead Automation", "Scale System"]}
          ctaText="Build My Growth OS"
          ctaLink="/generator"
        />

        {/* SYSTEM 05 - Expansion (Optional) */}
        <SystemCard
          id="05"
          title="Rapid MVP"
          subtitle="Optional System (Expansion Layer)"
          whatSolves="Ideas die when execution takes too long."
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          color="yellow"
          whatItDoes={[
            "Turns ideas into live products",
            "Launches fast",
            "Validates with real users"
          ]}
          whoNeedsThis={[
            "Founders",
            "Startups",
            "Businesses testing new products"
          ]}
          whatYouGet={[
            "MVP architecture",
            "Agile build cycles",
            "Launch-ready software"
          ]}
          integratesWith={["Growth Website", "Lead Automation"]}
          ctaText="Build My Growth OS"
          ctaLink="/generator"
        />

      </div>

      {/* FINAL SECTION — ASSEMBLY */}
      <section className="mt-32 py-32 bg-gradient-to-t from-blue-900/20 to-black border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Your Growth OS Is Built — Not Bought</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              You don’t need every system on day one.
              <br />
              <span className="text-white font-medium">You need the right systems, in the right order.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm text-gray-500 font-mono uppercase tracking-widest">
              <span>We assemble your Growth OS based on:</span>
              <span className="text-white">Industry</span>
              <span className="text-gray-700 mx-2">•</span>
              <span className="text-white">Budget</span>
              <span className="text-gray-700 mx-2">•</span>
              <span className="text-white">Growth Stage</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/generator">
                <Button size="lg" variant="premium" className="h-16 px-10 text-xl w-full sm:w-auto rounded-full shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
                  Build My Growth OS
                </Button>
              </Link>
              <Link href="/ideas">
                <Button size="lg" variant="ghost" className="h-16 px-10 text-lg w-full sm:w-auto rounded-full border border-white/10 hover:bg-white/5">
                  Diagnose My Current Setup <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// System Card Component (Refined)
interface SystemCardProps {
  id: string;
  title: string;
  subtitle: string;
  whatSolves: string;
  icon: React.ReactNode;
  color: string;
  whatItDoes: string[];
  whoNeedsThis: string[];
  whatYouGet: string[];
  integratesWith: string[];
  ctaText: string;
  ctaLink: string;
  defaultExpanded?: boolean;
}

function SystemCard(props: SystemCardProps) {
  const [isExpanded, setIsExpanded] = useState(props.defaultExpanded || false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded
          ? "bg-white/5 border-white/20 shadow-2xl"
          : "bg-black border-white/10 hover:border-white/20"
        }`}
    >
      {/* Tier 1 & 2: Main visible content */}
      <div
        className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Icon */}
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 ${isExpanded ? `bg-${props.color}-500/20 text-${props.color}-400` : "bg-white/5 text-gray-400"
          }`}>
          {props.icon}
        </div>

        {/* Content Group */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
            <h3 className="text-2xl font-bold font-display text-white">{props.title}</h3>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest hidden md:inline-block">System {props.id}</span>
          </div>

          <div className="mb-2 text-gray-300 font-medium">{props.subtitle}</div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{props.whatSolves}</p>
        </div>

        {/* Action / Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:w-auto mt-4 md:mt-0">
          <Button variant={isExpanded ? "default" : "outline"} className={`shrink-0 ${isExpanded ? "bg-white text-black hover:bg-gray-200" : "border-white/20 text-gray-400"}`}>
            {isExpanded ? "Close Details" : "Explore System"}
          </Button>
        </div>
      </div>

      {/* Tier 3: Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-black/50 border-t border-white/5"
          >
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

              {/* Col 1 */}
              <div>
                <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                  What It Does
                </h4>
                <ul className="space-y-3">
                  {props.whatItDoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${props.color}-500 mt-1.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2 */}
              <div>
                <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                  Who Needs This
                </h4>
                <ul className="space-y-3">
                  {props.whoNeedsThis.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Integrations & Outcome */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                    Integrates With
                  </h4>
                  <div className="flex items-center gap-2 mb-6">
                    {props.integratesWith.map((sys, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="p-2 rounded bg-white/5 border border-white/10 text-xs text-gray-400 whitespace-nowrap" title={sys}>
                          {sys === "Growth Website" && <Globe className="w-3 h-3" />}
                          {sys === "Lead Automation" && <Bot className="w-3 h-3" />}
                          {sys === "Scale System" && <BarChart3 className="w-3 h-3" />}
                          {sys === "Retention Loops" && <Layers className="w-3 h-3" />}
                          {sys === "Rapid MVP" && <Zap className="w-3 h-3" />}
                          <span className="hidden xl:inline ml-1">{sys}</span>
                        </div>
                        {i < props.integratesWith.length - 1 && <ArrowRight className="w-3 h-3 text-gray-700" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4">
                  <Link href={props.ctaLink} className="block">
                    <Button className="w-full bg-white text-black hover:bg-gray-200 group">
                      {props.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
