import '../css/TranscriptionSkeletons.css'

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TranscriptionSkeletons(){
    return (
        <div className="transcriptions-skeleton-container">
            <Skeleton 
                width={200} 
                height={8}
                style={{ borderRadius: '22px' }}
                baseColor="#292929"
                highlightColor="#515151ff"
            />

            <Skeleton 
                width={'100%'} 
                height={8}
                count={8}
                style={{ borderRadius: '22px' }}
                baseColor="#292929"
                highlightColor="#515151ff"
            />
        </div>
    )
}