import CommentType from "../../components/CommentType";
import { Dropdown } from "../../components/DropdownMenu/Dropdown";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem";
import { updateCommentType } from "../../services/api";
import { useToast } from "../../contexts/MessageContext";

import '../../css/Comments/CommentItem.css';

export default function CommentItem({ comment, DropdownMore }) {
  const { addToast } = useToast();

  async function changeType(type, close) {
    close();
    if (type === comment.comment_type) return;

    try {
      await updateCommentType(comment.id, type);
      comment.comment_type = type;
      addToast("Comment type updated", "success");
    } catch {
      addToast("Failed to update type", "error");
    }
  }

  return (
    <div className="comment">
      <div className="comment-header-section">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <Dropdown
            align="left"
            width={200}
            trigger={() => <CommentType type={comment.comment_type} size={24} />}
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
        <span className="comment-text">{comment.content}</span>
      </div>
    </div>
  );
}
