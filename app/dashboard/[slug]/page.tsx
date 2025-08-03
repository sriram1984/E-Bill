import LogoutButton from "@/app/components/LogoutButton";
import ShowDetailTable from "@/app/components/ShowDetailTable";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function ShowTable({ children }: { children: React.ReactNode }) {
    async function handleLogout() {
        "use server";
        (await cookies()).delete("auth");
        redirect("/");
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white px-6 py-4 shadow flex justify-between items-center">
                    <span className="text-xl font-semibold">My Dashboard</span>
                    <Link href={'/dashboard'}>Back to DashBoard</Link>
                    <LogoutButton action={handleLogout} />
                </nav>
                <ShowDetailTable />
            </div>
        </>
    );
}