import { formStyles } from "../styles/styles";
import { FormInputProps } from "../types/common";

export const FormInput = ({ label, type, value, onChange, placeholder, required = false }: FormInputProps) => (
    <div style={formStyles.group}>
      <label style={formStyles.label}>{label}</label>
      <input
        style={formStyles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );