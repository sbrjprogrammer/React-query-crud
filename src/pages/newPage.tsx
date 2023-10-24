import { useNewPost } from "../customHook/newPost";
import axios from "axios";

type Post = {
    id: number;
    Name:string;
    title: string;
    body: string;
  };

export const MyComponent = () => {
    const queryKey = "posts";

  const { data, isLoading, error } = useNewPost(["zone"], async () => {
    const { data } = await axios.get<Post[]>(
      "http://localhost:5000/zone"
    );
    return data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.Name}</li>
      ))}
    </ul>
  );
};