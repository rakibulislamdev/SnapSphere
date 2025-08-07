import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/defaultAvatar.png";

export default function UserInfo() {
  const { auth } = useAuth();
  const avatar = !auth?.user?.avatar
    ? defaultAvatar
    : `${import.meta.env.VITE_STATIC_BASE_URL}/${auth?.user?.avatar}`;

  return (
    <div className="flex items-center p-4 border-b">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
        <img
          src={avatar}
          alt={auth?.user?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="ml-3 font-semibold text-sm">{auth?.user?.name}</span>
    </div>
  );
}
