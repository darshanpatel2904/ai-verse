"use client";

import { useState } from "react";
import { DynamicForm } from "@/features/agents/components/dynamic-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAgentsOutputStore } from "@/providers/agents-output-store-provider";

export default function AgentForm({ agentForm }: { agentForm: any }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setResearchAssistantOutput } = useAgentsOutputStore((state) => state);

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setResearchAssistantOutput(data as any);
      setSuccess("Form submitted successfully!");
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div>
      {success && (
        <Alert className="mb-6">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <DynamicForm
        formConfig={agentForm}
        onSubmit={handleSubmit}
        isLoading={submitting}
      />
    </div>
  );
}
