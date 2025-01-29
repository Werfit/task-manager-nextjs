import {
  createColumn,
  deleteColumn,
  getColumns,
} from "@/actions/column/column.actions";

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const ColumnsFnKey = "columns";

export const getColumnsOptions = () =>
  queryOptions({
    queryKey: [ColumnsFnKey],
    queryFn: getColumns,
  });

export const useGetColumns = () => useQuery(getColumnsOptions());

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ColumnsFnKey] });
    },
  });

  return mutation;
};

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ColumnsFnKey] });
    },
  });

  return mutation;
};
