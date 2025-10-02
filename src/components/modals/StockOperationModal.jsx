import React, { useState, useContext, useEffect } from 'react';
import { InventoryContext } from '../../context/InventoryContext';
import { getProductByVariantId, getVariantById } from '../../utils/helpers';
import styles from './StockOperationModal.module.scss';

const StockOperationModal = ({ isOpen, onClose, variantId, channel, currentStock, onSubmit }) => {
  const { products } = useContext(InventoryContext);
  const [operationType, setOperationType] = useState('sale');
  const [quantityChange, setQuantityChange] = useState(0);
  const [notes, setNotes] = useState('');
  const [projectedStock, setProjectedStock] = useState(currentStock);
  const [isValid, setIsValid] = useState(false);

  const product = getProductByVariantId(products, variantId);
  const variant = getVariantById(products, variantId);

  useEffect(() => {
    const newProjectedStock = currentStock + quantityChange;
    setProjectedStock(newProjectedStock);
    setIsValid(newProjectedStock >= 0);
  }, [quantityChange, currentStock]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(variantId, channel, quantityChange, operationType, notes);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Adjust Stock</h2>
        <p><strong>Product:</strong> {product?.model}</p>
        <p><strong>Variant:</strong> {variant?.size} / {variant?.color}</p>
        <p><strong>Channel:</strong> {channel}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Operation Type</label>
            <select value={operationType} onChange={(e) => setOperationType(e.target.value)}>
              <option value="sale">Sale</option>
              <option value="replenishment">Replenishment</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Quantity Change</label>
            <input
              type="number"
              value={quantityChange}
              onChange={(e) => setQuantityChange(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className={styles.stockInfo}>
            <p>Current Stock: {currentStock}</p>
            <p>Projected Stock: {projectedStock}</p>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={!isValid}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockOperationModal;