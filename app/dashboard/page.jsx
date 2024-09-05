import React from 'react';
import CreateFrom from './_components/CreateFrom'; 
import FormList from './_components/FormList';

const Page = () => {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center justify-between'>
        Dashboard
        <CreateFrom />
      </h2>
      <FormList/>
    </div>
  );
}

export default Page;
