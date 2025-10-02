import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InventoryContext, InventoryProvider } from './InventoryContext';
import { useContext } from 'react';

const TestConsumer = () => {
  const context = useContext(InventoryContext);
  return <div data-testid="context">{JSON.stringify(context)}</div>;
};

describe('InventoryContext', () => {
  it('provides the expected context values', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(InventoryContext);
      return null;
    };

    render(
      <InventoryProvider>
        <TestComponent />
      </InventoryProvider>
    );

    expect(contextValue).toHaveProperty('products');
    expect(contextValue).toHaveProperty('inventory');
    expect(contextValue).toHaveProperty('movements');
    expect(contextValue).toHaveProperty('lowStockThreshold');
    expect(contextValue).toHaveProperty('getInventoryForVariant');
    expect(contextValue).toHaveProperty('getTotalStockForVariant');
    expect(contextValue).toHaveProperty('updateStock');
    expect(contextValue).toHaveProperty('getLowStockItems');
    expect(contextValue).toHaveProperty('getTotalStockValue');
    expect(contextValue).toHaveProperty('getStockByChannel');
    expect(contextValue).toHaveProperty('searchProducts');
    expect(contextValue).toHaveProperty('filterByChannel');
    expect(contextValue).toHaveProperty('getRecentMovements');
    expect(contextValue).toHaveProperty('setLowStockThreshold');
  });

  it('getInventoryForVariant returns correct quantity', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(InventoryContext);
      return null;
    };

    render(
      <InventoryProvider>
        <TestComponent />
      </InventoryProvider>
    );

    expect(contextValue.getInventoryForVariant('v1', 'Mercado Libre')).toBe(15);
    expect(contextValue.getInventoryForVariant('v1', 'Website')).toBe(8);
    expect(contextValue.getInventoryForVariant('v99', 'Website')).toBe(0);
  });

  it('getTotalStockForVariant returns correct total', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(InventoryContext);
      return null;
    };

    render(
      <InventoryProvider>
        <TestComponent />
      </InventoryProvider>
    );

    expect(contextValue.getTotalStockForVariant('v1')).toBe(48);
    expect(contextValue.getTotalStockForVariant('v7')).toBe(40);
  });

  it('updateStock correctly modifies inventory and creates a movement', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(InventoryContext);
      return null;
    };

    render(
      <InventoryProvider>
        <TestComponent />
      </InventoryProvider>
    );

    act(() => {
      contextValue.updateStock('v1', 'Mercado Libre', -5, 'sale', 'Test sale');
    });

    expect(contextValue.getInventoryForVariant('v1', 'Mercado Libre')).toBe(10);
    expect(contextValue.movements[0].variantId).toBe('v1');
    expect(contextValue.movements[0].changeAmount).toBe(-5);
  });

  it('getLowStockItems returns items below or equal to threshold', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(InventoryContext);
      return null;
    };

    render(
      <InventoryProvider>
        <TestComponent />
      </InventoryProvider>
    );
    
    act(() => {
        contextValue.setLowStockThreshold(10);
    });

    const lowStockItems = contextValue.getLowStockItems();
    expect(lowStockItems.length).toBeGreaterThan(0);
    lowStockItems.forEach(item => {
        expect(item.quantity).toBeLessThanOrEqual(10);
    });
  });
});
