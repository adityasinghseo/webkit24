import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGeneratePlan } from "@/hooks/use-ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePlanSchema, type GeneratePlanRequest, type AIPlanResponse } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function GrowthGenerator() {
  const mutation = useGeneratePlan();
  const [result, setResult] = useState<AIPlanResponse | null>(null);

  const form = useForm<GeneratePlanRequest>({
    resolver: zodResolver(generatePlanSchema),
    defaultValues: {
      businessCategory: "",
      city: "",
      budget: "",
      goal: "leads",
    },
  });

  function onSubmit(data: GeneratePlanRequest) {
    setResult(null);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setResult(data as AIPlanResponse);
      },
    });
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">360° Growth Plan Generator</h1>
          <p className="text-gray-400 text-lg">
            Tell us about your business. Our AI will architect a custom digital growth system for you in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Dental Clinic, SaaS, E-commerce..." className="bg-white/5 border-white/10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / Target Market (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. New York, Global..." className="bg-white/5 border-white/10" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Budget</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="starter">Under $1k</SelectItem>
                            <SelectItem value="growth">$1k - $5k</SelectItem>
                            <SelectItem value="scale">$5k - $20k</SelectItem>
                            <SelectItem value="enterprise">$20k+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Choose goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="leads">More Leads</SelectItem>
                            <SelectItem value="sales">More Sales</SelectItem>
                            <SelectItem value="branding">Brand Awareness</SelectItem>
                            <SelectItem value="retention">Customer Retention</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" variant="premium" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Generating Strategy...
                    </>
                  ) : (
                    "Generate My Plan"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Result */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {!result && !mutation.isPending && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-2xl"
                >
                  <div>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-500">Waiting for inputs...</p>
                  </div>
                </motion.div>
              )}

              {mutation.isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 glass-card rounded-2xl"
                >
                  <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                  <h3 className="text-xl font-bold mb-2">Analyzing Market Data...</h3>
                  <p className="text-gray-400">Our AI is constructing your custom roadmap.</p>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-8 rounded-2xl border-white/20 shadow-2xl"
                >
                  <div className="mb-6 pb-6 border-b border-white/10 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold font-display">Your Growth Blueprint</h2>
                      <p className="text-gray-400 text-sm">Estimated Timeline: <span className="text-white">{result.timeline}</span></p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>Export PDF</Button>
                  </div>

                  <div className="space-y-6">
                    <ResultSection title="Marketing Channels" items={result.marketingChannels} />
                    <ResultSection title="Website Requirements" items={result.websiteNeeds} />
                    <ResultSection title="Automation Stack" items={result.automations} />
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <Button className="w-full" variant="premium" onClick={() => window.location.href = '/#contact'}>
                      Build This System For Me <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function ResultSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
