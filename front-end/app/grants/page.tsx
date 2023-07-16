"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

import { Grant } from "@/interfaces/common";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/SectionHeader";

export default function Page() {
    const [grant, setGrant] = useState<Grant[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchValueEncoded, setSearchValueEncoded] = useState("");
    const [ogData, setOgData] = useState<Grant[]>([]);

    const encodeProjectCode = (project_code: string) => {
        return encodeURIComponent(project_code);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("grants");
            // console.log(data);
            setGrant(data);
            setOgData(data);
        };
        fetchData().catch(console.error);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setGrant(ogData);
        }

        const encodedValue = encodeURIComponent(e.target.value);
        setSearchValueEncoded(encodedValue);
        setSearchValue(e.target.value);
    };

    const onEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const fetchData = async () => {
                const data = await useFetch(
                    "grants",
                    `?project_title=${searchValueEncoded}`
                );
                // console.log(data);
                console.log(searchValueEncoded);
                console.log(data);
                setGrant(data);
            };
            fetchData().catch(console.error);
        }
    };

    const onClickSearch = () => {
        const fetchData = async () => {
            const data = await useFetch(
                "grants",
                `?project_title=${searchValueEncoded}`
            );
            // console.log(data);
            console.log(searchValueEncoded);
            console.log(data);
            setGrant(data);
        };
        fetchData().catch(console.error);
    };

    return (
        <main>
            <div className="container mx-auto my-12 min-h-screen">
                <SectionHeader title={"Grants"} viewMore={""}></SectionHeader>
                <div className="flex gap-3 items-center mb-5">
                    <input
                        type="text"
                        placeholder="Search Grant Project Title"
                        value={searchValue}
                        onChange={handleInputChange}
                        onKeyDown={onEnterKey}
                        className="border border-custom-blue rounded-md px-5 py-3 w-3/4 relative"
                    />
                    <button type="button" onClick={onClickSearch}>
                        <MagnifyingGlassIcon
                            width={25}
                            height={25}
                            className="m-auto"
                        />
                    </button>
                </div>
                <table className="p-3 w-full">
                    <thead>
                        <tr>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Sponsor
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Project Title
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Staff
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Collaborators
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grant.length > 0 &&
                            grant.map((g) => (
                                <tr key={g.project_code}>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {g.sponsor}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {g.project_title}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {g.su_staff && (
                                            <Link
                                                href={`/staff-profile/${g.su_staff.staff_id}`}
                                            >
                                                {g.su_staff.name}
                                            </Link>
                                        )}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {g.collaborators &&
                                            g.collaborators.map((s) => (
                                                <Link
                                                    key={`staff-${
                                                        s.staff_id +
                                                        g.project_code
                                                    }`}
                                                    href={`/staff-profile/${s.staff_id}`}
                                                >
                                                    {s.name + "; "}
                                                </Link>
                                            ))}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        <Link
                                            href={`/grants/${encodeProjectCode(
                                                g.project_code
                                            )}`}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {grant.length === 0 && (
                    <h5 className="my-5 text-3xl text-center text-slate-400 font-bold">
                        {" "}
                        No matching result. Try to use different keyword.{" "}
                    </h5>
                )}
            </div>
        </main>
    );
}
