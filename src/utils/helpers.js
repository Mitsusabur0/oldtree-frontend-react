export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - new Date(timestamp)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const getProductByVariantId = (products, variantId) => {
  for (const product of products) {
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      return product;
    }
  }
  return null;
};

export const getVariantById = (products, variantId) => {
  for (const product of products) {
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      return variant;
    }
  }
  return null;
};

export const formatStockLevel = (quantity) => {
  return quantity.toLocaleString();
};

export const getStockStatus = (quantity, threshold) => {
  if (quantity <= threshold) {
    return 'low';
  }
  if (quantity <= threshold * 2) {
    return 'medium';
  }
  return 'high';
};

export const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};