// app/login/page.tsx

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (username === "admin" && password === "password") {
      cookies().set("auth", "true", {
        httpOnly: true,
        path: "/",
      });

      redirect("/dashboard");
    } else {
      redirect("/?error=invalid");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            name="username"
            type="text"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
