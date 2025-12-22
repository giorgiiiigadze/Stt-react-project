import { useState } from "react";
import { useAudioComments } from "../../../hooks/useAudioComments";
import { deleteComment as deleteCommentAPI } from "../../../services/api";
import { useToast } from "../../../contexts/MessageContext";

import { Dropdown } from "../../DropdownMenu/Dropdown";
import { DropdownItem } from "../../DropdownMenu/DropdownItem";

import CommentItem from "../../../assets/Comments/CommentItem";

import useMediaQuery from "../../../hooks/MediaQuery";
import "../../../css/AudioTabs/Tabs/Comments.css";

export default function AudioComments({ audioId }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { comments, addComment, removeComment, loading } = useAudioComments(audioId);
  const { addToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!text.trim()) {
      addToast("Comment can't be empty", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await addComment(text);
      setText("");
      addToast("Comment added", "success");
    } catch (err) {
      addToast(
        err?.response?.status === 429
          ? "Way too many comments. Try again later."
          : "Failed to add comment",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(commentId) {
    try {
      await deleteCommentAPI(commentId);
      removeComment(commentId);
      addToast("Comment deleted", "success");
    } catch {
      addToast("Failed to delete comment", "error");
    }
  }

  return (
    <div className="comments-container">
      <header className="comments-container-header">
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment.."
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill={text ? "#e3e3e3" : "#ada9a39a"}
            >
              <path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z" />
            </svg>
          </button>
        </form>
      </header>

      <div className="comment-list">
        <div className="comment-list-header">
          <span>Not started</span>
        </div>

        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <div className="comment">
            <span onClick={() => console.log("No comments span clicked")} className="comment-text" style={{display: 'flex', alignItems: 'center'}}>No comment yet<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg></span>
          </div>
        ) : (
          comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                DropdownMore={
                  <Dropdown
                    align="left"
                    width={200}
                    trigger={() => (
                      <button className="comment-menu-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                        </svg>
                      </button>
                    )}
                  >
                    {({ close }) => (
                      <>
                        <DropdownItem onClick={close}>Edit Comment</DropdownItem>
                        <DropdownItem
                          danger
                          onClick={() => {
                            close();
                            handleDelete(comment.id);
                          }}
                        >
                          Delete Comment
                        </DropdownItem>
                      </>
                    )}
                  </Dropdown>
              }/>            
          ))
        )}
      </div>
    </div>
  );
}
