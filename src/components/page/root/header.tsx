import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/ui/logo";
import { Search, Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between  py-2 h-[72px]">
      <Logo width={120} height={58} />
      <div className="flex items-center gap-4 basis-3/12 justify-between">
        <Search className="text-white" />
        <Bell className="text-white" />
        <div className="flex items-center gap-2">
          <div className="flex flex-col  text-white">
            <span className="text-sm ">Skin Bae Support</span>
            <span className="text-xs">skin@gmail.com</span>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" height={28} width={28} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
