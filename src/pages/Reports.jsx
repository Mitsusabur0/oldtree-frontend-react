import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import MovementLogTable from '../components/reports/MovementLogTable';
import styles from './Reports.module.scss';

const Reports = () => {
  const { movements } = useContext(InventoryContext);
  const [dateRange, setDateRange] = useState('all');
  const [channel, setChannel] = useState('all');
  const [operationType, setOperationType] = useState('all');

  const filteredMovements = movements.filter(movement => {
    const movementDate = new Date(movement.timestamp);
    const now = new Date();
    let inDateRange = true;
    if (dateRange === 'today') {
      inDateRange = movementDate.toDateString() === now.toDateString();
    } else if (dateRange === '7days') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      inDateRange = movementDate >= sevenDaysAgo;
    } else if (dateRange === '30days') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      inDateRange = movementDate >= thirtyDaysAgo;
    }

    const channelMatch = channel === 'all' || movement.channel === channel;
    const operationTypeMatch = operationType === 'all' || movement.operationType === operationType;

    return inDateRange && channelMatch && operationTypeMatch;
  });

  const channels = ['all', ...new Set(movements.map(m => m.channel))];
  const operationTypes = ['all', ...new Set(movements.map(m => m.operationType))];

  const summaryStats = {
    totalMovements: filteredMovements.length,
    stockAdded: filteredMovements.reduce((acc, m) => m.operationType === 'replenishment' ? acc + m.changeAmount : acc, 0),
    stockRemoved: filteredMovements.reduce((acc, m) => ['sale', 'transfer'].includes(m.operationType) ? acc + m.changeAmount : acc, 0),
    netChange: filteredMovements.reduce((acc, m) => acc + m.changeAmount, 0),
  };

  return (
    <div className={styles.reportsPage}>
      <div className={styles.filtersContainer}>
        <h1>Reports</h1>
        <div className={styles.filters}>
          <select onChange={(e) => setDateRange(e.target.value)} value={dateRange}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <select onChange={(e) => setChannel(e.target.value)} value={channel}>
            {channels.map(c => <option key={c} value={c}>{c === 'all' ? 'All Channels' : c}</option>)}
          </select>
          <select onChange={(e) => setOperationType(e.target.value)} value={operationType}>
            {operationTypes.map(o => <option key={o} value={o}>{o === 'all' ? 'All Operations' : o}</option>)}
          </select>
        </div>
      </div>
      <main>
        <div className={styles.summaryStats}>
          <div className={styles.stat}>
            <h4>Total Movements</h4>
            <p>{summaryStats.totalMovements}</p>
          </div>
          <div className={styles.stat}>
            <h4>Stock Added</h4>
            <p>{summaryStats.stockAdded}</p>
          </div>
          <div className={styles.stat}>
            <h4>Stock Removed</h4>
            <p>{summaryStats.stockRemoved}</p>
          </div>
          <div className={styles.stat}>
            <h4>Net Change</h4>
            <p>{summaryStats.netChange}</p>
          </div>
        </div>
        <MovementLogTable movements={filteredMovements} />
      </main>
    </div>
  );
};

export default Reports;