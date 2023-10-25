import { useDeleteData } from "../customHook/useDeletePost";
import axios from "axios";

type Post = {
  id: number;
  Name: string;
  title: string;
  body: string;
};

export const MyComponent = () => {
  const mutationKey = "delete-post";

  const { mutate,  error } = useDeleteData<Post>([mutationKey], async (id:number) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
  });


  const handleDelete = async (id: number) => {
    await mutate(id);
  };

  // ...
};