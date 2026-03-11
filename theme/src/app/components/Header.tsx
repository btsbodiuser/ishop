import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingCart, User, Menu, Search, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { cartCount, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all-items', name: 'Бүх бараа', path: '/all-items' },
    { id: 'home-appliance', name: 'Гэр ахуйн бараа', path: '/category/home-appliance' },
    { id: 'beauty', name: 'Гоо сайхан', path: '/category/beauty' },
    { id: 'supplement', name: 'Эрүүл мэнд', path: '/category/supplement' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden xs:inline">50,000₮-с дээш захиалгад хүргэлт үнэгүй</span>
            <span className="xs:hidden">Үнэгүй хүргэлт 50,000₮+</span>
          </div>
          <div>
            <a href="tel:77111234" className="hover:underline">
              <span className="hidden sm:inline">Холбоо барих: </span>7711-1234
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold text-lg">
              N
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Noomko</div>
              <div className="text-xs text-gray-500 -mt-1">Дэлгүүр</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigate(isAuthenticated ? '/profile' : '/profile')}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="px-4 py-4 space-y-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};