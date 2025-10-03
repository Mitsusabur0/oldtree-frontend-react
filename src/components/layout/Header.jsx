import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Gestión de Inventario Oldtree</h1>
      <div className={styles.date}>{currentDate}</div>
    </header>
  );
};

export default Header;