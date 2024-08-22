//Write.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {

    const state = useLocation().state
    const [value, setValue] = useState(state?.description || '')
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || '');

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/upload', formData)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const imageUrl = file ? await upload() : state?.image;


        try {
            state 
            ?   await axios.put(`/posts/${state.id}`, {
                    title,
                    description:value,
                    category,
                    image: imageUrl
                })
            :   await axios.post(`/posts/`, {
                title,
                description:value,
                category,
                image: imageUrl,
                date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            });
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} /> 
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id='file' name='file' onChange={e=>setFile(e.target.files[0])}/>
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a Draft</button>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cart">
                        <input type="radio" checked={category==='art'} name='cart' value="art" id='art' onChange={e=>setCategory(e.target.value)}/>
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cart">
                        <input type="radio" checked={category==='science'} name='cart' value="science" id='science' onChange={e=>setCategory(e.target.value)} />
                        <label htmlFor="art">Science</label>
                    </div>    
                    <div className="cart">
                        <input type="radio" checked={category==='technology'} name='cart' value="technology" id='technology' onChange={e=>setCategory(e.target.value)}/>
                        <label htmlFor="art">Technology</label>
                    </div>
                    <div className="cart">
                        <input type="radio" checked={category==='cinema'} name='cart' value="cinema" id='cinema' onChange={e=>setCategory(e.target.value)}/>
                        <label htmlFor="art">Cinema</label>
                    </div>
                    <div className="cart">
                        <input type="radio" checked={category==='design'} name='cart' value="design" id='design' onChange={e=>setCategory(e.target.value)}/>
                        <label htmlFor="art">Design</label>
                    </div>
                    <div className="cart">
                        <input type="radio" checked={category==='food'} name='cart' value="food" id='food' onChange={e=>setCategory(e.target.value)}/>
                        <label htmlFor="art">Food</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write