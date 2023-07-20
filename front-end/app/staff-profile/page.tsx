"use client";

import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";

import { AutoComplete, InputGroup, Dropdown } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

import { Staff } from "@/interfaces/common";
import { StaffTable } from "@/components/CustomTablePagination";
export default function Page() {
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [staffname, setStaffName] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [schools, setSchools] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [ogData, setOgData] = useState<Staff[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("su_staffs");
            const staffNames = data.map((staff) => staff.name);
            const schoolsArr = data.map((d) => d.school_id);
            const uniqueSchools = schoolsArr.filter(
                (school, index, arr) => arr.indexOf(school) === index
            );
            const dpetArr = data.map((d) => d.dpet_id.dpet_id);
            const uniqueDpet = dpetArr.filter(
                (dpet, index, arr) => arr.indexOf(dpet) === index
            );

            setStaffs(data);
            setStaffName(staffNames);
            setSchools(uniqueSchools);
            setDepartments(uniqueDpet);
            setIsLoading(false);
            setOgData(data);
        };
        fetchData().catch(console.error);
    }, []);

    const handleInputChange = (value: string) => {
        if (value === "") {
            setStaffs(ogData);
            setIsLoading(false);
        }
    };

    const search = (value: string) => {
        const encodedValue = encodeURIComponent(value);
        setIsLoading(true);
        const fetchData = async () => {
            const data = await useFetch("su_staffs", `?name=${encodedValue}`);
            setStaffs(data);
            console.log(staffs);
            setIsLoading(false);
        };
        fetchData().catch(console.error);
    };

    const handleSchoolDropdown = (value: string) => {
        const fetchData = async () => {
            const data: Staff[] = await useFetch(
                "su_staffs",
                `?school_id=${value}`
            );
            const staffsArr: string[] = data.map((d) => d.name);

            setStaffs(data);
            setIsLoading(false);
            setStaffName(staffsArr);
        };
        fetchData().catch(console.error);
    };

    const handleDpetDropdown = (value: string) => {
        const fetchData = async () => {
            const data: Staff[] = await useFetch(
                "su_staffs",
                `?dpet_id=${value}`
            );
            const staffsArr: string[] = data.map((d) => d.name);

            setStaffs(data);
            setIsLoading(false);
            setStaffName(staffsArr);
        };
        fetchData().catch(console.error);
    };
    return (
        <main className="container mx-auto my-12">
            <div className="flex gap-3 items-center mb-5">
                <Dropdown
                    title={"School"}
                    onSelect={handleSchoolDropdown}
                    className="bordered border-sm border-slate-400"
                >
                    {schools &&
                        schools.map((school) => (
                            <Dropdown.Item eventKey={school} key={school}>
                                {school}
                            </Dropdown.Item>
                        ))}
                </Dropdown>
                <Dropdown
                    title={"Department"}
                    onSelect={handleDpetDropdown}
                    className="bordered border-sm border-slate-400"
                >
                    {departments &&
                        departments.map((dpet) => (
                            <Dropdown.Item eventKey={dpet} key={dpet}>
                                {dpet}
                            </Dropdown.Item>
                        ))}
                </Dropdown>
                <InputGroup>
                    <AutoComplete
                        data={staffname}
                        placeholder="Search Staff Name"
                        onSelect={search}
                        onChange={handleInputChange}
                    />
                    <InputGroup.Button tabIndex={-1}>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
            </div>
            <StaffTable defaultData={staffs} isLoading={isLoading}></StaffTable>
        </main>
    );
}
