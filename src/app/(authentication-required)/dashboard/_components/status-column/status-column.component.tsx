"use client";

import { cn } from "@/shared/utils/cn.util";
import { CSSProperties } from "react";

import { DeleteColumnButton } from "./delete-column-button.component";

import { Column } from "@prisma/client";
import { CreateTaskButton } from "../dashboard/create-task-button.component";
import { TasksList } from "../task/task-list.component";
import { useDropTask } from "@/app/(authentication-required)/dashboard/_components/_hooks/use-dashboard-drag-and-drop.hook";
import { useDragTask } from "@/hooks/mutations/use-tasks.hook";
import { useDragPreviewProvider } from "../_context/dashboard.context";

type StatusColumnProps = {
  column: Column;
  className?: string;
  style?: CSSProperties;
};

const StatusColumn: React.FC<StatusColumnProps> = ({
  column,
  className,
  style,
}) => {
  const [_, setTaskPreview] = useDragPreviewProvider();
  const { mutate } = useDragTask();
  const { ref } = useDropTask<HTMLDivElement>({
    canDrop: (item) => {
      return item.columnId !== column.id;
    },
    onHover: (_, monitor) => {
      if (monitor.canDrop()) {
        setTaskPreview({
          column: column.id,
        });
      } else {
        setTaskPreview(null);
      }
    },
    onDrop: (dragTask) => {
      mutate({
        id: dragTask.id,
        targetColumnId: column.id,
        currentColumnId: dragTask.columnId,
      });
    },
  });

  return (
    <div
      className={cn("flex h-full flex-col gap-y-2 overflow-y-auto", className)}
      style={style}
    >
      <header
        className="sticky top-0 flex items-center justify-between border-b-2 bg-background"
        style={{ borderColor: column.color }}
      >
        <h3
          className="text-lg font-bold uppercase"
          style={{
            color: column.color,
          }}
        >
          {column.name}
        </h3>

        <DeleteColumnButton id={column.id} />
      </header>

      <div
        className="relative flex flex-col gap-y-2 rounded border p-2 shadow-sm"
        ref={ref}
      >
        {/* <div
          className={cn(
            "absolute z-10 h-full w-full bg-white/50",
            !isOver && "hidden"
          )}
        ></div> */}
        <TasksList columnId={column.id} />

        <CreateTaskButton columnId={column.id} className="w-full" />
      </div>
    </div>
  );
};

export { StatusColumn };
