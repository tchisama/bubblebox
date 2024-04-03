import { Header } from "@/components/global/header";
import { Navbar } from "@/components/global/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Navbar />      
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
                {children}
            </div>
          </div>
  );
}
