import React, {useState} from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/img/no_image.png';
import 'swiper/css/swiper.css'

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div>
          <img src={NoImage} alt={"no_image"} />
        </div>
      ) : (
        images.map(image => (
          <div>
            <img src={image.path} alt={"商品画像"} />
          </div>
        ))
      )}
    </Swiper>
  )
};

export default ImageSwiper;