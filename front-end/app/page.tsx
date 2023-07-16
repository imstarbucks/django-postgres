"use client";

import Image from "next/image";
import kv from "@/public/images/kv.jpeg";
import useFetch from "@/hooks/useFetch";

import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import LatestGrant from "./LastestGrants";
import LatestPublications from "./LatestPublications";
import SectionCharts from "./SectionCharts";
import StaffProfile from "./StaffProfile";

export default function Home() {
    return (
        <main className="">
            <Image
                className="w-full h-screen min-h-[700px] object-cover object-center"
                src={kv}
                alt="Sunway University"
            ></Image>
            <SectionCharts />
            <LatestPublications />
            <LatestGrant />
            <StaffProfile />
        </main>
    );
}
