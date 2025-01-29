"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@prisma/client";
import { DeleteTaskButton } from "./delete-task-button.component";
import { useDragTask } from "@/app/(authentication-required)/dashboard/_components/_hooks/use-dashboard-drag-and-drop.hook";
import { cn } from "@/shared/utils/cn.util";

type TaskSummaryCardProps = {
  task: Task;
  index: number;
};

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ task, index }) => {
  const { isDragging, ref } = useDragTask<HTMLDivElement>({
    task,
    index,
  });

  return (
    <Card ref={ref} className={cn(isDragging && "opacity-50")}>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{task.title}</CardTitle>

        <DeleteTaskButton taskId={task.id} columnId={task.columnId} />
      </CardHeader>
      <CardContent>
        <CardDescription>{task.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export { TaskSummaryCard };
