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

import {
    Staff,
    Publisher,
    PublicationLink,
    Publication,
} from "@/interfaces/common";
import SectionHeader from "@/components/SectionHeader";
import AccentButton from "@/components/Button";

interface PublicationSourceYear {
    year: number;
    scopus: number | null;
    wos: number | null;
    total: number;
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
                        className="p-2 rounded text-custom-blue bg-secondary ease-in-out duration-300 hover:bg-accent hover:text-secondary hover:border-accent data-[state=active]:bg-accent data-[state=active]:text-secondary  data-[state=active]:border-accent"
                        value="pieChart"
                    >
                        Pie Chart
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className="p-2 rounded text-custom-blue bg-secondary ease-in-out duration-300 hover:bg-accent hover:text-secondary hover:border-accent data-[state=active]:bg-accent data-[state=active]:text-secondary  data-[state=active]:border-accent"
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
