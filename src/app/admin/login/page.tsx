"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">
            The Essumans
          </p>
          <h1 className="text-2xl font-medium text-gray-900">Administration</h1>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded">
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-70 mt-4"
          >
            {isPending ? "Signing in..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}
