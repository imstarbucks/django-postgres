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

export type { Staff, Publisher, PublicationLink, User, Department };
