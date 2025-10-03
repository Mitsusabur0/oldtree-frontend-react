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
        <h1>Reportes</h1>
        <div className={styles.filters}>
          <select onChange={(e) => setDateRange(e.target.value)} value={dateRange}>
            <option value="all">Todo el tiempo</option>
            <option value="today">Hoy</option>
            <option value="7days">Últimos 7 días</option>
            <option value="30days">Últimos 30 días</option>
          </select>
          <select onChange={(e) => setChannel(e.target.value)} value={channel}>
            {channels.map(c => <option key={c} value={c}>{c === 'all' ? 'Todos los canales' : c}</option>)}
          </select>
          <select onChange={(e) => setOperationType(e.target.value)} value={operationType}>
            {operationTypes.map(o => <option key={o} value={o}>{o === 'all' ? 'Todas las operaciones' : o}</option>)}
          </select>
        </div>
      </div>
      <main>
        <div className={styles.summaryStats}>
          <div className={styles.stat}>
            <h4>Movimientos Totales</h4>
            <p>{summaryStats.totalMovements}</p>
          </div>
          <div className={styles.stat}>
            <h4>Stock Añadido</h4>
            <p>{summaryStats.stockAdded}</p>
          </div>
          <div className={styles.stat}>
            <h4>Stock Eliminado</h4>
            <p>{summaryStats.stockRemoved}</p>
          </div>
          <div className={styles.stat}>
            <h4>Cambio Neto</h4>
            <p>{summaryStats.netChange}</p>
          </div>
        </div>
        <MovementLogTable movements={filteredMovements} />
      </main>
    </div>
  );
};

export default Reports;