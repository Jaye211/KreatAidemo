"use client"

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Code } from "lucide-react";
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
import ReactMarkdown from 'react-markdown';




const CodePage = () => {
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

            const response = await axios.post("/api/code", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error:any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
           <Heading 
            title="Code Generation"
            description="Generate code with our ai model"
            icon={ Code }
            bgColor="bg-green-700/10"
            iconColor="text-green-700"
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
                                        placeholder="Simple toggle button with react hooks"
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
                                {message.role === "assistant" ?  <BotAvatar /> : <UserAvatar /> }
                                <ReactMarkdown
                              components={{
                                pre: ({ node, ...props }) => (
                               <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                             <pre {...props} />
                              </div>
                                      ),
                           code: ({ node, ...props }) => (
                                <code className="bg-black/10 rounded-lg p-1" {...props} />
                                   ),
                                 }}
                                      className="text-sm overflow-hidden leading-7"
                                                    >
                                            {message.content}
                                      </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default CodePage;
