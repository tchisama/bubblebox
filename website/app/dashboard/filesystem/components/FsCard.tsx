"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileIcon, FolderIcon, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { axios } from "@/axios";
import { useFilesystem } from "@/store/filesystem";
export const FsCard = ({file}:any)=>{
  const {setPath} = useFilesystem()
return(
<Card  onClick={()=>{setPath(file.path)}} className="p-4 group duration-300 hover:bg-[#fff1] bg-[#ffffff06] cursor-pointer flex items-center gap-4">
      {
        file.type == "folder" ? <FolderIcon color='#00bbf9' size={40} strokeWidth={1}/>:
        <FileIcon color='#fff6' size={30} strokeWidth={1}/>
      }
        <div className="flex-1">
          <div className="h-6 overflow-hidden">{file.name}</div>
          <div className="text-xs text-white/50">34 items</div>
        </div>

        <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto md:opacity-0 group-hover:opacity-100 duration-300 " variant={"ghost"} size="icon">
                  <MoreVertical size={15} />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={
              (e)=>{
                e.stopPropagation()
                const newName = prompt("Enter new name");
                if(newName){
                  axios.post("/rename",{path:file.path,name:newName}).then(()=>{
                    file.name = newName
                  })
                }
              }
            }>Rename</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
</Card>
)
}





