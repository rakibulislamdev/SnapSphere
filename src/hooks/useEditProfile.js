import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useAuth } from "./useAuth";
import { useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.png";
import { useEffect } from "react";

export default function useEditProfile() {
  const { api } = useAxios();
  const { auth, setAuth } = useAuth();
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState(null);

  const { mutate: userImageMutation } = useMutation({
    mutationFn: async (fromData) => {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/me/avatar`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   setAuth({ ...auth, user: response.data });
      if (response.status === 200) return response.data;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...data,
        },
      }));
      queryClient.invalidateQueries(["userProfileInfo"]);
    },
  });

  const { mutate: userProfileMutation } = useMutation({
    mutationFn: async (fromData) => {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/me`,
        fromData
      );
      //   setAuth({ ...auth, user: response.data });
      if (response.status === 200) return response.data;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...data,
        },
      }));
      queryClient.invalidateQueries(["userProfileInfo"]);
    },
  });

  const handleProfile = async (fromData, reset) => {
    const prevUserInfo = auth?.user;
    const updatedUserInfo = {};

    if (fromData.website !== "" && fromData.website !== prevUserInfo?.website) {
      updatedUserInfo.website = fromData.website;
    } else {
      updatedUserInfo.website = prevUserInfo?.website;
    }

    if (fromData.bio !== "" && fromData.bio !== prevUserInfo.bio) {
      updatedUserInfo.bio = fromData.bio;
    } else {
      updatedUserInfo.bio = prevUserInfo.bio;
    }

    if (fromData.gender !== "" && fromData.gender !== prevUserInfo.gender) {
      updatedUserInfo.gender = fromData.gender;
    } else {
      updatedUserInfo.gender = prevUserInfo.gender;
    }

    userProfileMutation(updatedUserInfo);

    reset();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      userImageMutation(formData);

      const imgURl = URL.createObjectURL(file);
      setPreviewImage(imgURl);
    }
  };

  const avatar = previewImage
    ? previewImage
    : !auth?.user?.avatar
    ? defaultAvatar
    : `${import.meta.env.VITE_STATIC_BASE_URL}/${auth?.user?.avatar}`;

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return {
    auth,
    avatar,
    previewImage,
    handleProfile,
    handleAvatarChange,
  };
}
