import { QueryCache, QueryClient } from "react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

export default queryClient;
