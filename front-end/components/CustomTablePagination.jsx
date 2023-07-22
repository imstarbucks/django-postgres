import React, { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Table, Pagination, Avatar } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const PublicationTable = ({ defaultData, isLoading }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <>
            <SectionHeader title="Publications"></SectionHeader>
            <div className="text-custom-blue">
                <Table
                    height={600}
                    data={data}
                    loading={isLoading}
                    wordWrap="break-word"
                >
                    <Column fixed>
                        <HeaderCell className="">School</HeaderCell>
                        <Cell dataKey="su_staff">
                            {(rowData, rowIndex) => {
                                return rowData.su_staff?.length > 0
                                    ? rowData.su_staff[0].school_id
                                    : "-";
                            }}
                        </Cell>
                    </Column>
                    <Column fixed flexGrow={200}>
                        <HeaderCell>Publication</HeaderCell>
                        <Cell dataKey={"title"}></Cell>
                    </Column>
                    <Column fixed flexGrow={100}>
                        <HeaderCell>DOI</HeaderCell>
                        <Cell dataKey={"doi"}></Cell>
                    </Column>
                    <Column flexGrow={200}>
                        <HeaderCell>Authors</HeaderCell>
                        <Cell dataKey={"authors"}>
                            {(rowData, rowIndex) => {
                                return rowData.su_staff?.length > 0
                                    ? rowData.su_staff.map((s) => (
                                          <Link
                                              href={`/staff-profile/${s.staff_id}`}
                                              key={rowData + rowIndex}
                                              className="underline"
                                          >
                                              {s.name};{" "}
                                          </Link>
                                      ))
                                    : "-";
                            }}
                        </Cell>
                    </Column>
                    <Column>
                        <HeaderCell height={30}>Date</HeaderCell>
                        <Cell dataKey={"published_year"}></Cell>
                    </Column>
                    <Column>
                        <HeaderCell>Link</HeaderCell>
                        <Cell dataKey={"id"}>
                            {(rowData, rowIndex) => {
                                return (
                                    <Link href={`/publications/${rowData.id}`}>
                                        View
                                    </Link>
                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="md"
                        layout={["total", "-", "limit", "|", "pager", "skip"]}
                        total={defaultData.length}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </div>
        </>
    );
};

const GrantTable = ({ defaultData, isLoading }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <>
            <SectionHeader title="Grants"></SectionHeader>
            <div className="text-custom-blue">
                <Table
                    height={600}
                    data={data}
                    loading={isLoading}
                    wordWrap="break-word"
                >
                    <Column fixed>
                        <HeaderCell className="">Sponsor</HeaderCell>
                        <Cell dataKey="sponsor"></Cell>
                    </Column>
                    <Column fixed flexGrow={200}>
                        <HeaderCell>Publication</HeaderCell>
                        <Cell dataKey={"project_title"}></Cell>
                    </Column>
                    <Column fixed flexGrow={100}>
                        <HeaderCell>SU Staff</HeaderCell>
                        <Cell dataKey={"su_staff"}>
                            {(rowData, rowIndex) => {
                                return rowData.su_staff ? (
                                    <Link
                                        href={`/staff-profile/${rowData.su_staff.staff_id}`}
                                        key={
                                            rowData.su_staff.staff_id +
                                            rowData.project_title
                                        }
                                        className="underline"
                                    >
                                        {rowData.su_staff.name};{" "}
                                    </Link>
                                ) : (
                                    "-"
                                );
                            }}
                        </Cell>
                    </Column>
                    <Column flexGrow={200}>
                        <HeaderCell>Collaborators</HeaderCell>
                        <Cell dataKey={"collaborators"}>
                            {(rowData, rowIndex) => {
                                return rowData.collaborators.length > 0
                                    ? rowData.collaborators.map((s, i) => (
                                          <Link
                                              href={`/staff-profile/${s.staff_id}`}
                                              key={`${rowData.project_title}-collab${i}`}
                                              className="underline"
                                          >
                                              {s.name};{" "}
                                          </Link>
                                      ))
                                    : "-";
                            }}
                        </Cell>
                    </Column>
                    <Column>
                        <HeaderCell height={30}>Start Date</HeaderCell>
                        <Cell dataKey={"project_start_date"}></Cell>
                    </Column>
                    <Column>
                        <HeaderCell>Link</HeaderCell>
                        <Cell dataKey={"id"}>
                            {(rowData, rowIndex) => {
                                return (
                                    <Link
                                        href={`/grants/${encodeURIComponent(
                                            rowData.project_code
                                        )}`}
                                    >
                                        View
                                    </Link>
                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="md"
                        layout={["total", "-", "limit", "|", "pager", "skip"]}
                        total={defaultData.length}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </div>
        </>
    );
};

const StaffTable = ({ defaultData, isLoading }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <>
            <SectionHeader title="Staff Profile"></SectionHeader>
            <div className="text-custom-blue">
                <Table
                    height={600}
                    data={data}
                    loading={isLoading}
                    wordWrap="break-word"
                >
                    <Column fixed>
                        <HeaderCell className="">School</HeaderCell>
                        <Cell dataKey="school_id"></Cell>
                    </Column>
                    <Column fixed>
                        <HeaderCell className="">Department</HeaderCell>
                        <Cell dataKey="dpet_id">
                            {(rowData, rowIndex) => {
                                return <>{rowData.dpet_id.dpet_id}</>;
                            }}
                        </Cell>
                    </Column>
                    <Column>
                        <HeaderCell></HeaderCell>
                        <Cell>
                            {(rowData, rowIndex) => {
                                return (
                                    <>
                                        <Link
                                            href={`/staff-profile/${rowData.staff_id}`}
                                        >
                                            <Avatar
                                                src={
                                                    rowData.user.profile_image
                                                        ? rowData.user
                                                              .profile_image
                                                        : "/images/lau.png"
                                                }
                                            ></Avatar>
                                        </Link>
                                    </>
                                );
                            }}
                        </Cell>
                    </Column>
                    <Column>
                        <HeaderCell>Title</HeaderCell>
                        <Cell dataKey={"title"}></Cell>
                    </Column>
                    <Column fixed flexGrow={100}>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey={"name"}></Cell>
                    </Column>
                    <Column fixed flexGrow={100}>
                        <HeaderCell>Email</HeaderCell>
                        <Cell>
                            {(rowData, rowIndex) => {
                                return (
                                    <Link
                                        href={`mailto:${
                                            rowData.user.email
                                                ? rowData.user.email
                                                : "example@sunway.edu.my"
                                        }`}
                                    >
                                        {rowData.user.email
                                            ? rowData.user.email
                                            : "example@sunway.edu.my"}
                                    </Link>
                                );
                            }}
                        </Cell>
                    </Column>
                    <Column fixed flexGrow={20}>
                        <HeaderCell>Link</HeaderCell>
                        <Cell dataKey={"id"}>
                            {(rowData, rowIndex) => {
                                return (
                                    <Link
                                        href={`/staff-profile/${rowData.staff_id}`}
                                    >
                                        View Profile
                                    </Link>
                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="md"
                        layout={["total", "-", "limit", "|", "pager", "skip"]}
                        total={defaultData.length}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </div>
        </>
    );
};

export { PublicationTable, GrantTable, StaffTable };
