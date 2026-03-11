import React from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { RootLayout } from '../components/RootLayout';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Холбоо барих</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Утас</h3>
              <a href="tel:77111234" className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                7711-1234
              </a>
              <p className="text-sm text-gray-500 mt-1">Өдөр бүр 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">И-��эйл</h3>
              <p className="text-gray-600">support@noomko.mn</p>
              <p className="text-sm text-gray-500 mt-1">24 цагийн дотор хариулна</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ажлын цаг</h3>
              <p className="text-gray-600">Даваа - Баасан: 9:00 - 18:00</p>
              <p className="text-gray-600">Бямба - Ням: 10:00 - 17:00</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Хаяг</h3>
              <p className="text-gray-600">Улаанбаатар хот</p>
              <p className="text-sm text-gray-500 mt-1">Онлайн дэлгүүр</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Мессеж илгээх</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Нэр</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Таны нэр"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">И-мэйл</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Утас</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="9999-9999"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Мессеж</label>
            <textarea
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Таны мессеж..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Илгээх
          </button>
        </form>
      </div>
    </div>
  );
};

ContactPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default ContactPage;
