/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/ui/logo";
import { Search, Bell, X, Menu } from "lucide-react";
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { toggleMenuModal } from "@/store/features/prospect";
import { RootState } from "@/store/store";
import {  useSession } from "next-auth/react";
const Header = () => {
  const session:any = useSession();

    const isOpen = useSelector((state:RootState)=>state.Prospect.openMenuModal)
    const dispatch = useDispatch()
  return (
    <div className="w-full flex items-center justify-between  py-2 h-[72px]">
        <button
        className="md:hidden left-4  p-2 bg-navy-900 rounded-full text-white"
        onClick={() => dispatch(toggleMenuModal())}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <Logo width={120} height={58} className="md:inline hidden"/>
      <div className="flex items-center  gap-10">
        <Search className="text-white" />
        <Bell className="text-white" />
        <div className=" items-center gap-2 sm:flex hidden">
          <div className="flex flex-col  text-white">
            <span className="text-sm ">{session?.data?.user?.user?.name??""}</span>
            <span className="text-xs">{session?.data?.user?.user?.email??""}</span>
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
