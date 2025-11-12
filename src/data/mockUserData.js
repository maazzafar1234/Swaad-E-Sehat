// src/data/mockUserData.js

// --- Mock User Data ---
export const mockUser = {
  id: 'u1',
  name: 'Tejaswi Singh',
  email: 'tejaswi.example@lpu.co.in',
  phone: '+91 88499 78818',
  joinedDate: 'September 15, 2025',
};

// --- Mock Addresses ---
export const mockAddresses = [
  {
    id: 'addr1',
    type: 'Home',
    addressLine1: '123, Sunrise Apartments',
    addressLine2: 'Jalandhar-Delhi G.T. Road',
    city: 'Phagwara',
    state: 'Punjab',
    zip: '144411',
    isDefault: true,
  },
  {
    id: 'addr2',
    type: 'Work',
    addressLine1: 'LPU Campus, Block 32',
    addressLine2: 'Lovely Professional University',
    city: 'Phagwara',
    state: 'Punjab',
    zip: '144411',
    isDefault: false,
  },
];

// --- Mock Payment Methods ---
export const mockPaymentMethods = [
  {
    id: 'pm1',
    type: 'Visa',
    last4: '1234',
    expiry: '08/28',
    isDefault: true,
  },
  {
    id: 'pm2',
    type: 'Mastercard',
    last4: '5678',
    expiry: '11/26',
    isDefault: false,
  },
  {
    id: 'pm3',
    type: 'UPI',
    last4: 'tejaswi@upi',
    expiry: null,
    isDefault: false,
  }
];

// --- Mock Order Data ---
export const mockOrders = [
  {
    id: 'SWAAD-1003',
    date: 'October 28, 2025',
    status: 'Delivered',
    total: 450.00,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[0],
    items: [
      {
        id: 'p1',
        name: 'Premium Dry Fruit Laddu',
        image: '/images/product/laddu.jpg', // Use your actual image paths
        price: 450.00,
        quantity: 1,
        variantName: '500g Box'
      },
    ],
    subtotal: 450.00,
    shipping: 0.00,
    tax: 0.00,
  },
  {
    id: 'SWAAD-1002',
    date: 'October 22, 2025',
    status: 'Processing',
    total: 820.00,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[1],
    items: [
      {
        id: 'p2',
        name: 'Dry Fruit Khajur Pak',
        image: '/images/product/khajur-pak.jpg',
        price: 520.00,
        quantity: 1,
        variantName: '500g'
      },
      {
        id: 'p3',
        name: 'California Almonds',
        image: '/images/product/almonds.jpg',
        price: 300.00,
        quantity: 1,
        variantName: '250g'
      },
    ],
    subtotal: 820.00,
    shipping: 0.00,
    tax: 0.00,
  },
  {
    id: 'SWAAD-1001',
    date: 'September 15, 2025',
    status: 'Cancelled',
    total: 300.00,
    shippingAddress: mockAddresses[1],
    paymentMethod: mockPaymentMethods[0],
    items: [
      {
        id: 'p3',
        name: 'California Almonds',
        image: '/images/product/almonds.jpg',
        price: 300.00,
        quantity: 1,
        variantName: '250g'
      },
    ],
    subtotal: 300.00,
    shipping: 0.00,
    tax: 0.00,
  },
];