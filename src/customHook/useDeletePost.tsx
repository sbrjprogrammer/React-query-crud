import { useMutation } from "@tanstack/react-query";

export function useDeleteData<T>(mutationKey: string[], mutationFn: (id: number) => Promise<void>) {
  const { mutate,  error } = useMutation({
    mutationKey,
    mutationFn,
  });

  return {
    mutate,
    // isLoading,
    error,
  };
}