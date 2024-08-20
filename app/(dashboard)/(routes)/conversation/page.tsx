"use client"

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/Heading";
import { MessageSquare, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown  from 'react-markdown';




const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    
    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                role: 'user',
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset(); // Assuming `form.reset` is a valid method, make sure it's properly defined.
        } catch (error: any) {
            console.log('Error:', error);
        } finally {
            router.refresh(); // Refreshes the page or data
        }
    };

    return (
        <div>
           <Heading 
            title="Conversation"
            description="Chat with our most advanced conversation ai model"
            icon={ MessageSquare }
            bgColor="bg-violet-500/10"
            iconColor="text-violet-500"
            /> 
            <div className="px-4 lg:px-8" >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField 
                            name="prompt"
                            render={({ field }) =>  (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                        className="border-0 outline-none focus-visible:ring-0 
                                        focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="whats the circumference of a circle with a radius of 5?"
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} 
                            />
                                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                    Generate
                                </Button>
                        </form>

                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    ) }
                            {messages.length === 0 && !isLoading && (
                                <Empty label="No conversation yet"  />
                            )}
                    <div className="flex flex-col-reverse gap-y-4" >
                        {messages.map((message) => (
                            <div key={message.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "assistant" ? "bg-white border border-black/10" : "bg-muted")}
                            >
                               {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                            
                              <div className="text-sm">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>  
                            </div>
                        ))}
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default ConversationPage;
