/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MessageCircle, Search } from "lucide-react";
import { useGetAllShopifyContactsQuery } from "@/store/features/apislice";
import { Skeleton } from "@/components/ui/skeleton";

import { useCreateProspectMutation } from "@/store/features/apislice";
export default function ScrollableContactDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: contacts, isLoading,refetch } = useGetAllShopifyContactsQuery({});
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [createProspect, { isLoading: createProspectLoading }] =
    useCreateProspectMutation();

  const handleContactSelect = (contact: any) => {
    setSelectedContact((prev: any) =>
      prev?.id === contact.id ? null : contact
    );
  };

  const handleChatClick = async () => {
    if (selectedContact !== null && selectedContact?.phone) {
      try {
        //console.log(`Starting chat with contact ID: ${selectedContact.id}`);
        //console.log(selectedContact);

        await createProspect({
          shopify_id:selectedContact.id.match(/\d+$/)[0],
          name: selectedContact.name,
          email: selectedContact.email,
          phone: selectedContact.phone,
          image: selectedContact.image,
        });
        refetch();
        
      } catch (error) {
        //console.log(error);
      }
      finally{
        setOpen(false);
        setSelectedContact(null);
      }
    }
  };

  const filteredContacts = useMemo(() => {
    return (
      contacts?.filter(
        (contact: any) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
      ) || []
    );
  }, [contacts, searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contacts</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border"
                  >
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              : filteredContacts.map((contact: any) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                      selectedContact?.id === contact.id
                        ? "bg-primary text-white"
                        : "bg-card hover:bg-accent"
                    }`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.image} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{contact.name}</h3>
                      <div
                        className={`text-sm ${
                          selectedContact?.id === contact.id
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        } space-y-1`}
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleChatClick} disabled={!selectedContact?.phone || createProspectLoading}>
            <MessageCircle className="mr-2 h-4 w-4" />
            {createProspectLoading ? "Creating..." : "Chat"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
