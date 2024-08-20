"use client"
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
  import { UserButton } from '@clerk/nextjs';
import { ArrowRight, Code, FileBadge,   FileText, ImageIcon, MessageSquare, VideoIcon } from 'lucide-react';
  import React from 'react'

  const tools = [
    {
      label: "Conversation",
      icon: <MessageSquare className="w-8 h-8 text-violet-500" />,
      bgColor: "bg-violet-500/10",
      href: "/conversation"
    },
    
    {
      label: "Image Generator",
      icon: <ImageIcon className="w-8 h-8 text-pink-500" />,
      bgColor: "bg-pink-500/10",
      href: "/image"
    },
    {
      label: "Video Generator",
      icon: <VideoIcon className="w-8 h-8 text-orange-700" />,
      bgColor: "bg-orange-700/10",
      href: "/video"
    },
    {
      label: "Code",
      icon: <Code className="w-8 h-8 text-green-700" />,
      bgColor: "bg-green-700/10",
      href: "/code"
    },
  ]

  const DashboardPage = () => {
    return (
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
         </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center" > 
          Chat with the smartest AI - Experience the power of AI
          </p>
          
        </div>
        
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card 
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className= "flex items-center gap-x-4">
                  <div className= {cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    {tool.icon} 
                   </div>
                   <div className="font-semibold">
                    {tool.label}
                   </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div>
      
    )
  }

  export default DashboardPage;