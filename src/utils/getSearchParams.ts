export const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");

  return v;
};
