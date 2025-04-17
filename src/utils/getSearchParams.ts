export const getSearchParams = (query: string) => {
  const params = new URLSearchParams(window.location.search);
  const searchParams = params.get(query);

  if (!searchParams) {
    new Error("Not Found SearchParams");
  }

  return searchParams;
};
