import { useRef } from 'react';
import Lottie from 'lottie-react';
import AnimationDownload from '../../assets/animations/AnimationDownload.json';

export default function AnimationD() {


  return (
    <div 
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // className="w-[200px] h-[200px]"
      className='w-[170px]'
    >
      <Lottie
        lottieRef={AnimationDownload}
        animationData={AnimationDownload}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}