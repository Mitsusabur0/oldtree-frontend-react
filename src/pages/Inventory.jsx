import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import SearchBar from '../components/inventory/SearchBar';
import FilterDropdown from '../components/inventory/FilterDropdown';
import StockTable from '../components/inventory/StockTable';
import StockOperationModal from '../components/modals/StockOperationModal';
import styles from './Inventory.module.scss';

const Inventory = () => {
  const { inventory, searchProducts, filterByChannel, updateStock } = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (channel) => {
    setSelectedChannel(channel);
    setCurrentPage(1);
  };

  const handleStockOperation = (variantId, channel) => {
    setSelectedVariant({ variantId, channel });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVariant(null);
  };

  const handleSubmitModal = (variantId, channel, changeAmount, operationType, notes) => {
    updateStock(variantId, channel, changeAmount, operationType, notes);
  };

  const searchedProducts = searchProducts(searchTerm);
  const searchedVariantIds = new Set(searchedProducts.flatMap(p => p.variants.map(v => v.id)));

  const filteredInventory = inventory.filter(item => {
    const channelMatch = selectedChannel === 'All Channels' || item.channel === selectedChannel;
    const searchMatch = !searchTerm || searchedVariantIds.has(item.variantId);
    return channelMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const paginatedInventory = filteredInventory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const channels = ['All Channels', ...new Set(inventory.map(i => i.channel))];
  const channelOptions = channels.map(c => ({ value: c, label: c }));

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.controlsContainer}>
        <h1>Inventory</h1>
        <div className={styles.controls}>
          <SearchBar onSearch={handleSearch} placeholder="Search products..." />
          <FilterDropdown
            options={channelOptions}
            selected={selectedChannel}
            onChange={handleFilter}
          />
        </div>
      </div>
      <main className={styles.main}>
        <StockTable items={paginatedInventory} onStockOperation={handleStockOperation} />
        <div className={styles.pagination}>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </main>
      {isModalOpen && (
        <StockOperationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
          variantId={selectedVariant.variantId}
          channel={selectedVariant.channel}
          currentStock={inventory.find(i => i.variantId === selectedVariant.variantId && i.channel === selectedVariant.channel)?.quantity || 0}
        />
      )}
    </div>
  );
};

export default Inventory;