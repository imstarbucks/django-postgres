"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import SectionHeader from "@/components/SectionHeader";
import useFetch from "@/hooks/useFetch";

import { Grant } from "@/interfaces/common";

export default function Page({ params }) {
    const [grant, setGrant] = useState<Grant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(data);
            const data = await useFetch(
                "grants",
                `?project_code=${decodeURIComponent(params.project_code)}`
            );
            setGrant(data);
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen">
            <section className="container mx-auto my-12">
                <SectionHeader
                    title={`${grant[0]?.project_title}`}
                    viewMore={""}
                >
                    {grant[0]?.project_title}
                </SectionHeader>
                <table className="w-full">
                    <tbody>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Project Code:</td>
                            <td className="p-4">{`${grant[0]?.project_code}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Grant Name:</td>
                            <td className="p-4">{`${grant[0]?.grant_name}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Project Start Date:</td>
                            <td className="p-4">{`${grant[0]?.project_start_date}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Porject End Date:</td>
                            <td className="p-4">{`${grant[0]?.project_end_date}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Sponsor Year:</td>
                            <td className="p-4">{`${grant[0]?.sponsor}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Su Staff:</td>
                            <td className="p-4">
                                <Link
                                    href={`/staff-profile/${grant[0]?.su_staff?.staff_id}`}
                                >{`${grant[0]?.su_staff?.name}`}</Link>
                            </td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Collaborators:</td>
                            <td className="p-4">
                                {grant[0]?.collaborators.length > 0
                                    ? grant[0].collaborators.map((s) => (
                                          <Link
                                              href={`/staff-profile/${s.staff_id}`}
                                              key={s.staff_id}
                                          >
                                              {s.name};
                                          </Link>
                                      ))
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}
