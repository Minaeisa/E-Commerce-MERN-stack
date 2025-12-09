import promo1 from '../../assets/promo1.jpg';
import promo2 from '../../assets/promo2.jpg';

 function PromoSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="relative overflow-hidden rounded-xl group h-60 sm:h-72 md:h-80 lg:h-96">
        <img
          src={promo1}
          alt="New Collection"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-end p-6 sm:p-8">
          <p className="text-sm sm:text-base text-white uppercase">Super Sale</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">New Collection</h2>
          <button className="bg-white text-black px-5 py-2 text-sm font-semibold rounded hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl group h-60 sm:h-72 md:h-80 lg:h-96">
        <img
          src={promo2}
          alt="Sale 40% Off"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-end p-6 sm:p-8">
          <p className="text-sm sm:text-base text-white uppercase">New Season</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Sale 40% Off</h2>
          <button className="bg-white text-black px-5 py-2 text-sm font-semibold rounded hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

    </div>
  );
}
export default PromoSection