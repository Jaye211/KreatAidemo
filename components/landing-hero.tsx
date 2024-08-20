"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypeWriterComponent from "typewriter-effect"
import { Button } from "./ui/button";



export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold ">
                <h1>The Most Advanced AI Tool  </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypeWriterComponent 
                    options={{
                        strings: [
                            "Chatbot",
                            "Image Generation",
                            "Video Generation ",
                            "Code Generation ",
                        ],
                        autoStart: true,
                        loop: true
                    }}
                     />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                KreatAI is still a work in progress, coming out soon.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="destructive"  className="md:text-lg p-4 md:p-6 rounded-full font-semibold font-black">Do A Test Trial</Button>
                </Link>
            </div>
            
        </div>
    )
}