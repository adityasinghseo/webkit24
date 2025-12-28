import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGeneratePlan } from "@/hooks/use-ai";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePlanSchema, type GeneratePlanRequest, type AIPlanResponse } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// --- SMART PRESETS ---
const PRESET_DATA: Record<string, {
  audience: string;
  goal: string;
  website: string;
  usps: string[];
}> = {
  "Doctor / Clinic": {
    audience: "Patients, Local Residents",
    goal: "leads",
    website: "No Website",
    usps: ["Experienced Doctors", "Emergency Support", "Affordable Consultation", "Modern Equipment"]
  },
  "Dental Clinic": {
    audience: "Local Families, Patients needing cosmetic work",
    goal: "leads",
    website: "No Website",
    usps: ["Pain-Free Treatment", "Cosmetic Experts", "Weekend Open", "Insurance Accepted"]
  },
  "Real Estate Agent": {
    audience: "Home Buyers, Property Investors",
    goal: "leads",
    website: "Needs Redesign",
    usps: ["Top 1% Agent", "Local Market Expert", "Free Valuation", "Quick Sales"]
  },
  "SaaS / Startup": {
    audience: "B2B Founders, Product Teams",
    goal: "sales",
    website: "High Performing",
    usps: ["AI-Powered", "Scalable", "Enterprise Security", "24/7 Support"]
  },
  "E-commerce Brand": {
    audience: "Online Shoppers, Gen Z",
    goal: "sales",
    website: "Good Condition",
    usps: ["Free Shipping", "Premium Quality", "Sustainable", "Handmade"]
  },
  "Restaurant / Cafe": {
    audience: "Local Foodies, Couples, Families",
    goal: "branding",
    website: "No Website",
    usps: ["Best Ambiance", "Authentic Taste", "Live Music", "Pet Friendly"]
  },
  "Gym / Fitness": {
    audience: "Fitness Enthusiasts, Beginners",
    goal: "leads",
    website: "Needs Redesign",
    usps: ["Certified Trainers", "24/7 Access", "Modern Equipment", "Free Trial"]
  }
};

const CATEGORIES = Object.keys(PRESET_DATA);

export default function GrowthGenerator() {
  const mutation = useGeneratePlan();
  const [result, setResult] = useState<AIPlanResponse | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<GeneratePlanRequest>({
    resolver: zodResolver(generatePlanSchema),
    defaultValues: {
      businessCategory: "",
      city: "",
      budget: "",
      goal: "leads",
      websiteStatus: "",
      targetAudience: "",
      competitors: "",
      usp: "",
    },
  });

  // Dynamic chips based on selection
  const currentCategory = form.watch("businessCategory");
  const defaultChips = ["Best Price", "24/7 Support", "AI-Powered", "Eco-Friendly", "Premium Quality"];
  const activeUsps = PRESET_DATA[currentCategory]?.usps || defaultChips;

  function onCategorySelect(category: string) {
    form.setValue("businessCategory", category);
    setOpen(false);

    // --- AUTO-FILL ENGINE ---
    const preset = PRESET_DATA[category];
    if (preset) {
      // Only auto-fill if the field is empty to respect user edits
      if (!form.getValues("targetAudience")) form.setValue("targetAudience", preset.audience);
      if (!form.getValues("websiteStatus")) form.setValue("websiteStatus", preset.website);

      // Goal is a dropdown, so we can just set it
      form.setValue("goal", preset.goal);
    }
  }

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

                {/* SMART COMBOBOX */}
                <FormField
                  control={form.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Business Category</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between bg-white/5 border-white/10 text-left font-normal hover:bg-white/10 hover:text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? CATEGORIES.find((c) => c === field.value) || field.value
                                : "Select or type category..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-zinc-900 border-white/10 text-white">
                          <Command className="bg-transparent">
                            <CommandInput placeholder="Search category (e.g. Doctor, SaaS)..." className="text-white" />
                            <CommandList>
                              <CommandEmpty>No category found. You can type anything.</CommandEmpty>
                              <CommandGroup>
                                {CATEGORIES.map((category) => (
                                  <CommandItem
                                    value={category}
                                    key={category}
                                    onSelect={() => onCategorySelect(category)}
                                    className="data-[selected=true]:bg-white/10 data-[selected=true]:text-white cursor-pointer"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        category === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                    name="websiteStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Website Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="No Website">No Website</SelectItem>
                            <SelectItem value="Needs Redesign">Needs Redesign</SelectItem>
                            <SelectItem value="Good Condition">Good Condition</SelectItem>
                            <SelectItem value="High Performing">High Performing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                </div>

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="Who are your ideal customers?" className="bg-white/5 border-white/10" {...field} value={field.value || ''} />
                      </FormControl>
                      {/* Chips are helpful but optional since we have auto-fill now */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HIDDEN COMPETITORS FIELD (still in schema but hidden from UI as requested) */}
                <div className="hidden">
                  <FormField
                    control={form.control}
                    name="competitors"
                    render={({ field }) => (
                      <Input {...field} value={field.value || ''} />
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="usp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unique Selling Point (USP)</FormLabel>
                      <FormControl>
                        <Input placeholder="What makes you different?" className="bg-white/5 border-white/10" {...field} value={field.value || ''} />
                      </FormControl>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {activeUsps.map(chip => (
                          <div key={chip}
                            className="text-xs bg-white/5 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10 transition-colors text-gray-400"
                            onClick={() => form.setValue("usp", chip)}
                          >
                            {chip}
                          </div>
                        ))}
                      </div>
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
                      <Select onValueChange={field.onChange} value={field.value}>
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
                      <p className="text-gray-400 text-sm mt-1">
                        Strategy by <span className="text-white font-semibold">Webkit24 AI</span> • Timeline: <span className="text-white">{result.timeline}</span>
                      </p>
                    </div>
                    {/* Disclaimer Badge */}
                    <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      <p className="text-xs text-gray-400">AI Generated Insight</p>
                    </div>
                  </div>

                  {/* "Why Hire" Insight from AI */}
                  {result.whyHireWebkit24 && (
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-500/20 mb-6">
                      <p className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-pulse" /> Expert Insight: {result.whyHireWebkit24}
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <ResultSection title="Marketing Channels" items={result.marketingChannels} />
                    <ResultSection title="Website Requirements" items={result.websiteNeeds} />
                    <ResultSection title="Automation Stack" items={result.automations} />
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                    <p className="text-center text-gray-400 text-sm mb-4">
                      Ready to execute this plan? Don't do it alone.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full bg-white text-black hover:bg-gray-200" onClick={() => window.open('https://calendly.com/', '_blank')}>
                        Book Free Strategy Call
                      </Button>
                      <Button className="w-full" variant="outline" onClick={() => window.open('https://wa.me/1234567890', '_blank')}>
                        Chat on WhatsApp
                      </Button>
                    </div>
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
