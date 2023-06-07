import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/style.module.scss";

const Register = () => {
    let navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const onSubmit = (data) => {
        // Check if the city exists
        axios
            .get(`http://localhost:5000/locations?name=${data.location}`)
            .then((response) => {
                if (response.data.length > 0) {
                    // City exists, create the user with the existing city ID
                    createUserWithLocation(data, response.data[0].id);
                } else {
                    // City does not exist, create the city and then create the user with the new city ID
                    createLocationAndUser(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const createUserWithLocation = (data, locationId) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            userStatus: "regular",
            isAdmin: 0,
            idlocation: locationId,
        };

        axios
            .post("http://localhost:5000/user", userData)
            .then((res) => {
                if (res.status === 200) {
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const createLocationAndUser = (data) => {
        const locationData = {
            name: data.location,
        };

        axios
            .post("http://localhost:5000/location/add", locationData)
            .then((res) => {
                if (res.status === 200) {
                    const locationId = res.data.id;
                    createUserWithLocation(data, locationId);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="container">
                <h2>Create an Account</h2>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="firstName"
                        {...register("firstName", { required: true })}
                    />
                    {errors.firstName && <span>This field is required</span>}

                    <label htmlFor="surname">Surname*</label>
                    <input
                        type="text"
                        id="surname"
                        name="lastName"
                        {...register("lastName", { required: true })}
                    />
                    {errors.lastName && <span>This field is required</span>}

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <span>This field is required</span>
                    )}
                    {errors.email?.type === "pattern" && (
                        <span>Invalid email address</span>
                    )}

                    <label htmlFor="password">Password*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        {...register("password", {
                            required: true,
                            pattern: passwordRegex,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <span>This field is required</span>
                    )}
                    {errors.password?.type === "pattern" && (
                        <span>
              Password must contain at least 8 characters, including uppercase
              letters and numbers
            </span>
                    )}

                    <label htmlFor="password-confirmation">Confirm Password*</label>
                    <input
                        type="password"
                        id="password-confirmation"
                        name="password-confirmation"
                        {...register("passwordConfirm", {
                            required: true,
                            validate: (value) =>
                                value === getValues("password") || "Passwords do not match",
                        })}
                    />
                    {errors.passwordConfirm && (
                        <span>{errors.passwordConfirm.message}</span>
                    )}

                    <label htmlFor="phone">Phone Number*</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        {...register("phone", {
                            required: true,
                            pattern: /^[0-9]{10}$/,
                        })}
                    />
                    {errors.phone?.type === "required" && (
                        <span>This field is required</span>
                    )}
                    {errors.phone?.type === "pattern" && (
                        <span>
              Phone number must be 10 digits long and contain only numbers
            </span>
                    )}

                    <label htmlFor="city">City*</label>
                    <input
                        type="text"
                        id="city"
                        name="location"
                        {...register("location", { required: true })}
                    />
                    {errors.location && <span>This field is required</span>}

                    <input type="submit" value="Create Account" />
                    <span>
            Already have an account? <Link to={"/login"}>Log In</Link>
          </span>
                </form>
            </div>
        </>
    );
};

export default Register;
