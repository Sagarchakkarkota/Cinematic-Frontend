"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import api from "@/shared/lib/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const isLoginPage = pathname === "/admin/login";

  // 🔐 AUTH CHECK (SINGLE SOURCE OF TRUTH)
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      try {
        const res = await api.get("/auth/me");
        return res.data.user;
      } catch (err: any) {
        // ✅ Unauthenticated → return null
        if (err?.response?.status === 401) {
          return null;
        }
        // ❌ Real error (500, network, etc.)
        throw err;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  // 🔁 AUTH GUARD (SIDE EFFECT ONLY)
  useEffect(() => {
    if (isLoading || status === "pending") return;

    if (status === "error") {
      console.error("Auth error:", error);
      return;
    }

    if (status === "success" && user) {
      if (isLoginPage) {
        router.replace("/admin/dashboard");
      }
      return;
    }

    if (status === "success" && !user) {
      if (!isLoginPage) {
        router.replace("/admin/login");
      }
    }
  }, [isLoading, status, user, isLoginPage, router, error]);

  // 🔓 LOGIN
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return api.post("/auth/login", credentials);
    },
    onSuccess: async () => {
      // 🔁 Re-verify session from server
      await queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      router.replace("/admin/dashboard");
    },
  });

  // 🔒 LOGOUT
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth", "user"], null);
      router.replace("/admin/login");
    },
  });

  return {
    // auth state
    user,
    isAuthenticated: !!user,

    // query states
    isLoading, // pending
    isSuccess, // auth resolved
    isError, // real error

    // actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    // mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
