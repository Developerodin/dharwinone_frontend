import fs from "node:fs";

const p =
  "C:/Users/INTEL/Desktop/DHARWIN NEW/uat.dharwin.frontend/shared/workforce-profile/engine/WorkforceWizardShell.tsx";
let c = fs.readFileSync(p, "utf8");

const oldSnippet = `        descId="wizard-validation-desc"
      />`;
const newSnippet = `        descId="wizard-validation-desc"
        onDismiss={dismissValidationOverlay}
      />`;

if (!c.includes(oldSnippet)) {
  console.error("snippet not found");
  process.exit(1);
}

c = c.replace(oldSnippet, newSnippet);
fs.writeFileSync(p, c);
console.log("WorkforceWizardShell patched");
