"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import SectionHeader from "@/components/SectionHeader";
import useFetch from "@/hooks/useFetch";

import { Publication } from "@/interfaces/common";

export default function Page({ params }) {
    const [publication, setPublication] = useState<Publication[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(data);
            const data = await useFetch(
                "publications",
                `?id=${params.publication_id}`
            );
            setPublication(data);
            console.log(publication);
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen">
            <section className="container mx-auto my-12">
                <SectionHeader title={`${publication[0]?.title}`} viewMore={""}>
                    {publication[0]?.title}
                </SectionHeader>
                <table className="w-full">
                    <tbody>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">All Authors:</td>
                            <td className="p-4">{`${publication[0]?.authors}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Doi:</td>
                            <td className="p-4">{`${publication[0]?.doi}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Document Type:</td>
                            <td className="p-4">{`${publication[0]?.doc_types}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Source Title:</td>
                            <td className="p-4">{`${publication[0]?.source_title}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Published Year:</td>
                            <td className="p-4">{`${publication[0]?.published_year}`}</td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">Scopus Link:</td>
                            <td className="p-4">
                                {" "}
                                <Link
                                    href={`${publication[0]?.scopus_publication?.link}`}
                                >
                                    {`${
                                        publication[0]?.scopus_publication
                                            ? publication[0]?.scopus_publication
                                                  .link
                                            : "-"
                                    }`}
                                </Link>
                            </td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">WOS Link:</td>
                            <td className="p-4">
                                {" "}
                                <Link
                                    href={`${publication[0]?.wos_publication?.link}`}
                                >
                                    {`${
                                        publication[0]?.wos_publication
                                            ? publication[0]?.wos_publication
                                                  .link
                                            : "-"
                                    }`}
                                </Link>
                            </td>
                        </tr>
                        <tr className="bg-custom-blue text-white even:bg-custom-blue/30 even:text-custom-blue">
                            <td className="p-4">SU Staff:</td>
                            <td className="p-4">
                                {publication[0]?.su_staff?.length > 0
                                    ? publication[0].su_staff.map((s) => (
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
