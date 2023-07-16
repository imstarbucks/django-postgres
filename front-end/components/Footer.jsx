import Image from "next/image";
import Link from "next/link";

import facebook from "@/public/images/icons/facebook.svg";
import twitter from "@/public/images/icons/twitter.svg";
import youtube from "@/public/images/icons/youtube.svg";
import insta from "@/public/images/icons/insta.svg";
import linkedin from "@/public/images/icons/linkedin.svg";
import sunwayLogo from "@/public/images/logo.png";

const Footer = () => {
    return (
        <footer className="grid grid-flow-col grid-cols-3 bg-custom-blue p-8 text-white">
            <div>
                <h3 className="text-xl">Connect With Us</h3>
                <div className="flex gap-3 mt-3 mb-5">
                    <Link href={"#"}>
                        <Image src={facebook} alt="Facebook Logo"></Image>
                    </Link>
                    <Link href={"#"}>
                        <Image src={twitter} alt="Twitter Logo"></Image>
                    </Link>
                    <Link href={"#"}>
                        <Image src={youtube} alt="YouTube Logo"></Image>
                    </Link>
                    <Link href={"#"}>
                        <Image src={insta} alt="Instagram Logo"></Image>
                    </Link>
                    <Link href={"#"}>
                        <Image src={linkedin} alt="LinkedIn Logo"></Image>
                    </Link>
                </div>
                <p className="text-xs mb-3">
                    ©2023 SUNWAY UNIVERSITY (200401015434 (653937-U)) (DU025(B))
                </p>
                <p className="text-xs">
                    PDPA (English) | PDPA (BM) | A Member of Sunway Education
                    Group (198501013984 (146440-K))
                </p>
            </div>
            <div className="flex flex-col gap-3 justify-start text-center">
                <Link href={"/publications"} className="text-white">
                    Publications
                </Link>
                <Link href={"/grants"}>Grants</Link>
                <Link href={"/staff-profile"}>Staff Profile</Link>
            </div>
            <div>
                <Image
                    src={sunwayLogo}
                    alt="Sunway Logo"
                    className="block mr-0 ml-auto w-full max-w-[250px]"
                ></Image>
            </div>
        </footer>
    );
};

export default Footer;
