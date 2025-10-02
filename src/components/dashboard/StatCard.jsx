import React from 'react';
import styles from './StatCard.module.scss';

const StatCard = ({ title, value, icon, subtitle, trend }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {trend && <div className={styles.trend}>{trend}</div>}
    </div>
  );
};

export default StatCard;