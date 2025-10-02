import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Oldtree Inventory Management</h1>
      <div className={styles.date}>{currentDate}</div>
    </header>
  );
};

export default Header;