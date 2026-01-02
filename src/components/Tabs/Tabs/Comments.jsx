import { useState, useRef, useEffect } from 'react';
import { useAudioComments } from '../../../hooks/useAudioComments';
import { useUser } from '../../../contexts/UserContext';
import { deleteComment as deleteCommentAPI } from "../../../services/api";
import { useToast } from '../../../contexts/MessageContext';

import CommentStatus from '../../CommentStatus';

import { DropdownItem } from '../../DropdownMenu/DropdownItem'
import {Dropdown} from '../../DropdownMenu/Dropdown'

import ShowOnce from '../../showOnce'

import ProfilePicture from '../../Profile/Pfp';

import '../../../css/AudioTabs/Tabs/Comments.css';

export default function AudioComments({ audioId }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, userLoading } = useUser();
  const { comments, addComment, removeComment, loading } = useAudioComments(audioId);

  const { addToast } = useToast()

  const textareaRef = useRef(null);

  async function handleSubmit(e) {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!text.trim()) {
      addToast("Comment can't be empty", 'error');
      return;
    }

    if (text.length > 500) {
      addToast("Comment must have fewer characters than 500", 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await addComment(text);
      setText('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      addToast('Comment added', 'success');
    } catch (err) {
      addToast(
        err?.response?.status === 429
          ? 'Way too many comments. Try again later.'
          : 'Failed to add comment',
        'error'
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

  function timeAgo(date) {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }


  return (
    <div className="comments-container">
      <div className="comments">
        <div className="comment-textarea">
          <div className="comments-textarea-input">
          <textarea
            className="textarea-input"
            placeholder="Leave a note/comment.."
            value={text}
            ref={textareaRef}
            disabled={isSubmitting}
            rows={1}
            onChange={(e) => {
              setText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          </div>
          <div className="comments-textarea-actions">
            <ShowOnce
                storageKey="audio_comments_upload_v1"
                text='
                        Change the volume of your voice while
                        recording audio to find the perfect balance 
                        and make sure your recording is clear and easy to understand.
                    '
                position="top"
            ></ShowOnce>
              <button className="submit-button" onClick={handleSubmit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>
          </div>
        </div>

        <div className="comments-list">
          {loading && (
            <div className="comment muted">Loading comments…</div>
          )}

          {!loading && comments.length === 0 && (
            <div className="comment muted">
              No comments yet — add the first one
            </div>
          )}

          {!loading &&
            comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="comment-header">
                  <div className="comment-profile">
                    <ProfilePicture padding={10} borderRadius={4} />
                    <span>{userLoading ? "Loading..." : `${user?.username}`}</span>
                    <span className='date-span'>
                      {timeAgo(comment.created_at)}
                    </span>
                  </div>
                  <div className='audio-edit-actions'>
                    <CommentStatus status={comment.status} padding={8}/>
                    <Dropdown
                      align="right"
                      width={200}
                      trigger={() => (
                      <button
                        className="comment-more-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </button>
                      )}
                    >
                      {({ close }) => (
                        <>
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
                </div>

                <div className="comments-content">
                  <div className="content">
                    <span>{comment.content}</span>
                  </div>
                </div>
                
                <footer className="comment-footer">

                </footer>
              </div>
            ))}
        </div>
      </div>

      <div className="comments-sidebar">
        <div className="sidebar-box">
          <h4>Comments</h4>
          <span>{comments.length} total</span>
        </div>

        <div className="sidebar-box">
          <button
            onClick={() =>
              document
                .querySelector('.comments-list')
                ?.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            Jump to top
          </button>
        </div>
      </div>
    </div>
  );
}
