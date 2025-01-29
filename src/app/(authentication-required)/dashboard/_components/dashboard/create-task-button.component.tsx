"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

import { RefObject, useState } from "react";
import { TaskForm } from "../task/task-form.component";
import { Column } from "@prisma/client";

type CreateTaskButtonProps = {
  columnId: Column["id"];
  className?: string;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
  columnId,
  className,
  triggerRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={className}
          ref={triggerRef}
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <DialogDescription>
            Fill in the fields below and add a new task
          </DialogDescription>

          <TaskForm columnId={columnId} onSubmit={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { CreateTaskButton };
