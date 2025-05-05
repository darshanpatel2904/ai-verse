import type { ResearchOutput } from "@/services/agents/research-assistant/research-assistant-output-schema";
import { createStore } from "zustand/vanilla";

export type AgentsOutputState = {
  researchAssistantOutput: ResearchOutput | null;
};

export type AgentsOutputActions = {
  setResearchAssistantOutput: (output: ResearchOutput) => void;
};

export type AgentsOutputStore = AgentsOutputState & AgentsOutputActions;

export const defaultInitState: AgentsOutputState = {
  researchAssistantOutput: null,
};

export const createAgentsOutputStore = (
  initState: AgentsOutputState = defaultInitState
) => {
  return createStore<AgentsOutputStore>()((set) => ({
    ...initState,
    setResearchAssistantOutput: (output) =>
      set({ researchAssistantOutput: output }),
  }));
};
