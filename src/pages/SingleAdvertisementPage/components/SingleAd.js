import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/style.module.scss";
import { Link, useNavigate } from "react-router-dom";

function SingleAd() {
    let navigate = useNavigate();
    const article_id = sessionStorage.getItem("ArticleId");
    const is_local = sessionStorage.getItem("IsLocal");

    const options = {
        url: `http://localhost:5000/advertisement/public/${article_id}`,
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };
    const options_local = {
        url: `http://localhost:5000/advertisement/local/${article_id}`,
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("Authorization"),
        },
    };
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [location, setLocation] = useState([]);
    const [currentuser, setCurrentUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res;
            if (is_local === "1") {
                res = await axios(options_local);
            } else {
                res = await axios(options);
            }

            const options2 = {
                url: `http://localhost:5000/category/${res.data.id_category}`,
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("Authorization"),
                },
            };
            const options3 = {
                url: `http://localhost:5000/user/${res.data.user_id}`,
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("Authorization"),
                },
            };
            const ress = await axios(options2);
            const resss = await axios(options3);

            const options4 = {
                url: `http://localhost:5000/location/${resss.data.idlocation}`,
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("Authorization"),
                },
            };
            const options5 = {
                url: `http://localhost:5000/user/self`,
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("Authorization"),
                },
            };
            const ressss = await axios(options4);
            const resssss = await axios(options5);

            setData(res.data);
            setCategory(ress.data);
            setUserData(resss.data);
            setLocation(ressss.data);
            setCurrentUser(resssss.data);
        };

        fetchData();
    }, []);

    let path;
    if (data.photoUrl !== null) {
        path = "http://127.0.0.1:3000/media/" + data.photoUrl;
    }

    const handleDelete = async () => {
        const options6 = {
            url: `http://localhost:5000/advertisement/public/${article_id}`,
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };
        const options7 = {
            url: `http://localhost:5000/advertisement/local/${article_id}`,
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };
        if (is_local === "1") {
            await axios(options7);
        } else {
            await axios(options6);
        }
        sessionStorage.removeItem("ArticleId");
        sessionStorage.removeItem("IsLocal");
        navigate("/ad");
    };

    const handleDisable = async () => {
        const options8 = {
            url: `http://localhost:5000/advertisement/public/${article_id}`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
            data: { status: "closed" },
        };
        const options9 = {
            url: `http://localhost:5000/advertisement/local/${article_id}`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
            data: { status: "closed" },
        };
        if (is_local === "1") {
            await axios(options9);
        } else {
            await axios(options8);
        }
        sessionStorage.removeItem("ArticleId");
        sessionStorage.removeItem("IsLocal");
        navigate("/ad");
    };

    return (
        <>
            <div className={styles.container}>
                {(() => {
                    if (userdata.id === currentuser.id) {
                        if (data.status === "active") {
                            return (
                                <>
                  <span>
                    Status:<p className={styles.active}> Active </p>
                  </span>
                                </>
                            );
                        }
                        if (data.status === "closed") {
                            return (
                                <>
                  <span>
                    Status:<p className={styles.disabled}> Closed </p>
                  </span>
                                </>
                            );
                        }
                        if (data.status === "confirmed") {
                            return (
                                <>
                  <span>
                    Status:<p className={styles.notconfirmed}> Confirmed </p>
                  </span>
                                </>
                            );
                        }
                    }
                })()}

                <h1 className={styles.h1}>{data.title}</h1>
                <div className={styles.date}>Published {data.publishingDate}</div>
                <div className={styles.author}>
                    Author: {userdata.firstName} {userdata.lastName}
                </div>
                <div className={styles.author}>Phone: {userdata.phone}</div>
                <div className={styles.city}>City: {location.city}</div>
                <img src={path} alt={"Image"} className={styles.img} />
                <div className={styles.p}>Description: {data.about}</div>
                {(() => {
                    if (userdata.id === currentuser.id) {
                        return (
                            <>
                                <div>
                                    <h3> Author instruments</h3>
                                    <button
                                        className={styles.disable_btn}
                                        onClick={handleDisable}
                                    >
                                        Disable
                                    </button>
                                    <button className={styles.delete_btn} onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        );
                    }
                })()}
            </div>
        </>
    );
}

export default SingleAd;
