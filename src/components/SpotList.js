import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import SpotItem from './SpotItem';
import useFetchSpots from '../hooks/useFetchSpots';

const SpotList = props => {
    const city = props.match.params.city || 'All';
    const [pageNumber, setPageNumber] = useState(1);
    const { loading, spots, hasMore, errorMsg } = useFetchSpots(pageNumber, city);

    useEffect(() => {
        setPageNumber(1);
    }, [city]);

    const observer = useRef();
    const lastSpotItemRef = useCallback(node => {
        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        }, [1]);

        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    const renderStatus = style => {
        if (loading) {
            return (
                <div style={style}>
                    <div className="ui active centered inline loader" style={style}></div>
                </div>
            );
        }

        if (!hasMore) {
            return (
                <div style={style}>
                    <div className="ui info message" style={{ marginRight: '5px' }}>
                        已經沒有資料摟
                    </div>
                </div>
            );
        }
    };

    const renderList = ({ index, style }) => {
        if (index + 1 === spots.length) {
            return (
                <React.Fragment>
                    <SpotItem
                        lastItemRef={lastSpotItemRef}
                        key={spots[index].ID}
                        style={style}
                        spot={spots[index]}
                    />
                    {renderStatus(style)}
                </React.Fragment>
            );
        } else {
            return (
                <SpotItem
                    key={spots[index].ID}
                    style={style}
                    spot={spots[index]}
                />
            );
        }
    };

    return (
        <React.Fragment>
            {errorMsg && <div className="ui red message">{errorMsg}</div>}
            {spots.length ? (
                <List
                    height={window.innerHeight - 100}
                    itemSize={60}
                    itemData={spots}
                    itemCount={spots.length}
                >
                    {renderList}
                </List>
            ) : null}
        </React.Fragment>
    );
};

export default SpotList;
