import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderIcon, MoreVertical } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function Dashboard() {
  return <div className="flex-1 grid md:grid-cols-4 gap-2 p-4">
    {
      // i want to add duration
      new Array(10).fill(0).map((_, i) => <FsCard key={i} />)
    }
  </div>
}




const FsCard = ()=>{
return(
<Card  className="p-4 group duration-300 hover:bg-[#fff1] bg-[#ffffff06] cursor-pointer flex items-center gap-4">
        <FolderIcon color='#00bbf9' size={40} strokeWidth={1}/>
        <div>
          <div>hello world</div>
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
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
</Card>
)
}
