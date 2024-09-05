"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {

  const {user, isSignedIn} = useUser();
  const path=usePathname()

  useEffect(()=> {
      console.log(path)
  }, [])

  return !path.includes('aiform') && (
    <div className='p-5 border-b shadow-sm'>
        <div className='flex flex-row items-center justify-between'>
            <Image src={'/logo.svg'} 
                width={40} 
                height={40} 
                alt='logo' 
                priority
            />
            {
              isSignedIn?
              <div className='flex items-center gap-5'>
                <Link href={'/dashboard'}>
                  <Button className='rounded bg-white text-black border shadow-sm hover:bg-opacity-80' variant="Outline">Dashboard</Button>
                </Link>
                <UserButton/>
              </div>
              :
              <SignInButton>
              <Button className='rounded bg-primary text-white hover:bg-opacity-80' >Get Started</Button>
              </SignInButton>}
        </div>
    </div>
  )
}

export default Header