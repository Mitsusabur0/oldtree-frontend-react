import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import StatCard from "@/components/dashboard/StatCard";
import { getProductByVariantId, getVariantById, formatDateTime } from "@/utils/helpers";
import styles from './Dashboard.module.scss';

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
        <StatCard title="Stock Total" value={totalStock} icon="📦" />
        <StatCard title="Stock Distribución" value={stockByChannel['B2B'] || 0} icon="🏢" />
        <StatCard title="Stock Mercado Libre" value={stockByChannel['Mercado Libre'] || 0} icon="🛒" />
        <StatCard title="Stock Website" value={stockByChannel['Sitio Web'] || 0} icon="🌐" />
        <StatCard title="Alerta de Stock bajo" value={lowStockItems.length} icon="⚠️" />
        <StatCard title="Movimientos Recientes" value={movements.length} icon="🔄" />
      </section>

      <section className={styles.lowStockAlerts}>
        <h2>Alertas de Stock Bajo</h2>
        {lowStockItems.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Variante</th>
                  <th>Canal</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
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
                      <td><button className={styles.actionButton}>Ajustar Stock</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Niveles de stock correcto.</p>
        )}
      </section>

      <section className={styles.recentActivity}>
        <h2>Actividad Reciente</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Producto</th>
                <th>Operación</th>
                <th>Cambio</th>
                <th>Canal</th>
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