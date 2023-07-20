import Image from "next/image";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect, useRef } from "react";

import {
    Staff,
    Publisher,
    PublicationLink,
    User,
    Department,
} from "@/interfaces/common";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

import thumbnail from "@/public/images/lau.png";
import SectionHeader from "@/components/SectionHeader";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface StaffProfile {
    staff_id: string;
    name: string;
    user: User;
    title: string;
    dpet_id: Department;
}

export default function StaffProfile() {
    const [staff, setStaff] = useState<StaffProfile[]>([]);
    const swiperRef = useRef(null);
    const nextBtnRef = useRef(null);
    const prevBtnRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("su_staffs");
            const latest = data.slice(0, 5);
            setStaff(latest);

            console.log(staff);
        };
        fetchData().catch(console.error);
    }, []);

    const handleClickNext = () => {
        swiperRef.current.swiper.slideNext();
    };

    const handleClickPrev = () => {
        swiperRef.current.swiper.slidePrev();
    };

    return (
        <section className="container mx-auto my-12 lg:max-w-5xl">
            <SectionHeader
                title={"Staff Profile"}
                viewMore={"/staff-profile"}
            ></SectionHeader>
            <Swiper
                className="relative"
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                autoplay
                navigation
                loop
            >
                <button
                    ref={nextBtnRef}
                    className="absolute w-[50px] h-[50px] top-0 bottom-0 right-0 left-auto m-auto border-custom-blue border rounded-full flex justify-center items-center z-50 hover:bg-secondary hover:scale-90 ease-in-out duration-300"
                    onClick={handleClickNext}
                >
                    <ChevronRightIcon
                        width={30}
                        height={30}
                        className="text-custom-blue"
                    />
                </button>
                <button
                    ref={prevBtnRef}
                    className="absolute w-[50px] h-[50px] top-0 bottom-0 right-auto left-0 m-auto border-custom-blue border rounded-full flex justify-center items-center z-50 hover:bg-secondary hover:scale-90 ease-in-out duration-300"
                    onClick={handleClickPrev}
                >
                    <ChevronLeftIcon
                        width={30}
                        height={30}
                        className="text-custom-blue"
                    />
                </button>
                {staff.length > 0 &&
                    staff.map((s) => (
                        <SwiperSlide key={`slide-${s.staff_id}`}>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <Image
                                        alt="Profile Picture"
                                        src={
                                            s.user.profile_image
                                                ? s.user.profile_image
                                                : thumbnail
                                        }
                                        className="w-full"
                                    ></Image>
                                </div>
                                <div>
                                    <h3 className="text-lg text-custom-blue font-bold">
                                        {s.title + " " + s.name}
                                    </h3>
                                    <h4 className="text-md">
                                        Associate Dean (International) and Head
                                    </h4>
                                    <h4 className="text-md">
                                        {s.dpet_id.dpet_name}
                                    </h4>
                                    <p className="text-sm mt-6">
                                        Biography
                                        <br />
                                        {s.user.biography
                                            ? s.user.biography
                                            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum nunc vitae tellus ornare ullamcorper. Nullam et arcu in elit ullamcorper fringilla at ut massa. Proin a magna eu purus tempor ultrices quis in turpis. Nam efficitur dolor nec varius condimentum. Phasellus lacinia dolor eget elit iaculis mollis. Curabitur leo augue, fermentum ut ipsum ac, lobortis aliquam nulla. Nullam commodo dictum metus id aliquet."}
                                    </p>
                                </div>
                                <div>
                                    <h4>Contact:</h4>
                                    <div>
                                        Email:
                                        <Link href={`mailto:${s.user.email}`}>
                                            {s.user.email}
                                        </Link>
                                    </div>
                                    <div>
                                        Phone:
                                        <Link href={`tel:${s.user.phone}`}>
                                            {s.user.phone
                                                ? s.user.phone
                                                : "012-456666"}
                                        </Link>
                                    </div>
                                    <Link
                                        className=" text-blue-600"
                                        href={`/staff-profile/${s.staff_id}`}
                                    >
                                        More Details
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
}
