"use client"

import { axios } from "@/axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useFilesystem } from "@/store/filesystem"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"


export const CreateFolder = ({children}:{
  children:React.ReactNode
})=>{
  const {path,setFileslist,fileslist} = useFilesystem()
  const [name,setName] = useState("")
return (
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent  className="dark flex flex-col items-start">
    <DialogHeader>
      <DialogTitle className="text-white/80 mb-2">Name of the folder</DialogTitle>
    </DialogHeader>
    <Input className="text-white" value={name} onInput={(e:any)=>{setName(e.target.value)}} placeholder="Folder name" />
    <DialogFooter className="flex gap-2 flex-row justify-end w-full">
          <DialogClose>
          <Button className="text-white" variant="outline">close</Button>
          </DialogClose>
          <DialogClose>
          <Button onClick={()=>{
                axios.post("/createfolder",{path,name}).then(()=>{
                if(fileslist){
                  setFileslist([...fileslist,{name,type:"folder",path:path+"/"+name}])
                }else{
                  setFileslist([{name,type:"folder",path:path+"/"+name}])
                }
              })
            }}>create</Button>
          </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
)
}
