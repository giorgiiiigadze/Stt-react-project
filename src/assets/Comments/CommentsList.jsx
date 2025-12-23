import '../../css/Comments/CommentsList.css';

export default function CommentsList({
  commentListStatus,
  comments,
  loading,
  renderItem,
  statusFilter,
}) {
  const filteredComments = comments.filter(
    (comment) => comment.comment_status === statusFilter
  );

  return (
    <div className="comment-list">
      <div className="comment-list-header">
        <span className={`comment-status status-${statusFilter.replace(/\s/g, "-")}`}>
          {commentListStatus}
        </span>
      </div>

      {loading ? (
        <p>Loading comments...</p>
      ) : filteredComments.length === 0 ? (
        <div className="comment">
          <span
            className="comment-text"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            No comment yet
          </span>
        </div>
      ) : (
        filteredComments.map(renderItem)
      )}
    </div>
  );
}
