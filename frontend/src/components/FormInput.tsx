import { formStyles } from "../styles/styles";
import { FormInputProps } from "../types/common";

export const FormInput = ({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
  id,
  error,
}: FormInputProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={formStyles.group}>
      <label htmlFor={inputId} style={formStyles.label}>
        {label}
      </label>
      <input
        id={inputId}
        style={formStyles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-label={label}
        aria-invalid={!!error}
      />
      {error && <span style={formStyles.error}>{error}</span>}
    </div>
  );
};
