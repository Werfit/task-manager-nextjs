import {
  createTask,
  deleteTask,
  getTasks,
  getTasksAmount,
  moveTask,
} from "@/actions/task/task.action";
import { GetTasksResponse, MoveTaskArgs } from "@/actions/task/task.dto";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const TasksKey = "tasks";

const getTasksQueryKey = (columnId: string | undefined) => [TasksKey, columnId];

export const getTasksOptions = (columnId?: string) =>
  queryOptions({
    queryKey: getTasksQueryKey(columnId),
    queryFn: () => getTasks({ columnId: columnId }),
  });

export const useGetTasks = (columnId: string) =>
  useQuery(getTasksOptions(columnId));

export const getTasksAmountOptions = () =>
  queryOptions({
    queryKey: [TasksKey],
    queryFn: () => getTasksAmount(),
  });

export const useGetTasksAmount = () => useQuery(getTasksAmountOptions());

export const useCreateTask = (columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getTasksQueryKey(columnId),
        }),
        queryClient.invalidateQueries({
          queryKey: [TasksKey],
        }),
      ]);
    },
  });
};

export const useDeleteTask = (columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getTasksQueryKey(columnId),
        }),
        queryClient.invalidateQueries({
          queryKey: [TasksKey],
        }),
      ]);
    },
  });
};

export const useDragTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoveTaskArgs & { currentColumnId: string }) =>
      moveTask({
        id: data.id,
        targetColumnId: data.targetColumnId,
      }),
    onMutate: async (variables) => {
      const currentColumnKey = getTasksQueryKey(variables.currentColumnId);
      const targetColumnKey = getTasksQueryKey(variables.targetColumnId);

      const previousCurrentColumnState =
        queryClient.getQueryData<GetTasksResponse>(currentColumnKey);
      const previousTargetColumnState =
        queryClient.getQueryData<GetTasksResponse>(targetColumnKey);

      const task = previousCurrentColumnState?.find(
        (task) => task.id === variables.id
      );

      await Promise.allSettled([
        queryClient.cancelQueries({
          queryKey: currentColumnKey,
        }),
        queryClient.cancelQueries({
          queryKey: targetColumnKey,
        }),
      ]);

      if (!task) {
        return {
          previousCurrentColumnState,
          previousTargetColumnState,
        };
      }

      queryClient.setQueryData<GetTasksResponse>(currentColumnKey, (old) =>
        (old ?? []).filter((task) => task.id !== variables.id)
      );

      queryClient.setQueryData<GetTasksResponse>(targetColumnKey, (old) => [
        ...(old ?? []),
        { ...task, columnId: variables.targetColumnId },
      ]);

      return {
        previousCurrentColumnState,
        previousTargetColumnState,
      };
    },
    onSuccess: async (response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getTasksQueryKey(variables.currentColumnId),
        }),
        queryClient.invalidateQueries({
          queryKey: getTasksQueryKey(response.columnId),
        }),
        queryClient.invalidateQueries({
          queryKey: [TasksKey],
        }),
      ]);
    },
    onError(_, variables, context) {
      queryClient.setQueryData(
        getTasksQueryKey(variables.currentColumnId),
        context?.previousCurrentColumnState
      );
      queryClient.setQueryData(
        getTasksQueryKey(variables.targetColumnId),
        context?.previousTargetColumnState
      );
    },
  });
};
