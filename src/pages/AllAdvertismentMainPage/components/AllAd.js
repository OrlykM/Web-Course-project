import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/style.module.scss';

function AllAd() {
    const [data, setData] = useState([]);
    const [localdata, setLocalData] = useState([]);
    const [mixedData, setMixedData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const apiUrlPublic = 'http://localhost:5000/advertisement/public';
    const apiUrlLocal = 'http://localhost:5000/advertisement/local';

    const options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('Authorization'),
        },
    };

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!isDataLoaded) {
                const [result, result2] = await Promise.allSettled([
                    axios.get(apiUrlPublic, options),
                    axios.get(apiUrlLocal, options),
                ]);
                if (result.status === 'fulfilled' && result2.status === 'fulfilled') {
                    setData(result.value.data);
                    setLocalData(result2.value.data);
                    setMixedData(result.value.data.concat(result2.value.data));
                    setIsDataLoaded(true);
                }
            }
        };
        fetchData();
    }, [isDataLoaded]);

    useEffect(() => {
        shuffle(mixedData);
    }, [mixedData]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mixedData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {currentItems.map((item, index) => (
                <div className={styles.listing} key={item.id}>
                    {item.status === 'active' && (
                        <>
                            <h2>{item.title}</h2>
                            <p>{item.about}</p>
                            <p className="date">{item.publishingDate}</p>
                            <Link
                                to="/ad/show"
                                onClick={() => {
                                    sessionStorage.setItem('ArticleId', item.id);
                                    sessionStorage.setItem('IsLocal', 'location_id' in item ? '1' : '0');
                                }}
                            >
                                <button className={styles.select_btn}>Show</button>
                            </Link>
                        </>
                    )}
                </div>
            ))}

            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(mixedData.length / itemsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default AllAd;
