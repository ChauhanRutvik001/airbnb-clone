import { FiCamera, FiCheck, FiClock, FiCoffee, FiDroplet, FiHome, FiLock, FiMapPin, FiShield, FiSun, FiTv, FiWifi, FiWind } from 'react-icons/fi';

export const listingTabs = ['Photos', 'Amenities', 'Reviews', 'Location'];

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    alt: 'Spacious living room',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    alt: 'Seating area',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Jacuzzi',
  },
  {
    src: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80',
    alt: 'Bedroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=80',
    alt: 'Building exterior',
    overlay: true,
  },
];

export const perks = [
  {
    icon: FiWind,
    title: 'Outdoor entertainment',
    description: 'The pool and alfresco dining are great for summer trips.',
  },
  {
    icon: FiWind,
    title: 'Designed for staying cool',
    description: 'Beat the heat with the A/C and ceiling fan.',
  },
  {
    icon: FiHome,
    title: 'Self check-in',
    description: 'You can check in with the building staff.',
  },
];

export const sleepCards = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=80',
    title: 'Bedroom',
    subtitle: '1 double bed',
  },
  {
    src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1100&q=80',
    title: 'Living room',
    subtitle: '1 sofa',
  },
];

export const octoberWeeks = [
  [' ', ' ', ' ', ' ', '1', '2', '3'],
  ['4', '5', '6', '7', '8', '9', '10'],
  ['11', '12', '13', '14', '15', '16', '17'],
  ['18', '19', '20', '21', '22', '23', '24'],
  ['25', '26', '27', '28', '29', '30', '31'],
];

export const novemberWeeks = [
  [' ', ' ', ' ', ' ', ' ', ' ', '1'],
  ['2', '3', '4', '5', '6', '7', '8'],
  ['9', '10', '11', '12', '13', '14', '15'],
  ['16', '17', '18', '19', '20', '21', '22'],
  ['23', '24', '25', '26', '27', '28', '29'],
];

export const descriptionParagraphs = [
  'Plan your relaxing holiday at Amor De Goa by Mirashya Homes. Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi for the perfect unwind.',
  'Enjoy high-speed WiFi, Smart TV, pet-friendly comfort, and stylish interiors. Just minutes from Candolim Beach, popular cafes, restaurants, and nightlife, it is ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa.',
];

export const featuredAmenities = [
  { icon: FiWifi, label: 'WiFi' },
  { icon: FiWind, label: 'Air conditioning' },
  { icon: FiTv, label: 'TV' },
  { icon: FiHome, label: 'Kitchen' },
  { icon: FiMapPin, label: 'Free parking on premises' },
  { icon: FiHome, label: 'Pool' },
  { icon: FiHome, label: 'Hot tub' },
  { icon: FiCheck, label: 'Self check-in' },
];

export const amenityCategories = [
  {
    title: 'Bathroom',
    items: [
      { icon: FiWind, label: 'Hair dryer' },
      { icon: FiDroplet, label: 'Shampoo' },
      { icon: FiDroplet, label: 'Conditioner' },
      { icon: FiDroplet, label: 'Hot water' },
    ],
  },
  {
    title: 'Bedroom & Laundry',
    items: [
      { icon: FiHome, label: 'Bed linens' },
      { icon: FiHome, label: 'Extra pillows and blankets' },
      { icon: FiHome, label: 'Iron' },
      { icon: FiHome, label: 'Hangers' },
    ],
  },
  {
    title: 'Entertainment',
    items: [
      { icon: FiTv, label: 'TV' },
      { icon: FiHome, label: 'Books and reading material' },
      { icon: FiHome, label: 'Sound system' },
      { icon: FiHome, label: 'Board games' },
    ],
  },
  {
    title: 'Family',
    items: [
      { icon: FiHome, label: 'Crib' },
      { icon: FiHome, label: 'High chair' },
      { icon: FiHome, label: 'Babysitter recommendations' },
      { icon: FiHome, label: 'Children\'s books and toys' },
    ],
  },
  {
    title: 'Heating & Cooling',
    items: [
      { icon: FiWind, label: 'Air conditioning' },
      { icon: FiWind, label: 'Ceiling fan' },
      { icon: FiSun, label: 'Portable heater' },
      { icon: FiSun, label: 'Room-darkening shades' },
    ],
  },
  {
    title: 'Home Safety',
    items: [
      { icon: FiShield, label: 'Smoke alarm' },
      { icon: FiShield, label: 'Carbon monoxide alarm' },
      { icon: FiShield, label: 'First aid kit' },
      { icon: FiCamera, label: 'Exterior security cameras on property' },
    ],
  },
  {
    title: 'Internet & Office',
    items: [
      { icon: FiWifi, label: 'WiFi' },
      { icon: FiHome, label: 'Dedicated workspace' },
      { icon: FiHome, label: 'Ethernet connection' },
      { icon: FiClock, label: 'Laptop-friendly workspace' },
    ],
  },
  {
    title: 'Kitchen & Dining',
    items: [
      { icon: FiHome, label: 'Kitchen' },
      { icon: FiCoffee, label: 'Coffee maker' },
      { icon: FiHome, label: 'Microwave' },
      { icon: FiHome, label: 'Blender' },
    ],
  },
  {
    title: 'Location Features',
    items: [
      { icon: FiMapPin, label: 'Beach access' },
      { icon: FiMapPin, label: 'Private entrance' },
      { icon: FiMapPin, label: 'Resort access' },
      { icon: FiMapPin, label: 'Sea view' },
    ],
  },
  {
    title: 'Outdoor',
    items: [
      { icon: FiSun, label: 'Patio or balcony' },
      { icon: FiSun, label: 'Outdoor furniture' },
      { icon: FiSun, label: 'Sun loungers' },
      { icon: FiSun, label: 'Garden view' },
    ],
  },
  {
    title: 'Parking & Facilities',
    items: [
      { icon: FiMapPin, label: 'Free parking on premises' },
      { icon: FiHome, label: 'Pool' },
      { icon: FiHome, label: 'Hot tub' },
      { icon: FiHome, label: 'Gym' },
      { icon: FiHome, label: 'Elevator' },
    ],
  },
  {
    title: 'Services',
    items: [
      { icon: FiCheck, label: 'Self check-in' },
      { icon: FiCheck, label: 'Cleaning available during stay' },
      { icon: FiLock, label: 'Long-term stays allowed' },
      { icon: FiCheck, label: 'Luggage dropoff allowed' },
      { icon: FiCheck, label: 'Pets allowed' },
    ],
  },
];
