import { Link, NavLink } from "react-router";
import photoBoothLogo from "../../assets/logo-2.svg";
import { CreatePost, Home, Notifications, Profile } from "../../utils/svg";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/defaultAvatar.png";
import useUserName from "../../hooks/useUserName";

export default function FloatingNavbar() {
  const { auth } = useAuth();
  const userName = useUserName();
  const user = auth?.user;

  const navbarLinks = [
    {
      path: "/",
      icon: <Home />,
      label: "Home",
    },
    {
      path: "/notifications",
      icon: <Notifications />,
      label: "Notifications",
    },
    {
      path: "/create-post",
      icon: <CreatePost />,
      label: "Create",
    },
    {
      path: `/profile/${user?._id}`,
      icon: <Profile />,
      label: "Profile",
    },
  ];

  return (
    <aside className="hidden floating-navbar border-gray-200 bg-white  border px-6 py-2 md:flex flex-col">
      <Link to="/" className="flex gap-2 items-center font-medium py-4 mb-8">
        <img
          src={photoBoothLogo}
          alt="PhotoBooth"
          className="h-6 object-contain"
        />
        <h2 className="text-lg">Photo Booth</h2>
      </Link>
      <ul className="space-y-8 flex-1">
        {navbarLinks.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-row items-center gap-2 ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : "text-zinc-800 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {user && (
        <div className="flex  justify-between">
          <Link to={`/profile/${user._id}`}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={
                    user?.avatar
                      ? `${import.meta.env.VITE_STATIC_BASE_URL}/${
                          user?.avatar
                        }`
                      : defaultAvatar
                  }
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <span className="font-semibold text-sm">{user?.name}</span>
                <p className="text-xs text-gray-500 leading-2">@{userName}</p>
              </div>
            </div>
          </Link>
          <Logout />
        </div>
      )}
    </aside>
  );
}
