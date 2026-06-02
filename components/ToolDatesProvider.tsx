"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ToolDatesValue = {
  createdDisplay: string;
  createdIso: string;
  updatedDisplay?: string;
  updatedIso?: string;
} | null;

const ToolDatesContext = createContext<ToolDatesValue>(null);

export function ToolDatesProvider({
  dates,
  children,
}: {
  dates: ToolDatesValue;
  children: ReactNode;
}) {
  return <ToolDatesContext.Provider value={dates}>{children}</ToolDatesContext.Provider>;
}

export function useToolDates(): ToolDatesValue {
  return useContext(ToolDatesContext);
}
