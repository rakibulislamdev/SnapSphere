import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

export default function MorePosts({ postDetails }) {
  const { api } = useAxios();

  const { data: morePosts, isLoading } = useQuery({
    queryKey: ["morePosts", postDetails?.user?._id],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${
          postDetails?.user?._id
        }`
      );

      return response.data;
    },

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const otherPosts = morePosts?.posts?.filter(
    (post) => post._id !== postDetails?._id
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-8 mx-auto max-w-5xl">
      <h2 className="text-sm text-gray-500 font-normal mb-4">
        {morePosts?.posts?.length > 1
          ? "More posts from"
          : "No more posts from"}

        <span className="font-semibold text-black ml-2">
          {postDetails?.user?.name}
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-1">
        {otherPosts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_STATIC_BASE_URL}/${post.image}`}
                  alt={post.caption}
                  className="w-full grid-image"
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
