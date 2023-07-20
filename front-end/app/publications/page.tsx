"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import SearchIcon from "@rsuite/icons/Search";
import { Publication, School } from "@/interfaces/common";
import { PublicationTable } from "@/components/CustomTablePagination";
import { AutoComplete, InputGroup, Dropdown } from "rsuite";

export default function Page() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [titleData, setTitleData] = useState<string[]>([]);
    const [ogData, setOgData] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [schools, setSchools] = useState<School[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: Publication[] = await useFetch("publications");
            const schools: School[] = await useFetch("schools");

            const titleData: string[] = data.map((d) => d.title);

            setPublications(data);
            setSchools(schools);
            setOgData(data);
            setIsLoading(false);
            setTitleData(titleData);
        };
        fetchData().catch(console.error);
    }, []);

    const handleDropdown = (value: string) => {
        const fetchData = async () => {
            const data: Publication[] = await useFetch(
                "publications",
                `?school_id=${value}`
            );
            const titleData: string[] = data.map((d) => d.title);

            setPublications(data);
            setIsLoading(false);
            setTitleData(titleData);
        };
        fetchData().catch(console.error);
    };

    const handleInputChange = (value: string) => {
        if (value === "") {
            setPublications(ogData);
            setIsLoading(false);
        }
    };

    const search = (value: string) => {
        const encodedValue = encodeURIComponent(value);
        setIsLoading(true);
        const fetchData = async () => {
            const data = await useFetch(
                "publications",
                `?title=${encodedValue}`
            );
            setPublications(data);
            setIsLoading(false);
        };
        fetchData().catch(console.error);
    };

    return (
        <main>
            <div className="container mx-auto my-12 min-h-screen">
                <div className="flex gap-3 items-center mb-5">
                    <Dropdown
                        title={"School"}
                        onSelect={handleDropdown}
                        className="bordered border-sm border-slate-400"
                    >
                        {schools &&
                            schools.map((school) => (
                                <Dropdown.Item
                                    eventKey={school.school_id}
                                    key={school.school_id}
                                >
                                    {school.school_id}
                                </Dropdown.Item>
                            ))}
                    </Dropdown>
                    <InputGroup inside>
                        <AutoComplete
                            data={titleData}
                            placeholder="Search Project Data"
                            onSelect={search}
                            onChange={handleInputChange}
                        />
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                    </InputGroup>
                </div>
                <PublicationTable
                    defaultData={publications}
                    isLoading={isLoading}
                ></PublicationTable>
            </div>
        </main>
    );
}
