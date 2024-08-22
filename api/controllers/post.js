const db = require('../db');
const jwt = require('jsonwebtoken');

const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts";
    
    db.query(q, [req.query.category], (err, results) => {
        if(err) return res.status(500).json(err);
        
        return res.status(200).json(results);    
    });
}


const getPost = (req, res) => {
    const q = "SELECT p.id, username, title, description, p.image, u.image AS user_image, category, date FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?"

    db.query(q, [req.params.id], (err, results) => {
        if(err) return res.status(500).json(err);

        return res.status(200).json(results[0]);    
    })
}

const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json('Not authorized to delete this post')
        
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json('Invalid token!')

        const q = 'INSERT INTO posts(title, description, image, category, date, user_id) VALUES (?)'

        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err,results) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json('Post has been created');
        })
    });
}

const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json('Not authorized to delete this post')
        
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json('Invalid token!')

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE id = ? AND user_id = ?"
        
        db.query(q, [postId, userInfo.id], (err, results) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json('Post has been deleted!');
        });
    });    
}

const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json('Not authorized to update this post this post')
        
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json('Invalid token!')

        const q = 'UPDATE posts SET title=?, description=?, image=?, category=? WHERE id = ? AND user_id = ?'

        const postId = req.params.id
        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category
        ]

        db.query(q, [...values, postId, userInfo.id], (err,results) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json('Post has been updated');
        })
    });
}


module.exports = {addPost, getPost, getPosts, deletePost, updatePost}