"use client"

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { LayoutDashboard, MessageSquare,   FileText,  FileBadge, 
     ImageIcon,  Code, VideoIcon, Settings, } from "lucide-react";
import { usePathname } from "next/navigation";


const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 mr-3 text-sky-500"/>,
    href: "/dashboard",
    
},
{
    label: "Conversation",
    icon: <MessageSquare className="w-5 h-5 mr-3 text-violet-500" />,
    href: "/conversation",
    
},

{
    label: "Image Generator",
    icon: <ImageIcon className="w-5 h-5 mr-3 text-pink-500" />,
    href: "/image",
    
},
{
    label: "Video Generator",
    icon: <VideoIcon className="w-5 h-5 mr-3 text-orange-700" />,
    href: "/video",
    
},

{
    label: "Code Generator",
    icon: <Code className="w-5 h-5 mr-3 text-green-700" />,
    href: "/code",
    color: "text-green-700",
},
{
    label: "Settings",
    icon: <Settings className="w-5 h-5 mr-3 text-sky-500" />,
    href: "/settings",
    
},
];
const Sidebar = () => {
    const pathname = usePathname();
    return (  
        <div className="space-y-4 py-4 flex flex-col h-full
         bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                            fill
                            alt="logo"
                            src="/logo1.png"
                        />
                    </div>
                    <h1 className={cn ("text-2xl font-bold", montserrat.className)}>KreatAi</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href}
                            className={cn ("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ",
                               pathname === route.href ? "text-white bg-white/10 " : "text-zinc-400" ) }>
                            <div className="flex items-center flex-1">
                               { route.icon   } 
                               {route.label}
                            </div>
                         </Link>
                    ))}
                </div>
            </div>
         </div>
    );
}
 
export default Sidebar ;