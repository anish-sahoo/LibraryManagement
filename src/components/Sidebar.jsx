import React from 'react';
import Logo from 'images/logo.png';
import { NavLink } from 'react-router-dom';
import {
  Dashboard,
  Book,
  UserCircle,
  Settings,
  Group,
  Report,
  Expand,
} from '@bigbinary/neeto-icons';
import { ScrollArea } from 'components/ui/scroll-area';
import { Button } from 'components/ui/button';
import { useAuth } from 'lib/useAuth';
import { toast } from 'components/ui/use-toast';
import { Toaster } from 'components/ui/toaster';


const Sidebar = () => {
  const { logout } = useAuth();

  const navLinks = [
    {
      title: 'Dashboard',
      logo: <Dashboard />,
      path: '/dashboard',
    },
    {
      title: 'Books',
      logo: <Book />,
      path: '/books',
    },
    {
      title: 'Students',
      logo: <Group />,
      path: '/students',
    },
    {
      title: 'Reports',
      logo: <Report />,
      path: '/reports',
    },
    {
      title: 'Users',
      logo: <UserCircle />,
      path: '/users',
    },
    {
      title: 'Settings',
      logo: <Settings />,
      path: '/settings',
    }
  ]

  return (
    <div className='h-screen w-[230px] bg-white border-r py-6'>
      <Toaster/>
      <div className='flex justify-center px-4 mb-8'>
        <img src={Logo} alt='Logo' height={100} width={100} />
      </div>

      <ScrollArea className='p-4' style={{ height: 'calc(100vh - 209px)'}}>
        {navLinks.map((nav, index) => {
          return (
            <div key={index} className='mb-2'>
              <NavLink
                to={nav.path}
                className={({ isActive, isPending }) =>
                  `block rounded-md transition-all duration-300 px-2 py-2 hover:bg-gray-100 ${isActive ? '!bg-gray-300' : ''}`
                }
              >
                <div className='flex items-center'>
                  <span>{nav.logo}</span>
                  <span className='ml-2 leading-none font-semibold'>{nav.title}</span>
                </div>
              </NavLink>
            </div>
          );
        })}
      </ScrollArea>

      <div className='flex justify-between items-center px-4 py-2 border-t'>
        <span className='font-semibold'>Oliver Smith</span>

        <Button size='icon' onClick={() => {
            logout();
            toast({
              title: 'Logged out successfully!'
            })
          }}>
          <Expand />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
