"use client";

import {
  EmployeeFormAlert,
  EmployeeFormPageShell,
  FormLoadingSpinner,
  LazyEmployeeForm,
} from "../_components/employee-form-page-ui";
import { useAuth } from "@/shared/contexts/auth-context";
import { hasPermission } from "@/shared/lib/permissions";
import React, { useMemo } from "react";

/**
 * Dedicated Excel Import page.
 * Navigate here from Candidates list → Excel → Import.
 * Back button returns to /ats/employees (not to Add Candidate manual form).
 */
const ImportCandidates = () => {
  const { permissions, permissionsLoaded, isPlatformSuperUser } = useAuth();
  const canCreate = useMemo(
    () => hasPermission({ permissions: permissions ?? [], isPlatformSuperUser }, "create_employee"),
    [permissions, isPlatformSuperUser]
  );

  return (
    <EmployeeFormPageShell seoTitle="Excel Import Employees">
      {!permissionsLoaded ? (
        <FormLoadingSpinner label="Checking permissions" />
      ) : canCreate ? (
        <LazyEmployeeForm initialExcelMode returnToCandidatesOnBack />
      ) : (
        <EmployeeFormAlert
          title="Access denied"
          description="You do not have permission to import employees. Contact an administrator if you believe this is a mistake."
        />
      )}
    </EmployeeFormPageShell>
  );
};

export default ImportCandidates;
