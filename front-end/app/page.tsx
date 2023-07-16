"use client";

import Image from "next/image";
import kv from "@/public/images/kv.jpeg";
import useFetch from "@/hooks/useFetch";

import { useState, useEffect } from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    LinearScale,
    CategoryScale,
    BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import * as Tabs from "@radix-ui/react-tabs";

import Table from "@/components/Table";
import SectionHeader from "@/components/SectionHeader";

interface PublicationSourceYear {
    year: number;
    scopus: number | null;
    wos: number | null;
    total: number;
}

interface LatestGrant {
    project_code: string;
    su_staff: Staff | null;
    collaborators: Staff[];
    project_title: string;
    grant_name: string;
    project_start_date: string | null;
    project_end_date: string | null;
    amount_awarded: string | null;
    sponsor: string;
}

interface Publication {
    id: number;
    su_staff: Staff[];
    publisher_name: Publisher | null;
    wos_publication: PublicationLink | null;
    scopus_publication: PublicationLink | null;
    publication_source: string;
    doi: string | null;
    doc_types: string;
    title: string;
    source_title: string;
    authors: string;
    published_year: string | null;
    volume: string;
    issue: string;
    page_start: string;
    page_end: string;
    industry: boolean;
    international: boolean;
    national: boolean;
    editors: string;
    issn: string | null;
    isbn: string | null;
}

interface LatestPublication {
    id: number;
    su_staff: Staff[];
    title: string;
    authors: string;
    published_year: string | null;
}

interface Staff {
    staff_id: string;
    name: string;
    school_id: string;
}

interface Publisher {
    publisher_name: string;
}

interface PublicationLink {
    eid: string;
    link: string;
}

export default function Home() {
    const [latestPublications, setLatestPublications] = useState<
        LatestPublication[]
    >([]);
    const [latestGrants, setLatestGrants] = useState<LatestGrant[]>([]);
    const [publications, setPublications] = useState<Publication[]>([]);
    const [sourceCount, setSourceCount] = useState([]);
    const [sourceYear, setSourceYear] = useState<PublicationSourceYear[]>([]);

    const colorSet = ["#FF6384", "#36A2EB"];
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        Colors,
        LinearScale,
        CategoryScale,
        BarElement
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch(
                "publications",
                "?latest_publication=5"
            );

            const formattedData = data.map((d: LatestPublication) => {
                return {
                    id: d.id,
                    publication_title: d.title,
                    school_id:
                        d.su_staff.length > 0 ? d.su_staff[0].school_id : "-",
                    authors: d.su_staff.map((staff) => ({
                        name: staff.name,
                        staff_id: staff.staff_id,
                    })),
                    date: d.published_year,
                };
            });
            setLatestPublications(formattedData);
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("grants", "?latest_grant=5");

            const formattedData = data.map((d: LatestGrant) => {
                return {
                    id: d.project_code,
                    publication_title: d.project_title,
                    sponsor: d.sponsor,
                    su_staff: {
                        name: d.su_staff?.name,
                        staff_id: d.su_staff?.staff_id,
                    },
                    collaborators: d.collaborators.map((staff) => ({
                        name: staff.name,
                        staff_id: staff.staff_id,
                    })),
                    project_end_date: d.project_end_date,
                };
            });
            setLatestGrants(formattedData);
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("publication-source");

            setSourceCount(data);
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("publication-source-year");

            setSourceYear(data);
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("publications");

            setPublications(data);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <main className="">
            <Image
                className="w-full h-screen min-h-[700px] object-cover object-center"
                src={kv}
                alt="Sunway University"
            ></Image>
            <section className="container lg:max-w-5xl mx-auto my-8 ">
                <SectionHeader title="Total Publication As Of Date" />
                <Tabs.Root defaultValue="pieChart">
                    <Tabs.List className="flex gap-5" aria-label="Pie Chart">
                        <Tabs.Trigger
                            className="rounded-sm border border-custom-blue data-[state=active]:bg-custom-blue data-[state=active]:text-white p-2"
                            value="pieChart"
                        >
                            Pie Chart
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className="rounded-sm border border-custom-blue data-[state=active]:bg-custom-blue data-[state=active]:text-white p-2"
                            value="barChart"
                        >
                            Bar Chart
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="pieChart">
                        <div className="grid grid-flow-col grid-cols-1 justify-center mt-5">
                            <div className="w-full mx-auto lg:w-3/4">
                                <Pie
                                    data={{
                                        labels: sourceCount.map(
                                            (s) => s.source
                                        ),
                                        datasets: [
                                            {
                                                label: "Source",
                                                data: sourceCount.map(
                                                    (s) => s.count
                                                ),
                                                backgroundColor: colorSet,
                                                hoverBackgroundColor: colorSet,
                                            },
                                        ],
                                    }}
                                    className="mx-auto"
                                />
                                <h3 className="text-center mt-5">
                                    Total Publication: {publications.length}
                                </h3>
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="barChart">
                        <div className="grid grid-flow-col grid-cols-2">
                            <Bar
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                                data={{
                                    labels: sourceYear.map((s) => s.year),
                                    datasets: [
                                        {
                                            label: "Scopus",
                                            data: sourceYear.map(
                                                (s) => s.scopus
                                            ),
                                        },
                                        {
                                            label: "WOS",
                                            data: sourceYear.map((s) => s.wos),
                                        },
                                    ],
                                }}
                            ></Bar>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </section>
            <section className="container mx-auto my-8 lg:max-w-5xl">
                {latestPublications.length > 0 && (
                    <Table
                        title={"Recent Publications"}
                        tableTitle={[
                            "School",
                            "Publication",
                            "Authors",
                            "Date",
                            "Link",
                        ]}
                        data={latestPublications}
                        type="publication"
                    ></Table>
                )}
            </section>
            <section className="container mx-auto my-8 lg:max-w-5xl">
                {latestPublications.length > 0 && (
                    <Table
                        title={"Recent Awarded Grants"}
                        tableTitle={[
                            "Sponsor",
                            "Project",
                            "SU Staff",
                            "Collaborators",
                            "End Date",
                        ]}
                        data={latestGrants}
                        type="grants"
                    ></Table>
                )}
            </section>
        </main>
    );
}
