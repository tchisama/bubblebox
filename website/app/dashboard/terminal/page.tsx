"use client"

import { axios } from "@/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TerminalHomePage (){
  const [path,setPath] = useState("/home/tchisama")
  return (
    <div className="text-white p-3 ">
      <Card className="p-3  min-h-[40vh] flex flex-col">
        <div className="flex flex-col gap-2 ">
          <div>
          /home/tchisama$ 
          </div>
          <form className="flex flex-1" onSubmit={
            (e)=>{
              e.preventDefault()
              axios.post("/execute",{command:path}).then((res)=>{
                console.log(res.data)
              })
            }
          }>
          <Input value={path} onInput={(e:any)=>setPath(e.target.value)} className="flex-1  focus:outline-none ring-0 outline-none text-md"></Input>
          </form>
        </div>
      </Card>
    </div>
  )
}
