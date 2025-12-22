import CommentType from "../../components/CommentType";
import { Dropdown } from "../../components/DropdownMenu/Dropdown";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem";
import { updateCommentType } from "../../services/api";
import { useToast } from "../../contexts/MessageContext";

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
      <div className="comment-content-section">
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

        <span className="comment-text">{comment.content}</span>
      </div>

      {DropdownMore}
    </div>
  );
}
