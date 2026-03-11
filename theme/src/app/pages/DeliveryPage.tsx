import React from 'react';
import { Truck, Clock, MapPin, DollarSign, Package } from 'lucide-react';

export const DeliveryPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Хүргэлтийн мэдээлэл</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Хүргэлтийн хүрээ</h3>
            <p className="text-gray-700">
              Бид зөвхөн <strong>Улаанбаатар хотод</strong> хүргэлт үйлчилгээ үзүүлж байна.
              Бүх дүүрэг болон хороонд хүргэлт хийх боломжтой.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Бэлэн бараа</h3>
              <p className="text-gray-600 text-sm mb-2">Агуулахад байгаа бараанууд</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">1-2 өдөр</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Урьдчилсан захиалга</h3>
              <p className="text-gray-600 text-sm mb-2">Солонгосоос захиалах бараа</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">14-21 өдөр</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Хүргэлтийн төлбөр</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Дотор хүрээ (1-3 дүүрэг)</span>
                <span className="font-semibold">5,000₮</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Гадна хүрээ (4-9 дүүрэг)</span>
                <span className="font-semibold">7,000₮</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">300,000₮ дээш худалдан авалт</span>
                <span className="font-semibold text-green-600">Үнэгүй</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Хүргэлтийн процесс</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Захиалга баталгаажуулах</h3>
                <p className="text-gray-600 text-sm">
                  Таны захиалгыг хүлээн авсны дараа манай ажилтан утсаар холбогдож баталгаажуулна.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Бэлтгэх</h3>
                <p className="text-gray-600 text-sm">
                  Бараагаа бэлтгэж, сайтар савлаж хүргэлтэнд бэлэн болгоно.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Хүргэх</h3>
                <p className="text-gray-600 text-sm">
                  Курьер таны өгсөн хаягаар очиж бараагаа хүргэнэ. Хүргэлтийн өмнө утсаар мэдэгдэнэ.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Хүлээн авах</h3>
                <p className="text-gray-600 text-sm">
                  Бараагаа шалгаж, төлбөрөө төлж хүлээн авна. Бэлэн мөнгө эсвэл QPay аар төлөх боломжтой.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Анхаарах зүйлс</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Хүргэлтийн цагийг урьдчилан тохирсон байх шаардлагатай</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Хаягаа үнэн зөв, дэлгэрэнгүй оруулна уу</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Бараагаа хүлээн авахдаа заавал шалгана уу</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Урьдчилсан захиалгын бараа Солонгосоос ирэхтэй холбоотой удаашралт гарч болно</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};