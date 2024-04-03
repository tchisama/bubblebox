import {
  File,
  ListFilter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
export const DashboardMain =()=>{
  return(
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {/* <Card className="sm:col-span-2"> */}
              {/*   <CardHeader className="pb-3"> */}
              {/*     <CardTitle>Your Orders</CardTitle> */}
              {/*     <CardDescription className="max-w-lg text-balance leading-relaxed"> */}
              {/*       Introducing Our Dynamic Orders Dashboard for Seamless */}
              {/*       Management and Insightful Analysis. */}
              {/*     </CardDescription> */}
              {/*   </CardHeader> */}
              {/*   <CardFooter> */}
              {/*     <Button>Create New Order</Button> */}
              {/*   </CardFooter> */}
              {/* </Card> */}

              <Card className="bg-gradient-to-br from-[#00bbf9] to-[#00f5d4] ">
                <CardHeader className="pb-2">
                  <CardDescription className="text-black/80">CPU</CardDescription>
                  <CardTitle className="text-5xl text-black/80">15 %</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-black/80">
                    1.5 GHz used of 3.0 GHz
                  </div>
                </CardContent>
                <CardFooter className="">
                  <Progress className="bg-black/40 border-2 border-[#0002]"  value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>



                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Memory</CardDescription>
                    <CardTitle className="text-5xl">75 %</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      12 GB used of 16 GB
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="5% decrease" />
                  </CardFooter>
                </Card> 


              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Storage</CardDescription>
                  <CardTitle className="text-5xl">50 %</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                      123 GB used of 250 GB
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>

        </div>
        </div>

  )
}