import { useState } from "react";

export default function Caption({ post }) {
  const [isExpand, setIsExpand] = useState(false);

  const maxLength = 100;
  const caption = post.caption;

  return (
    <div className="px-3 mt-2">
      <p className="text-sm">
        <span className="font-semibold mr-1">
          {isExpand ? caption : caption.slice(0, maxLength)}
        </span>
        {/* <span className="caption-text mr-2.5"> #AD</span> */}
        {caption.length > maxLength && !isExpand && (
          <span className="text-gray-500">...</span>
        )}
        {caption.length > maxLength && (
          <button
            onClick={() => setIsExpand((prev) => !prev)}
            className="cursor-pointer text-gray-500 text-sm"
          >
            {isExpand ? "Show less" : "Show more"}
          </button>
        )}
      </p>
    </div>
  );
}
