import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/SectionHeader";

const Table = ({ title, tableTitle, data, type }) => {
    return (
        <>
            <SectionHeader title={title}></SectionHeader>
            <table className="p-3 w-full">
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
                    {type === "publication"
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
                                      {d.project_end_date
                                          ? d.project_end_date
                                          : "-"}
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
