import { useState, useEffect } from 'react';
import tourism from '../api/tourism';

const useFetchSpots = (pageNumber, city) => {
    const [loading, setLoading] = useState(true);
    const [spots, setSpots] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setSpots([]);
    }, [city]);

    useEffect(() => {
        setLoading(true);
        setErrorMsg('');
        tourism.get(`/v2/Tourism/ScenicSpot${city === 'all' ? '' : `/${city}`}`, {
            params: {
                $top: 30,
                $skip: (pageNumber - 1) * 30
            }
        }).then(res => {
            setSpots(prevSpots => [...prevSpots, ...res.data]);
            setHasMore(res.data.length > 0);
            setLoading(false);
        }).catch(e => {
            setErrorMsg(`Error: ${e.response.statusText}`);
        });
    }, [pageNumber, city]);

    return { loading, spots, hasMore, errorMsg };
};

export default useFetchSpots;
