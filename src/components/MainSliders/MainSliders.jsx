
import Slider from 'react-slick';
import slide1 from '../../assets/slider 3.jpg';
import slide2 from '../../assets/slider 2.jpg';
import slide3 from '../../assets/slider 4.jpg';
import slide4 from '../../assets/slider 1.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="w-full px-2 sm:px-8 mt-4 max-w-7xl mx-auto">
      <Slider {...settings}>
        {[slide1, slide2, slide3, slide4].map((img, index) => (
          <div
            key={index}
            className="h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain object-center rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
