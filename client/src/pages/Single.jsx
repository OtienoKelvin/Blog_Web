import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Menu from "../components/menu";
// import single2 from "../images/single2.jpg";
// import single1 from "../images/single1.jpg";
import del from "../images/del.png";
import edit from "../images/edit.png";
import moment from "moment"
import { AuthContext } from "../context/authContext";

const Single = () => {
    const [post, setPost] = useState({});

    const location = useLocation()

    const postId = location.pathname.split('/')[2]

    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`)
                setPost(res.data)
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();

    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`)
            navigate('/')
        } catch(err) {
            console.log(err);
        }        
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        
        return doc.body.textContent
    };

    return (
        <div className="single">
            <div className="content">
                <img src= {`/upload/${post?.image}`} alt=""/>
                <div className="user">
                    {post.user_image && <img src= {post?.user_image} alt=""/>}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.username && <div className="edit">
                        <Link to={`/Write?edit=2`} state={post}>
                            <img src= {edit} alt=""/>
                        </Link>
                        <img onClick={handleDelete} src={del} alt=""/>
                    </div>}
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.description)}</p>

            </div>
            <Menu category={post.category}/>
        </div>
    )
}

export default Single