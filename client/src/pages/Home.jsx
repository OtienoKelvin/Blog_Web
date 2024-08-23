import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import home6 from "../images/home6.jpg";
// import home2 from "../images/home2.jpg";
// import home3 from "../images/home3.jpg";
// import home4 from "../images/home4.jpg";
// import home5 from "../images/home5.jpg";

const Home = () => {
    const [posts, setPosts] = useState([]);

    const category = useLocation().search;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${category}`)
                setPosts(res.data)
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();

    }, [category])
    //const posts = [
        // {
        //     id: 1,
        //     title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
        //     desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
        //     image: home6
        // },
        // {
        //     id: 2,
        //     title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
        //     desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
        //     image: home2
        // },
        // {
        //     id: 3,
        //     title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
        //     desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
        //     image: home3
        // },
        // {
        //     id: 4,
        //     title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
        //     desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
        //     image: home4
        // },
        // {
        //     id: 5,
        //     title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
        //     desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
        //     image: home5
        // }
    //];

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        
        return doc.body.textContent
    };

    return (
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`/upload/${post.image}`} alt={`Post ${post.id}`} /> {/* Correctly render the image */}
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}> {/* Add link to the post */}
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.description)}</p>
                            <button>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
