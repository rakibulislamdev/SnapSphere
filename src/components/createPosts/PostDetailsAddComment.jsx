import Field from "../common/Field";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/defaultAvatar.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmojiIcon } from "../../utils/svg";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PostDetailsAddComment({ post, onEditComment }) {
  const { api } = useAxios();
  const { auth } = useAuth();
  const [comment, setComment] = useState(onEditComment?.text ?? "");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (onEditComment) setComment(onEditComment.text ?? "");
  }, [onEditComment]);

  const { mutate: submitComment, isLoading } = useMutation({
    mutationFn: async (comment) => {
      if (onEditComment) {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/comment/${
            onEditComment._id
          }`,
          comment
        );
        return response.data;
      } else {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post._id}/comment`,
          comment
        );
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postDetails", post._id]);
      toast.success("Comment posted successfully");
      setComment("");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const addComment = (e) => {
    if (!comment.trim()) return;
    if (e.key === "Enter") submitComment({ text: comment });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-3 flex items-center">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
        <img
          src={
            !auth?.user?.avatar
              ? defaultAvatar
              : `${import.meta.env.VITE_STATIC_BASE_URL}/${auth?.user?.avatar}`
          }
          alt={auth?.user?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <Field>
          <input
            disabled={isLoading}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            value={comment}
            name="comment"
            id="comment"
            type="text"
            placeholder="Add a comment..."
            className="text-sm w-full outline-none"
          />
        </Field>
        <EmojiIcon className="text-gray-400" />
      </div>
    </div>
  );
}
