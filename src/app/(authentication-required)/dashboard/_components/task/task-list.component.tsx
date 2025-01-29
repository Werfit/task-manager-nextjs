"use client";

import { useGetTasks } from "@/hooks/mutations/use-tasks.hook";
import { Task } from "@prisma/client";
import { TaskSummaryCard } from "./task-summary-card.component";
import { useDragPreviewProvider } from "../_context/dashboard.context";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type TasksListProps = {
  columnId: Task["columnId"];
};

const TasksList: React.FC<TasksListProps> = ({ columnId }) => {
  const { data } = useGetTasks(columnId);
  const [preview] = useDragPreviewProvider();

  if (!data) {
    return null;
  }

  const previewInColumn = preview && preview.column === columnId;

  return (
    <>
      {data.map((task, index) => (
        <TaskSummaryCard key={task.id} task={task} index={index} />
      ))}

      {previewInColumn && (
        <Card>
          <CardHeader />
          <CardContent />
        </Card>
      )}
    </>
  );
};

export { TasksList };
