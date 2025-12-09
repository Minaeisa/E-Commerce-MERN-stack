import { FaTruck, FaUndo, FaHeadset, FaCreditCard } from 'react-icons/fa';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaTruck className="text-blue-500 text-4xl" />,
      title: 'Free Delivery',
      desc: 'Worldwide',
    },
    {
      icon: <FaUndo className="text-blue-500 text-4xl" />,
      title: 'Money Returns',
      desc: '30 Days money return',
    },
    {
      icon: <FaHeadset className="text-blue-500 text-4xl" />,
      title: '27/4 Online Support',
      desc: 'Customer Support',
    },
    {
      icon: <FaCreditCard className="text-blue-500 text-4xl" />,
      title: 'Payment Security',
      desc: 'Safe Payment',
    },
  ];

  return (
<div className="w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-6 border rounded-md hover:shadow-md transition w-full"
          >
            <div>{item.icon}</div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
