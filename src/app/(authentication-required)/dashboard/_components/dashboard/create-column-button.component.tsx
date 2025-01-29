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
import { ColumnForm } from "../status-column/column-form.component";
import { useState } from "react";

type CreateColumnButtonProps = {
  className?: string;
};

const CreateColumnButton: React.FC<CreateColumnButtonProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a column</DialogTitle>
          <DialogDescription>
            Fill in the fields below and add a new column
          </DialogDescription>

          <ColumnForm onSubmit={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { CreateColumnButton };
