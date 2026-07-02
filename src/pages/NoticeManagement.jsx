import { useState, useEffect } from "react";
import axios from "axios";

function NoticeManagement() {

    const [title, setTitle] = useState("");

    const [message, setMessage] = useState("");

    const [notices, setNotices] = useState([]);

    useEffect(() => {

        fetchNotices();

    }, []);

    const fetchNotices = async () => {

        try {

            const res = await axios.get(

                "https://hostelhub-backend-sldr.onrender.com/api/notices/all"

            );

            setNotices(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const addNotice = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                "https://hostelhub-backend-sldr.onrender.com/api/notices/add",

                {

                    title,

                    message

                }

            );

            alert(res.data.message);

            setTitle("");

            setMessage("");

            fetchNotices();

        }

        catch (error) {

            alert("Unable to post notice.");

        }

    };

    const deleteNotice = async (id) => {

        try {

            const res = await axios.delete(

                `https://hostelhub-backend-sldr.onrender.com/api/notices/delete/${id}`

            );

            alert(res.data.message);

            fetchNotices();

        }

        catch (error) {

            alert("Unable to delete notice.");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                📢 Notice Management

            </h2>

            <form
                onSubmit={addNotice}
                className="card shadow p-4 mb-5"
            >

                <div className="mb-3">

                    <label>

                        Title

                    </label>

                    <input

                        className="form-control"

                        value={title}

                        onChange={(e)=>

                            setTitle(e.target.value)

                        }

                        required

                    />

                </div>

                <div className="mb-3">

                    <label>

                        Message

                    </label>

                    <textarea

                        className="form-control"

                        rows="4"

                        value={message}

                        onChange={(e)=>

                            setMessage(e.target.value)

                        }

                        required

                    />

                </div>

                <button className="btn btn-primary">

                    Post Notice

                </button>

            </form>

            {

                notices.map((notice)=>(

                    <div
                        className="card shadow p-3 mb-3"
                        key={notice._id}
                    >

                        <h4>

                            {notice.title}

                        </h4>

                        <p>

                            {notice.message}

                        </p>

                        <button

                            className="btn btn-danger"

                            onClick={()=>

                                deleteNotice(notice._id)

                            }

                        >

                            Delete

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default NoticeManagement;