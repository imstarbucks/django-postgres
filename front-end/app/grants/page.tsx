"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

import { Grant } from "@/interfaces/common";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/SectionHeader";
import { AutoComplete, InputGroup, Dropdown } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { GrantTable } from "@/components/CustomTablePagination";

export default function Page() {
    const [grant, setGrant] = useState<Grant[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchValueEncoded, setSearchValueEncoded] = useState("");
    const [ogData, setOgData] = useState<Grant[]>([]);
    const [titleData, setTitleData] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sponsors, setSponsors] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("grants");
            const titleDataArr = data.map((d) => d.project_title);
            const sponsorsArr = data.map((d) => d.sponsor);
            const uniqueSponsors = sponsorsArr.filter(
                (sponsor, index, arr) => arr.indexOf(sponsor) === index
            );
            console.log(data);
            setGrant(data);
            setOgData(data);
            setSponsors(uniqueSponsors);
            setTitleData(titleDataArr);
            setIsLoading(false);
        };
        fetchData().catch(console.error);
    }, []);

    const handleDropdown = (value: string) => {
        const fetchData = async () => {
            const data: Grant[] = await useFetch("grants", `?sponsor=${value}`);
            const titleDataArr: string[] = data.map((d) => d.project_title);

            setGrant(data);
            setIsLoading(false);
            setTitleData(titleDataArr);
        };
        fetchData().catch(console.error);
    };

    const handleInputChange = (value: string) => {
        if (value === "") {
            setGrant(ogData);
            setIsLoading(false);
        }
    };

    const search = (value: string) => {
        const encodedValue = encodeURIComponent(value);
        console.log(encodedValue);
        setIsLoading(true);
        const fetchData = async () => {
            const data = await useFetch(
                "grants",
                `?project_title=${encodedValue}`
            );
            setGrant(data);
            setIsLoading(false);
        };
        fetchData().catch(console.error);
    };

    return (
        <main>
            <div className="container mx-auto my-12 min-h-screen">
                <div className="flex gap-3 items-center mb-5">
                    <Dropdown
                        title={"Sponsors"}
                        onSelect={handleDropdown}
                        className="bordered border-sm border-slate-400"
                    >
                        {sponsors &&
                            sponsors.map((sponsor) => (
                                <Dropdown.Item eventKey={sponsor} key={sponsor}>
                                    {sponsor}
                                </Dropdown.Item>
                            ))}
                    </Dropdown>
                    <InputGroup inside>
                        <AutoComplete
                            data={titleData}
                            placeholder="Search Grant Title"
                            onSelect={search}
                            onChange={handleInputChange}
                        />
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                    </InputGroup>
                </div>
                <GrantTable
                    defaultData={grant}
                    isLoading={isLoading}
                ></GrantTable>
            </div>
        </main>
    );
}
