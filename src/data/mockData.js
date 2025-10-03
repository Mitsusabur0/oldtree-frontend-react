export const products = [
  {
    id: "p1",
    model: "Camiseta Clásica",
    category: "Prendas de Arriba",
    variants: [
      { id: "v1", size: "S", color: "Rojo" },
      { id: "v2", size: "M", color: "Rojo" },
      { id: "v3", size: "L", color: "Rojo" },
      { id: "v4", size: "S", color: "Azul" },
      { id: "v5", size: "M", color: "Azul" },
    ],
  },
  {
    id: "p2",
    model: "Jeans Ajustados",
    category: "Prendas de Abajo",
    variants: [
      { id: "v6", size: "30", color: "Azul Oscuro" },
      { id: "v7", size: "32", color: "Azul Oscuro" },
      { id: "v8", size: "34", color: "Azul Oscuro" },
      { id: "v9", size: "32", color: "Negro" },
    ],
  },
  {
    id: "p3",
    model: "Sudadera Premium",
    category: "Prendas de Arriba",
    variants: [
      { id: "v10", size: "M", color: "Gris" },
      { id: "v11", size: "L", color: "Gris" },
      { id: "v12", size: "XL", color: "Gris" },
    ],
  },
  {
    id: "p4",
    model: "Vestido de Verano",
    category: "Vestidos",
    variants: [
      { id: "v13", size: "S", color: "Floral" },
      { id: "v14", size: "M", color: "Floral" },
      { id: "v15", size: "S", color: "Negro Sólido" },
    ],
  },
];

export const inventoryItems = [
  // Camiseta Clásica
  { id: "i1", variantId: "v1", channel: "Mercado Libre", quantity: 15 },
  { id: "i2", variantId: "v1", channel: "Sitio Web", quantity: 8 },
  { id: "i3", variantId: "v1", channel: "B2B", quantity: 25 },
  { id: "i4", variantId: "v2", channel: "Mercado Libre", quantity: 3 },
  { id: "i5", variantId: "v2", channel: "Sitio Web", quantity: 12 },
  { id: "i6", variantId: "v3", channel: "B2B", quantity: 30 },
  { id: "i7", variantId: "v4", channel: "Mercado Libre", quantity: 7 },
  { id: "i8", variantId: "v5", channel: "Sitio Web", quantity: 2 },

  // Jeans Ajustados
  { id: "i9", variantId: "v6", channel: "Mercado Libre", quantity: 10 },
  { id: "i10", variantId: "v7", channel: "Sitio Web", quantity: 18 },
  { id: "i11", variantId: "v7", channel: "B2B", quantity: 22 },
  { id: "i12", variantId: "v8", channel: "Mercado Libre", quantity: 5 },
  { id: "i13", variantId: "v9", channel: "Sitio Web", quantity: 14 },

  // Sudadera Premium
  { id: "i14", variantId: "v10", channel: "Mercado Libre", quantity: 20 },
  { id: "i15", variantId: "v11", channel: "Sitio Web", quantity: 16 },
  { id: "i16", variantId: "v11", channel: "B2B", quantity: 35 },
  { id: "i17", variantId: "v12", channel: "Mercado Libre", quantity: 9 },

  // Vestido de Verano
  { id: "i18", variantId: "v13", channel: "Sitio Web", quantity: 6 },
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
    userName: "Usuario Administrador",
    timestamp: "2025-10-01T14:22:00Z",
    notes: "Venta a través de Mercado Libre",
  },
  {
    id: "m2",
    variantId: "v7",
    channel: "B2B",
    changeAmount: 50,
    operationType: "replenishment",
    userName: "Usuario Administrador",
    timestamp: "2025-10-01T10:15:00Z",
    notes: "Llegada de nuevo stock del proveedor",
  },
  {
    id: "m3",
    variantId: "v5",
    channel: "Sitio Web",
    changeAmount: -1,
    operationType: "sale",
    userName: "Usuario Administrador",
    timestamp: "2025-10-02T09:30:00Z",
    notes: "Pedido del sitio web",
  },
  {
    id: "m4",
    variantId: "v11",
    channel: "B2B",
    changeAmount: -10,
    operationType: "transfer",
    userName: "Usuario Administrador",
    timestamp: "2025-10-02T11:45:00Z",
    notes: "Transferencia a socio minorista",
  },
  {
    id: "m5",
    variantId: "v2",
    channel: "Mercado Libre",
    changeAmount: 3,
    operationType: "adjustment",
    userName: "Usuario Administrador",
    timestamp: "2025-10-02T13:00:00Z",
    notes: "Corrección de inventario después del recuento físico",
  },
];

export const salesChannels = ["Mercado Libre", "Sitio Web", "B2B"];

export const operationTypes = [
  { value: "sale", label: "Venta" },
  { value: "replenishment", label: "Reabastecimiento de Stock" },
  { value: "transfer", label: "Transferencia entre Canales" },
  { value: "adjustment", label: "Ajuste de Inventario" },
];