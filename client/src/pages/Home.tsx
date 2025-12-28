import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, Globe, Layers, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter mb-8 text-gradient"
          >
            We don’t market brands.<br />
            We build <span className="text-white">growth systems.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light"
          >
            AI, automation, marketing & software — designed specifically for modern businesses ready to scale.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link href="/generator">
              <Button variant="premium" size="lg" className="h-14 px-8 text-lg w-full md:w-auto">
                <Zap className="w-5 h-5 mr-2" />
                Build Digital Growth Plan
              </Button>
            </Link>
            <Link href="/ideas">
              <Button variant="glass" size="lg" className="h-14 px-8 text-lg w-full md:w-auto">
                <Bot className="w-5 h-5 mr-2" />
                AI Idea Generator
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Not Services. <span className="text-gray-500">Systems.</span></h2>
              <p className="text-gray-400 text-lg max-w-xl">
                We replace chaotic, manual marketing tasks with predictable, automated systems that run 24/7.
              </p>
            </div>
            <Link href="/systems">
              <Button variant="link" className="text-white group">
                Explore all systems <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SystemCard 
              icon={<Globe />}
              title="Growth System"
              desc="Full-stack digital presence optimized for conversion, not just aesthetics."
            />
            <SystemCard 
              icon={<Bot />}
              title="Lead Automation"
              desc="Capture, qualify, and nurture leads automatically using AI chatbots and CRM logic."
            />
            <SystemCard 
              icon={<BarChart3 />}
              title="Scale System"
              desc="Data-driven ad campaigns that automatically reallocate budget to high-performing creatives."
            />
            <SystemCard 
              icon={<Layers />}
              title="Retention Loops"
              desc="Automated email and WhatsApp sequences that turn one-time buyers into lifetime value."
            />
            <SystemCard 
              icon={<Zap />}
              title="Rapid MVP"
              desc="Go from idea to functional software prototype in weeks, not months."
            />
            <div className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-2xl flex items-center justify-center border border-white/10 group cursor-pointer hover:bg-white/5 transition-all">
              <Link href="/systems" className="text-center">
                <h3 className="text-2xl font-bold mb-2">Build Yours</h3>
                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">Configure a custom system &rarr;</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Demo Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Powered by Intelligence.</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our platform integrates directly with advanced AI models to analyze your market, predict trends, and optimize your growth strategy in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                {['Real-time market analysis', 'Predictive lead scoring', 'Automated content generation', '24/7 AI Customer Support'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/ideas">
                <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black">
                  Try AI Generator
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-1 rounded-2xl shadow-2xl">
              <div className="bg-black rounded-xl overflow-hidden aspect-video relative group">
                {/* Abstract UI representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping opacity-20 delay-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-white rounded-full" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">ANALYZING...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SystemCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
