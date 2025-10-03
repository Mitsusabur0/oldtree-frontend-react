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
        <h2>Ajustar Stock</h2>
        <p><strong>Producto:</strong> {product?.model}</p>
        <p><strong>Variante:</strong> {variant?.size} / {variant?.color}</p>
        <p><strong>Canal:</strong> {channel}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Tipo de Operación</label>
            <select value={operationType} onChange={(e) => setOperationType(e.target.value)}>
              <option value="sale">Venta</option>
              <option value="replenishment">Reabastecimiento</option>
              <option value="transfer">Transferencia</option>
              <option value="adjustment">Ajuste</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Cambio de Cantidad</label>
            <input
              type="number"
              value={quantityChange}
              onChange={(e) => setQuantityChange(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Notas</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className={styles.stockInfo}>
            <p>Stock Actual: {currentStock}</p>
            <p>Stock Proyectado: {projectedStock}</p>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={!isValid}>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockOperationModal;