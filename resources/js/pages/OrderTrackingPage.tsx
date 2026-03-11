import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useApp } from '../context/AppContext';
import { Package, Truck, CheckCircle, XCircle, Clock, MapPin, Phone, User } from 'lucide-react';
import { RootLayout } from '../components/RootLayout';
import { url } from '../utils';

const OrderTrackingPage = ({ orderNumber: initialOrderNumber }: { orderNumber?: string }) => {
  const { user } = useApp();
  const [searchOrderNumber, setSearchOrderNumber] = useState(initialOrderNumber || '');

  // Find order by order number
  const order = user?.orders.find(o => o.orderNumber === searchOrderNumber);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Хүлээгдэж байна',
        };
      case 'confirmed':
        return {
          icon: CheckCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Баталгаажсан',
        };
      case 'shipping':
        return {
          icon: Truck,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          label: 'Хүргэлтэнд',
        };
      case 'delivered':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Хүргэгдсэн',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Цуцлагдсан',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Тодорхойгүй',
        };
    }
  };

  const getTrackingSteps = (status: string) => {
    const allSteps = [
      { key: 'pending', label: 'Захиалга хүлээн авсан', icon: Clock },
      { key: 'confirmed', label: 'Баталгаажуулсан', icon: CheckCircle },
      { key: 'shipping', label: 'Хүргэлтэнд явж байна', icon: Truck },
      { key: 'delivered', label: 'Хүргэгдсэн', icon: CheckCircle },
    ];

    const statusOrder = ['pending', 'confirmed', 'shipping', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchOrderNumber.trim()) {
      router.visit(url(`/order-tracking/${searchOrderNumber}`));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Захиалга хайх
          </h1>
          <p className="text-gray-600">
            Захиалгын дугаараар илгээлтийн мэдээлэл шалгах
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchOrderNumber}
              onChange={(e) => setSearchOrderNumber(e.target.value)}
              placeholder="Захиалгын дугаар (жнь: NO12345678)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Хайх
            </button>
          </form>
        </div>

        {/* Order Details */}
        {order ? (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${getStatusInfo(order.status).borderColor}`}>
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const StatusIcon = getStatusInfo(order.status).icon;
                  return <StatusIcon className={`w-12 h-12 ${getStatusInfo(order.status).color}`} />;
                })()}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getStatusInfo(order.status).label}
                  </h2>
                  <p className="text-gray-600">
                    Захиалга: {order.orderNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Огноо</p>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString('mn-MN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Tracking Progress */}
              <div className="relative mt-8">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${(getTrackingSteps(order.status).filter(s => s.completed).length / 4) * 100}%`,
                    }}
                  />
                </div>

                <div className="relative grid grid-cols-4 gap-4">
                  {getTrackingSteps(order.status).map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            step.completed
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <p
                          className={`text-xs text-center ${
                            step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Хүргэх хаяг
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{order.shippingAddress.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p>{order.shippingAddress.district}, {order.shippingAddress.khoroo}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p className="text-sm text-gray-500">{order.shippingAddress.detailAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Захиалсан бараа ({order.items.length})
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.product.nameMn}</h4>
                      <p className="text-sm text-gray-600">{item.product.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Тоо: {item.quantity}</span>
                        <span className="font-semibold text-gray-900">
                          {(item.product.price * item.quantity).toLocaleString()}₮
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Барааны үнэ</span>
                  <span>{(order.total - order.shippingFee).toLocaleString()}₮</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Хүргэлт</span>
                  <span>{order.shippingFee === 0 ? 'Үнэгүй' : `${order.shippingFee.toLocaleString()}₮`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Нийт дүн</span>
                  <span>{order.total.toLocaleString()}₮</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-900 mb-2">Асуулт байна уу?</h3>
              <p className="text-gray-600 mb-4">
                Манай тусламжийн төв танд туслахад бэлэн байна
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:77111234"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  7711-1234
                </a>
                <button
                  onClick={() => router.visit(url('/contact'))}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Холбоо барих
                </button>
              </div>
            </div>
          </div>
        ) : searchOrderNumber ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Захиалга олдсонгүй
            </h2>
            <p className="text-gray-600 mb-6">
              Захиалгын дугаар: <span className="font-semibold">{searchOrderNumber}</span>
            </p>
            <button
              onClick={() => {
                setSearchOrderNumber('');
                router.visit(url('/order-tracking'));
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Дахин хайх
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Захиалгын дугаар оруулна уу
            </h2>
            <p className="text-gray-600">
              Та дээрх хайлтын хэсэгт захиалгын дугаараа оруулна уу
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.visit(url('/profile'))}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Профайл руу буцах
          </button>
        </div>
      </div>
    </div>
  );
};

OrderTrackingPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default OrderTrackingPage;
