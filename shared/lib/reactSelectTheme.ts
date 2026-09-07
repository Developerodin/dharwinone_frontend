import type { StylesConfig, GroupBase } from 'react-select';

/**
 * Tags the menu so the option-state rules in `app/globals.scss` (`.ats-select-menu`) apply.
 *
 * Those rules are the only working source of option colors: the vendor sheet styles
 * `.Select2__option--is-selected` / `--is-focused` / `:hover` with `!important` at a specificity
 * emotion cannot reach, so a select WITHOUT this class falls back to the vendor's broken states
 * (white text on the light selected fill, and a CSS-only `:hover` that stays lit while the keyboard
 * moves focus elsewhere). Pass it alongside `atsSelectStyles`:
 *
 *   <Select styles={atsSelectStyles<Opt>()} classNames={atsSelectClassNames} classNamePrefix="Select2" />
 *
 * Both keys are set on purpose — `menuPortal` covers a portaled menu, `menu` covers an inline one,
 * so the styling does not depend on whether `menuPortalTarget` happens to be set.
 */
export const atsSelectClassNames = {
  menuPortal: () => 'ats-select-menu',
  menu: () => 'ats-select-menu',
};

/**
 * react-select styles tuned to the ATS Preline look: 8px radius, defaultborder,
 * primary focus ring. Generic over option type so any select can reuse it.
 */
export function atsSelectStyles<
  Option,
  IsMulti extends boolean = false
>(): StylesConfig<Option, IsMulti, GroupBase<Option>> {
  return {
    // Colors use theme CSS vars (--body-bg / --default-text-color) that flip under `.dark`,
    // so the control + menu follow dark mode with no JS detection. react-select would
    // otherwise hardcode a white control/menu and show white-on-dark in dark mode.
    control: (base, state) => ({
      ...base,
      minHeight: '38px',
      borderRadius: '0.5rem',
      backgroundColor: 'rgb(var(--body-bg))',
      color: 'rgb(var(--default-text-color))',
      borderColor: state.isFocused ? 'rgb(var(--primary))' : 'rgb(var(--input-border, 217 217 217))',
      boxShadow: state.isFocused ? '0 0 0 2px rgb(var(--primary) / 0.2)' : 'none',
      fontSize: '0.875rem',
      ':hover': { borderColor: 'rgb(var(--primary) / 0.5)' },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 200,
      fontSize: '0.875rem',
      backgroundColor: 'rgb(var(--body-bg))',
      border: '1px solid rgb(var(--input-border, 217 217 217))',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 200 }),
    singleValue: (base) => ({ ...base, color: 'rgb(var(--default-text-color))' }),
    input: (base) => ({ ...base, color: 'rgb(var(--default-text-color))' }),
    placeholder: (base) => ({ ...base, color: 'rgb(var(--default-text-color) / 0.55)' }),
    // NOTE: these option colors are inert. `public/assets/**` styles `.Select2__option--is-selected`,
    // `--is-focused` and `:hover` with `!important`, which outranks emotion's generated class, so the
    // vendor sheet wins wherever a consumer does not override it in CSS. The project form's real
    // option states live in `app/globals.scss` under `.pm-project-form-select-menu`; copy that block
    // for any other menu that needs matching hover/keyboard behaviour.
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'rgb(var(--primary))'
        : state.isFocused
          ? 'rgb(var(--primary) / 0.08)'
          : 'transparent',
      color: state.isSelected ? '#fff' : 'rgb(var(--default-text-color))',
    }),
    multiValue: (base) => ({
      ...base,
      borderRadius: '0.375rem',
      backgroundColor: 'rgb(var(--primary) / 0.08)',
    }),
    multiValueLabel: (base) => ({ ...base, color: 'rgb(var(--default-text-color))' }),
  };
}
