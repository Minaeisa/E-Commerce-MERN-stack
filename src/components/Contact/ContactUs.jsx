
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      {/* Title */}
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-10">
        We'd love to hear from you. Whether you have a question about features, pricing, or anything else.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPinIcon className="h-6 w-6 text-indigo-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">Nasr-City</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneIcon className="h-6 w-6 text-indigo-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">01208075613</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <EnvelopeIcon className="h-6 w-6 text-indigo-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">info@shopwise.com</p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
