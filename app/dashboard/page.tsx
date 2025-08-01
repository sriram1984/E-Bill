import { cookies } from "next/headers";
import ExcelUploader from "../components/ExcelUploader";
import LogoutButton from "../components/LogoutButton";
import { redirect } from "next/navigation";

export default function Dashboard({ children }: { children: React.ReactNode }) {
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
          <LogoutButton action={handleLogout} />
        </nav>
        <main className="p-6">{children}</main>
        <div className="p-8 min-h-screen bg-gray-50">
          <ExcelUploader />
        </div>
      </div>
    </>
  );
}
