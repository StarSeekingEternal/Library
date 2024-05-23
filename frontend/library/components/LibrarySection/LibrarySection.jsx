"use client";
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Novel from '../Novel/Novel';
import AddNovelButton from '../AddNovelButton/AddNovelButton';

export default function LibrarySection() {
    const [loading, setLoading] = useState(true);
    const [novels, setNovels] = useState(undefined);

    //get list of novels
    useEffect(() => {
    
      const getNovels = async () => {
        try {
          await fetch("http://localhost:5000/getAllNovels", {method: "GET"}).then(async (response) => {
            if (!response.ok) {
              console.log("Served failed:", response.status);
            } else {
              await response.json().then((data) => {
                setNovels(data.response);
              });
            }
          });
        } catch (error) {
          console.log("Fetch function failed:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getNovels();
      }, []);

    const deleteNovel = async (novel) => {
      try {
        await fetch("http://localhost:5000/deleteNovel/" + novel._id, {method: "DELETE"}).then(async (response) => {
          if (!response.ok) {
            console.log("Deletion of novel failed:", response.status);
          } else {
            await response.json().then(() => {
              setNovels((prevNotes) => prevNotes.filter((entry) => entry._id !== novel._id));
            });
          }
        });
      } catch (error) {
        console.log("Fetch function failed:", error);
      }   
    };

    const postNovel = (newNovel) => {
      if (novels === undefined) {
        setNovels([newNovel]);
        setLoading(false);
      }
      else setNovels(prevNovels => [...prevNovels, newNovel]);
    };

    return(
        <div className={styles.librarySection}>
          <AddNovelButton postNovel={postNovel}></AddNovelButton>

          <div className={styles.novelList}>
              <div className={styles.headers}>
                <p className={styles.headersField}>Title</p>
                <p className={styles.headersField}>Author</p>
                <p className={styles.headersRatingField}>Rating</p>
                <p className={styles.headersField}>Note</p>
                <p className={styles.headersField}>URL</p>
                <p className={styles.headersField}>Date</p>
                <p className={styles.headersLastField}></p>
              </div>
              {loading ? (<div>Loading...</div>) : novels ? (
                novels.map((novel) => {
                    return (
                    <div key={novel._id}>
                        <Novel
                        novel={novel}
                        deleteNovel={deleteNovel}
                        />
                    </div>
                    );
                })
              ) : (<div>Something has gone wrong! We can't get the novels!</div>)}
          </div>
        </div>
    );
}