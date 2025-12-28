import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Box, MessageSquare, Zap, Users, BarChart } from "lucide-react";

export default function Systems() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our Systems</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Modular, scalable, and automated. Choose the components your business needs to grow.
          </p>
        </div>

        <div className="space-y-24">
          <SystemRow 
            title="The Growth Engine"
            desc="A complete digital ecosystem designed to attract, convert, and retain customers on autopilot."
            features={["High-conversion Landing Pages", "SEO Architecture", "Performance Analytics Dashboard"]}
            icon={<Box className="w-12 h-12 text-white" />}
            align="left"
          />
          
          <SystemRow 
            title="Lead Automation Core"
            desc="Never lose a lead again. AI chatbots capture inquiries 24/7, qualify them, and book appointments directly into your calendar."
            features={["AI Chatbots", "Instant Qualification", "Calendar Integration"]}
            icon={<MessageSquare className="w-12 h-12 text-blue-400" />}
            align="right"
          />
          
          <SystemRow 
            title="Retention Loops"
            desc="Turn one-time buyers into loyal fans. Automated email and SMS sequences that nurture relationships without you lifting a finger."
            features={["Email Drip Campaigns", "SMS Marketing", "Loyalty Logic"]}
            icon={<Users className="w-12 h-12 text-green-400" />}
            align="left"
          />
          
          <SystemRow 
            title="Rapid MVP Deployment"
            desc="For startups and innovators. We build functional, scalable software prototypes in weeks, enabling you to test the market fast."
            features={["React/Node Stack", "Database Architecture", "User Auth & Payments"]}
            icon={<Zap className="w-12 h-12 text-yellow-400" />}
            align="right"
          />
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-white/20 to-white/5">
            <Link href="/generator">
              <Button size="lg" variant="premium" className="rounded-full px-12 h-16 text-lg">
                Build My System <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function SystemRow({ title, desc, features, icon, align }: { title: string, desc: string, features: string[], icon: React.ReactNode, align: 'left' | 'right' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row gap-12 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">{desc}</p>
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
          {/* Abstract geometric representation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
            <div className="grid grid-cols-3 gap-4 transform rotate-12 scale-110">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-16 h-16 border border-white/20 rounded-lg backdrop-blur-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
