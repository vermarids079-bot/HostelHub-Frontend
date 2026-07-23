import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserShield
} from "react-icons/fa";

import "../styles/login.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        role: "student"

    });

    const [showPassword, setShowPassword] = useState(false);

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

                "https://hostelhub-backend-sldr.onrender.com/api/auth/register",

                formData

            );

            Swal.fire({

                icon: "success",

                title: "Registration Successful",

                text: res.data.message,

                timer: 1800,

                showConfirmButton: false

            });

            navigate("/");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Registration Failed",

                text:

                    error.response?.data?.message ||

                    "Something went wrong."

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

                    Create Account 

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="custom-input">

                        <div className="icon-box">

                            <FaUser />

                        </div>

                        <input

                            type="text"

                            name="name"

                            placeholder="Enter Name"

                            value={formData.name}

                            onChange={handleChange}

                            required

                        />

                    </div>

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

                    <div className="custom-input">

                        <div className="icon-box">

                            <FaUserShield />

                        </div>

                        <select

                            name="role"

                            value={formData.role}

                            onChange={handleChange}

                        >

                            <option value="student">

                                Student

                            </option>

                            <option value="admin">

                                Admin

                            </option>

                        </select>

                    </div>

                    <div className="form-check">

                        <input

                            className="form-check-input"

                            type="checkbox"

                            id="showPassword"

                            checked={showPassword}

                            onChange={() =>

                                setShowPassword(

                                    !showPassword

                                )

                            }

                        />

                        <label

                            className="form-check-label"

                            htmlFor="showPassword"

                        >

                            Show Password

                        </label>

                    </div>

                    <button className="login-btn">

                        Register

                    </button>

                </form>

                <div className="register-link">

                    Already have an account?

                    <Link to="/">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;