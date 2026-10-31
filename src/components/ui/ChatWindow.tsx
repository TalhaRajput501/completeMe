'use client'
import React, { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, getToolName, isToolUIPart, lastAssistantMessageIsCompleteWithToolCalls } from 'ai'
import { BlocksIcon, LoaderPinwheelIcon, MessageCircleText, Send, SendHorizontal, Square, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks'
import { addToCart } from '@/app/product/[category]/[id]/[name]/page'
import { cartProduct } from '../../../types/productTypes'
import { deleteItem } from '@/lib/features/cartSlice'

export default function ChatWindow() {

  const [isWindowOpened, setIsWindowOpened] = useState(false)
  const [input, setInput] = useState('')
  const reduxCart = useAppSelector(state => state.cart.products)
  const dispatch = useAppDispatch()


  const { messages, sendMessage, status, addToolOutput } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chatbot',
    }),

    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    async onToolCall({ toolCall }) {
      // here we are checking if the tool is already executed or not. basically if it is true that mean tool is server tool and we are nothing to do here.
      if (toolCall.dynamic) return
      // here we are checking the tool name and run the corresponding function to fetch the data and return it to the assistant. and also adding try catch to give the error to llm in case of error.

      // Get Full Cart tool execution
      if (toolCall.toolName === 'getFullCart') {
        // Fetch the full cart details
        try {
          const fullCart = reduxCart;
          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: fullCart,
          });
        } catch (error) {
          console.error('Error fetching full cart:', error);
          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              error: `${error instanceof Error ? error.message : 'An unknown error occurred'}`,
            },
          })
        }
      }


      // Add to Cart tool execution
      if (toolCall.toolName === 'addToCart') {
        try {
          const { product, cartValue } = toolCall.input as { product: Omit<cartProduct, 'qtyToBuy'>; cartValue: number }
          console.log("Adding to cart on frontedn tool",{
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              success: true,
              message: `${product.name} has been added to the cart.`,
            },
          })
          addToCart({
            product: {
              ...product,
              qtyToBuy: cartValue
            },
            cartValue,
            cartList: reduxCart,
            id: product._id,
            dispatch
          });

          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              success: true,
              message: `${product.name} has been added to the cart.`,
            },
          });

        } catch (error) {
          console.error('Error adding to cart:', error);
          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              error: `${error instanceof Error ? error.message : 'An unknown error occurred'}`,
            },
          })
        }
      }

      // Remove from Cart tool execution
      if (toolCall.toolName === 'removeFromCart') {
        try {
          const { productId } = toolCall.input as { productId: string }
          dispatch(deleteItem(productId))
          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              success: true,
              message: `Product has been removed from the cart.`,
            },
          });
        } catch (error) {
          console.error('Error removing from cart:', error);
          addToolOutput({
            toolCallId: toolCall.toolCallId,
            tool: toolCall.toolName,
            output: {
              error: `${error instanceof Error ? error.message : 'An unknown error occurred'}`,
            },
          });
        }
      }
    }
  })

  useEffect(() => {
    document.body.style.overflow = isWindowOpened ? 'hidden' : 'auto';
  }, [isWindowOpened]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end ">



      {isWindowOpened && (
        <div className="bg-white  rounded-lg shadow-lg  w-80 md:w-96 max-h-[500px] overflow-y-auto min-h-[400px] flex flex-col  ">

          {/* Left: logo + title grouped together */}
          <div className="mb-1.5 flex h-[50px] w-full items-center justify-between border-b border-slate-200 bg-blue-600/70 px-4   flex-shrink-0">

            <div className="flex items-center gap-2">
              <Image
                src="/ecom.webp"
                alt="Complete Me Assistant"
                width={31}
                height={31}
                className="rounded-full ring-1 ring-white/40"
              />
              <div className="text-sm font-semibold text-white">
                Complete Me Assistant
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Online
            </div>
          </div>



          {/* Messages go here */}
          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex w-full text-black ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] break-words rounded-lg border p-1.5 md:p-2 mb-1 ${isUser
                      ? 'border-slate-300 bg-slate-50'
                      : 'border-slate-300 bg-slate-50'
                      }`}
                  >
                    {message.parts.map((part, index) => {
                      // 1. Text content — rendered as markdown
                      if (part.type === 'text') {
                        return (
                          <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                            {part.text}
                          </ReactMarkdown>
                        );
                      }

                      // 2. Tool calls — show what the assistant is doing
                      if (isToolUIPart(part)) {
                        return (
                          <div
                            key={index}
                            className="my-1 rounded bg-slate-100 px-2 py-1 text-xs italic text-slate-500"
                          >
                            {/* i have to write some thing like tool is calling or tool is executing */}
                            🔧  executing toolcall ....
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col justify-between items-between  gap-2 p-3 ">

            {/* Prompt box + button*/}
            <form
              onSubmit={e => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              className="flex gap-2   left-2 right-2 bg-white   "
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus={true}
                placeholder="Say something..."
                className='w-full rounded-lg border border-slate-300 bg-slate-50  text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 p-1.5 md:p-2 w-3/4'
              />

              {/* Show the submit button when not busy */}
              <button type="submit" disabled={status !== 'ready' || input.trim() === ''} className='bg-blue-600 hover:bg-blue-700 text-white font-bold  rounded px-2 py-0 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'>
                <SendHorizontal />
              </button>

            </form>

          </div>
        </div>
      )}


      <button
        onClick={() => {
          setIsWindowOpened(!isWindowOpened)
        }}
        aria-label={isWindowOpened ? 'Close chat' : 'Start chat'}
        className={`
          mt-2 flex h-12 w-12 items-center justify-center rounded-full
          bg-slate-900 text-white shadow-lg
          transition-all duration-300
          hover:scale-105 hover:cursor-pointer hover:bg-slate-800
          focus:outline-none focus:ring-2 focus:ring-slate-900focus:ring-offset-2
          md:h-14 md:w-14 
          ${!isWindowOpened ? 'animate[chat-ring-pulse_2s_ease-out_infinite]motion-reduce:animate-none' : ''}
        `}
      >
        {isWindowOpened
          ? <X className="h-5 w-5 md:h-6 md:w-6" />
          : <MessageCircleText className="h-5 w-5 md:h-6 md:w-6" />}
      </button>






    </div>
  )
}
