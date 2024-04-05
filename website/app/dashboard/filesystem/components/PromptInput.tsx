import { axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useFilesystem } from "@/store/filesystem";
import Axios from "axios";
import { Stars } from "lucide-react";
import { comma } from "postcss/lib/list";
import { useState } from "react";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("" as string)
  const {path,setPath,update,setUpdate} = useFilesystem()
  const { toast } = useToast()
  const submitPrompt = (e:any)=>{
    e && e.preventDefault()
    Axios.post("http://192.168.1.17:5000/answer",{prompt : `prompt:${prompt}  \n path:${path}`},{
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(res=>{
      setPrompt("")
      console.log(res.data)
        if(!res.data.answer?.function_call){
          toast({
            title: "Bubble",
            duration: 1200000,
            description: res.data.answer.content,
          })
        }else{
          const data = JSON.parse(res.data.answer.function_call.arguments)
          const commands = data.commands
          commands.forEach((command:any)=>{
            let confirmAlert = confirm(command.command)
            if(!confirmAlert) return
            axios.post("/filesystem/execute",{command:command.command}).then(res=>{
              console.log(res.data)
              toast({
                title: "Bubble",
                duration: 1200000,
                description: res.data.replace( /\n/g, " | "),
              })
              setUpdate(update+1)
            })
          })
        }

      })
  }
  return (
    <form onSubmit={submitPrompt} className="absolute flex gap-2 bottom-6 p-1 border-[#fff1] shadow-2xl bg-[#fff1] min-w-[40vw]  border rounded-2xl left-1/2 -translate-x-1/2">
      <Input placeholder="Enter a prompt" value={prompt} onInput={(e:any)=>setPrompt(e.target.value)} className="flex-1 text-white" />
      <Button  variant="outline" className="text-white flex gap-2"><Stars size={16}/> send</Button>
    </form>
  );
}
