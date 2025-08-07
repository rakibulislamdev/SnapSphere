import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/defaultAvatar.png";
import { BioIcon } from "../../utils/svg";
import { Link } from "react-router";

export default function ProfileInfo({ userProfile }) {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col md:flex-row mb-10">
      <div className="flex justify-items-end md:justify-start md:w-1/3 mb-6 md:mb-0 relative">
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-300 mx-auto">
          <img
            src={
              userProfile?.user?.avatar
                ? `${import.meta.env.VITE_STATIC_BASE_URL}/${
                    userProfile?.user?.avatar
                  }`
                : defaultAvatar
            }
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="md:w-2/3">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
          <h2 className="text-xl font-normal mb-4 sm:mb-0 sm:mr-4">
            {userProfile?.user?.name}
          </h2>
        </div>
        {auth?.user?._id === userProfile?.user?._id && (
          <div className="flex space-x-2">
            <Link
              to="/edit-profile"
              className="bg-gray-100 px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Edit profile
            </Link>
          </div>
        )}

        <div className="flex justify-center sm:justify-start space-x-8 mb-4 mt-2">
          <div>
            <span className="font-semibold">{userProfile?.posts?.length}</span>{" "}
            posts
          </div>
        </div>

        <div className="text-sm">
          <p>{userProfile?.user?.bio}</p>
          <p className="text-blue-900">
            <Link
              to={userProfile?.user?.website}
              target="_blank"
              className="flex items-center"
            >
              <BioIcon />
              {userProfile?.user?.website}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
