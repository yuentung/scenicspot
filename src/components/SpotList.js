import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import SpotItem from './SpotItem';
import Loader from './Loader';
import HasMore from './HasMore';
import ErrorMessage from './ErrorMessage';
import {
    resetSpots,
    fetchSpots,
    setCity,
    resetPageNumber,
    incrementPageNumber
} from '../actions';

const SpotList = ({
    match,
    spots,
    pageNumber,
    errorMessage,
    loading,
    resetSpots,
    fetchSpots,
    setCity,
    resetPageNumber,
    incrementPageNumber,
    hasMore
}) => {
    const city = match.params.city || 'All';

    useEffect(() => {
        setCity(city);
        resetSpots();
        fetchSpots(city, 1);
        resetPageNumber();
    }, [city]);

    const observer = useRef();
    const lastSpotItemRef = useCallback(node => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchSpots(city, pageNumber + 1);
                incrementPageNumber();
            }
        }, [1]);

        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    const renderStatus = style => {
        if (loading) return <Loader style={style} />;

        if (!hasMore) return <HasMore style={style} />;
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
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            {spots.length ? (
                <List
                    height={window.innerHeight - 100 - (errorMessage && 100)}
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

const mapStateToProps = state => {
    return {
        spots: Object.values(state.spots),
        city: state.city,
        pageNumber: state.pageNumber,
        errorMessage: state.errorMessage,
        loading: state.loading,
        hasMore: state.hasMore
    };
};

export default connect(mapStateToProps, {
    resetSpots,
    fetchSpots,
    setCity,
    resetPageNumber,
    incrementPageNumber
})(SpotList);
