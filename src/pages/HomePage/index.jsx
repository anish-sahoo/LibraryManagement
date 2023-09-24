import { Button } from 'components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'images/library_stock_image.jpg';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);

  return (
    <div className='h-full'style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'cover'}}>   
      <div className='flex flex-col items-center justify-center h-full text-white'>
        <h1 className='text-7xl font-bold text-center p-10' style={{'text-shadow': '6px 6px 4px #010F24'}}>
          Welcome to the Library Management Application!
        </h1>
        
        <Button className='w-1/3 h-1/6 text-4xl shadow-2xl hover:shadow-lg' onClick={goToLogin}>Login To Continue</Button>
        <a className='text-white mb-10' style={{ position: 'absolute', bottom: 0 }} href="https://www.freepik.com/free-ai-image/abundant-collection-antique-books-wooden-shelves-generated-by-ai_42138866.htm#query=library%20background&position=0&from_view=keyword&track=ais">Image by Vecstock</a>
      </div>
    </div>
  )
}

// <p className='text-5xl italic text-gray-300'>Click login to continue!</p>

export default HomePage;