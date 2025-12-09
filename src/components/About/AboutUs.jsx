import { motion } from 'framer-motion';
import { UserGroupIcon, LightBulbIcon, PhoneIcon } from '@heroicons/react/24/outline';
import team1 from '../../assets/team1.png';

function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-indigo-600 mb-6"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg mb-6"
      >
        <span className="font-semibold">Shopwise</span> is your destination for premium shopping in fashion, electronics,
        and lifestyle. Our team is passionate about delivering top-notch products and exceptional customer service.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <LightBulbIcon className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-semibold text-indigo-600">Our Mission</h2>
        </div>
        <p className="text-gray-700">
          To deliver excellent online shopping experiences with quality, speed, and care.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Journey</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>2020:</strong> Shopwise was founded by a passionate dev team.</li>
          <li><strong>2021:</strong> Opened partnerships with 100+ suppliers worldwide.</li>
          <li><strong>2022:</strong> Reached 20K+ happy customers and launched mobile apps.</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <UserGroupIcon className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-semibold text-indigo-600">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'Mina Eisa', role: 'Frontend Developer', img: team1 },
            { name: 'Mina Eisa', role: 'UI/UX Designer', img: team1 },
            { name: 'Mina Eisa', role: 'Backend Developer', img: team1 },
          ].map((member, index) => (
            <div key={index} className="bg-white shadow p-4 rounded text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <a
          href="/ContactUs"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          <PhoneIcon className="h-5 w-5" />
          Contact Us
        </a>
      </motion.div>
    </div>
  );
}

export default AboutUs;
