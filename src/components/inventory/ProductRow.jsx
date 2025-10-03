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
      <td data-label="Modelo de Producto">{product.model}</td>
      <td data-label="Variante (Talla/Color)">{variant.size} / {variant.color}</td>
      <td data-label="Canal">{item.channel}</td>
      <td data-label="Stock Actual">
        <span className={`${styles.stockLevel} ${styles[stockStatus]}`}>
          {item.quantity}
        </span>
        {stockStatus === 'low' && <span className={styles.lowStockBadge}>Stock Bajo</span>}
      </td>
      <td data-label="Acciones">
        <button
          className={styles.actionButton}
          onClick={() => onStockOperation(item.variantId, item.channel)}
        >
          Ajustar Stock
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;