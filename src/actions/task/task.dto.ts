import { Task } from "@prisma/client";

export type GetTasksArgs = {
  columnId: Task["columnId"] | undefined;
};
export type GetTasksResponse = Task[];

export type CreateTaskArgs = Pick<Task, "title" | "description" | "columnId">;
export type CreateTaskResponse = Task;

export type DeleteTaskArgs = Pick<Task, "id">;
export type DeleteTaskResponse = void;

export type MoveTaskArgs = {
  id: Task["id"];
  targetColumnId: Task["columnId"];
};
export type MoveTaskResponse = Task;
