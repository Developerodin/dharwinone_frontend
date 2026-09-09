"use client";

import { useAuth } from "@/shared/contexts/auth-context";
import { hasPermission } from "@/shared/lib/permissions";
import React, { useMemo } from "react";
import {
  EmployeeFormAlert,
  EmployeeFormPageShell,
  FormLoadingSpinner,
  LazyEmployeeForm,
} from "../_components/employee-form-page-ui";

const AddEmployee = () => {
  const { permissions, permissionsLoaded, isPlatformSuperUser } = useAuth();
  const canCreate = useMemo(
    () => hasPermission({ permissions: permissions ?? [], isPlatformSuperUser }, "create_employee"),
    [permissions, isPlatformSuperUser]
  );

  return (
    <EmployeeFormPageShell seoTitle="Add Employee">
      {!permissionsLoaded ? (
        <FormLoadingSpinner label="Checking permissions" />
      ) : canCreate ? (
        <LazyEmployeeForm />
      ) : (
        <EmployeeFormAlert
          title="Access denied"
          description="You do not have permission to add employees. Contact an administrator if you believe this is a mistake."
        />
      )}
    </EmployeeFormPageShell>
  );
};

export default AddEmployee;
