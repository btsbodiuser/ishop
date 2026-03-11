import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { router } from '@inertiajs/react';
import { User, MapPin, LogOut, Phone, Plus, Trash2, Edit2, Package, Clock, CheckCircle, Truck, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { url } from '../utils';
import { districts } from '../data/districts';
import { Order } from '../types';
import { RootLayout } from '../components/RootLayout';

const ProfilePage = () => {
  const { user, login, logout, isAuthenticated, updateUserProfile, addAddress, deleteAddress } = useApp();
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    district: '',
    khoroo: '',
    address: '',
    detailAddress: '',
    isDefault: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.phone, loginForm.password);
    if (success) {
      toast.success('Амжилттай нэвтэрлээ!');
    } else {
      toast.error('Нууц үг буруу байна. Дахин оролдоно уу.');
    }
  };

  const handleProfileEdit = () => {
    if (!user) return;
    setProfileForm({ name: user.name, email: user.email || '' });
    setIsEditingProfile(true);
  };

  const handleProfileSave = () => {
    updateUserProfile(profileForm.name, profileForm.email);
    setIsEditingProfile(false);
    toast.success('Мэдээлэл шинэчлэгдлээ!');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddress);
    setNewAddress({
      name: '',
      phone: '',
      district: '',
      khoroo: '',
      address: '',
      detailAddress: '',
      isDefault: false,
    });
    setSelectedDistrict('');
    setShowAddAddress(false);
    toast.success('Хаяг нэмэгдлээ!');
  };

  const khoroos = districts.find(d => d.id === selectedDistrict)?.khoroos || [];

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Noomko-д тавтай морил</h1>
            <p className="text-gray-600">Нэвтэрч орно уу</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Утасны дугаар
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                  placeholder="99991234"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Нууц үг
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Нууц үгээ оруулна уу"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Нэвтрэх
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Жишээ: Ямар ч утасны дугаар, нууц үг 4-өөс дээш тэмдэгттэй
          </p>
        </div>
      </div>
    );
  }

  const getDistrictName = (districtId: string) => {
    return districts.find(d => d.id === districtId)?.name || districtId;
  };

  const getOrderStatusInfo = (status: Order['status']) => {
    const statusMap = {
      pending: { text: 'Хүлээгдэж байна', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
      confirmed: { text: 'Баталгаажсан', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
      shipping: { text: 'Хүргэлтэнд гарсан', color: 'text-purple-600', bg: 'bg-purple-50', icon: Truck },
      delivered: { text: 'Хүргэгдсэн', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
      cancelled: { text: 'Цуцлагдсан', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
    };
    return statusMap[status];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Миний хэсэг</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Гарах
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-2 font-medium transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Хувийн мэдээлэл
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 px-2 font-medium transition-colors border-b-2 ${
              activeTab === 'addresses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Хүргэлтийн хаяг
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 font-medium transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Миний захиалга
            {user && user.orders && user.orders.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {user.orders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Хувийн мэдээлэл</h2>
            </div>
            {!isEditingProfile && (
              <button
                onClick={handleProfileEdit}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Засах
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Нэр</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">И-мэйл</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Болих
                </button>
                <button
                  onClick={handleProfileSave}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Хадгалах
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Нэр:</span>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Утас:</span>
                <span className="font-medium text-gray-900">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">И-мэйл:</span>
                <span className="font-medium text-gray-900">{user.email || 'Оруулаагүй'}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Хүргэлтийн хаягууд</h2>
            </div>
            <button
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              Хаяг нэмэх
            </button>
          </div>

          {showAddAddress && (
            <form onSubmit={handleAddAddress} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Нэр *</label>
                  <input
                    type="text"
                    required
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Утас *</label>
                  <input
                    type="tel"
                    required
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дүүрэг *</label>
                <select
                  required
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setNewAddress({ ...newAddress, district: e.target.value, khoroo: '' });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Хороо *</label>
                  <select
                    required
                    value={newAddress.khoroo}
                    onChange={(e) => setNewAddress({ ...newAddress, khoroo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Хаяг *</label>
                <input
                  type="text"
                  required
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="Гудамж, байр, тоот"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Нэмэлт хаяг</label>
                <input
                  type="text"
                  value={newAddress.detailAddress}
                  onChange={(e) => setNewAddress({ ...newAddress, detailAddress: e.target.value })}
                  placeholder="Орц, давхар, тоот"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAddress(false);
                    setSelectedDistrict('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Болих
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Хадгалах
                </button>
              </div>
            </form>
          )}

          {!user || !user.addresses || user.addresses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Хадгалсан хаяг байхгүй байна</p>
          ) : (
            <div className="space-y-3">
              {user.addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {getDistrictName(address.district)}, {address.khoroo}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.address}
                        {address.detailAddress && `, ${address.detailAddress}`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        deleteAddress(address.id);
                        toast.success('Хаяг устгагдлаа');
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {!user || !user.orders || user.orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Захиалга байхгүй байна</p>
            </div>
          ) : (
            user.orders.map((order) => {
              const statusInfo = getOrderStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">#{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('mn-MN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className={`${statusInfo.bg} ${statusInfo.color} px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusInfo.text}
                    </div>
                  </div>

                  <div className="border-t border-b py-4 mb-4">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{item.product.nameMn}</p>
                            <p className="text-xs text-gray-500">{item.quantity} ширхэг × {item.product.price.toLocaleString()}₮</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {(item.product.price * item.quantity).toLocaleString()}₮
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Хүргэх хаяг:</p>
                      <p>{getDistrictName(order.shippingAddress.district)}, {order.shippingAddress.khoroo}</p>
                      <p>{order.shippingAddress.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Нийт дүн</p>
                      <p className="text-2xl font-bold text-gray-900">{order.total.toLocaleString()}₮</p>
                    </div>
                  </div>

                  {/* Track Order Button */}
                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => router.visit(url(`/order-tracking/${order.orderNumber}`))}
                      className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Захиалга хайх
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

ProfilePage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default ProfilePage;
