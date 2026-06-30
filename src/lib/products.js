export const PRODUCTS = [
  {
    id: 'oreo',
    name: 'Original Oreo',
    description: 'Glaze cokelat + remahan biskuit Oreo asli',
    price: 5000,
    image: '/images/oreo.png',
    color: '#4A3728',
    badge: 'Favorit',
    available: true
  },
  {
    id: 'matcha',
    name: 'Matcha Latte',
    description: 'Saus teh hijau premium + taburan bubuk matcha',
    price: 5000,
    image: '/images/matcha.png',
    color: '#6B8E3D',
    badge: 'Premium',
    available: true
  },
  {
    id: 'mango',
    name: 'Mango Blast',
    description: 'Selai mangga segar + potongan buah mangga',
    price: 5000,
    image: '/images/mango.png',
    color: '#F7A72B',
    badge: 'Segar',
    available: true
  },
  {
    id: 'taro',
    name: 'Taro Purple',
    description: 'Saus ubi ungu lembut + taburan meses ungu',
    price: 5000,
    image: '/images/taro.png',
    color: '#8B6DAE',
    badge: 'Unik',
    available: true
  },
  {
    id: 'strawberry',
    name: 'Strawberry Dream',
    description: 'Saus strawberry manis + dried fruit chips',
    price: 5000,
    image: '/images/strawberry.png',
    color: '#E8668B',
    badge: 'Manis',
    available: true
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu Classic',
    description: 'Saus kopi + taburan cokelat bubuk premium',
    price: 5000,
    image: '/images/tiramisu.png',
    color: '#7B5B3A',
    badge: 'Classic',
    available: true
  },
  {
    id: 'cheese',
    name: 'Cheesy Parmesan',
    description: 'Saus keju + taburan keju parut melimpah',
    price: 5000,
    image: '/images/cheese.png',
    color: '#F0C75E',
    badge: 'Gurih',
    available: true
  }
];

export const BOX_PACKAGES = [
  {
    id: 'box-6',
    name: 'Mini Box',
    qty: 6,
    price: 30000,
    popular: false
  },
  {
    id: 'box-9',
    name: 'Best Seller Box',
    qty: 9,
    price: 45000,
    popular: true
  },
  {
    id: 'box-15',
    name: 'Family Box',
    qty: 15,
    price: 75000,
    popular: false
  },
  {
    id: 'box-20',
    name: 'Super Box',
    qty: 20,
    price: 100000,
    popular: false
  },
  {
    id: 'box-30',
    name: 'Party Pack',
    qty: 30,
    price: 150000,
    popular: false
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function getPackageById(id) {
  return BOX_PACKAGES.find(p => p.id === id);
}
