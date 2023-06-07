import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/style.module.scss";

function UserProfile() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [locations, setLocations] = useState([]);
    const [publicad, setPublicAd] = useState([]);
    const [localad, setLocalAd] = useState([]);

    const options = {
        url: "http://localhost:5000/user/self",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };

    const locationOptions = {
        url: "http://localhost:5000/locations",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };

    const publicAdOptions = {
        url: "http://localhost:5000/advertisement/public",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };

    const localAdOptions = {
        url: "http://localhost:5000/advertisement/local",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response, response2] = await Promise.all([
                    axios(options),
                    axios(locationOptions),
                ]);
                const userData = response.data;
                const locationData = response2.data;

                setData(userData);
                setLocations(locationData);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchData2 = async () => {
            try {
                const [response3, response4] = await Promise.all([
                    axios(publicAdOptions),
                    axios(localAdOptions),
                ]);
                const publicAdData = response3.data;
                const localAdData = response4.data;

                setPublicAd(publicAdData);
                setLocalAd(localAdData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        fetchData2();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.value}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.name}>{data.firstName}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Surname:</span>
                    <span className="surname">{data.lastName}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Email:</span>
                    <span className="email">{data.email}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Phone:</span>
                    <span className="phone">{data.phone}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Role:</span>
                    <span className="role">
            {data.isAdmin
                ? "Administrator"
                : data.userStatus === "premium"
                    ? "Premium User"
                    : "Regular User"}
          </span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Location:</span>
                    <span className="location">
            {locations
                .filter((location) => location.id === data.idlocation)
                .map((location) => location.city)}
          </span>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <h1>MY POSTS</h1>
                <br />
                <h2>Public posts</h2>
                <br />
                {publicad
                    .filter((item) => item.user_id === data.id)
                    .map((item) => (
                        <div className={styles.listing} key={item.id}>
                            <>
                                <h2>{item.title}</h2>
                                <p className={"date"}>{item.publishingDate}</p>
                                <span>Status: </span>
                                <p className={styles[item.status]}>{item.status}</p>
                                <Link
                                    to="/ad/edit"
                                    onClick={() => {
                                        sessionStorage.setItem("ArticleId", item.id);
                                        sessionStorage.setItem(
                                            "IsLocal",
                                            "location_id" in item ? "1" : "0"
                                        );
                                    }}
                                >
                                    <button className={styles.select_btn}>Edit</button>
                                </Link>
                            </>
                        </div>
                    ))}
                <br />
                <h2>Local posts</h2>
                <br />
                <div className={styles.listing}>
                    {localad
                        .filter((item) => item.user_id === data.id)
                        .map((item) => (
                            <div className={styles.listing} key={item.id}>
                                <>
                                    <h2>{item.title}</h2>
                                    <p className={"date"}>{item.publishingDate}</p>
                                    <span>Status: </span>
                                    <p className={styles[item.status]}>{item.status}</p>
                                    <Link
                                        to="/ad/edit"
                                        onClick={() => {
                                            sessionStorage.setItem("ArticleId", item.id);
                                            sessionStorage.setItem(
                                                "IsLocal",
                                                "location_id" in item ? "1" : "0"
                                            );
                                        }}
                                    >
                                        <button className={styles.select_btn}>Edit</button>
                                    </Link>
                                </>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default UserProfile;
