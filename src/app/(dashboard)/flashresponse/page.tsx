/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Plus, PencilIcon, Zap } from "lucide-react";
import FlashResponseCreateModal from "@/components/page/flashresponse/flash-response-create-modal";
import FlashResponseEditModal from "@/components/page/flashresponse/flash-response-edit-modal";

import { useDeleteFlashResponseMutation,useGetFlashResponseQuery,useUpdateFlashResponseMutation, useCreateFlashResponseMutation } from "@/store/features/apislice";

// Sample flash responses data


export default function FlashResponsesPage() {
    const {data:flashresponse,isLoading} = useGetFlashResponseQuery({})
    //console.log(flashresponse)
    const [createMutation] = useCreateFlashResponseMutation()
    const [deleteMutation] = useDeleteFlashResponseMutation()
    const [updateMutation] = useUpdateFlashResponseMutation()

  const [searchQuery, setSearchQuery] = useState("");

 
//console.log(flashresponse)
  const filteredResponses = flashresponse && flashresponse.filter(
    (response:any) =>
      response.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredResponses)
  
  const handleAddResponse = async (newResponse:any) => {
   await createMutation(newResponse)
   
  };


  const handleDeleteResponse = async(id: string) => {
    await deleteMutation({id})
  
  };
  const handleEditResponse = async (updatedResponse: any) => {
    //console.log("update",updatedResponse)
    await updateMutation({id:updatedResponse.id,body:{
        heading:updatedResponse.heading,
        message:updatedResponse.message,
        category:updatedResponse.category,
        shareWithOthers:updatedResponse.shareWithOthers
        
    }})
    
  
  };

  return (
    <main className="">
      <div className=" md:p-6 ">
        <div className="flex md:items-center gap-3 md:flex-row flex-col justify-between mb-6">
          <div className="flex items-center">
        
            <h1 className="text-2xl font-bold text-white">Flash Response</h1>
          </div>

          <div className="flex md:items-center md:flex-row flex-col gap-3">
            <div className="relative gap-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-indigo-900/30 border-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-white placeholder:text-gray-400 md:w-[200px] h-9 rounded-md"
              />
            </div>
            <FlashResponseCreateModal onSave={handleAddResponse}>
              <Button
               
                className="bg-blue-500 hover:bg-blue-600 text-white h-9 rounded-md flex items-center gap-1 px-4"
              >
                <Plus className="h-4 w-4" />
                New Response
              </Button>
            </FlashResponseCreateModal>
          </div>
        </div>

        {!flashresponse  || flashresponse?.length === 0 ? (
          <div className=" bottom-full left-0 right-0  rounded-t-lg  h-[60vh]  p-8 flex flex-col items-center justify-center">
          <div className="p-4 rounded-full mb-4">
            <Zap className="h-20 w-20 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Flash Responses Added Yet!</h2>
          <p className="text-center text-gray-300 mb-6 max-w-md">
            It looks like you haven&apos;t created any Flash Responses yet. Flash Responses help you send pre-configured messages
            instantly, making conversations faster and more efficient. Start by clicking &apos;New Response&apos; and set up your
            first quick reply now!
          </p>
          <FlashResponseCreateModal onSave={handleAddResponse}>
          <Button  className="bg-blue-500 hover:bg-blue-600 text-white">
            + Create Flash Response
          </Button>
          </FlashResponseCreateModal>
        </div>
        ) : (
          <div>
            {filteredResponses?.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No flash responses found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  overflow-scroll max-h-[calc(100vh-200px)] no-scrollbar">
                {filteredResponses?.map((response:any) => (
                  <div
                    key={response.id}
                    className="bg-backgroundColor border relative  h-[250px] border-primary rounded-lg space-y-3 p-3"
                  >
               
                    <div className="p-4">
                      <div className="mb-2">
                        <div className="text-white font-medium text-2xl">
                          {response.heading}
                        </div>
                        <div className="text-xs text-gray-400">
                          Category: {response.category}
                        </div>
                      </div>
                      <p className="text-white text-sm mb-4 line-clamp-3 h-[70px]">
                        {response.message}
                      </p>
                      <div className="">
                      <div className="flex justify-between items-center mt-4 border-t border-[#D9D9D933] py-2 ">
                        <div className="text-sm text-white flex flex-col">
                            <span className="text-blue-500">Created by </span>
                          <span>{response?.creator?.name??""}</span>
                          
                        </div>
                        <div className="flex space-x-1">
                          <FlashResponseEditModal
                            response={response}
                            onSave={handleEditResponse}
                            
                          >
                            <button className="text-gray-400 hover:text-white p-1">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                          </FlashResponseEditModal>
                          <button
                            onClick={() => handleDeleteResponse(response.id)}
                            className="text-gray-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
