"use client";

import { Magnet, LineChart, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Logo from "@/components/ui/logo";


const slides = [
    {
        icon: Magnet,
        title: "Building your Business...",
        description:
            "Transform your business with data-driven insights and powerful analytics tools.",
    },
    {
        icon: LineChart,
        title: "Track Your Growth",
        description:
            "Monitor your business performance with real-time analytics and detailed reports.",
    },
    {
        icon: Users,
        title: "Grow Your Community",
        description:
            "Connect with like-minded entrepreneurs and expand your network globally.",
    },
];

export function AuthSlider() {
    return (
        <div className="text-white space-y-12 max-w-lg w-full">
            <div className="flex items-center gap-2 text-2xl font-bold">
                <Logo width={192} height={93} />
            </div>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/20 !w-8 !h-1 !rounded-full ",
                    bulletActiveClass: "bullet-active",
                }}
                className="!pb-12 "
            >
                {slides.map((slide, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="space-y-6">
                                <h1 className="text-4xl  lg:text-5xl font-bold">
                                    {slide.title}
                                </h1>
                                <p className="text-gray-300 max-w-md">
                                    {slide.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}