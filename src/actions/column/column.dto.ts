import { Column } from "@prisma/client";

export type GetColumnsArgs = void;

export type GetColumnsResponse = Column[];

export type CreateColumnArgs = Pick<Column, "name" | "color">;

export type CreateColumnResponse = Column;

export type DeleteColumnArgs = Pick<Column, "id">;

export type DeleteColumnResponse = void;
