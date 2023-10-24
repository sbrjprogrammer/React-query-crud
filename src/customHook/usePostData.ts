import { useMutation } from "@tanstack/react-query";

export function usePostData<T>(mutationKey: string[], mutationFn: (data: T) => Promise<T>) {
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