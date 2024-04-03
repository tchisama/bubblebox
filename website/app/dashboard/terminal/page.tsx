import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TerminalHomePage (){
  return (
    <div className="text-white p-3 ">
      <Card className="p-3  min-h-[40vh] flex flex-col">
        <div className="flex gap-6 items-center">
          <div>
          /home/tchisama$ 
          </div>
          <Input className="flex-1 border-none focus:outline-none ring-0 outline-none text-md"></Input>
        </div>
      </Card>
    </div>
  )
}
