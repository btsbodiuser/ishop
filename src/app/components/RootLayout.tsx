import React from 'react';
import { Outlet, Link } from 'react-router';
import { Header } from './Header';
import { AppProvider } from '../context/AppContext';
import { Toaster } from 'sonner';

export const RootLayout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-right" richColors closeButton />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Noomko</h3>
                <p className="text-gray-400 text-sm">
                  Чанартай бүтээгдэхүүн Улаанбаатар хотод хүргэнэ
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Үйлчилгээ</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link to="/contact" className="hover:text-white transition-colors">
                      Холбоо барих
                    </Link>
                  </li>
                  <li>
                    <Link to="/delivery" className="hover:text-white transition-colors">
                      Хүргэлтийн мэдээлэл
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns" className="hover:text-white transition-colors">
                      Буцаалт солилт
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:text-white transition-colors">
                      Түгээмэл асуулт
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Холбоо барих</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>И-мэйл: support@noomko.mn</li>
                  <li>
                    Утас: <a href="tel:77111234" className="hover:text-white transition-colors">7711-1234</a>
                  </li>
                  <li>Цаг: 9:00 - 18:00</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              © 2026 Noomko Дэлгүүр. Бүх эрх хуулиар хамгаалагдсан.
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};