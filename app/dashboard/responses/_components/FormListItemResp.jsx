import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import db from '../../../../configs';
import { userResponses } from '../../../../configs/schema';
import { eq } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord }) {
  const [loading, setLoading] = useState(false);

  const ExportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db.select().from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));
    console.log(result);

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
    }

    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
  };

  console.log('jsonForm:', jsonForm); // Debugging statement
  console.log('formTitle:', jsonForm?.formTitle); // Debugging statement
  console.log('formHeading:', jsonForm?.formHeading); // Debugging statement

  return (
    <div className='border shadow-sm p-4 rounded my-5'>
      <h2 className='text-lg text-black'>{jsonForm?.formTitle || 'No Title'}</h2>
      <h2 className='text-md text-gray-500'>{jsonForm?.formHeading || 'No Heading'}</h2>
      <hr className='my-4'></hr>
      <div className='flex justify-between items-center'>
        <h2 className='text-sm'><strong>45</strong> Responses</h2>
        <Button className="text-white rounded" size="sm"
          onClick={() => ExportData()}
          disabled={loading}>{loading ? <Loader2 className='animate-spin' /> : 'Export'}</Button>
      </div>
    </div>
  );
}

export default FormListItemResp;
