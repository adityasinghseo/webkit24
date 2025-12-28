import { useMutation } from "@tanstack/react-query";
import { api, type GeneratePlanRequest, type GenerateIdeaRequest } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useGeneratePlan() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: GeneratePlanRequest) => {
      const res = await apiRequest("POST", api.ai.generatePlan.path, data);
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useGenerateIdea() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: GenerateIdeaRequest) => {
      const res = await apiRequest("POST", api.ai.generateIdea.path, data);
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Idea Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
