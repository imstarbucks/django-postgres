interface Staff {
    staff_id: string;
    name: string;
    school_id: string;
}

interface User {
    email: string;
    phone: string;
    biography: string;
    profile_image: string;
}

interface Publisher {
    publisher_name: string;
}

interface PublicationLink {
    eid: string;
    link: string;
}

interface Department {
    dpet_id: string;
    dpet_name: string;
}

interface Publication {
    id: number;
    su_staff: Staff[];
    publisher_name: Publisher | null;
    wos_publication: PublicationLink | null;
    scopus_publication: PublicationLink | null;
    publication_source: string;
    doi: string | null;
    doc_types: string;
    title: string;
    source_title: string;
    authors: string;
    published_year: string | null;
    volume: string;
    issue: string;
    page_start: string;
    page_end: string;
    industry: boolean;
    international: boolean;
    national: boolean;
    editors: string;
    issn: string | null;
    isbn: string | null;
}

export type {
    Staff,
    Publisher,
    PublicationLink,
    User,
    Department,
    Publication,
};
