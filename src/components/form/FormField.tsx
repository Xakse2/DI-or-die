import { Input } from '@/components/ui/input/input';
import { Label } from '../ui/label/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export function FormField({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && !showPassword ? 'password' : 'text';

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? 'border-red-500' : ''}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
