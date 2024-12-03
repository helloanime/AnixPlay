import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // disable refetching on window focus
      retry: 1, // retry failed queries once
      staleTime: 5 * 60 * 1000, // data stays fresh for 5 minutes
    },
  },
});
