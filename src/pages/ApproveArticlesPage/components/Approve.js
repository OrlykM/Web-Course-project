import styles from "../styles/styles.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Approve() {
    const navigate = useNavigate();
    const [publicData, setPublicData] = useState([]);
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const options = {
                    url: "http://localhost:5000/advertisement/public",
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: sessionStorage.getItem("Authorization"),
                    },
                };

                const result = await axios(options);
                setPublicData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchLocalData = async () => {
            try {
                const options = {
                    url: "http://localhost:5000/advertisement/local",
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: sessionStorage.getItem("Authorization"),
                    },
                };

                const result = await axios(options);
                setLocalData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPublicData();
        fetchLocalData();
    }, []);

    const handleApprove = (id, type) => {
        const options = {
            url: `http://localhost:5000/advertisement/${type}/${id}`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
            data: {
                status: "active",
            },
        };

        axios(options)
            .then(() => {
                navigate("/ad");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDecline = (id, type) => {
        const options = {
            url: `http://localhost:5000/advertisement/${type}/${id}`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
            data: {
                status: "closed",
            },
        };

        axios(options)
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className={styles.container}>
                {publicData.map((item, index) =>
                        item.status === "confirmed" ? (
                            <div className={styles.listing} key={index}>
                                <h2>{item.title}</h2>
                                <p>{item.about}</p>
                                <p className={"date"}>{item.publishingDate}</p>
                                <span>
                Status:
                                    {item.status === "active" ? (
                                        <p className={styles.active}> Active </p>
                                    ) : item.status === "closed" ? (
                                        <p className={styles.disabled}> Closed </p>
                                    ) : (
                                        <p className={styles.notconfirmed}> Need to approve </p>
                                    )}
              </span>
                                <button
                                    onClick={() => handleApprove(item.id, "public")}
                                    className={styles.approve_btn}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDecline(item.id, "public")}
                                    className={styles.close_btn}
                                >
                                    Decline
                                </button>
                            </div>
                        ) : null
                )}
                {localData.map((item, index) =>
                        item.status === "confirmed" ? (
                            <div className={styles.listing} key={index}>
                                <h2>{item.title}</h2>
                                <p>{item.about}</p>
                                <p className={"date"}>{item.publishingDate}</p>
                                <span>
                Status:
                                    {item.status === "active" ? (
                                        <p className={styles.active}> Active </p>
                                    ) : item.status === "closed" ? (
                                        <p className={styles.disabled}> Closed </p>
                                    ) : (
                                        <p className={styles.notconfirmed}> Need to approve </p>
                                    )}
              </span>
                                <button
                                    onClick={() => handleApprove(item.id, "local")}
                                    className={styles.approve_btn}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDecline(item.id, "local")}
                                    className={styles.close_btn}
                                >
                                    Decline
                                </button>
                            </div>
                        ) : null
                )}
            </div>
        </>
    );
}

export default Approve;
