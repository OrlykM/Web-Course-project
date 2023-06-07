import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "../styles/style.module.scss";

function UserSettings() {
    const navigate = useNavigate();
    const { register, getValues } = useForm();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    url: "http://localhost:5000/user/self",
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: sessionStorage.getItem("Authorization"),
                    },
                };

                const result = await axios(options);
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(getValues("email"), getValues("phone"));

        const email = getValues("email");
        const phone = getValues("phone");

        if (!email && !phone) {
            navigate("/user");
            return;
        }

        const options1 = {
            url: "http://localhost:5000/user/self",
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
            data: {
                email: email,
                phone: phone,
            },
        };

        const encodedCredentials = btoa(`${email}:${data.password}`);
        sessionStorage.setItem("Authorization", `Basic ${encodedCredentials}`);

        axios(options1)
            .then(() => {
                navigate("/user");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (e) => {
        const options = {
            url: "http://localhost:5000/user/self",
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };

        if (window.confirm("Are you sure you want to delete your account? It can't be restored.")) {
            axios(options)
                .then(() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" placeholder={data.firstName} readOnly />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" placeholder={data.lastName} readOnly />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder={data.email} {...register("email")} />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder={data.phone} {...register("phone")} />

                    <input type="submit" value="Save changes" />
                    <button className={styles.delete_btn} onClick={handleDelete}>
                        Delete Account
                    </button>
                    <br />
                    <br />
                    <br />
                </form>
            </div>
        </>
    );
}

export default UserSettings;
