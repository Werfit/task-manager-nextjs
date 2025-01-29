"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactQueryClientProvider } from "@/lib/query";

type ProviderProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReactQueryClientProvider>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </ReactQueryClientProvider>
  );
};

export { Providers };
