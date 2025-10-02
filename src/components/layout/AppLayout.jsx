import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import LoadingSpinner from '../common/LoadingSpinner';
import { InventoryContext } from '../../context/InventoryContext';
import styles from './AppLayout.module.scss';

const AppLayout = () => {
  const { loading } = useContext(InventoryContext);

  return (
    <div className={styles.appLayout}>
      {loading && <LoadingSpinner />}
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;