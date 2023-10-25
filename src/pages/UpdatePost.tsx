import { useUpdateData } from "../customHook/useUpdatePost";
import axios from "axios";

type Post = {
  id: number;
  Name: string;
  title: string;
  body: string;
};

export const MyComponent = () => {
  const mutationKey = "update-post";

  const { mutate,  error } = useUpdateData<Post>([mutationKey], async (data:any) => {
    const response = await axios.put(`http://localhost:5000/posts/${data.id}`, data);

    return response.data;
  });

  const handleUpdate = async (post: Post) => {
    await mutate(post);
  };

  // ...
};