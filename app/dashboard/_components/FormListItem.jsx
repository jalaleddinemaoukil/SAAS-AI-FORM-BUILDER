import React from 'react'
import { Edit, Share, Trash } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../components/ui/alert-dialog"
import db from '../../../configs'
import { JsonForms } from '../../../configs/schema'
import { toast } from 'sonner'
import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { RWebShare } from 'react-web-share'
  

function FormListItem({formRecord, jsonForm, refreshData}) {

    const {user}= useUser();
    const onDeleteForm= async ()=>{
        const result = await db.delete(JsonForms)
        .where(and(eq(JsonForms.id,formRecord.id),eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
        
        if(result){
            toast('Form Deleted!!');
            refreshData()
        }
    }
  return (
    <div className='border shadow-sm p-4 rounded '>
        <div className='flex justify-between'>
            <h2></h2>
            
            <AlertDialog className='rounded bg-white'>
                <AlertDialogTrigger asChild><Trash
                 className='h-5 w-5 text-red-600 cursor-pointer'
                 /></AlertDialogTrigger>
                <AlertDialogContent className='bg-white rounded'>
                    <AlertDialogHeader className='bg-white rounded'>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel className='rounded border-0 bg-red-600 text-white hover:bg-red-500 hover:text-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='rounded bg-primary text-white' onClick={()=>onDeleteForm()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
        <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className='text-md text-gray-500'>{jsonForm?.formHeading}</h2>
        <hr className='my-4'></hr>
        <div className='flex justify-between'>
            <RWebShare
            data={{
            text: jsonForm?.formHeading+" , Build your form in second with Ai Form Builder",
            url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
            title: jsonForm?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
        >
           <Button variant='outline' size="sm" className='flex gap-2 rounded'><Share className='h-5 w-5'/> Share</Button>
        </RWebShare>
            
            <Link href={'/edit-form/'+formRecord?.id}>
                <Button className='felx gap-2 rounded text-white'  size="sm"><Edit className='h-5 w-5'/> Edit</Button>
            </Link>
        </div>
    </div>
  )
}

export default FormListItem