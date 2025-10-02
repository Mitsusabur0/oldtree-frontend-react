export const products = [
  {
    id: "p1",
    model: "T-Shirt Classic",
    category: "Tops",
    variants: [
      { id: "v1", size: "S", color: "Red" },
      { id: "v2", size: "M", color: "Red" },
      { id: "v3", size: "L", color: "Red" },
      { id: "v4", size: "S", color: "Blue" },
      { id: "v5", size: "M", color: "Blue" },
    ],
  },
  {
    id: "p2",
    model: "Jeans Slim Fit",
    category: "Bottoms",
    variants: [
      { id: "v6", size: "30", color: "Dark Blue" },
      { id: "v7", size: "32", color: "Dark Blue" },
      { id: "v8", size: "34", color: "Dark Blue" },
      { id: "v9", size: "32", color: "Black" },
    ],
  },
  {
    id: "p3",
    model: "Hoodie Premium",
    category: "Tops",
    variants: [
      { id: "v10", size: "M", color: "Gray" },
      { id: "v11", size: "L", color: "Gray" },
      { id: "v12", size: "XL", color: "Gray" },
    ],
  },
  {
    id: "p4",
    model: "Dress Summer",
    category: "Dresses",
    variants: [
      { id: "v13", size: "S", color: "Floral" },
      { id: "v14", size: "M", color: "Floral" },
      { id: "v15", size: "S", color: "Solid Black" },
    ],
  },
];

export const inventoryItems = [
  // T-Shirt Classic
  { id: "i1", variantId: "v1", channel: "Mercado Libre", quantity: 15 },
  { id: "i2", variantId: "v1", channel: "Website", quantity: 8 },
  { id: "i3", variantId: "v1", channel: "B2B", quantity: 25 },
  { id: "i4", variantId: "v2", channel: "Mercado Libre", quantity: 3 },
  { id: "i5", variantId: "v2", channel: "Website", quantity: 12 },
  { id: "i6", variantId: "v3", channel: "B2B", quantity: 30 },
  { id: "i7", variantId: "v4", channel: "Mercado Libre", quantity: 7 },
  { id: "i8", variantId: "v5", channel: "Website", quantity: 2 },

  // Jeans Slim Fit
  { id: "i9", variantId: "v6", channel: "Mercado Libre", quantity: 10 },
  { id: "i10", variantId: "v7", channel: "Website", quantity: 18 },
  { id: "i11", variantId: "v7", channel: "B2B", quantity: 22 },
  { id: "i12", variantId: "v8", channel: "Mercado Libre", quantity: 5 },
  { id: "i13", variantId: "v9", channel: "Website", quantity: 14 },

  // Hoodie Premium
  { id: "i14", variantId: "v10", channel: "Mercado Libre", quantity: 20 },
  { id: "i15", variantId: "v11", channel: "Website", quantity: 16 },
  { id: "i16", variantId: "v11", channel: "B2B", quantity: 35 },
  { id: "i17", variantId: "v12", channel: "Mercado Libre", quantity: 9 },

  // Dress Summer
  { id: "i18", variantId: "v13", channel: "Website", quantity: 6 },
  { id: "i19", variantId: "v14", channel: "Mercado Libre", quantity: 11 },
  { id: "i20", variantId: "v15", channel: "B2B", quantity: 4 },
];

export const stockMovements = [
  {
    id: "m1",
    variantId: "v1",
    channel: "Mercado Libre",
    changeAmount: -2,
    operationType: "sale",
    userName: "Admin User",
    timestamp: "2025-10-01T14:22:00Z",
    notes: "Sale via Mercado Libre",
  },
  {
    id: "m2",
    variantId: "v7",
    channel: "B2B",
    changeAmount: 50,
    operationType: "replenishment",
    userName: "Admin User",
    timestamp: "2025-10-01T10:15:00Z",
    notes: "New stock arrival from supplier",
  },
  {
    id: "m3",
    variantId: "v5",
    channel: "Website",
    changeAmount: -1,
    operationType: "sale",
    userName: "Admin User",
    timestamp: "2025-10-02T09:30:00Z",
    notes: "Website order",
  },
  {
    id: "m4",
    variantId: "v11",
    channel: "B2B",
    changeAmount: -10,
    operationType: "transfer",
    userName: "Admin User",
    timestamp: "2025-10-02T11:45:00Z",
    notes: "Transfer to retail partner",
  },
  {
    id: "m5",
    variantId: "v2",
    channel: "Mercado Libre",
    changeAmount: 3,
    operationType: "adjustment",
    userName: "Admin User",
    timestamp: "2025-10-02T13:00:00Z",
    notes: "Inventory correction after physical count",
  },
];

export const salesChannels = ["Mercado Libre", "Website", "B2B"];

export const operationTypes = [
  { value: "sale", label: "Sale" },
  { value: "replenishment", label: "Stock Replenishment" },
  { value: "transfer", label: "Transfer Between Channels" },
  { value: "adjustment", label: "Inventory Adjustment" },
];