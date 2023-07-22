import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "rsuite/dist/rsuite-no-reset.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SunwayExpert",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-tertiary`}>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
