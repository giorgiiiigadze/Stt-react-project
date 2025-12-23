import { useState, useRef, Activity } from "react";
import { useAudioComments } from "../../../hooks/useAudioComments";
import { deleteComment as deleteCommentAPI } from "../../../services/api";
import { useToast } from "../../../contexts/MessageContext";

import { Dropdown } from "../../DropdownMenu/Dropdown";
import { DropdownItem } from "../../DropdownMenu/DropdownItem";

import CommentsList from "../../../assets/Comments/CommentsList";
import CommentItem from "../../../assets/Comments/CommentItem";

import useMediaQuery from "../../../hooks/MediaQuery";
import "../../../css/AudioTabs/Tabs/Comments.css";

export default function AudioComments({ audioId }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a comment.."
            disabled={isSubmitting}
            onInput={(e) => {
              const el = e.target;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isSubmitting && text.trim()) {
                  handleSubmit(e);
                }
              }
            }}
          />
          <div className="form-footer">
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
          </div>
        </form>
      </header>
      <div className="comments-list-container">
        <CommentsList
          statusFilter="Not started"
          commentListStatus={"Not Started"}
          comments={comments}
          loading={loading}
          renderItem={(comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              DropdownMore={
                <Dropdown
                  align="left"
                  width={200}
                  trigger={() => (
                    <button className="comment-menu-button">•••</button>
                  )}
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
              }
            />
          )}
        />
        <CommentsList
          statusFilter="In Progress"
          commentListStatus={"In Progress"}
          comments={comments}
          loading={loading}
          renderItem={(comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              DropdownMore={
                <Dropdown
                  align="left"
                  width={200}
                  trigger={() => (
                    <button className="comment-menu-button">•••</button>
                  )}
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
              }
            />
          )}
        /> 
        <CommentsList
          statusFilter="Done"
          commentListStatus={"Done"}
          comments={comments}
          loading={loading}
          renderItem={(comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              DropdownMore={
                <Dropdown
                  align="left"
                  width={200}
                  trigger={() => (
                    <button className="comment-menu-button">•••</button>
                  )}
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
              }
            />
          )}
        />     
      </div>

    </div>
  );
}
