import React from 'react';
import { Link } from '@inertiajs/react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { shops } from '../data/shops';
import { ChevronRight, TrendingUp, Package, Sparkles, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

import { RootLayout } from '../components/RootLayout';

const HomePage = () => {
  const featuredProducts = products.filter((p) => p.originalPrice).slice(0, 6);
  const newProducts = products.filter((p) => p.type === 'preorder');
  const { recentlyViewed } = useApp();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Чанартай бүтээгдэхүүн
              <span className="block text-blue-200 mt-2">Танай гэрт хүргэнэ</span>
            </h1>
            <p className="text-base sm:text-lg text-blue-100 mb-6">
              Солонгосын томоохон дэлгүүрүүдээс (E-mart, Costco, Lotte, Olive Young) шууд авчирсан гэр ахуйн бараа, гоо сайхны бүтээгдэхүүн, эрүү�� мэндийн нэмэлт бүтээгдэхүүн
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/all-items"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Бүх бараа үзэх
              </Link>
              <Link
                to="/all-items?preorder=true"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Урьдчилсан захиалга
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Korean Retailers */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Солонгосын шилдэг дэлгүүрүүдээс шууд авчирна
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Бид Солонгосын хамгийн том, итгэлтэй дэлгүүрүүдээс жинхэнэ бүтээгдэхүүнийг шууд авчирч, Улаанбаатар хотод танд хүргэнэ
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {shops.map((shop) => {
              const gradientColors: Record<string, string> = {
                'bg-red-50': 'from-red-50 to-red-100',
                'bg-blue-50': 'from-blue-50 to-blue-100',
                'bg-pink-50': 'from-pink-50 to-pink-100',
                'bg-green-50': 'from-green-50 to-green-100',
                'bg-orange-50': 'from-orange-50 to-orange-100',
                'bg-purple-50': 'from-purple-50 to-purple-100',
                'bg-teal-50': 'from-teal-50 to-teal-100',
                'bg-cyan-50': 'from-cyan-50 to-cyan-100',
              };
              const gradient = gradientColors[shop.bgColor] || 'from-gray-50 to-gray-100';

              return (
                <Link
                  key={shop.id}
                  to={`/shop/${shop.id}`}
                  className={`bg-gradient-to-br ${gradient} rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-shadow group`}
                >
                  <div className={`text-2xl md:text-3xl font-bold ${shop.color} mb-2 group-hover:scale-110 transition-transform`}>
                    {shop.name}
                  </div>
                  <p className="text-xs md:text-sm text-gray-700">{shop.descriptionMn.split(' ').slice(0, 3).join(' ')}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Ангилал</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <Link
            to="/category/home-appliance"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
              alt="Home Appliances"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Гэр ахуйн бараа</h3>
              <div className="flex items-center text-white font-medium text-sm md:text-base">
                Үзэх <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/category/beauty"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800"
              alt="Beauty"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Гоо сайхан</h3>
              <div className="flex items-center text-white font-medium text-sm md:text-base">
                Үзэх <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/category/supplement"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1550572017-4814c96f6024?w=800"
              alt="Supplements"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Эрүүл мэнд</h3>
              <div className="flex items-center text-white font-medium text-sm md:text-base">
                Үзэх <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/all-items?type=ready"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800"
              alt="Ready Stock"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">Бэлэн бараа</h3>
              <div className="flex items-center text-white font-medium text-xs md:text-sm">
                Үзэх <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/all-items?preorder=true"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800"
              alt="Preorder"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">Урьдчилсан</h3>
              <div className="flex items-center text-white font-medium text-xs md:text-sm">
                Үзэх <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/all-items?discount=true"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
              alt="Discounts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">Хямдрал</h3>
              <div className="flex items-center text-white font-medium text-xs md:text-sm">
                Үзэх <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/all-items?new=true"
            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800"
              alt="New Arrivals"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">Шинэ бараа</h3>
              <div className="flex items-center text-white font-medium text-xs md:text-sm">
                Үзэх <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Онцлох хямдрал</h2>
          </div>
          <Link href="/category/home-appliance" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Бүгдийг үзэх <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Pre-order Section */}
      {newProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Урьдчилсан захиалга</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-7 h-7 text-purple-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Саяхан үзсэн</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Үнэгүй хүргэлт</h3>
              <p className="text-gray-600 text-sm">50,000₮-с дээш захиалгад</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Жинхэнэ бараа</h3>
              <p className="text-gray-600 text-sm">Солонгосоос шууд авчирсан</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Шилдэг үнэ</h3>
              <p className="text-gray-600 text-sm">Өрсөлдөхүйц үнэ баталгаатай</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

HomePage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default HomePage;
