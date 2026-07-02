import Navbar from "./Navbar";
import "../styles/dashboard.css";

function PageLayout({

    title,

    children

}){

    return(

        <>

            <Navbar/>

            <div className="page-wrapper">

                <h1 className="page-title">

                    {title}

                </h1>

                {children}

            </div>

        </>

    )

}

export default PageLayout;