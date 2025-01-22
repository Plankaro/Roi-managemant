import { Layout, MessageSquare, Bot, LineChart, Database, Users, Podcast } from "lucide-react";

export const contacts = [
    {
      id: 1,
      name: "Grace Miller",
      phone: "+91 9873535637",
      message: "Lorem ipsum dolor sit amet, consectetur adipisc...",
      time: "2:46 pm",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      online: true,
    },
    {
      id: 2,
      name: "Jacob Math",
      phone: "+91 8765498768",
      message: "Lorem ipsum dolor sit amet, consectetur adip...",
      time: "2:46 pm",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      online: false,
    },
    // Add more contacts as needed
  ];

  export const sidebarItems = [
    { icon: Layout, label: "Overview" },
    { icon: MessageSquare, label: "Chats", active: true },
    { icon: Podcast, label: "Broadcast" },
    { icon: Bot, label: "AI Builder" },
    { icon: LineChart, label: "Analytics" },
    { icon: Database, label: "Data Integration" },
    { icon: Users, label: "Agents" },
  ];