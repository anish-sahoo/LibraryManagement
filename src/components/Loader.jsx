import React from 'react';
import { Rings } from  'react-loader-spinner';

const Loader = ({ size }) => {
  let boxSize = '40';

  if (size === 'md') boxSize = '60';
  if (size === 'lg') boxSize = '80';

  return (
    <div className='flex justify-center items-center min-w-full min-h-full'>
      <Rings
        height={boxSize}
        width={boxSize}
        color='#161618'
        radius='6'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='rings-loading'
      />
    </div>
  );
};

export default Loader;
