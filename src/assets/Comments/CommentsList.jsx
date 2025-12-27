import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import '../../css/Comments/CommentsList.css';

export default function CommentsList({
    commentListStatus,
    comments,
    loading,
    renderItem,
    statusFilter,
    commentListColor
  }) {
  const filteredComments = comments.filter(
    (comment) => comment.comment_status === statusFilter
  );

  return (
    <div className="comment-list" style={{ backgroundColor: commentListColor}}>
      <div className="comment-list-header">
        <span className={`comment-status status-${statusFilter.replace(/\s/g, "-")}`}>
          {commentListStatus}
        </span>
      </div>

      {loading ? (
        <div className="comment">
          <span
            className="comment-text"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Skeleton 
              width={120} 
              height={6}
              style={{ borderRadius: '200px' }}
              baseColor="#292929"
              highlightColor="#515151ff"
            />
          </span>
        </div>
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
