import React, { useContext } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { getProductByVariantId, getVariantById, getStockStatus } from '../../utils/helpers';
import styles from './ProductRow.module.scss';

const ProductRow = ({ item, onStockOperation }) => {
  const { products, lowStockThreshold } = useContext(InventoryContext);

  const product = getProductByVariantId(products, item.variantId);
  const variant = getVariantById(products, item.variantId);

  if (!product || !variant) {
    return null;
  }

  const stockStatus = getStockStatus(item.quantity, lowStockThreshold);

  return (
    <tr className={styles.productRow}>
      <td data-label="Product Model">{product.model}</td>
      <td data-label="Variant (Size/Color)">{variant.size} / {variant.color}</td>
      <td data-label="Channel">{item.channel}</td>
      <td data-label="Current Stock">
        <span className={`${styles.stockLevel} ${styles[stockStatus]}`}>
          {item.quantity}
        </span>
        {stockStatus === 'low' && <span className={styles.lowStockBadge}>Low Stock</span>}
      </td>
      <td data-label="Actions">
        <button
          className={styles.actionButton}
          onClick={() => onStockOperation(item.variantId, item.channel)}
        >
          Adjust Stock
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;