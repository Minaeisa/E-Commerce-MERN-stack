

function Location() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Our Location</h1>
      <p className="text-lg text-gray-600 mb-8">
        Visit our office or find us on the map below.
      </p>

      <div className="w-full h-[450px] rounded overflow-hidden shadow-lg border">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.833584183524!2d-0.12775868422133184!3d51.50735097963474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3333f377ef%3A0x84f5f6ddda3b04dc!2sLondon%2C%20UK!5e0!3m2!1sen!2seg!4v1625052137883!5m2!1sen!2seg"
        ></iframe>
      </div>
    </div>
  );
}

export default Location;
