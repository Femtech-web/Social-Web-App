/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { categories } from '../../dummy';
import { handleClick, handleDone, handleSearch } from './handlers';
import { populateCategory } from '../../Redux/postRedux';
import styles from './style';

const Category = ({ setCategoryActive }) => {
    const dispatch = useDispatch();
    let selectedCat = [];
    const [ searchedCat, setSearchedCat ] = useState(categories);

  return (
    <div className={styles.overlay}>
        <div className={styles.catContainer}>
            <div className='mb-3'>
                <h1 className={styles.catHeader}>Select Categories</h1>
                <p className={`${styles.textWhite} pb-3`}>
                    What category is your content related to?
                </p>
                <input type='text' 
                    placeholder='Search, with capital letter first'  
                    className={styles.searchInput}
                    onChange={(e) => handleSearch(e, categories, setSearchedCat)}
                />
            </div>
            <MdClose fontSize={25} 
                className={styles.closeBtn}
                onClick={() => setCategoryActive(false)}    
            />
            <div className={styles.roller}>
                <div className='max-h-[500px]'>
                    {searchedCat.map((item) => (
                        <div key={item} className={styles.itemCont}>
                            <p className={styles.textWhite}>{item}</p>
                            <input type="checkbox"  
                             onClick={() => handleClick(item, selectedCat)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.DoneBtnCont}>
                <button type='button' 
                    className={styles.DoneBtn}
                    onClick={
                    () => handleDone(dispatch, selectedCat, setCategoryActive, populateCategory)
                    }
                >
                    Done
                </button>
            </div>
        </div>
    </div>
  )
}

export default Category