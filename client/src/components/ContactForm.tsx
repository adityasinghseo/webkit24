import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const mutation = useCreateLead();
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      businessType: "General",
    },
  });

  function onSubmit(data: InsertLead) {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div id="contact" className="w-full max-w-xl mx-auto glass-card p-8 rounded-2xl">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold font-display text-white mb-2">Start the Conversation</h3>
        <p className="text-gray-400">Ready to build your growth system? Let's talk.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@company.com" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your goals..." 
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 min-h-[120px]" 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" variant="premium" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {mutation.isPending ? "Sending..." : "Request Consultation"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
