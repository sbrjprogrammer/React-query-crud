import { usePostData } from "../customHook/usePostData";
import { FormEvent } from "react";
import axios from "axios";

type Post = {
  id: number;
  Name:string;
  title: string;
  body: string;
};

export const MyComponent = () => {
  const mutationKey = "new-post";

  const { mutate,   error } = usePostData<Post>([mutationKey], async (data: Post) => {
    const response = await axios.post<Post>(
      "http://localhost:5000/posts",
      data
    );

    return response.data;
  });

  const handlePostSubmit = async (event: FormEvent<HTMLFormElement>) => {

    // const post = {
    //     title: (event.target as HTMLInputElement).title,
    //     body: (event.target as HTMLInputElement).body,
    //     Name: (event.target as HTMLInputElement).Name,
      
    // };
  
  

    // await mutate(post);
  };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handlePostSubmit}>
      <input type="text" name="name" />
      <input type="text" name="title" />
      <input type="text" name="body" />
      <input type="text" name="Name" />
      <button type="submit">Submit</button>
    </form>
  );
};