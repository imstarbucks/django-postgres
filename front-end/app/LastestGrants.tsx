import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";

import { Staff, Publisher, PublicationLink } from "@/interfaces/common";
import Table from "@/components/Table";

interface LatestGrant {
    project_code: string;
    su_staff: Staff | null;
    collaborators: Staff[];
    project_title: string;
    grant_name: string;
    project_start_date: string | null;
    project_end_date: string | null;
    amount_awarded: string | null;
    sponsor: string;
}

export default function LatestGrant() {
    const [latestGrants, setLatestGrants] = useState<LatestGrant[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("grants", "?latest_grant=5");

            const formattedData = data.map((d: LatestGrant) => {
                return {
                    id: d.project_code,
                    publication_title: d.project_title,
                    sponsor: d.sponsor,
                    su_staff: {
                        name: d.su_staff?.name,
                        staff_id: d.su_staff?.staff_id,
                    },
                    collaborators: d.collaborators.map((staff) => ({
                        name: staff.name,
                        staff_id: staff.staff_id,
                    })),
                    project_start_date: d.project_start_date,
                };
            });
            setLatestGrants(formattedData);
            console.log(data, "grants");
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <section className="container mx-auto my-12 lg:max-w-5xl">
            {latestGrants.length > 0 && (
                <Table
                    title={"Recent Awarded Grants"}
                    tableTitle={[
                        "Sponsor",
                        "Project",
                        "SU Staff",
                        "Collaborators",
                        "Start Date",
                    ]}
                    data={latestGrants}
                    type="grants"
                ></Table>
            )}
        </section>
    );
}
