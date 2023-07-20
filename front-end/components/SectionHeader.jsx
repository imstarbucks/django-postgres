import Link from "next/link";
import AccentButton from "./Button";

const SectionHeader = ({ title, viewMore }) => {
    return (
        <div className="pb-4 mb-4 text-custom-blue border-b border-custom-blue flex justify-between items-center">
            <h2 className="font-bold text-3xl">{title}</h2>
            {viewMore && (
                <AccentButton title="View More" type="Link" href={viewMore} />
            )}
        </div>
    );
};

export default SectionHeader;
