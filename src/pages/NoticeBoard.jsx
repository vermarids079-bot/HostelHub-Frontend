import { useEffect, useState } from "react";
import axios from "axios";

function NoticeBoard() {

    const [notices, setNotices] = useState([]);

    useEffect(() => {

        fetchNotices();

    }, []);

    const fetchNotices = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/notices/all"

            );

            setNotices(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                📢 Hostel Notices

            </h2>

            {

                notices.length === 0 ?

                <div className="alert alert-info">

                    No Notices Available

                </div>

                :

                notices.map((notice)=>(

                    <div
                        className="card shadow p-4 mb-3"
                        key={notice._id}
                    >

                        <h4>

                            {notice.title}

                        </h4>

                        <p>

                            {notice.message}

                        </p>

                        <small>

                            {

                                new Date(

                                    notice.createdAt

                                ).toLocaleString()

                            }

                        </small>

                    </div>

                ))

            }

        </div>

    );

}


export default NoticeBoard;