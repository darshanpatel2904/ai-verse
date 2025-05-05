"use client";
import { AgentsOutputStoreProvider } from "@/providers/agents-output-store-provider";

export default function Agentayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AgentsOutputStoreProvider>{children}</AgentsOutputStoreProvider>;
}
