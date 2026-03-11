import React from 'react';
import { router } from '@inertiajs/react';
import { Home } from 'lucide-react';
import { RootLayout } from '../components/RootLayout';
import { url } from '../utils';

const NotFoundPage = () => {

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Хуудас олдсонгүй</p>
        <button
          onClick={() => router.visit(url('/'))}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Нүүр хуудас
        </button>
      </div>
    </div>
  );
};

NotFoundPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default NotFoundPage;
