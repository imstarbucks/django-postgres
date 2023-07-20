import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import { Staff, Publisher, PublicationLink } from "@/interfaces/common";
import CustomTable from "@/components/CustomTable";

interface LatestPublication {
    id: number;
    su_staff: Staff[];
    title: string;
    authors: string;
    published_year: string | null;
}

export default function LatestPublications() {
    const [latestPublications, setLatestPublications] = useState<
        LatestPublication[]
    >([]);
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetch(
                "publications",
                "?latest_publication=5"
            );

            const formattedData = data.map((d: LatestPublication) => {
                return {
                    id: d.id,
                    publication_title: d.title,
                    school_id:
                        d.su_staff.length > 0 ? d.su_staff[0].school_id : "-",
                    authors: d.su_staff.map((staff) => ({
                        name: staff.name,
                        staff_id: staff.staff_id,
                    })),
                    date: d.published_year ? d.published_year : "-",
                };
            });
            setLatestPublications(formattedData);
            setIsloading(!isLoading);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <section className="container mx-auto my-12 lg:max-w-5xl">
            <CustomTable
                title={"Recent Publications"}
                data={latestPublications}
                type="publications"
                isLoading={isLoading}
            ></CustomTable>
        </section>
    );
}
