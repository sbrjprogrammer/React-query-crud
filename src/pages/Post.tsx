// Posts.tsx
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePosts } from "../customHook/usePost"; // Import your custom hook
interface PostsProps {
    setPostId: React.Dispatch<React.SetStateAction<number>>;
  }
type Post = {
  id: number;
  title: string;
  body: string;
};



function Posts() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts() as {
    status: "loading" | "success" | "error" | "idle";
    data: Post[];
    error: Error;
    isFetching: boolean;
  };

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data?.map((post: Post) => (
                <p key={post.id}>
                  {/* <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                  
                  </a> */}
                  {post.title}
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
