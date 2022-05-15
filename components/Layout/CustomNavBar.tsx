import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
const NavBarDesktop = dynamic(()=> import('components/Layout/NavBarDesktop'));
// const NavBarMobile = dynamic(()=>import('components/Layout/NavBarMobile'));
import { LOGO_IMAGE } from 'utils/constants';

const CustomNavBar = () => {

    const renderLogo = () => (
        <Link href={'/'}>
            <a className='pt-3'>
                <Image src={LOGO_IMAGE} alt='Logo' width={200} height={50} />
            </a>
        </Link>
    )
  return (
    <div className='px-20 pt-5 fixed inset-x-0 top-0 z-50 h-12 transition duration-1000 duration-1000 ease-in-out flex justify-between items-center'>
        {renderLogo()}
        <NavBarDesktop />
    </div>
  )
}

export default CustomNavBar