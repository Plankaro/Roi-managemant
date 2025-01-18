import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Logo from '@/components/ui/logo'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full flex items-center justify-between  py-2 h-[72px]'>
            <Logo width={120} height={58} />
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Header
