"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Send, ArrowDownCircleIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LandingSections from "@/components/LandingSections";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {/* Changed to emerald-500 */}
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
    </div>
  );
}

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowChatIcon(true);
      else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantText += decoder.decode(value);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantText;
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error getting response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      <LandingSections />

      {/* Floating Chat Button */}
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsChatOpen((p) => !p)}
              className="relative size-16 rounded-full p-0 bg-transparent shadow-lg hover:scale-105 transition-all overflow-hidden border-none outline-none"
            >
              {!isChatOpen ? (
                <img
                  src="/bot.png"
                  alt="AI"
                  className="w-full h-full object-cover scale-[1.5]"
                />
              ) : (
                // Changed background to emerald-500
                <div className="w-full h-full bg-emerald-500 flex items-center justify-center rounded-full">
                  <ArrowDownCircleIcon className="size-8 text-white" />
                </div>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 bottom-0 right-0 w-full h-[100dvh] sm:bottom-24 sm:right-6 sm:h-auto sm:max-w-md"
          >
            <Card className="flex flex-col h-full sm:h-[500px] bg-white border border-gray-200 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
                  <img src="/bot.png" className="size-6" alt="OptimaCare" />
                  OptimaCare Chat Assistant
                </CardTitle>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-4 py-5">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "self-end bg-emerald-500 text-white" // Changed to emerald-500
                            : "self-start bg-gray-100 text-gray-900"
                        }`}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="self-start bg-gray-100 rounded-2xl">
                        <TypingDots />
                      </div>
                    )}

                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t border-gray-200 p-3 bg-white">
                <form onSubmit={sendMessage} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message…"
                    disabled={isLoading}
                    
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-emerald-500"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                   
                    className="bg-emerald-500 hover:bg-emerald-500 text-white"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}