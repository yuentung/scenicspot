const SpotItem = ({ spot, lastItemRef, style }) => {
    return (
        <div style={style} ref={lastItemRef}>
            <h2 style={{ marginBottom: '5px', fontSize: '16px' }}>{spot.Name}</h2>
            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{spot.Description || '無相關介紹'}</p>
        </div>
    );
};

export default SpotItem;
