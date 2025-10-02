import React from 'react';
import ProductRow from './ProductRow';
import EmptyState from '../common/EmptyState';
import styles from './StockTable.module.scss';

const StockTable = ({ items, onStockOperation }) => {
  if (items.length === 0) {
    return <EmptyState message="No products found." />;
  }

  return (
    <div className={styles.stockTableContainer}>
      <table className={styles.stockTable}>
        <thead>
          <tr>
            <th>Product Model</th>
            <th>Variant (Size/Color)</th>
            <th>Channel</th>
            <th>Current Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ProductRow
              key={item.id}
              item={item}
              onStockOperation={onStockOperation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;