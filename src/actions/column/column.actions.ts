"use server";

import prisma from "@/lib/prisma";

import {
  CreateColumnArgs,
  CreateColumnResponse,
  DeleteColumnArgs,
  DeleteColumnResponse,
  GetColumnsResponse,
} from "./column.dto";
import { getUser } from "../user/user.actions";

export const getColumns = async (): Promise<GetColumnsResponse> => {
  const user = await getUser();

  return prisma.column.findMany({
    where: {
      userId: user.id,
    },
  });
};

export const createColumn = async ({
  name,
  color,
}: CreateColumnArgs): Promise<CreateColumnResponse> => {
  const user = await getUser();

  return prisma.column.create({
    data: {
      name,
      color,
      userId: user.id,
    },
  });
};

export const deleteColumn = async ({
  id,
}: DeleteColumnArgs): Promise<DeleteColumnResponse> => {
  const user = await getUser();

  await prisma.column.delete({
    where: {
      id,
      userId: user.id,
    },
  });
};
