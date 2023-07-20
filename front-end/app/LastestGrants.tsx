import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";

import { Staff, Publisher, PublicationLink } from "@/interfaces/common";
import CustomTable from "@/components/CustomTable";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch("grants", "?latest_grant=5");

            const formattedData = data.map((d: LatestGrant) => {
                return {
                    id: d.project_code,
                    project_title: d.project_title,
                    sponsor: d.sponsor,
                    su_staff: {
                        name: d.su_staff ? d.su_staff.name : "-",
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
            setIsLoading(!isLoading);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <section className="container mx-auto my-12 lg:max-w-5xl">
            <CustomTable
                title={"Recent Awarded Grants"}
                data={latestGrants}
                type="grants"
                isLoading={isLoading}
            ></CustomTable>
        </section>
    );
}
