"use client";
import { Task } from "@prisma/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TaskPosition = {
  column: Task["columnId"];
};

type DragPreviewState = [
  TaskPosition | null,
  Dispatch<SetStateAction<TaskPosition | null>>,
];

const DragPreviewContext = createContext<DragPreviewState | null>(null);

type DashboardProviderProps = {
  children: React.ReactNode;
};

export const DragPreviewProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const state = useState<TaskPosition | null>(null);
  return (
    <DragPreviewContext.Provider value={state}>
      {children}
    </DragPreviewContext.Provider>
  );
};

export const useDragPreviewProvider = () => {
  const context = useContext(DragPreviewContext);

  if (!context) {
    throw new Error(
      "Can't use `useDragPreviewProvider` outside of its context"
    );
  }

  return context;
};
