import React, { useState, useEffect } from "react";
import axios from "axios";
// import home6 from "../images/home6.jpg";
// import home2 from "../images/home2.jpg";
// import home3 from "../images/home3.jpg";
// import home4 from "../images/home4.jpg";
// import home5 from "../images/home5.jpg";

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/?category=${category}`)
                setPosts(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();

    }, [category]);

    // const posts = [
    //     {
    //         id: 1,
    //         title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
    //         desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
    //         image: home6
    //     },
    //     {
    //         id: 2,
    //         title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
    //         desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
    //         image: home2
    //     },
    //     {
    //         id: 3,
    //         title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
    //         desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
    //         image: home3
    //     },
    //     {
    //         id: 4,
    //         title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
    //         desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
    //         image: home4
    //     },
    //     {
    //         id: 5,
    //         title: "Labore culpa nulla amet est veniam dolor ullamco reprehenderit laboris.",
    //         desc: "Mollit cillum adipisicing nulla laborum sunt pariatur laboris nisi incididunt. Duis non ea labore occaecat nisi ad. Fugiat ex quis adipisicing Lorem veniam adipisicing ipsum ad.",
    //         image: home5
    //     }
    //];
    return (
        <div className="menu">
            <h1>Other posts you might like</h1>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src= {`/upload/${post.image}`} alt=""/>
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))}            
        </div>
    )
}


export default Menu