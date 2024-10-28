"use client";

import db from '../../../configs';
import { JsonForms } from '../../../configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import FormListItemResp from './_components/FormListItemResp';

function Responses() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    try {
      if (!process.env.DATABASE_URL) {
        throw new Error("No database connection string was provided.");
      }

      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));
      console.log("Fetched formList:", result);
      setFormList(result);
    } catch (error) {
      console.error("Error fetching form list:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Responses
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {formList.map((form, index) => (
          <FormListItemResp
            key={index}
            formRecord={form}
            jsonForm={JSON.parse(form.jsonform)} // Ensure parsing
          />
        ))}
      </div>
    </div>
  );
}

export default Responses;
