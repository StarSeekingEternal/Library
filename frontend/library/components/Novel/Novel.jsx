"use client";
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Novel({novel, deleteNovel}) {
    //get list of novels

    //<button onClick={() => editNote(entry)}>Edit note</button>
    const date = new Date(novel.dateAdded).toLocaleString('en-CA', {
        weekday: 'long', // Full day of the week (e.g., Monday)
        year: 'numeric', // Full numeric representation of the year (e.g., 2024)
        month: 'long', // Full month name (e.g., February)
        day: 'numeric', // Numeric representation of the day (e.g., 23)
        hour: 'numeric', // Numeric representation of the hour (e.g., 12)
        minute: 'numeric', // Numeric representation of the minute (e.g., 34)
        timeZone: 'UTC' // Time zone (optional)
    });
    return(
        <div className={styles.novel}>
            <p className={styles.title}>{novel.title}</p>
            <p className={styles.field}>{novel.author}</p>
            <p className={styles.field}>{novel.rating}</p>
            <p className={styles.field}>{novel.note}</p>
            <p className={styles.field}>{date}</p>
            {<button onClick={() => deleteNovel(novel)} className={styles.button}>Delete Novel</button>}
      </div>
    );
}