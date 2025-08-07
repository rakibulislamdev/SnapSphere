import { Link } from "react-router";

export default function MyPosts({ userProfile }) {
  return (
    <section>
      <h3 className="font-semibold text-lg mb-4">Posts</h3>

      <div className="grid grid-cols-3 gap-1">
        {userProfile?.posts &&
          [...userProfile.posts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_STATIC_BASE_URL}/${
                      post.image
                    }`}
                    alt="Post"
                    className="w-full grid-image"
                  />
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
