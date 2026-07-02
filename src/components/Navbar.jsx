import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(

        localStorage.getItem("userInfo")

    );

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("userInfo");

        navigate("/");

    };

    return (

        <nav className="dashboard-navbar">

            <div className="logo">

                🏠 HostelHub

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <span
                    style={{
                        color: "white",
                        marginRight: "20px",
                        fontWeight: "bold"
                    }}
                >

                    👋 Welcome,

                    {

                        user?.name ||

                        "User"

                    }

                </span>

                <button

                    className="logout-btn"

                    onClick={logout}

                >

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;