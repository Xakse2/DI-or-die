import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function FormField({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
