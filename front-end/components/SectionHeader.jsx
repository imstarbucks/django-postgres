import Link from "next/link";

const SectionHeader = ({ title, viewMore }) => {
    return (
        <div className="pb-4 mb-4 text-custom-blue border-b border-custom-blue flex justify-between items-center">
            <h2 className="font-bold text-3xl">{title}</h2>
            {viewMore && (
                <Link
                    href={viewMore}
                    className="p-2 rounded-sm border border-custom-blue hover:bg-custom-blue hover:text-white"
                >
                    View More
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
