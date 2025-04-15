"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/page/root/sidebar";
import Header from "@/components/page/root/header";



const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col h-screen md:overflow-hidden mx-4">
          
            <Header />
            <div className="flex flex-1 md:overflow-hidden pb-4 gap-4 ">
                <Sidebar/>
                <main className="flex-1 ">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
