import { useDragPreviewProvider } from "@/app/(authentication-required)/dashboard/_components/_context/dashboard.context";
import { Task } from "@prisma/client";
import { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

const TaskKey = "task";

type DragTask = Task;

type UseDashboardDropProps = {
  onDrop?: (task: DragTask) => void;
  onHover?: (task: DragTask, monitor: DropTargetMonitor) => void;
  canDrop?: (task: DragTask, monitor: DropTargetMonitor) => boolean;
};

export const useDropTask = <E extends HTMLElement = HTMLElement>({
  onHover,
  onDrop,
  canDrop,
}: UseDashboardDropProps) => {
  const dropRef = useRef<E | null>(null);

  const [collected, drop] = useDrop({
    accept: TaskKey,
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
    canDrop,
    hover: onHover,
    drop: onDrop,
  });

  drop(dropRef);

  return {
    ...collected,
    drop,
    ref: dropRef,
  };
};

type UseDashboardDragAndDropProps = {
  task: Task;
  index: number;
};

export const useDragTask = <E extends HTMLElement = HTMLElement>({
  task,
}: UseDashboardDragAndDropProps) => {
  const ref = useRef<E | null>(null);
  const [_, setTaskPreview] = useDragPreviewProvider();

  const [{ isDragging }, drag] = useDrag<
    DragTask,
    unknown,
    { isDragging: boolean }
  >({
    type: TaskKey,
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setTaskPreview(null);
    },
  });

  drag(ref);

  return { isDragging, ref };
};
