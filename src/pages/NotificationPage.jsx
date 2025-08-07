import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import defaultAvatar from "../assets/defaultAvatar.png";
import getTimeDateYear from "../utils/getTimeDateYear";
import getNotificationSection from "../utils/getNotificationSection";
import { Link } from "react-router";

export default function NotificationPage() {
  const { api } = useAxios();
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/notifications`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["notifications"]);
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/notifications/${notificationId}/read`
      );
      queryClient.invalidateQueries(["notifications"]);
      return response.data;
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markNotificationAsUnread = async (notificationId) => {
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/notifications/${notificationId}/unread`
      );
      queryClient.invalidateQueries(["notifications"]);
      return response.data;
    } catch (error) {
      console.error("Failed to mark notification as unread:", error);
    }
  };

  const groupedNotifications = notifications?.reduce((acc, notification) => {
    const section = getNotificationSection(notification.createdAt);
    if (!section) return acc;
    if (!acc[section]) acc[section] = [];
    acc[section].push(notification);
    return acc;
  }, {});

  return (
    <div className="notifications-container">
      <header className="sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </header>

      {isLoading && <p className="text-center py-4">Loading...</p>}

      {isError && (
        <p className="text-center text-red-500 py-4">Something went wrong.</p>
      )}

      {["Today", "Yesterday", "This Week"].map(
        (sectionLabel) =>
          groupedNotifications?.[sectionLabel] && (
            <div key={sectionLabel}>
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 sticky top-[56px] z-10">
                <h2 className="text-base font-semibold">{sectionLabel}</h2>
              </div>

              {groupedNotifications[sectionLabel].map((notification) => (
                <Link
                  key={notification._id}
                  to={`/posts/${notification?.postId}`}
                  onClick={() => markNotificationAsRead(notification?._id)}
                >
                  <div
                    className={`notifications-list ${
                      notification?.isRead ? "bg-white" : "bg-blue-100"
                    }`}
                  >
                    <div className="notification-item flex items-center justify-between p-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
                          <img
                            src={
                              !notification?.fromUser?.avatar
                                ? defaultAvatar
                                : `${import.meta.env.VITE_STATIC_BASE_URL}/${
                                    notification?.fromUser?.avatar
                                  }`
                            }
                            alt={notification?.fromUser?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 mr-3">
                          <p className="text-sm">
                            <span className="font-semibold">
                              {notification?.fromUser?.name}
                            </span>{" "}
                            {notification.type === "like"
                              ? "liked your photo."
                              : "commented on your photo."}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {getTimeDateYear(notification.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {notification?.isRead && (
                          <button
                            className="text-xs text-blue-600 cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              markNotificationAsUnread(notification._id);
                            }}
                          >
                            Mark as Unread
                          </button>
                        )}

                        <div className="w-11 h-11 rounded overflow-hidden">
                          <img
                            src={
                              !notification?.fromUser?.avatar
                                ? defaultAvatar
                                : `${import.meta.env.VITE_STATIC_BASE_URL}/${
                                    notification?.fromUser?.avatar
                                  }`
                            }
                            alt="Post thumbnail"
                            className="post-thumbnail w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
      )}

      {notifications?.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No notifications found.
        </p>
      )}
    </div>
  );
}
