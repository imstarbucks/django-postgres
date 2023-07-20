"use client";

import Image from "next/image";
import kv from "@/public/images/kv.jpeg";
import useFetch from "@/hooks/useFetch";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import { ArrowDownIcon } from "@radix-ui/react-icons";

import LatestGrant from "./LastestGrants";
import LatestPublications from "./LatestPublications";
import SectionCharts from "./SectionCharts";
import StaffProfile from "./StaffProfile";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const sectionRef = useRef(null);
    const pinnerRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            onLeave: () => {
                gsap.set(pinnerRef.current, {
                    position: "absolute",
                });
            },
            onEnterBack: () => {
                console.log("object");
                gsap.set(pinnerRef.current, {
                    position: "fixed",
                });
            },
        });

        return () => {};
    }, []);

    return (
        <main className="">
            <div
                ref={sectionRef}
                className="w-full h-screen min-h-[700px] overflow-hidden relative"
            >
                <div className="w-full h-full absolute z-30 inset-0 m-auto bg-custom-blue animate-bannerSlide origin-right"></div>
                <div className="w-full h-full absolute z-10 inset-0 m-auto bg-slate-700/50"></div>
                <div
                    ref={pinnerRef}
                    className="text-slate-100 flex flex-col justify-center items-center fixed bottom-[5%] left-0 right-0 m-auto z-20"
                >
                    <ArrowDownIcon width={50} height={50} />
                    <span className="font-bold">Scroll down for more</span>
                </div>
                <Image
                    className="w-full h-full object-cover object-center"
                    src={kv}
                    alt="Sunway University KV"
                ></Image>
            </div>
            <SectionCharts />
            <LatestPublications />
            <LatestGrant />
            <StaffProfile />
        </main>
    );
}
