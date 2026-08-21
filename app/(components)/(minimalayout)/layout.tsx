"use client";

import { PermissionGuard } from "@/shared/components/permission-guard";
import { ProtectedRoute } from "@/shared/components/protected-route";

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <PermissionGuard>{children}</PermissionGuard>
    </ProtectedRoute>
  );
}
