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

import { Staff, Publisher, PublicationLink } from "@/interfaces/common";
import SectionHeader from "@/components/SectionHeader";

interface PublicationSourceYear {
    year: number;
    scopus: number | null;
    wos: number | null;
    total: number;
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

export default function SectionCharts() {
    const colorSet = ["#FF6384", "#36A2EB"];

    const [publications, setPublications] = useState<Publication[]>([]);
    const [sourceCount, setSourceCount] = useState([]);
    const [sourceYear, setSourceYear] = useState<PublicationSourceYear[]>([]);
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
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        Colors,
        LinearScale,
        CategoryScale,
        BarElement
    );
    return (
        <section className="container lg:max-w-5xl mx-auto my-12">
            <SectionHeader
                title="Total Publication As Of Date"
                viewMore={"/publications"}
            />
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
                                    labels: sourceCount.map((s) => s.source),
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
                                        data: sourceYear.map((s) => s.scopus),
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
    );
}
