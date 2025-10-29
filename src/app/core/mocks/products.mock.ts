import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  // TENIS PARA HOMBRE
  {
    id: '1',
    name: 'Air Max 90',
    brand: 'Nike',
    size: 10,
    price: 3418.70,
    description: 'Tenis deportivos Nike Air Max 90 con amortiguación Air visible. Perfectos para uso diario y running.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 15
  },
  {
    id: '2',
    name: 'Air Max 90',
    brand: 'Nike',
    size: 11,
    price: 2892.70,
    description: 'Tenis Nike Air Max 90 en talla 11. Comodidad y estilo para todo el día.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 12
  },
  {
    id: '3',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    size: 9,
    price: 4733.70,
    description: 'Tenis Adidas Ultraboost 22 con tecnología Boost para máximo retorno de energía. Ideales para corredores.',
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 20
  },
  {
    id: '4',
    name: 'Stan Smith',
    brand: 'Adidas',
    size: 8,
    price: 2629.70,
    description: 'Clásicos tenis Adidas Stan Smith blancos. Un icono atemporal del streetwear.',
    imageUrl: 'https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'unisex',
    stock: 25
  },
  {
    id: '5',
    name: 'Cloud 5',
    brand: 'On',
    size: 11,
    price: 3681.70,
    description: 'Tenis On Cloud 5 con tecnología CloudTec. Ligeros y cómodos para todo el día.',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 12
  },
  {
    id: '6',
    name: 'Cloud 5',
    brand: 'On',
    size: 10,
    price: 3155.70,
    description: 'Tenis On Cloud 5 talla 10. Perfectos para caminar y uso casual.',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 8
  },
  {
    id: '7',
    name: 'Fresh Foam 1080',
    brand: 'New Balance',
    size: 10,
    price: 4207.70,
    description: 'Tenis New Balance Fresh Foam 1080 con amortiguación premium. Perfectos para largas distancias.',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 18
  },
  {
    id: '8',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    size: 9,
    price: 1840.70,
    description: 'Tenis Converse Chuck Taylor All Star clásicos. Un icono del estilo casual.',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'unisex',
    stock: 30
  },
  {
    id: '9',
    name: 'Air Jordan 1 Mid',
    brand: 'Nike',
    size: 12,
    price: 3944.70,
    description: 'Tenis icónicos Air Jordan 1 Mid con diseño atemporal. Estilo urbano y comodidad superior.',
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'hombre',
    stock: 22
  },
  {
    id: '10',
    name: 'Puma Suede Classic',
    brand: 'Puma',
    size: 9,
    price: 2103.70,
    description: 'Tenis Puma Suede Classic en gamuza premium. Un clásico que nunca pasa de moda.',
    imageUrl: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'unisex',
    stock: 16
  },

  // TENIS PARA MUJER
  {
    id: '11',
    name: 'Air Max 270',
    brand: 'Nike',
    size: 7,
    price: 3681.70,
    description: 'Tenis Nike Air Max 270 para mujer con diseño elegante y máxima comodidad. Perfectos para el día a día.',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 20
  },
  {
    id: '12',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    size: 6,
    price: 3155.70,
    description: 'Clásicos Nike Air Force 1 para mujer en color blanco. Un básico que combina con todo.',
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 28
  },
  {
    id: '13',
    name: 'Ultraboost Light',
    brand: 'Adidas',
    size: 7,
    price: 4470.70,
    description: 'Tenis Adidas Ultraboost Light para mujer. Ultra ligeros con tecnología Boost responsive.',
    imageUrl: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 15
  },
  {
    id: '14',
    name: 'Superstar Platform',
    brand: 'Adidas',
    size: 8,
    price: 2892.70,
    description: 'Adidas Superstar con plataforma para mujer. Estilo retro con altura adicional.',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 18
  },
  {
    id: '15',
    name: 'NMD_R1',
    brand: 'Adidas',
    size: 6,
    price: 3418.70,
    description: 'Tenis Adidas NMD_R1 para mujer con diseño moderno y tecnología Boost. Comodidad y estilo urbano.',
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 14
  },
  {
    id: '16',
    name: 'Fresh Foam X 880',
    brand: 'New Balance',
    size: 8,
    price: 3681.70,
    description: 'New Balance Fresh Foam X 880 para mujer. Perfectos para running con amortiguación superior.',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 12
  },
  {
    id: '17',
    name: 'Cloudstratus',
    brand: 'On',
    size: 7,
    price: 4470.70,
    description: 'On Cloudstratus para mujer con doble capa de CloudTec. Máxima amortiguación para largas distancias.',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 10
  },
  {
    id: '18',
    name: 'Chuck 70 High Top',
    brand: 'Converse',
    size: 8,
    price: 2366.70,
    description: 'Converse Chuck 70 High Top para mujer. Diseño vintage con materiales premium.',
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 22
  },
  {
    id: '19',
    name: 'Cali Sport',
    brand: 'Puma',
    size: 7,
    price: 2497.70,
    description: 'Puma Cali Sport para mujer con diseño inspirado en California. Estilo deportivo y elegante.',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 17
  },
  {
    id: '20',
    name: 'Vans Old Skool',
    brand: 'Vans',
    size: 8,
    price: 1972.20,
    description: 'Vans Old Skool clásicos para mujer. El icónico estilo skate en versión femenina.',
    imageUrl: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 25
  },
  {
    id: '21',
    name: 'Gel-Kayano 29',
    brand: 'Asics',
    size: 9,
    price: 4207.70,
    description: 'Asics Gel-Kayano 29 para mujer con tecnología GEL. Soporte y amortiguación para pronadores.',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 11
  },
  {
    id: '22',
    name: 'React Infinity Run',
    brand: 'Nike',
    size: 8,
    price: 4076.70,
    description: 'Nike React Infinity Run para mujer. Diseñados para reducir lesiones y maximizar comodidad.',
    imageUrl: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 13
  },
  {
    id: '23',
    name: 'Air Max 97',
    brand: 'Nike',
    size: 9,
    price: 2892.70,
    description: 'Nike Air Max 97 para mujer. Diseño futurista y amortiguación completa.',
    imageUrl: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 4
  },
  {
    id: '24',
    name: 'ZoomX Vaporfly',
    brand: 'Nike',
    size: 6,
    price: 6574.70,
    description: 'Nike ZoomX Vaporfly Next% para mujer. Tenis de competición con tecnología de elite.',
    imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=400&h=300&q=80',
    gender: 'mujer',
    stock: 6
  }
];
