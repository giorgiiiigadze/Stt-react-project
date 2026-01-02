import "../css/TranscriptionSkeletons.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TranscriptionSkeletons() {
  return (
    <div className="transcription-container transcriptions-skeleton-container">
      <div className="transcription-item">
        
        <div className="transcription-tag">
          <Skeleton
            width={160}
            height={14}
            baseColor="#292929"
            highlightColor="#515151"
          />
        </div>

        <div className="skeleton-paragraph">
          <Skeleton width="92%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
          <Skeleton width="88%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
          <Skeleton width="95%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
        </div>

        <div className="skeleton-paragraph">
          <Skeleton width="90%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
          <Skeleton width="85%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
          <Skeleton width="70%" height={14} 
            baseColor="#292929"
            highlightColor="#515151"/>
        </div>
      </div>
    </div>
  );
}
