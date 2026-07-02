import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

import { FaEnvelope, FaLock } from "react-icons/fa";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                "https://hostelhub-backend-sldr.onrender.com/api/auth/login",

                formData

            );

            localStorage.setItem(

                "token",

                res.data.token

            );

            localStorage.setItem(

                "userInfo",

                JSON.stringify(res.data.user)

            );

            Swal.fire({

                icon: "success",

                title: "Welcome!",

                text: res.data.message,

                timer: 1800,

                showConfirmButton: false

            });

            if (res.data.user.role === "admin") {

                navigate("/admin");

            }

            else {

                navigate("/dashboard");

            }

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Login Failed",

                text:

                    error.response?.data?.message ||

                    "Invalid Email or Password"

            });

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="brand">

                    <h1>🏠 HostelHub</h1>

                    <p>

                        Smart Hostel Management System

                    </p>

                </div>

                <h2 className="welcome-title">

                    Welcome Back 👋

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="custom-input">

                        <div className="icon-box">

                            <FaEnvelope />

                        </div>

                        <input

                            type="email"

                            name="email"

                            placeholder="Enter Email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="custom-input">

                        <div className="icon-box">

                            <FaLock />

                        </div>

                        <input

                            type={

                                showPassword ?

                                "text"

                                :

                                "password"

                            }

                            name="password"

                            placeholder="Enter Password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-check">

                        <input

                            type="checkbox"

                            className="form-check-input"

                            id="showPassword"

                            checked={showPassword}

                            onChange={() =>

                                setShowPassword(

                                    !showPassword

                                )

                            }

                        />

                        <label

                            htmlFor="showPassword"

                            className="form-check-label"

                        >

                            Show Password

                        </label>

                    </div>

                    <button

                        className="login-btn"

                    >

                        Login

                    </button>

                </form>

                <div className="register-link">

                    New User?

                    <Link to="/register">

                        Register Here

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;

                       