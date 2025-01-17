import Logo from '@/components/ui/logo'
import React from 'react'

const AuthLauout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full container grid lg:grid-cols-2 gap-8 items-center ">

                {/* Left side - Branding */}
                <div className="flex items-center justify-center order-1">
                    <div className="text-white space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <Logo />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            Building your Business...
                        </h1>
                        <p className="text-gray-300 max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="flex gap-2">
                            <div className="w-8 h-2 bg-white rounded-full" />
                            <div className="w-8 h-2 bg-white/20 rounded-full" />
                            <div className="w-8 h-2 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex items-center justify-center order-2">
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 text-white max-w-[455px] order-2">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AuthLauout
