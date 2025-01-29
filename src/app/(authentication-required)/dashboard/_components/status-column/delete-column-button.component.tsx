"use client";

import { Button } from "@/components/ui/button";
import { useDeleteColumn } from "@/hooks/mutations/use-columns.hook";

import { Column } from "@prisma/client";
import { TrashIcon } from "lucide-react";

type DeleteColumnButtonProps = Pick<Column, "id">;

const DeleteColumnButton: React.FC<DeleteColumnButtonProps> = ({ id }) => {
  const { mutate, isPending } = useDeleteColumn();
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => mutate({ id })}
    >
      <TrashIcon />
    </Button>
  );
};

export { DeleteColumnButton };
