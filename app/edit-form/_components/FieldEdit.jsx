import { Trash, Edit } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../../components/ui/popover"
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
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
  
  

export function FieldEdit({defaultValue,onUpdate, deleteField}) {

    const [label, setLabel] = useState(defaultValue?.label);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className='flex gap-2'>
        <Popover>
            <PopoverTrigger><Edit className='h-5 w-4 text-gray-500'/></PopoverTrigger>
            <PopoverContent className='bg-white rounded'>
                <h2>Edit Fields</h2>
                <div>
                    <label className='text-xs'>Label Name</label>
                    <Input type='text' 
                    defaultValue={defaultValue.label}
                    onChange={(e)=>setLabel(e.target.value)}/>
                </div>
                <div>
                    <label className='text-xs'>Placeholder Name</label>
                    <Input type='text' 
                    defaultValue={defaultValue.placeholder}
                    onChange={(e)=>setPlaceholder(e.target.value)}/>
                </div>
                <Button size='sm' className='mt-3 rounded'
                onClick={()=>onUpdate({
                    label:label,
                    placeholder:placeholder,
                })}>
                    Update
                </Button>
            </PopoverContent>
        </Popover>
        
        <AlertDialog className='bg-white rounded'>
        <AlertDialogTrigger><Trash className='h-5 w-4 text-red-500'/></AlertDialogTrigger>
        <AlertDialogContent className='bg-white rounded'>
            <AlertDialogHeader className='bg-white rounded'>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your field
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className='rounded'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='rounded' onClick={()=>deleteField()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

    </div>
  )
}

