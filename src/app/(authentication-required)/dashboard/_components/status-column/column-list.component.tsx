"use client";

import { StatusColumn } from "./status-column.component";
import { useGetColumns } from "@/hooks/mutations/use-columns.hook";

const ColumnList = () => {
  const { data: columns } = useGetColumns();

  return (
    <>
      {(columns ?? []).map((column) => (
        <StatusColumn
          key={column.id}
          column={column}
          className="w-[20rem] min-w-[calc((100%-2rem)/3)]"
        />
      ))}
    </>
  );
};

export { ColumnList };
