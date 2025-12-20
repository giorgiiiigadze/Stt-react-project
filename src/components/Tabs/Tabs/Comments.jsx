import { useState } from "react";
import { useAudioComments } from "../../../hooks/useAudioComments";
import { updateCommentType } from "../../../services/api";
import { useToast } from "../../../contexts/MessageContext";

import { deleteComment as deleteCommentAPI } from "../../../services/api";

import { Dropdown } from "../../DropdownMenu/Dropdown";
import { DropdownItem } from "../../DropdownMenu/DropdownItem";

import CommentType from "../../CommentType";

import useMediaQuery from '../../../hooks/MediaQuery'

import "../../../css/AudioTabs/Tabs/Comments.css";

export default function AudioComments({ audioId }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

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
      addToast("Comment added", "success");
      setText("");
    } catch (err) {
      if (err?.response?.status === 429) {
        addToast("Way too many comments. Try again later.", "error");
      } else {
        addToast("Failed to add comment", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(commentId) {
    try {
      await deleteCommentAPI(commentId);
      removeComment(commentId);
      addToast("Comment deleted", "success");
    } catch (err) {
      if (err?.status === 429) {
        addToast("Way too many request was sent.", "error");
      } else {
        addToast("Failed to delete comment", "error");
      }
    }
  }

  return (
    <div className="comments-container">
      <header className="comments-container-header">
        <span>Comments</span>
      </header>

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

      <div className="comment-list">
        <div className="comment-list-header">
          
        </div>

        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-content-section">
                <Dropdown
                  align="left"
                  trigger={() => (
                    <CommentType type={comment.comment_type} size={24} />
                  )}
                  width={200}
                >
                  {({ close }) => (
                    <>
                      {["idea", "issue", "edit", "note", "task"].map(type => (
                        <DropdownItem
                          key={type}
                          onClick={async () => {
                            close();

                            if (type === comment.comment_type) return;

                            try {
                              await updateCommentType(comment.id, type);

                              comment.comment_type = type;

                              addToast("Comment type updated");
                            } catch {
                              addToast("Failed to update type", "error");
                            }
                          }}
                        >
                          {type}
                        </DropdownItem>
                      ))}
                    </>
                  )}
                </Dropdown>
                <span className="comment-text">{comment.content}</span>
              </div>

              <Dropdown
                align="left"
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
                width={200}
              >
                {({ close }) => (
                  <>
                    <DropdownItem onClick={close}>
                      Edit Comment
                    </DropdownItem>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
