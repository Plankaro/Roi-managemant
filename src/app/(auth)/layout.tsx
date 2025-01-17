import { AuthSlider } from '@/components/auth/auth-slider'

import React from 'react'

const AuthLauout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full container grid lg:grid-cols-2 gap-4 items-center  ">

                {/* Left side - Branding */}
                <div className='flex items-center justify-center order-1'>
                    <AuthSlider />
                </div>

                {/* Right side - Form */}
                <div className="flex items-center justify-center order-2">
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-primary text-white w-full max-w-[455px] order-2">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AuthLauout
