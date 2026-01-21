"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuthAction(openAuthModal: () => void) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAuthAction = useCallback((callback?: () => void) => {
    if (status === "authenticated") {
      // If user is already authenticated
      if (callback) {
        callback();
      } else {
        // Redirect based on role
        const role = session?.user?.role;
        if (role === "doctor") {
          router.push("/doctor/dashboard");
        } else if (role === "patient") {
          router.push("/patient/dashboard");
        } else {
          // Fallback - open modal to select role
          openAuthModal();
        }
      }
    } else {
      // If user is NOT authenticated, open the modal
      openAuthModal();
    }
  }, [status, session, router, openAuthModal]);

  return { handleAuthAction, session, status };
}
