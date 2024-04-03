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


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Dashboard() {
  const {path,setFileslist,fileslist,setPath} = useFilesystem()

  useEffect(() => {
  axios.post("/filelist",{path}).then((res) => {
      // i want to order by type folders first then files
    setFileslist(res.data.sort((a:File,b:File) => {
      if(a.type == "folder" && b.type == "file"){
        return -1
      }
      if(a.type == "file" && b.type == "folder"){
        return 1
      }
      if(a.name > b.name){
        return 1
      }
      if(a.name < b.name){
        return -1
      }
      return 0
    }))

  }).catch((err) => {
    console.log(err)
  })
  },[path])

  return (
    <div >
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          {
            path.slice(1).split("/").map((_,i) => {
              return(
                <>
                <BreadcrumbItem className="cursor-pointer">
                  <BreadcrumbLink onClick={()=>{setPath(path.split("/").slice(0,i+2).join("/"))}}>{_}</BreadcrumbLink>
                </BreadcrumbItem>
                {
                  i != path.split("/").length-1 && <BreadcrumbSeparator />
                }
                </>
              )
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
    <div className="flex-1 grid md:grid-cols-4 gap-2 p-4">
    {
      // i want to add duration
      fileslist.map((_, i) => <FsCard file={_} key={i} />)
    }
  </div>
    </div>
  )
}




const FsCard = ({file}:any)=>{
  const {setPath} = useFilesystem()
return(
<Card  onClick={()=>{setPath(file.path)}} className="p-4 group duration-300 hover:bg-[#fff1] bg-[#ffffff06] cursor-pointer flex items-center gap-4">
      {
        file.type == "folder" ? <FolderIcon color='#00bbf9' size={40} strokeWidth={1}/>:
        <FileIcon color='#fff6' size={30} strokeWidth={1}/>
      }
        <div>
          <div>{file.name}</div>
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
                console.log("rename")
              }
            }>Rename</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
</Card>
)
}
