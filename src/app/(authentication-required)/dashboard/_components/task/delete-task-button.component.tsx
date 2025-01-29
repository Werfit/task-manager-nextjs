import { Button } from "@/components/ui/button";
import { useDeleteTask } from "@/hooks/mutations/use-tasks.hook";
import { Column, Task } from "@prisma/client";
import { TrashIcon } from "lucide-react";

type DeleteTaskButtonProps = {
  columnId: Column["id"];
  taskId: Task["id"];
};

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  taskId,
  columnId,
}) => {
  const { mutate, isPending } = useDeleteTask(columnId);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => mutate({ id: taskId })}
    >
      <TrashIcon />
    </Button>
  );
};

export { DeleteTaskButton };
