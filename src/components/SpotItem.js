import Loader from './Loader';
import HasMore from './HasMore';

const SpotItem = ({ spot, lastSpotItemRef, loading, hasMore, style }) => {
    const renderStatus = () => {
        if (loading) return <Loader />;
        if (!hasMore) return <HasMore />;
    };

    return (
        <div style={style} ref={lastSpotItemRef}>
            <h2 style={{ marginBottom: '5px', fontSize: '16px' }}>
                {spot.Name}
            </h2>
            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {spot.Description || '無相關介紹'}
            </p>
            {lastSpotItemRef && renderStatus()} {/* last spot should render status */}
        </div>
    );
};

export default SpotItem;
