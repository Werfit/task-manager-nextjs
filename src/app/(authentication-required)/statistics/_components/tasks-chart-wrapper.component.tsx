import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getColumnsOptions } from "@/hooks/mutations/use-columns.hook";
import { TasksChartFetcher } from "./task-chart-fetcher.component";

const TaskChart = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getColumnsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksChartFetcher />
    </HydrationBoundary>
  );
};

export { TaskChart };
