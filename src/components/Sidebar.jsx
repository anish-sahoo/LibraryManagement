import React from 'react';
import Logo from 'images/logo.png';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  GearIcon,
  StackIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import { ScrollArea } from 'components/ui/scroll-area';
import { Button } from 'components/ui/button';
import { useAuth } from 'lib/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  const navLinks = [
    {
      title: 'Dashboard',
      logo: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      title: 'Books',
      logo: <StackIcon />,
      path: '/books',
    },
    {
      title: 'Settings',
      logo: <GearIcon />,
      path: '/settings',
    }
  ]

  return (
    <div className='h-screen w-[250px] bg-white border-r py-6'>
      <div className='flex justify-center px-4 mb-8'>
        <img src={Logo} alt='Logo' height={100} width={100} />
      </div>

      <ScrollArea className='p-4' style={{ height: 'calc(100vh - 209px)'}}>
        {navLinks.map((nav, index) => {
          return (
            <div key={index} className='mb-1'>
              <NavLink
                to={nav.path}
                className={({ isActive, isPending }) =>
                  `block rounded-md transition-all duration-300 px-3 py-3 hover:bg-gray-100 ${isActive ? '!bg-gray-300' : ''}`
                }
              >
                <div className='flex items-center'>
                  <span>{nav.logo}</span>
                  <span className='ml-2 leading-none font-medium'>{nav.title}</span>
                </div>
              </NavLink>
            </div>
          );
        })}
      </ScrollArea>

      <div className='flex justify-between items-center px-4 py-2 border-t'>
        <span className='font-semibold'>Logout</span>

        <Button size='icon' onClick={() => logout()}>
          <ExitIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
