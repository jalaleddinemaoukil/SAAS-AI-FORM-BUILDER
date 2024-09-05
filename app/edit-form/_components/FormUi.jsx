import React from "react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Checkbox } from "../../../components/ui/checkbox";
import { FieldEdit } from './FieldEdit';
import { useState } from "react";
import { userResponses } from "../../../configs/schema";
import { toast } from "sonner";
import db from "../../../configs";
import { useRef } from "react";
import moment from "moment";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";

export function FormUi({ jsonForm, selectedTheme, selectedStyle, onFieldUpdate, deleteField, editable=true, formId=0, enableSignIn=false}) {

  const [formData, setFormData]=useState();
  const {user, isSignedIn} = useUser()

  let formRef=useRef()
  const handleInputChange=(event)=>{
    
    const {name, value}=event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSelectChange = (event) => {
    if (event.target && event.target.name && event.target.value !== undefined) {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      console.error("Event target is not defined or does not have the required properties");
    }
  };
  
  const handlecheckboxChange=(fieldName, itemName, value)=>{
    
    const list=formData?.[fieldName]?formData?.[fieldName]:[];
    if(value){
      list.push({
        label:itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:value
      })
    } else {
      const result = list.filter((item)=> item.label==itemName);
    }
  }

  const onFormSubmit = async(event) =>{
    event.preventDefault()
    console.log(formData)

    const result = await db.insert(userResponses)
    .values({
      jsonResponse:formData,
      createdAt:moment().format("DD/MM/yyy"),
      formRef: formId
    })

    if(result){
      formRef.reset();
      toast('Response Submitted Successfully !')
    } else{
      toast("Error while saving your form")
    }
  }
  return (
    <form 
    ref={(e)=>formRef=e}
    onSubmit={onFormSubmit}
    className=" p-5  md:w-[600px] rounded" style={{
      boxShadow: selectedStyle?.key=='boxshadow'&& '5px 5px 0px black',
      border:selectedStyle?.key=='border'&&selectedStyle.value}} data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formHeading}
      </h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="w-full">
            <Select required={field?.required} onValueChange={(v)=>handleSelectChange(field.fieldName,v)}>
              <label className="text-sm text-gray-500">{field.label}</label>
              <SelectTrigger className="w-full rounded">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {field.options.map((item, index) => (
                  <SelectItem
                    key={index}
                    className="cursor-pointer hover:bg-slate-600"
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
                
              </SelectContent>
            </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div>
              <label className="text-sm text-gray-500">{field.label}</label>
              <RadioGroup  required={field?.required} 
             >
                {field.options.map((item, index) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label} 
                     onClick={()=>handleSelectChange(field.fieldName,item.label)}/>
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          
          ) : field.fieldType=='checkbox'? 
              <div className="my-3 w-full">
                <label className="text-sm text-gray-500">{field?.label}</label>
                {
                  field?.options?.map((item,index)=>(
                    <div className="flex gap-2 items-center">
                      <Checkbox onCheckedChange={(v)=>handlecheckboxChange(field?.label, item.label, v)}/>
                      <h2>{item.label}</h2>
                    </div>
                  ))
                }
                :
                <div className="flex gap-2 items-center">
                  <Checkbox/>
                  <h2>{field.label}</h2>
                </div>
              </div>

            : <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                className="rounded focus:border-2"
                onChange={(e)=>handleInputChange(e)}
                required={field?.required}
              />
            </div>
          }
          {editable&& <div>
            <FieldEdit defaultValue={field}
            onUpdate={(value)=>onFieldUpdate(value,index)}
            deleteField={()=>deleteField(index)}/>
          </div>}
        </div>
      ))}
      {!enableSignIn?
       <button type="submit" className="btn btn-primary">Submit</button>
      :isSignedIn?
      <button type="submit" className="btn btn-primary">Submit</button>:
        <Button><SignInButton mode='modal'>Sign in Before Submit the form</SignInButton></Button>
      }
    </form>
  );
}
