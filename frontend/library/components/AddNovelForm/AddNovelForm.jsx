"use client";
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function AddNovelForm({postNovel}) {
    const [formData, setFormData] = useState({title: '', author: '', rating: '', note: '', url: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:5000/postNovel", {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
            }).then(async (response) => {
            if (!response.ok) {
                console.log("Posting of novel failed:", response.status);
            } else {
                await response.json().then((data) => {
                postNovel(data.novelAdded);
                });
            }
            });
        } catch (error) {
            console.log("Fetch function failed:", error);
        }   
    };

    return(
        <form onSubmit={handleSubmit} className={styles.addNovelForm}>
            <h3>Add Novel</h3>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <label htmlFor="author">Author: </label>
            <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            <label htmlFor="rating">Rating: </label>
            <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
            />
            <label htmlFor="note">Note: </label>
            <input
                type="text"
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
            />
            <label htmlFor="url">URL: </label>
            <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
            />
            <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
    );
}