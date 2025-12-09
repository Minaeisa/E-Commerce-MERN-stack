import  { Fragment } from 'react'
import "./Home.css"
import AllProducts from '../Products/AllProducts/AllProducts';
import Hero from '../Hero/Hero';
import MainSlider from '../MainSliders/MainSliders';
import PromoSection from '../PromoSection/PromoSection';

export default function Home() {
  return (
    <Fragment>
      <MainSlider/>
      <AllProducts/>
     <PromoSection/>
     <Hero/>

    </Fragment>
  );
}