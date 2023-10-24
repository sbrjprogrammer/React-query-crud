import { useQuery } from "@tanstack/react-query";



export function useNewPost<T>(queryKey:string[], queryFn: () => Promise<T>) {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    data,
    isLoading,
    error,
  };
}