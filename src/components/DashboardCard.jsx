import { Link } from "react-router-dom";

function DashboardCard({

    icon,

    title,

    description,

    button,

    color,

    link

}) {

    return (

        <div className="dashboard-card">

            <div
                className="card-icon"
                style={{

                    background: color

                }}
            >

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

            <Link

                to={link}

                className="btn btn-dark"

            >

                {button}

            </Link>

        </div>

    );

}

export default DashboardCard;