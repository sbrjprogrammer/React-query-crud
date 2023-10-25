import { useMutation } from "@tanstack/react-query";

export function useUpdateData<T>(mutationKey: string[], mutationFn: (data: T) => Promise<T>) {
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