import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateIdea } from "@/hooks/use-ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateIdeaSchema, type GenerateIdeaRequest, type AIIdeaResponse } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lightbulb, Smartphone, Repeat, Database, DollarSign } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function IdeaGenerator() {
  const mutation = useGenerateIdea();
  const [result, setResult] = useState<AIIdeaResponse | null>(null);

  const form = useForm<GenerateIdeaRequest>({
    resolver: zodResolver(generateIdeaSchema),
    defaultValues: {
      businessType: "",
      problem: "",
    },
  });

  function onSubmit(data: GenerateIdeaRequest) {
    setResult(null);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setResult(data as AIIdeaResponse);
      },
    });
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">AI Idea Lab</h1>
          <p className="text-gray-400 text-lg">
            Have a business problem? Let our AI architect the perfect software solution, from app features to monetization models.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry / Business Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Real Estate, Fitness Coach..." className="bg-white/5 border-white/10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What problem are you solving?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g. Clients keep missing appointments and I waste time chasing payments..." 
                          className="bg-white/5 border-white/10 min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" variant="premium" disabled={mutation.isPending}>
                   {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lightbulb className="w-4 h-4 mr-2" />}
                   Generate Solution
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <IdeaCard icon={<Smartphone className="text-blue-400" />} title="App Features" items={result.appIdeas} />
              <IdeaCard icon={<Repeat className="text-green-400" />} title="Automation Workflows" items={result.automationWorkflows} />
              <IdeaCard icon={<Database className="text-purple-400" />} title="CRM & Data" items={result.crmUsage} />
              <IdeaCard icon={<DollarSign className="text-yellow-400" />} title="Monetization" items={result.monetization} />
              <IdeaCard icon={<Lightbulb className="text-white" />} title="Web Features" items={result.websiteFeatures} />
              
              <div className="glass-card p-6 rounded-2xl border border-white/20 flex flex-col justify-center items-center text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => window.location.href = '/#contact'}
              >
                <h3 className="text-xl font-bold mb-2">Build This Reality</h3>
                <p className="text-sm text-gray-400 mb-4">Turn this concept into code.</p>
                <Button variant="premium" size="sm">Talk to a Dev</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

function IdeaCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-bold font-display">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-400 leading-relaxed border-b border-white/5 pb-2 last:border-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
