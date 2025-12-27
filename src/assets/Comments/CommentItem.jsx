import { useState, useRef } from "react";
import CommentType from "../../components/CommentType";
import { Dropdown } from "../../components/DropdownMenu/Dropdown";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem";
import { updateCommentType, editComment } from "../../services/api";
import { useToast } from "../../contexts/MessageContext";

import "../../css/Comments/CommentItem.css";

export default function CommentItem({
    comment,
    DropdownMore,
    commentItemColor,
  }) {
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  function lightenHex(hex, amount = 0.08) {
    const num = parseInt(hex.replace("#", ""), 16);

    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.min(255, Math.round(r + (255 - r) * amount));
    g = Math.min(255, Math.round(g + (255 - g) * amount));
    b = Math.min(255, Math.round(b + (255 - b) * amount));

    return `rgb(${r}, ${g}, ${b})`;
  }

  async function changeType(type, close) {
    close();
    if (type === comment.comment_type) return;

    try {
      await updateCommentType(comment.id, type);
      comment.comment_type = type;
    } catch {
      addToast("Failed to update type", "error");
    }
  }

  async function saveEdit() {
    if (!isEditing) return;

    const text = contentRef.current?.innerText.trim();

    if (!text) {
      contentRef.current.innerText = comment.content;
      setIsEditing(false);
      return;
    }

    if (text === comment.content) {
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      await editComment(comment.id, text);
      comment.content = text;
      addToast("Comment updated", "success");
    } catch {
      contentRef.current.innerText = comment.content;
      addToast("Failed to update comment", "error");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

  function cancelEdit() {
    if (contentRef.current) {
      contentRef.current.innerText = comment.content;
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <div
      className="comment"
      style={{
        backgroundColor: commentItemColor,
        border: isEditing
          ? "1px solid #ffffff"
          : `1px solid ${lightenHex(commentItemColor, 0.06)}`,
      }}
    >
      <div className="comment-header-section">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Dropdown
            align="left"
            width={200}
            trigger={() => (
              <CommentType type={comment.comment_type} size={24} />
            )}
          >
            {({ close }) => (
              <>
                {["idea", "issue", "edit", "note", "task"].map((type) => (
                  <DropdownItem
                    key={type}
                    onClick={() => changeType(type, close)}
                  >
                    {type}
                  </DropdownItem>
                ))}
              </>
            )}
          </Dropdown>

          <span className="comment-created-at">
            {new Date(comment.created_at).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {DropdownMore}
      </div>

      <div className="content">
        <span
          ref={contentRef}
          className={`comment-text ${isEditing ? "editing" : ""}`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          spellCheck={false}
          onClick={() => {
            if (!isEditing) setIsEditing(true);
          }}
          
          onBlur={() => {
            if (isEditing) saveEdit();
          }}

          onKeyDown={handleKeyDown}
        >
          {comment.content}
        </span>
      </div>
    </div>
  );
}
