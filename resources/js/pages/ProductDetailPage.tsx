import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { getShopInfo } from '../data/shops';
import { Star, ShoppingCart, Package, Clock, Truck, Shield, ChevronLeft, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { RootLayout } from '../components/RootLayout';
import { url } from '../utils';

const ProductDetailPage = ({ productId }: { productId: string }) => {
  const { addToCart, addRecentlyViewed } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);

  // Add to recently viewed when product is loaded
  useEffect(() => {
    if (product && productId) {
      addRecentlyViewed(product);
    }
  }, [productId, product?.id, addRecentlyViewed]); // Depend on productId and product.id

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Бүтээгдэхүүн олдсонгүй</h1>
        <button
          onClick={() => router.visit(url('/'))}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Нүүр хуудас руу буцах
        </button>
      </div>
    );
  }

  const shopInfo = getShopInfo(product.shop);

  const handleAddToCart = () => {
    addToCart({ product, quantity });
    toast.success('Сагсанд нэмэгдлээ!', {
      description: `${quantity}x ${product.nameMn}`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium"
      >
        <ChevronLeft className="w-5 h-5" />
        Буцах
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 sticky top-24">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.type === 'preorder' && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Урьдчилсан захиалга
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold">
                {discount}% хямдрал
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Shop Badge */}
          {shopInfo && (
            <button
              onClick={() => router.visit(url(`/shop/${product.shop}`))}
              className={`${shopInfo.bgColor} ${shopInfo.color} px-4 py-2 rounded-lg font-semibold mb-4 inline-flex items-center gap-2 hover:shadow-md transition-shadow`}
            >
              <Store className="w-4 h-4" />
              {shopInfo.name}
            </button>
          )}

          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {product.nameMn}
            </h1>
            <p className="text-xl text-gray-600">{product.name}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400">({product.reviews} үнэлгээ)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.originalPrice && (
              <div className="text-lg text-gray-400 line-through mb-1">
                {product.originalPrice.toLocaleString()}₮
              </div>
            )}
            <div className="text-4xl font-bold text-gray-900">
              {product.price.toLocaleString()}₮
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{product.descriptionMn}</p>
          </div>

          {/* Stock/Pre-order Info */}
          {product.type === 'ready' && product.stock ? (
            <div className="mb-6 flex items-center gap-2 text-green-600">
              <Package className="w-5 h-5" />
              <span className="font-medium">Нөөцтэй ({product.stock} ширхэг)</span>
            </div>
          ) : product.type === 'preorder' && product.preorderDate ? (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                <Clock className="w-5 h-5" />
                Урьдчилсан захиалга
              </div>
              <p className="text-sm text-orange-600">
                Хүргэх огноо: {new Date(product.preorderDate).toLocaleDateString('mn-MN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ) : null}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тоо ширхэг
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center border border-gray-300 rounded-lg font-medium"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <ShoppingCart className="w-5 h-5" />
            Сагсанд нэмэх
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              router.visit(url('/cart'));
            }}
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-8"
          >
            Худалдаж авах
          </button>

          {/* Features */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>50,000₮-с дээш захиалгад хүргэлт үнэгүй</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>100% жинхэнэ бүтээгдэхүүн баталгаатай</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Package className="w-5 h-5 text-blue-600" />
              <span>30 хоногийн дотор буцаалт боломжтой</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default ProductDetailPage;
