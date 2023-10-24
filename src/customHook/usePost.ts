import axios from "axios";
import { useQuery, queryOptions } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function usePosts() {
  const queryOptions = {
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  };

  return useQuery(queryOptions);
}