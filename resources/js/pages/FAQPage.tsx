import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Захиалга',
    question: 'Хэрхэн захиалга өгөх вэ?',
    answer: 'Та хүссэн бараагаа сонгоод сагсанд нэмнэ. Дараа нь "Сагс" руу орж, хаяг болон холбоо барих мэдээллээ оруулаад захиалгаа баталгаажуулна. Манай ажилтан утсаар холбогдож захиалгыг дахин баталгаажуулна.',
  },
  {
    category: 'Захиалга',
    question: 'Захиалгаа цуцлах боломжтой юу?',
    answer: 'Тийм, бараа хүргэгдээгүй бол захиалгаа цуцлах боломжтой. 7711-1234 утсаар холбогдож захиалгын дугаараа хэлээд цуцлах хүсэлтээ илгээнэ үү. Хэрэв төлбөр төлсөн бол 3-5 хоногийн дотор буцааж олгоно.',
  },
  {
    category: 'Захиалга',
    question: 'Урьдчилсан захиалга гэж юу вэ?',
    answer: 'Урьдчилсан захиалга гэдэг нь Солонгосын том дэлгүүрүүдээс (E-mart, Costco, Lotte Mart, Olive Young) шууд захиалах бараа юм. Эдгээр бараа манай агуулахад байхгүй бөгөөд таны захиалгын дагуу Солонгосоос авчирдаг. Хүргэлтийн хугацаа 14-21 өдөр.',
  },
  {
    category: 'Төлбөр',
    question: 'Ямар төлбөрийн хэлбэрүүдтэй вэ?',
    answer: 'Бид QPay, бэлэн мөнгө болон картаар төлбөр хүлээн авдаг. Онлайнаар захиалахдаа QPay-ээр урьдчилж төлөх эсвэл бараа хүлээн авахдаа төлбөрөө төлөх боломжтой.',
  },
  {
    category: 'Төлбөр',
    question: 'QPay-ээр хэрхэн төлөх вэ?',
    answer: 'Захиалгаа баталгаажуулсны дараа QR код гарч ирнэ. Та аль ч банкны апп-аараа QR код уншуулж төлбөрөө төлнө. Төлбөр амжилттай төлөгдсний дараа автоматаар баталгаажина.',
  },
  {
    category: 'Хүргэлт',
    question: 'Хүргэлт хэдэн өдөр үргэлжилдэг вэ?',
    answer: 'Бэлэн бараа 1-2 өдөрт, урьдчилсан захиалга 14-21 өдөрт хүргэгддэг. Хүргэлтийн хугацаа танай хаягаас хамаарна.',
  },
  {
    category: 'Хүргэлт',
    question: 'Хүргэлтийн төлбөр хэд вэ?',
    answer: 'Дотор хүрээ (1-3 дүүрэг) 5,000₮, гадна хүрээ (4-9 дүүрэг) 7,000₮. 300,000₮ болон түүнээс дээш үнийн худалдан авалт хийвэл хүргэлт үнэгүй.',
  },
  {
    category: 'Хүргэлт',
    question: 'Хүргэлтийн хүрээ хаана байдаг вэ?',
    answer: 'Бид зөвхөн Улаанбаатар хотод хүргэлт үйлчилгээ үзүүлдэг. Бүх дүүрэг болон хороонд хүргэх боломжтой.',
  },
  {
    category: 'Бараа бүтээгдэхүүн',
    question: 'Бүх бараа Солонгосоос ирдэг үү?',
    answer: 'Тийм, бидний бүх бараа Солонгосын алдартай дэлгүүрүүд болох E-mart, Costco, Lotte Mart, Olive Young-аас шууд авчирдаг. Энэ нь чанар, үнэний баталгаа юм.',
  },
  {
    category: 'Бараа бүтээгдэхүүн',
    question: 'Бараа дуусах үед хэрхэн мэдэх вэ?',
    answer: 'Агуулахад байгаа бараанууд дуусах шахсан үед "Бага үлдсэн" гэсэн тэмдэг гарна. Урьдчилсан захиалгын бараанд ийм асуудал гардаггүй.',
  },
  {
    category: 'Буцаалт',
    question: 'Буцаалт хийж болох уу?',
    answer: 'Тийм, гэмтэлтэй эсвэл буруу бараа хүргэгдсэн тохиолдолд 7 хоногийн дотор буцаалт хийх боломжтой. Гэхдээ баглаа боодол онгойгоогүй, хэрэглээгүй байх ёстой.',
  },
  {
    category: 'Буцаалт',
    question: 'Буцаалт хийхэд мөнгө буцааж авах хугацаа?',
    answer: 'Бараагаа буцаасны дараа 3-5 хоногийн дотор мөнгийг буцааж олгоно. Банкны данс эсвэл QPay-ээр авах боломжтой.',
  },
  {
    category: 'Данс',
    question: 'Данс үүсгэх шаардлагатай юу?',
    answer: 'Үгүй, данс үүсгэхгүйгээр захиалга өгч болно. Гэхдээ данс үүсгэвэл захиалгынхаа түүхийг харах, хүргэлтийн мэдээлэл хадгалах зэрэг олон давуу талтай.',
  },
  {
    category: 'Данс',
    question: 'Хэрхэн данс үүсгэх вэ?',
    answer: 'Баруун дээд булангаас "Нэвтрэх" товч дарж, "Бүртгүүлэх" сонголтыг сонгоно. Утасны дугаар болон нууц үг оруулаад бүртгэлээ үүсгэнэ.',
  },
];

import { RootLayout } from '../components/RootLayout';

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Бүгд');

  const filteredFAQs = selectedCategory === 'Бүгд'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Түгээмэл асуулт хариулт</h1>
      <p className="text-gray-600 mb-8">
        Танд хэрэгтэй хариултыг эндээс олж болно. Хэрэв танд өөр асуулт байвал бидэнтэй холбогдоно уу.
      </p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('Бүгд')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'Бүгд'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Бүгд
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <span className="text-xs font-medium text-blue-600 mb-1 block">
                  {faq.category}
                </span>
                <span className="font-semibold text-gray-900">{faq.question}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="font-bold text-lg mb-2">Хариулт олдсонгүй юу?</h2>
        <p className="text-gray-700 mb-4">
          Бидэнтэй холбогдоод асуултаа асуугаарай. Бид таньд хамгийн түргэн хугацаанд хариулах болно.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="tel:77111234"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Утас: 7711-1234
          </a>
          <a
            href="mailto:support@noomko.mn"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            И-мэйл: support@noomko.mn
          </a>
        </div>
      </div>
    </div>
  );
};

FAQPage.layout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default FAQPage;
