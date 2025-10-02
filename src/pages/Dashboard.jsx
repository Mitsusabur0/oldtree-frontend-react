import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import StatCard from '../../components/dashboard/StatCard';
import styles from './Dashboard.module.scss';
import { getProductByVariantId, getVariantById, formatDateTime } from '../../utils/helpers';

const Dashboard = () => {
  const { 
    inventory, 
    movements,
    products,
    getLowStockItems, 
    getTotalStockValue, 
    getStockByChannel 
  } = useContext(InventoryContext);

  const lowStockItems = getLowStockItems();
  const totalStock = getTotalStockValue();
  const stockByChannel = getStockByChannel();
  const recentMovements = movements.slice(0, 10);

  return (
    <div className={styles.dashboard}>
      <section className={styles.statsGrid}>
        <StatCard title="Total Stock" value={totalStock} icon="📦" />
        <StatCard title="Mercado Libre Stock" value={stockByChannel['Mercado Libre'] || 0} icon="🛒" />
        <StatCard title="Website Stock" value={stockByChannel['Website'] || 0} icon="🌐" />
        <StatCard title="B2B Stock" value={stockByChannel['B2B'] || 0} icon="🏢" />
        <StatCard title="Low Stock Alerts" value={lowStockItems.length} icon="⚠️" />
        <StatCard title="Recent Movements" value={movements.length} icon="🔄" />
      </section>

      <section className={styles.lowStockAlerts}>
        <h2>Low Stock Alerts</h2>
        {lowStockItems.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Channel</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(item => {
                  const product = getProductByVariantId(products, item.variantId);
                  const variant = getVariantById(products, item.variantId);
                  return (
                    <tr key={item.id}>
                      <td>{product ? product.model : 'N/A'}</td>
                      <td>{variant ? `${variant.size} / ${variant.color}` : 'N/A'}</td>
                      <td>{item.channel}</td>
                      <td>{item.quantity}</td>
                      <td><button className={styles.actionButton}>Adjust Stock</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>All stock levels are healthy! ✔️</p>
        )}
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Product</th>
                <th>Operation</th>
                <th>Change</th>
                <th>Channel</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map(movement => {
                const product = getProductByVariantId(products, movement.variantId);
                return (
                  <tr key={movement.id}>
                    <td>{formatDateTime(movement.timestamp)}</td>
                    <td>{product ? product.model : 'N/A'}</td>
                    <td>{movement.operationType}</td>
                    <td>{movement.changeAmount}</td>
                    <td>{movement.channel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;