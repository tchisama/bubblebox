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
import { FsCard } from "./components/FsCard";

export default function Dashboard() {
  const {path,setFileslist,fileslist,setPath} = useFilesystem()

  useEffect(() => {
  axios.post("/filesystem/filelist",{path}).then((res) => {
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
      <Breadcrumb className="px-4 mt-4">
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




