"use client";

import { useChat, Message } from "@ai-sdk/react";
import { ArrowDown, SendIcon } from "lucide-react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat", // ✅ Match your route
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="w-full flex items-center mt-15 p-5">
        {" "}
        <Image
          src={"/eebologo.png"}
          alt="logo"
          width={240}
          height={240}
          className="items-center flex mx-auto"
        />
      </div>
      {messages.length > 0 ? (
        <div className="pb-32 pt-5 space-y-5 w-[75%] mx-auto relative">
          {messages.map((message: Message) => (
            <div key={message.id} className="w-full">
              {message.role === "user" ? (
                <div className="text-right bg-teal-700 p-3 rounded-xl inline-block max-w-[80%] break-words">
                  {message.content}
                </div>
              ) : (
                <div className="text-left bg-neutral-700 p-3 rounded-xl inline-block max-w-[80%] break-words">
                  {message.content}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center pt-5">
          <h1 className="font-bold text-3xl text-center">
            Please use the input field below{" "}
            <ArrowDown className="inline-block ml-2" />
          </h1>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center p-2">
          Error: {error.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-5 fixed bottom-0 left-0 w-[75%] mx-auto right-0 bg-neutral-900"
      >
        <div className="relative flex items-center">
          <TextareaAutosize
            onChange={handleInputChange}
            tabIndex={0}
            required
            rows={1}
            value={input}
            autoFocus
            placeholder="how can I help?..."
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-700 shadow-xl 
            placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl
            bg-neutral-600 resize-none"
          />
          <button
            type="submit"
            className="absolute bg-teal-500 p-2 rounded-lg right-0 mr-5 hover:bg-teal-400 transition"
          >
            <SendIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
