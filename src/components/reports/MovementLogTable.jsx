import React, { useContext } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { getProductByVariantId, getVariantById, formatDateTime } from '../../utils/helpers';
import EmptyState from '../common/EmptyState';
import styles from './MovementLogTable.module.scss';

const MovementLogTable = ({ movements }) => {
  const { products } = useContext(InventoryContext);

  if (movements.length === 0) {
    return <EmptyState message="No movements found." />;
  }

  return (
    <div className={styles.movementLogTableContainer}>
      <table className={styles.movementLogTable}>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Product</th>
            <th>Variant</th>
            <th>Channel</th>
            <th>Operation</th>
            <th>Change</th>
            <th>User</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => {
            const product = getProductByVariantId(products, movement.variantId);
            const variant = getVariantById(products, movement.variantId);
            return (
              <tr key={movement.id}>
                <td>{formatDateTime(movement.timestamp)}</td>
                <td>{product?.model}</td>
                <td>{variant?.size} / {variant?.color}</td>
                <td>{movement.channel}</td>
                <td>{movement.operationType}</td>
                <td>{movement.changeAmount}</td>
                <td>{movement.userName}</td>
                <td>{movement.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MovementLogTable;