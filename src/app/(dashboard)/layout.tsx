"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/page/root/sidebar";
import Header from "@/components/page/root/header";
import IntegrationCheckWrapper from "@/components/page/root/warning-nav";



const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <IntegrationCheckWrapper>
        <div className="flex flex-col h-screen overflow-hidden mx-4">
          
            <Header />
            <div className="flex flex-1 overflow-hidden pb-4 gap-4 ">
                <Sidebar/>
                <main className="flex-1 ">{children}</main>
            </div>
        </div>
        </IntegrationCheckWrapper>
    );
};

export default DashboardLayout;
