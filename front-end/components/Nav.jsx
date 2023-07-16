import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/images/logo.png";
import { PersonIcon } from "@radix-ui/react-icons";

const Nav = () => {
    return (
        <nav className="bg-custom-blue px-6 py-2 flex text-white">
            <Link href={"/"} className="w-[10%] min-w-[100px]">
                <Image className="w-full h-auto" src={Logo} alt="Logo"></Image>
            </Link>
            <div className="flex gap-5 items-center mr-0 ml-auto">
                <Link href={"/publications"}>Publications</Link>
                <Link href={"/grants"}>Grants</Link>
                <Link href={"/staff-profile"}>Staff Profile</Link>
                <Link
                    href={"http://localhost:8000/admin"}
                    className="flex items-center gap-2"
                >
                    <span>Login</span>
                    <PersonIcon className="border border-white rounded-full flex w-5 h-5"></PersonIcon>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
