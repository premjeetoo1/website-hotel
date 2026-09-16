'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCartToast } from '@/components/CartToast';
import { Plus, Check } from 'lucide-react';

const menuCategories = [
  {
    id: 'thali',
    name: 'Thalis',
    bengaliName: 'থালি',
    icon: '🍛',
    description: 'Complete meals with rice, dal, vegetables, chutney, papad & sweet',
    items: [
      { name: 'Fish Thali', bengali: 'মাছ থালি', price: '₹280', desc: 'Fresh river fish curry, rice, dal, seasonal veg, chutney, papad, mishti doi', popular: true, spicy: true },
      { name: 'Mutton Thali', bengali: 'মাংস থালি', price: '₹350', desc: 'Tender mutton kosha, rice, dal, salad, achar, papad, mishti doi', popular: true, spicy: true },
      { name: 'Chicken Thali', bengali: 'চিকেন থালি', price: '₹300', desc: 'Chicken curry, rice, dal, seasonal veg, chutney, papad, mishti doi', popular: false, spicy: true },
      { name: 'Egg Thali', bengali: 'ডিম থালি', price: '₹180', desc: 'Egg curry, rice, dal, seasonal veg, chutney, papad, mishti doi', popular: false, spicy: true },
      { name: 'Veg Thali', bengali: 'ভেজ থালি', price: '₹200', desc: 'Seasonal vegetables, dal, rice, roti, papad, chutney, mishti doi', popular: false, spicy: false },
      { name: 'Special Mixed Thali', bengali: 'স্পেশাল মিক্সড থালি', price: '₹400', desc: 'Fish + Chicken + Mutton, rice, dal, veg, chutney, papad, sweets', popular: true, spicy: true },
    ],
  },
  {
    id: 'biryani',
    name: 'Biryani & Rice',
    bengaliName: 'বিরিয়ানি ও ভাত',
    icon: '🍚',
    description: 'Aromatic basmati rice dishes with raita & salad',
    items: [
      { name: 'Egg Biryani (2 Eggs)', bengali: 'ডিম বিরিয়ানি (২ ডিম)', price: '₹180', desc: 'Basmati rice, boiled eggs, aromatic spices, mint raita', popular: true, spicy: false },
      { name: 'Chicken Biryani', bengali: 'চিকেন বিরিয়ানি', price: '₹220', desc: 'Basmati rice, chicken pieces, saffron, mint raita', popular: true, spicy: true },
      { name: 'Mutton Biryani', bengali: 'মাংস বিরিয়ানি', price: '₹280', desc: 'Basmati rice, tender mutton, saffron, mint raita', popular: false, spicy: true },
      { name: 'Veg Biryani', bengali: 'ভেজ বিরিয়ানি', price: '₹160', desc: 'Basmati rice, mixed vegetables, aromatic spices, raita', popular: false, spicy: false },
      { name: 'Chicken Fried Rice', bengali: 'চিকেন ফ্রাইড রাইস', price: '₹180', desc: 'Wok-tossed rice, chicken, vegetables, soy sauce', popular: false, spicy: false },
      { name: 'Veg Fried Rice', bengali: 'ভেজ ফ্রাইড রাইস', price: '₹140', desc: 'Wok-tossed rice, mixed vegetables, soy sauce', popular: false, spicy: false },
      { name: 'Egg Fried Rice', bengali: 'ডিম ফ্রাইড রাইস', price: '₹150', desc: 'Wok-tossed rice, egg, vegetables, soy sauce', popular: false, spicy: false },
      { name: 'Plain Rice & Dal', bengali: 'সাদা ভাত ও ডাল', price: '₹80', desc: 'Steamed rice with yellow dal tadka, ghee', popular: false, spicy: false },
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese & Indo-Chinese',
    bengaliName: 'চাইনিজ ও ইন্ডো-চাইনিজ',
    icon: '🥢',
    description: 'Wok-tossed favorites with authentic flavors',
    items: [
      { name: 'Egg Chowmein', bengali: 'এগ চাউমিন', price: '₹140', desc: 'Hakka noodles, egg, vegetables, soy sauce', popular: false, spicy: false },
      { name: 'Chicken Chowmein', bengali: 'চিকেন চাউমিন', price: '₹160', desc: 'Hakka noodles, chicken, vegetables, soy sauce', popular: true, spicy: false },
      { name: 'Veg Chowmein', bengali: 'ভেজ চাউমিন', price: '₹120', desc: 'Hakka noodles, mixed vegetables, soy sauce', popular: false, spicy: false },
      { name: 'Chicken Hakka Noodles', bengali: 'চিকেন হাক্কা নুডলস', price: '₹170', desc: 'Thin noodles, chicken, vegetables, spicy sauce', popular: false, spicy: true },
      { name: 'Chicken Manchurian', bengali: 'চিকেন মাঞ্চুরিয়ান', price: '₹180', desc: 'Crispy chicken balls in tangy Manchurian sauce', popular: true, spicy: true },
      { name: 'Chilli Chicken', bengali: 'চিলি চিকেন', price: '₹190', desc: 'Chicken with bell peppers, onions, green chilli sauce', popular: true, spicy: true },
      { name: 'Veg Manchurian', bengali: 'ভেজ মাঞ্চুরিয়ান', price: '₹150', desc: 'Vegetable balls in tangy Manchurian sauce', popular: false, spicy: true },
      { name: 'Chilli Paneer', bengali: 'চিলি পনির', price: '₹170', desc: 'Cottage cheese with bell peppers, onions, chilli sauce', popular: false, spicy: true },
      { name: 'Spring Rolls (4 pcs)', bengali: 'স্প্রিং রোলস', price: '₹100', desc: 'Crispy vegetable spring rolls with sweet chilli sauce', popular: false, spicy: false },
    ],
  },
  {
    id: 'tibetan',
    name: 'Tibetan Specialties',
    bengaliName: 'তিব্বতী বিশেষান্ন',
    icon: '🥟',
    description: 'Traditional Himalayan favorites',
    items: [
      { name: 'Pork Momo (8 pcs)', bengali: 'পোর্ক মোমো (৮ পিস)', price: '₹120', desc: 'Steamed dumplings with minced pork, spicy tomato chutney', popular: true, spicy: true },
      { name: 'Chicken Momo (8 pcs)', bengali: 'চিকেন মোমো (৮ পিস)', price: '₹110', desc: 'Steamed dumplings with minced chicken, spicy chutney', popular: true, spicy: true },
      { name: 'Veg Momo (8 pcs)', bengali: 'ভেজ মোমো (৮ পিস)', price: '₹90', desc: 'Steamed dumplings with cabbage, carrot, onion, chutney', popular: false, spicy: true },
      { name: 'Fried Momo (8 pcs)', bengali: 'ফ্রাইড মোমো (৮ পিস)', price: '₹130', desc: 'Crispy fried dumplings with spicy schezwan sauce', popular: false, spicy: true },
      { name: 'Chicken Thukpa', bengali: 'চিকেন থুপকা', price: '₹160', desc: 'Tibetan noodle soup, chicken, vegetables, aromatic broth', popular: true, spicy: false },
      { name: 'Veg Thukpa', bengali: 'ভেজ থুপকা', price: '₹130', desc: 'Tibetan noodle soup, vegetables, aromatic broth', popular: false, spicy: false },
      { name: 'Pork Thukpa', bengali: 'পোর্ক থুপকা', price: '₹180', desc: 'Tibetan noodle soup, pork, vegetables, rich broth', popular: false, spicy: false },
      { name: 'Shaphaley (2 pcs)', bengali: 'শাফালে (২ পিস)', price: '₹140', desc: 'Tibetan meat pies with minced beef/cabbage, spicy chutney', popular: false, spicy: true },
    ],
  },
  {
    id: 'breakfast',
    name: 'Breakfast & Snacks',
    bengaliName: 'ব্রেকফাস্ট ও স্ন্যাকস',
    icon: '☕',
    description: 'Traditional Bengali breakfast served until 11 AM',
    items: [
      { name: 'Luchi & Aloor Dum', bengali: 'লুচি ও আলুর দম', price: '₹80', desc: 'Deep-fried flatbread with spicy potato curry, salad', popular: true, spicy: true },
      { name: 'Radhaballabhi', bengali: 'রাধাবল্লভী', price: '₹90', desc: 'Stuffed puri with spiced urad dal filling, aloor dum', popular: false, spicy: true },
      { name: 'Koraishutir Kachuri', bengali: 'করাইশুতির কচুরি', price: '₹90', desc: 'Green pea stuffed kachuri with aloor dum, chutney', popular: false, spicy: true },
      { name: 'Plain Paratha Set', bengali: 'সাদা পরाठা সেট', price: '₹100', desc: '2 parathas, aloo bhaji, curd, pickle, chutney', popular: false, spicy: false },
      { name: 'Aloo Paratha Set', bengali: 'আলু পরाठা সেট', price: '₹110', desc: '2 stuffed parathas, curd, pickle, chutney, butter', popular: true, spicy: false },
      { name: 'Egg Roll', bengali: 'এগ রোল', price: '₹70', desc: 'Paratha rolled with egg, onion, chilli, tomato, sauce', popular: true, spicy: false },
      { name: 'Chicken Roll', bengali: 'চিকেন রোল', price: '₹90', desc: 'Paratha rolled with chicken, salad, onion, sauce', popular: true, spicy: false },
      { name: 'Mutton Roll', bengali: 'মাংস রোল', price: '₹110', desc: 'Paratha rolled with mutton keema, salad, sauce', popular: false, spicy: true },
      { name: 'Veg Cutlet (2 pcs)', bengali: 'ভেজ কাটলেট (২ পিস)', price: '₹60', desc: 'Crispy vegetable cutlets with mint chutney', popular: false, spicy: false },
      { name: 'French Toast', bengali: 'ফরেঞ্চ টোস্ট', price: '₹80', desc: 'Golden fried bread with honey, butter, fruits', popular: false, spicy: false },
    ],
  },
  {
    id: 'curries',
    name: 'Main Course Curries',
    bengaliName: 'মেইন কোর্স করি',
    icon: '🍲',
    description: 'Served with rice or roti (ordered separately)',
    items: [
      { name: 'Fish Curry (Rui/Katla)', bengali: 'মাছের ঝোল (রুই/কাতলা)', price: '₹180', desc: 'Fresh river fish in traditional Bengali mustard gravy', popular: true, spicy: true },
      { name: 'Fish Kalia', bengali: 'মাছ কালিয়া', price: '₹200', desc: 'Fish in rich onion-tomato gravy with garam masala', popular: false, spicy: true },
      { name: 'Mutton Kosha', bengali: 'মাংস কষা', price: '₹250', desc: 'Slow-cooked mutton in thick spicy gravy', popular: true, spicy: true },
      { name: 'Chicken Curry', bengali: 'চিকেন করি', price: '₹180', desc: 'Chicken in Bengali style onion-ginger gravy', popular: false, spicy: true },
      { name: 'Chicken Rezala', bengali: 'চিকেন রেজালা', price: '₹200', desc: 'Chicken in white yogurt-cashew gravy', popular: false, spicy: false },
      { name: 'Egg Curry', bengali: 'ডিমের করি', price: '₹120', desc: 'Boiled eggs in tomato-onion gravy', popular: false, spicy: true },
      { name: 'Cholar Dal', bengali: 'চোলার ডাল', price: '₹90', desc: 'Bengal gram dal with coconut, raisins, spices', popular: false, spicy: false },
      { name: 'Aloo Posto', bengali: 'আলু পোস্তো', price: '₹100', desc: 'Potatoes in poppy seed paste, mustard oil', popular: true, spicy: false },
      { name: 'Shukto', bengali: 'শুক্তো', price: '₹100', desc: 'Bitter-sweet mixed vegetable stew', popular: false, spicy: false },
      { name: 'Paneer Butter Masala', bengali: 'পনির বাটার মাসালা', price: '₹180', desc: 'Cottage cheese in rich tomato-cashew gravy', popular: false, spicy: false },
    ],
  },
  {
    id: 'sweets',
    name: 'Bengali Sweets & Desserts',
    bengaliName: 'বাঙালি মিষ্টি ও ডেজার্ট',
    icon: '🍮',
    description: 'Traditional sweets made fresh daily',
    items: [
      { name: 'Rosogolla (4 pcs)', bengali: 'রসগোল্লা (৪ পিস)', price: '₹60', desc: 'Soft cottage cheese balls in light cardamom syrup', popular: true, spicy: false },
      { name: 'Gulab Jamun (4 pcs)', bengali: 'গুলাব জামুন (৪ পিস)', price: '₹60', desc: 'Deep-fried milk solids in rose-cardamom syrup', popular: true, spicy: false },
      { name: 'Mishti Doi', bengali: 'মিষ্টি দই', price: '₹50', desc: 'Traditional sweetened yogurt in earthen pot', popular: true, spicy: false },
      { name: 'Rajbhog (2 pcs)', bengali: 'রাজভোগ (২ পিস)', price: '₹70', desc: 'Large stuffed rosogolla with pistachios, cardamom', popular: false, spicy: false },
      { name: 'Kheer Kadam', bengali: 'ক্ষীর কদম', price: '₹80', desc: 'Rosogolla coated with khoya, cardamom, pistachios', popular: false, spicy: false },
      { name: 'Payesh', bengali: 'পায়েস', price: '₹70', desc: 'Bengali rice pudding with cardamom, raisins, nuts', popular: false, spicy: false },
      { name: 'Mohan Bhog', bengali: 'মোহন ভোগ', price: '₹70', desc: 'Semolina halwa with ghee, sugar, cardamom, raisins', popular: false, spicy: false },
      { name: 'Ice Cream (2 scoops)', bengali: 'আইস ك্রিম (২ স্কুপ)', price: '₹80', desc: 'Vanilla / Chocolate / Mango / Kulfi', popular: false, spicy: false },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    bengaliName: 'পানীয়',
    icon: '🥤',
    description: 'Hot & cold beverages',
    items: [
      { name: 'Masala Chai', bengali: 'মসলা চা', price: '₹25', desc: 'Spiced Indian tea with milk', popular: true, spicy: false },
      { name: 'Coffee', bengali: 'কফি', price: '₹35', desc: 'Hot coffee with milk', popular: false, spicy: false },
      { name: 'Cappuccino', bengali: 'কাপুচিনো', price: '₹60', desc: 'Espresso with steamed milk foam', popular: true, spicy: false },
      { name: 'Lassi (Sweet/Salted)', bengali: 'লসি (মিষ্টি/নুন)', price: '₹50', desc: 'Traditional yogurt drink', popular: false, spicy: false },
      { name: 'Mango Lassi', bengali: 'মাঙ্গো লসি', price: '₹70', desc: 'Yogurt blended with mango pulp', popular: true, spicy: false },
      { name: 'Cold Coffee', bengali: 'কোল্ড কফি', price: '₹80', desc: 'Iced coffee with ice cream', popular: false, spicy: false },
      { name: 'Fresh Lime Soda', bengali: 'ফ্রেশ লাইম সোডা', price: '₹40', desc: 'Sweet / Salted / Mixed', popular: false, spicy: false },
      { name: 'Soft Drinks', bengali: 'সফট ড্রিংکس', price: '₹30', desc: 'Coke / Sprite / Fanta / Thums Up', popular: false, spicy: false },
      { name: 'Mineral Water', bengali: 'মিনারেল ওয়াটার', price: '₹20', desc: '500ml / 1L bottle', popular: false, spicy: false },
    ],
  },
  {
    id: 'sides',
    name: 'Sides & Extras',
    bengaliName: 'সাইডস ও এক্স্ট্রা',
    icon: '🍽️',
    description: 'Add-ons to complete your meal',
    items: [
      { name: 'Plain Roti (2 pcs)', bengali: 'সাদা রুটি (২ পিস)', price: '₹30', desc: 'Fresh whole wheat flatbread', popular: false, spicy: false },
      { name: 'Butter Naan', bengali: 'বাটার নান', price: '₹40', desc: 'Leavened flatbread with butter', popular: false, spicy: false },
      { name: 'Luchi (2 pcs)', bengali: 'লুচি (২ পিস)', price: '₹30', desc: 'Deep-fried refined flour bread', popular: false, spicy: false },
      { name: 'Steamed Rice', bengali: 'সাদা ভাত', price: '₹40', desc: 'Plain steamed basmati rice', popular: false, spicy: false },
      { name: 'Jeera Rice', bengali: 'জিরা রাইস', price: '₹60', desc: 'Cumin flavored basmati rice', popular: false, spicy: false },
      { name: 'Papad (2 pcs)', bengali: 'পাপড় (২ পিস)', price: '₹20', desc: 'Roasted / Fried lentil wafers', popular: false, spicy: false },
      { name: 'Green Salad', bengali: 'গ্রিন স্যালাড', price: '₹40', desc: 'Cucumber, tomato, onion, lemon', popular: false, spicy: false },
      { name: 'Pickle', bengali: 'আচার', price: '₹15', desc: 'Mango / Mixed vegetable pickle', popular: false, spicy: true },
      { name: 'Chutney', bengali: 'চাটনি', price: '₹20', desc: 'Tomato / Mint / Tamarind chutney', popular: false, spicy: false },
      { name: 'Extra Dal', bengali: 'এক্সট্রা ডাল', price: '₹40', desc: 'Additional serving of dal tadka', popular: false, spicy: false },
      { name: 'Extra Gravy', bengali: 'এক্সট্রা গ্রेভি', price: '₹50', desc: 'Additional serving of curry gravy', popular: false, spicy: true },
    ],
  },
];

export default function MenuPageContent() {
  const [activeCategory, setActiveCategory] = useState('thali');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useCartToast();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (item: { name: string; bengali: string; price: string }) => {
    addItem({
      id: `menupage-${item.name}`,
      name: item.name,
      bengaliName: item.bengali,
      price: item.price,
    });
    showToast(item.name);
    setAddedItems((prev) => ({ ...prev, [item.name]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.name]: false }));
    }, 1200);
  };

  const currentCategory = menuCategories.find(cat => cat.id === activeCategory);

  const filteredItems = currentCategory?.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.bengali.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="section-title">Our Complete Menu</h1>
          <p className="section-subtitle mx-auto">
            Authentic Bengali, Chinese & Tibetan dishes made with fresh ingredients
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="input-field pl-12 w-full"
              aria-label="Search menu items"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Menu categories">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`menu-panel-${category.id}`}
                id={`menu-tab-${category.id}`}
                onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-dark-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {currentCategory && (
          <div
            id={`menu-panel-${currentCategory.id}`}
            role="tabpanel"
            aria-labelledby={`menu-tab-${currentCategory.id}`}
            className="animate-fade-in"
          >
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{currentCategory.icon}</span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-dark-900">{currentCategory.name}</h2>
                  <p className="font-bengali text-lg text-primary-500">{currentCategory.bengaliName}</p>
                </div>
              </div>
              <p className="text-dark-500">{currentCategory.description}</p>
            </div>

            {filteredItems.length > 0 ? (
              <div className="space-y-4" role="list">
                {filteredItems.map((item, index) => (
                  <article
                    key={`${currentCategory.id}-${index}`}
                    className="card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group"
                    role="listitem"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <h3 className="font-heading text-lg md:text-xl font-semibold text-dark-900 group-hover:text-primary-600 transition-colors">
                              {item.name}
                            </h3>
                            {item.popular && (
                              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                                Popular
                              </span>
                            )}
                            {item.spicy && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M10.145 2.194a7.5 7.5 0 0110.79 5.737 7.5 7.5 0 01-4.993 12.632c-.93.435-1.99.624-3.058.624s-2.128-.189-3.057-.624A7.5 7.5 0 012.145 8.54 7.5 7.5 0 0110.145 2.194zm1.053 8.408a.75.75 0 00-1.09-1.09L7.5 10.96 6.445 9.905a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3-3z"/></svg>
                                <span>Spicy</span>
                              </span>
                            )}
                          </div>
                          <p className="font-bengali text-sm text-primary-500 mb-2">{item.bengali}</p>
                          <p className="text-sm text-dark-500 line-clamp-2">{item.desc}</p>
                        </div>
                        <span className="font-heading text-xl md:text-2xl font-bold text-primary-600 whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 md:w-36">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                          addedItems[item.name]
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'btn-primary'
                        }`}
                        aria-label={`Add ${item.name} to order`}
                      >
                        {addedItems[item.name] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-dark-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-dark-500">No dishes match your search. Try a different keyword.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <svg className="w-10 h-10 mx-auto text-primary-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-heading text-lg font-semibold text-dark-900 mb-2">Fresh Daily</h3>
              <p className="text-dark-500 text-sm">All dishes prepared fresh every morning with local ingredients</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <svg className="w-10 h-10 mx-auto text-primary-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-heading text-lg font-semibold text-dark-900 mb-2">Customizable</h3>
              <p className="text-dark-500 text-sm">Adjust spice levels, request modifications for dietary needs</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <svg className="w-10 h-10 mx-auto text-primary-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className="font-heading text-lg font-semibold text-dark-900 mb-2">Bulk Orders</h3>
              <p className="text-dark-500 text-sm">Catering for events, parties & corporate orders available</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/#contact" className="btn-primary inline-flex items-center space-x-2 px-8 py-3 text-lg">
              <span>Place Your Order Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="mt-4 text-dark-500 text-sm">Call <a href="tel:+919563161422" className="text-primary-600 hover:underline font-medium">095631 61422</a> or order via WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}