"use client";
import Image from "next/image";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import { AutoComplete, InputGroup, Dropdown, Divider } from "rsuite";
import {
    EnvelopeClosedIcon,
    AvatarIcon,
    Link2Icon,
    LinkedInLogoIcon,
    FileTextIcon,
} from "@radix-ui/react-icons";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    Colors,
    LinearScale,
    CategoryScale,
    BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PublicationTable } from "@/components/CustomTablePagination";
import { Staff, Publication } from "@/interfaces/common";
import SectionHeader from "@/components/SectionHeader";

const StaffChart = ({ id, wosCount, scopusCount }) => {
    ChartJS.register(
        Tooltip,
        Legend,
        Colors,
        LinearScale,
        CategoryScale,
        BarElement
    );
    return (
        <section className="container lg:max-w-5xl mx-auto my-12">
            <SectionHeader title="Total Publications" viewMore={""} />
            <Bar
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
                data={{
                    labels: ["Publications"],
                    datasets: [
                        {
                            label: "Scopus Publications",
                            data: [scopusCount],
                        },
                        {
                            label: "WOS Publications",
                            data: [wosCount],
                        },
                    ],
                }}
            ></Bar>
        </section>
    );
};

export default function Page({ params }) {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [publications, setPublications] = useState<Publication[]>([]);
    const scopus = useRef<number>(0);
    const wos = useRef<number>(0);
    const [scopusCount, setScopusCount] = useState<number>(0);
    const [wosCount, setWosCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch(
                "su_staffs",
                `?staff_id=${params.staff_id}`
            );

            const publicationData = await useFetch(
                "publications",
                `?staff_id=${params.staff_id}`
            );

            publicationData.map((d) => {
                if (d.scopus_publication) {
                    scopus.current += 1;
                }
                if (d.wos_publication) {
                    wos.current += 1;
                }
            });
            setWosCount(wos.current);
            setScopusCount(scopus.current);
            setPublications(publicationData);
            setIsLoading(false);
            setStaff(data);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <main className="container mx-auto my-12 ">
            {staff && (
                <>
                    <div className="flex gap-8">
                        <Image
                            src={
                                staff[0]?.user.profile_image
                                    ? staff[0]?.user.profile_image
                                    : "/images/lau.png"
                            }
                            width={400}
                            height={600}
                            alt="Profile Pic"
                        />
                        <div className="grid grid-cols-2">
                            <div>
                                <h2 className="text-3xl font-bold text-custom-blue">{`${staff[0]?.title} ${staff[0]?.name}`}</h2>
                                <h3 className="text-xl font-semibold my-5">
                                    Associate Dean (International) and Head
                                </h3>
                                <h4 className="text-xl font-semibold">
                                    ({staff[0]?.dpet_id.dpet_id}){" "}
                                    {staff[0]?.dpet_id.dpet_name}
                                </h4>
                                <h5 className="mt-5 mb-3">Biography</h5>
                                <p className="w-3/4">
                                    {staff[0]?.user.biography
                                        ? staff[0]?.user.biography
                                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum nunc vitae tellus ornare ullamcorper. Nullam et arcu in elit ullamcorper fringilla at ut massa. Proin a magna eu purus tempor ultrices quis in turpis. Nam efficitur dolor nec varius condimentum. Phasellus lacinia dolor eget elit iaculis mollis. Curabitur leo augue, fermentum ut ipsum ac, lobortis aliquam nulla. Nullam commodo dictum metus id aliquet."}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-custom-blue font-bold text-xl mb-3">
                                    Contacts Details
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex gap-3 items-center">
                                        <EnvelopeClosedIcon /> Email:{" "}
                                        {staff[0]?.user.email
                                            ? staff[0].user.email
                                            : "example@sunway.edu.my"}
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <AvatarIcon /> Phone:{" "}
                                        {staff[0]?.user.phone
                                            ? staff[0].user.phone
                                            : "012-456666"}
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                staff[0]?.user.linkedin_link
                                                    ? staff[0].user
                                                          .linkedin_link
                                                    : ""
                                            }
                                            className="flex gap-3 items-center"
                                        >
                                            <LinkedInLogoIcon /> LinkedIn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                staff[0]?.user.scopus_link
                                                    ? staff[0].user.scopus_link
                                                    : ""
                                            }
                                            className="flex gap-3 items-center"
                                        >
                                            <Link2Icon /> Scopus
                                        </Link>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <FileTextIcon /> CV:{" "}
                                        <Link
                                            href={
                                                staff[0]?.user.cv
                                                    ? staff[0].user.cv
                                                    : ""
                                            }
                                        >
                                            View
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>
                    <StaffChart
                        id={params.staff_id}
                        wosCount={wosCount}
                        scopusCount={scopusCount}
                    ></StaffChart>
                    <Divider></Divider>
                    <PublicationTable
                        defaultData={publications}
                        isLoading={isLoading}
                    ></PublicationTable>
                </>
            )}
        </main>
    );
}
