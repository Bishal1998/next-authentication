"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <div className="w-full lg:w-1/3">
      <Carousel
        autoPlay={true}
        stopOnHover={true}
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
      >
        <div className="rounded-xl">
          <Image
            width={616}
            height={816}
            src={
              "https://images.pexels.com/photos/7104330/pexels-photo-7104330.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            }
            alt="image"
            className="rounded-xl object-fill"
          />
        </div>
        <div className="rounded-xl ">
          <Image
            width={616}
            height={816}
            src={
              "https://images.pexels.com/photos/17405337/pexels-photo-17405337/free-photo-of-hand-holding-flowers-and-children-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="image"
            className="rounded-xl object-fill"
          />
        </div>
        <div className="rounded-xl">
          <Image
            width={616}
            height={816}
            src={
              "https://images.pexels.com/photos/13893110/pexels-photo-13893110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="image"
            className="rounded-xl object-fill"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
