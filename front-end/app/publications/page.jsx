"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

import { Publication } from "@/interfaces/common";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/SectionHeader";

export default function Page() {
    const [publications, setPublications] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchValueEncoded, setSearchValueEncoded] = useState("");
    const [ogData, setOgData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("publications");
            // console.log(data);
            setPublications(data);
            setOgData(data);
        };
        fetchData().catch(console.error);
    }, []);

    const handleInputChange = (e) => {
        if (e.target.value === "") {
            setPublications(ogData);
        }

        const encodedValue = encodeURIComponent(e.target.value);
        setSearchValueEncoded(encodedValue);
        setSearchValue(e.target.value);
    };

    const onEnterKey = (e) => {
        if (e.key === "Enter") {
            const fetchData = async () => {
                const data = await useFetch(
                    "publications",
                    `?title=${searchValueEncoded}`
                );
                // console.log(data);
                console.log(searchValueEncoded);
                console.log(data);
                setPublications(data);
            };
            fetchData().catch(console.error);
        }
    };

    const onClickSearch = () => {
        const fetchData = async () => {
            const data = await useFetch(
                "publications",
                `?title=${searchValueEncoded}`
            );
            // console.log(data);
            console.log(searchValueEncoded);
            console.log(data);
            setPublications(data);
        };
        fetchData().catch(console.error);
    };

    return (
        <>
            <div className="container mx-auto my-12 min-h-screen">
                <SectionHeader title={"Publications"}></SectionHeader>
                <div className="flex gap-3 items-center mb-5">
                    <input
                        type="text"
                        placeholder="Search Publication Title"
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
                                School
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Publication
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                Doi
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm">
                                SU Authors
                            </th>
                            <th className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.length > 0 &&
                            publications.map((p) => (
                                <tr key={p.id}>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {p.su_staff && p.su_staff.length > 0
                                            ? p.su_staff[0].school_id
                                            : "-"}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {p.title}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {p.doi}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        {p.su_staff &&
                                            p.su_staff.map((s) => (
                                                <Link
                                                    key={`staff-${
                                                        s.staff_id + p.title
                                                    }`}
                                                    href={`/staff-profile/${s.staff_id}`}
                                                >
                                                    {s.name + "; "}
                                                </Link>
                                            ))}
                                    </td>
                                    <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                        <Link href={`/publications/${p.id}`}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {publications.length === 0 && (
                    <h5 className="my-5 text-3xl text-center text-slate-400 font-bold">
                        {" "}
                        No matching result. Try to use different keyword.{" "}
                    </h5>
                )}
            </div>
        </>
    );
}
