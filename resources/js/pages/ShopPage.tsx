import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ProductCard } from '../components/ProductCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { products, getCategoryName } from '../data/products';
import { getShopInfo } from '../data/shops';
import { Filter, ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { RootLayout } from '../components/RootLayout';

const ShopPage = ({ shopId }: { shopId: string }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [filter, setFilter] = useState<'all' | 'ready' | 'preorder'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const shopInfo = getShopInfo(shopId || '');
  const shopProducts = products.filter((p) => p.shop === shopId);

  const filteredProducts = shopProducts.filter((p) => {
    if (filter !== 'all' && p.type !== filter) return false;
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
      default:
        return b.rating - a.rating;
    }
  });

  // Get unique categories for this shop
  const categories = Array.from(new Set(shopProducts.map(p => p.category)));
  const activeFiltersCount =
    (categoryFilter !== 'all' ? 1 : 0) +
    (filter !== 'all' ? 1 : 0);

  if (!shopInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Дэлгүүр олдсонгүй</h1>
        <button
          onClick={() => router.visit('/')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Нүүр хуудас руу буцах
        </button>
      </div>
    );
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Ангилал</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Бүгд
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Төлөв</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Бүгд
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'ready'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Нөөцтэй
          </button>
          <button
            onClick={() => setFilter('preorder')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'preorder'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Урьдчилсан захиалга
          </button>
        </div>
      </div>

      {/* Apply button for mobile */}
      <button
        onClick={() => setIsFilterOpen(false)}
        className="md:hidden w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Хайлт хийх ({sortedProducts.length})
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.visit('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium"
      >
        <ChevronLeft className="w-5 h-5" />
        Буцах
      </button>

      {/* Shop Header */}
      <div className={`${shopInfo.bgColor} rounded-xl p-8 mb-6`}>
        <h1 className={`text-4xl font-bold ${shopInfo.color} mb-3`}>
          {shopInfo.name}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{shopInfo.descriptionMn}</p>
        <p className="text-sm text-gray-600">{sortedProducts.length} бүтээгдэхүүн</p>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 flex gap-3">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Шүүлтүүр
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popular">Алдартай</option>
          <option value="price-low">Үнэ ↑</option>
          <option value="price-high">Үнэ ↓</option>
        </select>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900">Шүүлтүүр</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">Эрэмбэлэх:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Алдартай</option>
              <option value="price-low">Үнэ: Бага → Их</option>
              <option value="price-high">Үнэ: Их → Бага</option>
            </select>
          </div>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterContent />
      </FilterDrawer>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Бүтээгдэхүүн олдсонгүй.</p>
        </div>
      )}
    </div>
  );
};

ShopPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default ShopPage;
