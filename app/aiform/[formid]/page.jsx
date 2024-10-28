'use client'

import React, { useEffect, useState } from 'react';
import { db } from '../../../configs/index';
import { JsonForms } from '../../../configs/schema';
import { FormUi } from '../../edit-form/_components/FormUi';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';

function LiveAiForm({ params }) {
    const [record, setRecord] = useState();
    const [jsonForm, setJsonForm] = useState([]);
    

    useEffect(() => {
        if (params) GetFormData();
    }, [params]);
    
    const GetFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.id, Number(params?.formid)));
    
        if (result.length > 0) {
            const formRecord = result[0];
            setRecord(formRecord);
            setJsonForm(JSON.parse(formRecord.jsonform)); // Ensure this is correct
            console.log(formRecord);
        }
    };
    
    return (
        <div className='p-10 flex justify-center items-center'
             style={{
                 backgroundImage: record?.background
             }}>
            {record && <FormUi
                jsonForm={jsonForm} // Use camel case here
                onFieldUpdate={() => console.log()}
                deleteField={() => console.log()}
                selectedStyle={JSON.parse(record?.style)}
                selectedTheme={record?.theme} 
                editable={false}
                formId={record.id}
                enableSignIn={record?.enableSignIn}
            />}
            <Link className='flex gap-2 items-center bg-black text-white px-3 py-1 rounded
            fixed bottom-5 left-5 cursor-pointer'
            href={'/'}>
                <Image src={'/icons8-create-64.png'} width={20} height={20}/>
                Build you Own AI form
            </Link>
        </div>
    );
}

export default LiveAiForm;
