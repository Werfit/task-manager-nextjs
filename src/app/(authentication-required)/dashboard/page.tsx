import { CreateColumnButton } from "./_components/dashboard/create-column-button.component";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ColumnList } from "./_components/status-column/column-list.component";
import { getColumnsOptions } from "@/hooks/mutations/use-columns.hook";
import { DragPreviewProvider } from "./_components/_context/dashboard.context";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getColumnsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-full min-w-max items-stretch gap-x-4">
        <DragPreviewProvider>
          <ColumnList />
        </DragPreviewProvider>

        <CreateColumnButton className="w-[20rem] min-w-[calc((100%-2rem)/3)]" />
      </div>
    </HydrationBoundary>
  );
};
export default Page;
