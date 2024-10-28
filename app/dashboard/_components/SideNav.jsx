'use client'

import React, { useEffect, useState } from 'react';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import Link from 'next/link';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import db from '../../../configs';
import { JsonForms } from '../../../configs/schema';


function SideNav() {

  const menuList = [
    {
      id: 1,
      name: 'My Forms',
      icon: LibraryBig,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Responses',
      icon: MessageSquare,
      path: '/dashboard/responses',
    },
    {
      id: 3,
      name: 'Analytics',
      icon: LineChart,
      path: '/dashboard/analytics',
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
  ];

  const {user} = useUser()
  const path = usePathname();
  const [formList, setFormList] = useState();
  const [PercFileCreated, setPercFileCreated] = useState()
  useEffect(() => {
    user&&GetFormList()
  }, [user]);

  const GetFormList=async()=>{
    const result = await db.select().from(JsonForms)
    .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(JsonForms.id));

    setFormList(result);
    const perc = (result.length/3)*100
    setPercFileCreated(perc)
  }

  return (
    <div className="h-screen shadow-md border text-sm bg-white">
      <div className="p-5">
        {menuList.map((menu,index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-3 mb-3 hover:bg-primary hover:text-white hover:cursor-pointer rounded ${
              path === menu.path ? 'bg-primary text-white' : ''
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 text-neutral-900 p-6 w-64 md:bottom-3">
        <Button className="rounded w-full text-white">+ Create Form</Button>
        <div className="my-4">
          <Progress value={PercFileCreated} />
          <h2 className="text-sm mt-3">
            <strong>{formList?.length}</strong> Out of <strong>3</strong> File Created
          </h2>
          <h2 className="text-sm mt-3 md:text-xs">
            Upgrade your plan for unlimited AI form build
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
