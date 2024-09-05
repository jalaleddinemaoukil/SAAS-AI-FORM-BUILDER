'use client'

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Textarea } from "../../../components/ui/textarea";
import { AichatSession } from '../../../configs/AiModal';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import db from '../../../configs/index';
import { JsonForms } from '../../../configs/schema';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const PROMPT = " On the basis of description please give from in json format with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields in Json format";

function CreateFrom() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const { user } = useUser();

    const onCreateForm = async () => {
        setLoading(true);
     
            const result = await AichatSession.sendMessage("Description: " + userInput + PROMPT);

            if (result.response.text()) 
            {
                const res = await db.insert(JsonForms)
                .values({
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/yyyy')
                }).returning({ id: JsonForms.id });

                console.log("New Form id", res[0].id);
                if(res[0].id){
                  route.push('/edit-form/'+res[0].id)
                }
                setLoading(false);
            } else {
                console.error(result.response.text()+" returned an empty value");
            }
       
           
        
    };

    return (
        <>
            <Button onClick={() => setOpenDialog(true)} className="text-white rounded">+ Create Form</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader suppressHydrationWarning={true}>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className='my-2'
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Write description of your form" />
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button 
                                onClick={() => setOpenDialog(false)} 
                                className='bg-red-500 rounded text-white hover:text-white hover:bg-red-400' variant='destructive'>Cancel</Button>
                                <Button
                                    disabled={loading}
                                    onClick={() => onCreateForm()} className='text-white rounded'>
                                      {
                                        loading ? <Loader2 className='animate-spin'/> : 'Create'
                                      }
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateFrom;
