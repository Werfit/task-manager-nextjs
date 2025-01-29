export type ServerPageProps<
  Params extends Record<string, string> = Record<string, string>,
  SearchParams extends Record<string, string> = Record<string, string>
> = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
