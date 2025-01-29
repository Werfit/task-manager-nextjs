"use server";

import prisma from "@/lib/prisma";
import { getUser } from "../user/user.actions";
import {
  CreateTaskArgs,
  CreateTaskResponse,
  DeleteTaskArgs,
  DeleteTaskResponse,
  GetTasksArgs,
  GetTasksResponse,
  MoveTaskArgs,
  MoveTaskResponse,
} from "./task.dto";

export const getTasks = async (
  data: GetTasksArgs
): Promise<GetTasksResponse> => {
  const user = await getUser();

  return prisma.task.findMany({
    where: {
      column: {
        id: data.columnId,
        userId: user.id,
      },
    },
  });
};

export const createTask = async (
  data: CreateTaskArgs
): Promise<CreateTaskResponse> => {
  const user = await getUser();

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      column: {
        connect: {
          id: data.columnId,
          userId: user.id,
        },
      },
    },
  });
};

export const deleteTask = async (
  data: DeleteTaskArgs
): Promise<DeleteTaskResponse> => {
  const user = await getUser();

  await prisma.task.delete({
    where: {
      id: data.id,
      column: {
        userId: user.id,
      },
    },
  });
};

export const moveTask = async (
  data: MoveTaskArgs
): Promise<MoveTaskResponse> => {
  const user = await getUser();

  return prisma.task.update({
    data: {
      column: {
        connect: {
          id: data.targetColumnId,
          userId: user.id,
        },
      },
    },
    where: {
      id: data.id,
      column: {
        userId: user.id,
      },
    },
  });
};

export const getTasksAmount = async () => {
  const user = await getUser();

  return prisma.column.findMany({
    select: {
      name: true,
      color: true,
      _count: {
        select: { tasks: true },
      },
    },
    where: {
      userId: user.id,
    },
  });
};
