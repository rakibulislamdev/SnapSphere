import useAxios from "../../hooks/useAxios";
import ProfileInfo from "./ProfileInfo";
import MyPosts from "./MyPosts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function ProfilePage() {
  const { api } = useAxios();
  const { id } = useParams();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${id}`
      );
      if (response.status === 200) {
        return response.data;
      }
    },

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <div className="profile-container">
        <ProfileInfo userProfile={userProfile} />
        <MyPosts userProfile={userProfile} />
      </div>
    </div>
  );
}
