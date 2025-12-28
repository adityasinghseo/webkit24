import { useMutation } from "@tanstack/react-query";
import { api, type InsertLead } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await apiRequest("POST", api.leads.create.path, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Sent",
        description: "We've received your inquiry and will be in touch shortly.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
