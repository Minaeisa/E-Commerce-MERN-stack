
function FAQ() {
  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 14 days of purchase. Products must be unused and in original packaging.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide. Shipping fees may vary based on your location.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact us via our Contact Us page or by emailing info@shopwise.com.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
            <p className="text-gray-600 mt-1">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
