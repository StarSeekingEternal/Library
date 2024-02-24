"use client";
import React, { useState } from 'react';
import styles from './styles.module.css';
import AddNovelForm from '../AddNovelForm/AddNovelForm';

export default function AddNovelButton({postNovel}) {
    const [showComponent, setShowComponent] = useState(false);

    const toggleComponent = () => {
      setShowComponent(prevState => !prevState);
    };

    return(
        <div className={styles.addNovelContainer}>
            <button onClick={toggleComponent} className={styles.button}>
                {showComponent ? 'Hide Form' : 'Add a Novel'}
            </button>
            {showComponent && <AddNovelForm postNovel={postNovel}></AddNovelForm>}
        </div>

    );
}