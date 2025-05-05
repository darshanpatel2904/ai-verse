"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type AgentsOutputStore,
  createAgentsOutputStore,
} from "@/stores/agents-output-store";

export type AgentsOutputStoreApi = ReturnType<typeof createAgentsOutputStore>;

export const AgentsOutputStoreContext = createContext<
  AgentsOutputStoreApi | undefined
>(undefined);

export interface AgentsOutputStoreProviderProps {
  children: ReactNode;
}

export const AgentsOutputStoreProvider = ({
  children,
}: AgentsOutputStoreProviderProps) => {
  const storeRef = useRef<AgentsOutputStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAgentsOutputStore();
  }

  return (
    <AgentsOutputStoreContext.Provider value={storeRef.current}>
      {children}
    </AgentsOutputStoreContext.Provider>
  );
};

export const useAgentsOutputStore = <T,>(
  selector: (store: AgentsOutputStore) => T
): T => {
  const agentsOutputStoreContext = useContext(AgentsOutputStoreContext);

  if (!agentsOutputStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(agentsOutputStoreContext, selector);
};
