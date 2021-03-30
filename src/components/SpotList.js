import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import SpotItem from './SpotItem';
import useFetchSpots from '../hooks/useFetchSpots';

const SpotList = props => {
    const city = props.match.params.city ? props.match.params.city : 'all';
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

        // close observer
        if (observer.current) {
            observer.current.disconnect();
        }

        // construct observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        }, [0.75]);

        // start observer
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    // const renderList = ({ index, style }) => {
    //     if (index + 1 === spots.length) {
    //         return (
    //             <SpotItem
    //                 lastItemRef={lastSpotItemRef}
    //                 key={spots[index].ID}
    //                 style={style}
    //                 spot={spots[index]}
    //             />
    //         );
    //     } else {
    //         return (
    //             <SpotItem
    //                 key={spots[index].ID}
    //                 style={style}
    //                 spot={spots[index]}
    //             />
    //         );
    //     }
    // };

    const renderList = () => spots.map((spot, index) => {
        if (index + 1 === spots.length) {
            return (
                <SpotItem
                    lastItemRef={lastSpotItemRef}
                    key={spot.ID}
                    spot={spot}
                />
            );
        } else {
            return (
                <SpotItem
                    key={spot.ID}
                    spot={spot}
                />
            );
        }
    })

    const renderStatus = () => {
        if (errorMsg) {
            return (
                <div>{errorMsg}</div>
            );
        }

        if (loading) {
            return (
                <div>Loading...</div>
            );
        }

        if (pageNumber > 1 && !hasMore) {
            return (
                <div>No more...</div>
            );
        }
    };

    return (
        <div className="ui relaxed divided list">
            {/* <List
                width={600}
                height={200}
                itemSize={20}
                itemData={spots}
                itemCount={spots.length}
            >
                {renderList}
            </List> */}
            {renderList()}
            {renderStatus()}
        </div>
    );
};

export default SpotList;
