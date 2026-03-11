import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { districts } from '../data/districts';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, isAuthenticated, user, clearCart, addOrder } = useApp();
  const [step, setStep] = useState<'shipping' | 'payment' | 'complete'>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    district: '',
    khoroo: '',
    address: '',
    detailAddress: '',
  });

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const shippingFee = cartTotal >= 50000 ? 0 : 3000;
  const total = cartTotal + shippingFee;

  useEffect(() => {
    if (cart.length === 0 && step !== 'complete') {
      navigate('/cart');
    }
  }, [cart.length, step, navigate]);

  if (cart.length === 0 && step !== 'complete') {
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Нэвтэрнэ үү');
      navigate('/profile');
      return;
    }
    setStep('payment');
    // Generate mock QPay QR code
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=noomko_payment_${Date.now()}_${total}`);
  };

  const handlePaymentComplete = () => {
    setTimeout(() => {
      // Create order
      addOrder({
        items: cart,
        total: total,
        shippingFee: shippingFee,
        status: 'confirmed',
        shippingAddress: {
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          district: shippingInfo.district,
          khoroo: shippingInfo.khoroo,
          address: shippingInfo.address,
          detailAddress: shippingInfo.detailAddress,
        },
      });
      clearCart();
      setStep('complete');
      toast.success('Захиалга амжилттай баталгаажлаа!');
    }, 1000);
  };

  const khoroos = districts.find(d => d.id === selectedDistrict)?.khoroos || [];

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Захиалга баталгаажлаа!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Таны захиалга амжилттай хүлээн авлаа. Баярлалаа.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Захиалгын дугаар</p>
            <p className="text-2xl font-bold text-gray-900">
              #{Date.now().toString().slice(-8)}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Дэлгүүр үзэх
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Захиалга харах
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Төлбөр тооцоо</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="hidden sm:inline font-medium">Хүргэлт</span>
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="hidden sm:inline font-medium">Төлбөр</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Хүргэлтийн мэдээлэл</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Нэр *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Утасны дугаар *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    placeholder="99991234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дүүрэг *
                  </label>
                  <select
                    required
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setShippingInfo({ ...shippingInfo, district: e.target.value, khoroo: '' });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Дүүрэг сонгох</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDistrict && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Хороо *
                    </label>
                    <select
                      required
                      value={shippingInfo.khoroo}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, khoroo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Хороо сонгох</option>
                      {khoroos.map((khoroo) => (
                        <option key={khoroo} value={khoroo}>
                          {khoroo}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Хаяг *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    placeholder="Гудамж, байр, тоот"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Нэмэлт хаяг
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.detailAddress}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, detailAddress: e.target.value })}
                    placeholder="Орц, давхар, тоот"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
              >
                Төлбөр төлөх
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">QPay-ээр төлөх</h2>

              <div className="max-w-sm mx-auto">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <img
                    src={qrCodeUrl}
                    alt="QPay QR Code"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="text-center mb-6">
                  <p className="text-gray-700 mb-2">Төлөх дүн</p>
                  <p className="text-3xl font-bold text-gray-900">{total.toLocaleString()}₮</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    QPay апп-аас дээрх QR кодыг уншуулж төлбөрөө төлнө үү
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Буцах
                  </button>
                  <button
                    onClick={handlePaymentComplete}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Төлбөр төлсөн
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Захиалгын дүн</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.product.nameMn}
                    </p>
                    <p className="text-sm text-gray-600">Ширхэг: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString()}₮
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Нийт</span>
                <span>{cartTotal.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Хүргэлт</span>
                <span>{shippingFee === 0 ? 'Үнэгүй' : `${shippingFee.toLocaleString()}₮`}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                <span>Нийт дүн</span>
                <span>{total.toLocaleString()}₮</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};