"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/mutations/use-tasks.hook";
import { useToast } from "@/hooks/use-toast.hook";
import {
  CreateTaskSchema,
  createTaskSchema,
} from "@/shared/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column } from "@prisma/client";
import { useForm } from "react-hook-form";

type TaskFormProps = {
  columnId: Column["id"];
  onSubmit: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ columnId, onSubmit }) => {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const { mutateAsync, isPending } = useCreateTask(columnId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await mutateAsync({
              title: data.title,
              description: data.description,
              columnId,
            });
            onSubmit();
          } catch (error_) {
            const error = error_ as Error;
            toast({
              title: "Task Creation Error",
              description: error.message,
              variant: "destructive",
            });
          }
        })}
        className="flex flex-col gap-y-2"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="E. g. Come up with a plan to make the Earth obey you!"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="E. g. First step is to..." />
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

export { TaskForm };
