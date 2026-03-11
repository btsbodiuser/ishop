import React from 'react';
import { PackageX, AlertCircle, Clock, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { RootLayout } from '../components/RootLayout';

const ReturnsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Буцаалт солилт</h1>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-start gap-4">
          <RotateCcw className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Буцаалт солилтын нөхцөл</h3>
            <p className="text-gray-700">
              Бид үйлчлүүлэгчдийнхээ сэтгэл ханамжийг эрхэмлэдэг тул чанаргүй эсвэл буруу бараа хүргэгдсэн
              тохиолдолд буцаалт солилтыг <strong>7 хоногийн дотор</strong> хийх боломжтой.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <h3 className="font-semibold text-lg">Буцаалт хийж болох</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Бүтээгдэхүүн эвдэрсэн эсвэл гэмтсэн</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Буруу бараа хүргэгдсэн</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Дутуу хүргэгдсэн</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Чанаргүй бүтээгдэхүүн</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Баглаа боодол онгойгоогүй</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-red-200">
          <div className="flex items-start gap-3 mb-4">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <h3 className="font-semibold text-lg">Буцаалт хийж болохгүй</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>✗</span>
              <span>Баглаа боодол онгойсон бараа</span>
            </li>
            <li className="flex gap-2">
              <span>✗</span>
              <span>Хэрэглэсэн бараа</span>
            </li>
            <li className="flex gap-2">
              <span>✗</span>
              <span>7 хоног хэтэрсэн</span>
            </li>
            <li className="flex gap-2">
              <span>✗</span>
              <span>Урьдчилсан захиалгын бараа (тусгай тохиолдол)</span>
            </li>
            <li className="flex gap-2">
              <span>✗</span>
              <span>Гоо сайхны бүтээгдэхүүн (ариун цэврийн шалтгаан)</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Буцаалт солилтын процесс</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Холбогдох</h3>
              <p className="text-gray-600 text-sm">
                <a href="tel:77111234" className="text-blue-600 hover:text-blue-700 font-medium">7711-1234</a> утсаар эсвэл support@noomko.mn и-мэйл хаягаар холбогдоно уу.
                Захиалгын дугаар болон асуудлын талаар дэлгэрэнгүй мэдээлнэ үү.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Зураг илгээх</h3>
              <p className="text-gray-600 text-sm">
                Бүтээгдэхүүний зураг болон баглаа боодлын зургийг илгээнэ үү.
                Энэ нь буцаалтын шалтгааныг тодорхойлоход тусална.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Баталгажуулалт</h3>
              <p className="text-gray-600 text-sm">
                Манай баг таны хүсэлтийг хянаж, буцаалт хийж болох эсэхийг 1-2 хоногийн дотор мэдэгдэнэ.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Бараа буцаах</h3>
              <p className="text-gray-600 text-sm">
                Баталгаажсаны дараа бид курьер илгээж бараагаа буцааж авна.
                Эсвэл та өөрөө манай оффис руу авчирч болно.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              5
            </div>
            <div>
              <h3 className="font-semibold mb-1">Буцаан олголт</h3>
              <p className="text-gray-600 text-sm">
                Бараагаа хүлээн авсны дараа 3-5 хоноийн дотор мөнгийг буцааж олгоно.
                Эсвэл таны хүсвэл өөр бараагаар солих боломжтой.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Мөнгө буцаан олголт</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold mb-1">Дансаар шилжүүлэх</h3>
                <p className="text-sm text-gray-600">Банкны данс руу шууд шилжүүлнэ</p>
              </div>
              <span className="text-sm text-gray-500">3-5 өдөр</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold mb-1">QPay</h3>
                <p className="text-sm text-gray-600">QPay данс руу буцаан олгох</p>
              </div>
              <span className="text-sm text-gray-500">1-2 өдөр</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold mb-1">Кредит</h3>
                <p className="text-sm text-gray-600">Дараагийн худалдан авалтдаа ашиглах</p>
              </div>
              <span className="text-sm text-gray-500">Шууд</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Анхааруулга</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Буцаах бүтээгдэхүүн эхний байдлаараа байх ёстой</li>
              <li>• Бүх хавсралт, гарын авлага, баглаа боодол хамт байх шаардлагатай</li>
              <li>• Худалдан авалтын баримт хадгалж байна уу</li>
              <li>• Хүргэлтийн зардал таны хариуцах байдалд байж болно</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ReturnsPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default ReturnsPage;
