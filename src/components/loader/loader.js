import React from 'react';
import styles from '@/components/loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
    </div>
  );
};