import styles from "../styles/style.module.scss"

import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
function Landing()
{
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const options = {
        url: 'http://localhost:5000/advertisement/public',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(options);
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <>
            <section>
                    <h2>Featured Listings</h2>
                    <ul className={styles.featured_listings}>
                        {data.map((item, index) => (
                            <div className={styles.listing}>
                                <h2>{item.title}</h2>
                                <p>{item.about}</p>
                                <p className={"date"}>{item.publishingDate}</p>
                                <Link to={"/ad/show"} >
                                    <button className={styles.select_btn}
                                            onClick={() =>{sessionStorage.setItem("ArticleId", item.id)}}>Show</button></Link>
                            </div>
                        ))}
                    </ul>
            </section>
        </>
    );
}
export default Landing