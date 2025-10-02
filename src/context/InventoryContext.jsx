import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts, inventoryItems as initialInventory, stockMovements as initialMovements } from '../data/mockData';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [loading, setLoading] = useState(false);

  const getInventoryForVariant = (variantId, channel) => {
    const item = inventory.find(i => i.variantId === variantId && i.channel === channel);
    return item ? item.quantity : 0;
  };

  const getTotalStockForVariant = (variantId) => {
    return inventory.reduce((total, item) => {
      if (item.variantId === variantId) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const updateStock = (variantId, channel, changeAmount, operationType, notes) => {
    setLoading(true);
    setTimeout(() => {
      setInventory(prevInventory => {
        const newInventory = [...prevInventory];
        const itemIndex = newInventory.findIndex(i => i.variantId === variantId && i.channel === channel);

        if (itemIndex > -1) {
          newInventory[itemIndex].quantity += changeAmount;
        } else {
          newInventory.push({ id: `i${newInventory.length + 1}`, variantId, channel, quantity: changeAmount });
        }
        return newInventory;
      });

      const newMovement = {
        id: `m${movements.length + 1}`,
        variantId,
        channel,
        changeAmount,
        operationType,
        userName: 'Admin User',
        timestamp: new Date().toISOString(),
        notes,
      };
      setMovements(prevMovements => [newMovement, ...prevMovements]);
      setLoading(false);
    }, 1000);
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.quantity <= lowStockThreshold);
  };

  const getTotalStockValue = () => {
    return inventory.reduce((total, item) => total + item.quantity, 0);
  };

  const getStockByChannel = () => {
    return inventory.reduce((acc, item) => {
      if (!acc[item.channel]) {
        acc[item.channel] = 0;
      }
      acc[item.channel] += item.quantity;
      return acc;
    }, {});
  };

  const searchProducts = (searchTerm) => {
    if (!searchTerm) return products;
    return products.filter(p => p.model.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const filterByChannel = (channel) => {
    if (channel === 'All Channels') return inventory;
    return inventory.filter(i => i.channel === channel);
  };

  const getRecentMovements = (limit) => {
    return movements.slice(0, limit);
  };

  const value = {
    products,
    inventory,
    movements,
    lowStockThreshold,
    loading,
    getInventoryForVariant,
    getTotalStockForVariant,
    updateStock,
    getLowStockItems,
    getTotalStockValue,
    getStockByChannel,
    searchProducts,
    filterByChannel,
    getRecentMovements,
    setLowStockThreshold,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};