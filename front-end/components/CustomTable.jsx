import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/SectionHeader";
import { Table, Button } from "rsuite";
import AccentButton from "./Button";

const { Column, HeaderCell, Cell } = Table;

const CustomTable = ({ title, data, type, isLoading }) => {
    return (
        <>
            <SectionHeader title={title} viewMore={`/${type}`}></SectionHeader>
            <div className="text-custom-blue">
                <Table
                    data={data}
                    height={400}
                    wordWrap="break-word"
                    loading={isLoading}
                >
                    {type === "publications" ? (
                        <>
                            <Column fixed>
                                <HeaderCell className="">School</HeaderCell>
                                <Cell dataKey={"school_id"}></Cell>
                            </Column>
                            <Column fixed flexGrow={200}>
                                <HeaderCell>Publication</HeaderCell>
                                <Cell dataKey={"publication_title"}></Cell>
                            </Column>
                            <Column flexGrow={200}>
                                <HeaderCell>Authors</HeaderCell>
                                <Cell dataKey={"authors"}>
                                    {(rowData, rowIndex) => {
                                        return rowData.authors.length > 0
                                            ? rowData.authors.map((s) => (
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
                                <Cell dataKey={"date"}></Cell>
                            </Column>
                            <Column>
                                <HeaderCell>Link</HeaderCell>
                                <Cell dataKey={"id"}>
                                    {(rowData, rowIndex) => {
                                        return (
                                            <Link
                                                href={`/publications/${rowData.id}`}
                                            >
                                                View
                                            </Link>
                                        );
                                    }}
                                </Cell>
                            </Column>
                        </>
                    ) : (
                        <>
                            <Column wordWrap={"keep-all"} fixed>
                                <HeaderCell className="">Sponsor</HeaderCell>
                                <Cell dataKey="sponsor"></Cell>
                            </Column>
                            <Column flexGrow={200}>
                                <HeaderCell className="">Project</HeaderCell>
                                <Cell dataKey="project_title"></Cell>
                            </Column>
                            <Column>
                                <HeaderCell className="">SU Staff</HeaderCell>
                                <Cell dataKey="su_staff">
                                    {(rowData, rowIndex) => {
                                        return (
                                            <Link
                                                href={`/staff-profile/${rowData.su_staff.staff_id}`}
                                                className="underline"
                                            >
                                                {rowData.su_staff.name}
                                            </Link>
                                        );
                                    }}
                                </Cell>
                            </Column>
                            <Column flexGrow={200}>
                                <HeaderCell className="">
                                    Collaborators
                                </HeaderCell>
                                <Cell dataKey="su_staff">
                                    {(rowData, rowIndex) => {
                                        return rowData.collaborators.map(
                                            (s) => (
                                                <Link
                                                    href={`/staff-profile/${s.staff_id}`}
                                                    className="underline"
                                                >
                                                    {s.name};{" "}
                                                </Link>
                                            )
                                        );
                                    }}
                                </Cell>
                            </Column>
                            <Column>
                                <HeaderCell className="">Link</HeaderCell>
                                <Cell dataKey="su_staff">
                                    {(rowData, rowIndex) => {
                                        return (
                                            <Link
                                                href={`/grants/${encodeURIComponent(
                                                    rowData.id
                                                )}`}
                                            >
                                                View
                                            </Link>
                                        );
                                    }}
                                </Cell>
                            </Column>
                        </>
                        /*                               <tr key={`latest-pub-${d.id}`}>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.sponsor}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.publication_title}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      <Link
                                          href={`/staff-profile/${d.su_staff.staff_id}`}
                                          className="text-sm"
                                      >
                                          {d.su_staff.name}
                                      </Link>
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.collaborators.map((staff) => (
                                          <Link
                                              href={`/staff-profile/${staff.staff_id}`}
                                              className="text-sm"
                                              key={`collab-${staff.staff_id}`}
                                          >
                                              {staff.name};{" "}
                                          </Link>
                                      ))}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.project_start_date
                                          ? d.project_start_date
                                          : "-"}
                                  </td>
                              </tr> */
                    )}
                </Table>
            </div>
            {/* <table className="p-3 w-full">
                <thead>
                    <tr>
                        {tableTitle &&
                            tableTitle.map((t) => (
                                <th
                                    key={`t-${t}`}
                                    className="text-start p-3 bg-custom-blue text-white border-r border-r-white last:border-r-0 text-sm"
                                >
                                    {t}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {type === "publications"
                        ? data &&
                          data.map((d) => (
                              <tr key={`latest-pub-${d.id}`}>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.school_id}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.publication_title}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.authors.map((author) => (
                                          <Link
                                              href={`/staff-profile/${author.staff_id}`}
                                              className="text-sm"
                                              key={`author-${author.staff_id}`}
                                          >
                                              {author.name};{" "}
                                          </Link>
                                      ))}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.date ? d.date : "2023-06-20"}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      <Link
                                          href={`/publications/${d.id}`}
                                          className="flex gap-2 items-center"
                                      >
                                          View
                                          <ChevronRightIcon></ChevronRightIcon>
                                      </Link>
                                  </td>
                              </tr>
                          ))
                        : data &&
                          data.map((d) => (
                              <tr key={`latest-pub-${d.id}`}>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.sponsor}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.publication_title}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      <Link
                                          href={`/staff-profile/${d.su_staff.staff_id}`}
                                          className="text-sm"
                                      >
                                          {d.su_staff.name}
                                      </Link>
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue">
                                      {d.collaborators.map((staff) => (
                                          <Link
                                              href={`/staff-profile/${staff.staff_id}`}
                                              className="text-sm"
                                              key={`collab-${staff.staff_id}`}
                                          >
                                              {staff.name};{" "}
                                          </Link>
                                      ))}
                                  </td>
                                  <td className="text-start p-3 bg-custom-blue/30 text-custom-blue text-sm">
                                      {d.project_start_date
                                          ? d.project_start_date
                                          : "-"}
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table> */}
        </>
    );
};

export default CustomTable;
