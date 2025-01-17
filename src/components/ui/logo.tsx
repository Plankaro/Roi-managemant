import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface LogoProps {
    className?: string
    width?: number
    height?: number
}

const Logo = ({ className, height = 50, width = 50 }: LogoProps) => {
    return (
        <Image
            src={"/logo/logo.svg"}
            alt="ROI Magnet"
            width={width}
            height={height}
            className={cn('object-contain', className)}
        />
    )
}

export default Logo
