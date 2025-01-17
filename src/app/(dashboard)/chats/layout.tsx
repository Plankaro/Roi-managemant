"use client";
import React, { ReactNode } from 'react'
import { LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sidebarItems } from '../page';



const DashboardLayout = ({ children, allchats, chatlist }: { children: ReactNode, allchats: ReactNode, chatlist: ReactNode }) => {
    return (
        <div className='flex h-screen w-full'>
            {children}
            {chatlist}
            {allchats}
        </div>
    )
}

export default DashboardLayout
