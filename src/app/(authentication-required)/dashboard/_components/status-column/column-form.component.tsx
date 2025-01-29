"use client";

import { ColorPicker } from "@/components/color-picker/color-picker.component";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateColumn } from "@/hooks/mutations/use-columns.hook";
import { useToast } from "@/hooks/use-toast.hook";
import {
  CreateColumnSchema,
  createColumnSchema,
} from "@/shared/schemas/column.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type ColumnFormProps = {
  onSubmit: () => void;
};

const ColumnForm: React.FC<ColumnFormProps> = ({ onSubmit }) => {
  const form = useForm<CreateColumnSchema>({
    resolver: zodResolver(createColumnSchema),
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  const { mutateAsync: create, isPending } = useCreateColumn();
  const { toast } = useToast();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await create({
              name: data.name,
              color: data.color,
            });
            onSubmit();
          } catch (error_) {
            const error = error_ as Error;
            toast({
              title: "Column Creation Error",
              description: error.message,
              variant: "destructive",
            });
          }
        })}
        className="flex flex-col gap-y-2"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E. g. TODO" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ColorPicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>
    </Form>
  );
};

export { ColumnForm };
