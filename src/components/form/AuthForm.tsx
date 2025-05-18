import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { FormField } from './FormField';
import type { RegisterPayload } from '@/interfaces/register-payload';

interface AuthFormProps {
  type: 'login' | 'registration';
  onSubmit: (data: RegisterPayload) => void;
}

const validators: Record<keyof RegisterPayload, (value: string) => string> = {
  email: value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format',
  password: value =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d]{8,}$/.test(value)
      ? ''
      : 'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number',
  firstName: value =>
    /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value) && value.trim()
      ? ''
      : 'Only letters and spaces allowed',
  lastName: value =>
    /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value) && value.trim()
      ? ''
      : 'Only letters and spaces allowed',
};

const validateField = (name: keyof RegisterPayload, value: string) =>
  validators[name](value);

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const isRegistration = type === 'registration';
  const [formData, setFormData] = useState<RegisterPayload>({
    email: '',
    password: '',
    firstName: isRegistration ? '' : undefined,
    lastName: isRegistration ? '' : undefined,
  });

  const [errors, setErrors] = useState<Partial<RegisterPayload>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof RegisterPayload;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({
      ...prev,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterPayload> = {};
    let isValid = true;
    const fieldsToValidate =
      type === 'registration' ? Object.keys(formData) : ['email', 'password'];

    for (const key of fieldsToValidate as Array<keyof RegisterPayload>) {
      const error = validateField(key, formData[key] ?? '');
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);

      // void navigate('/');
    } catch (error) {
      console.error('Authentication failed:', error);
      setErrors(prev => ({
        ...prev,
        password: 'Authentication error. Check your details',
      }));
    }
  };

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    ...(isRegistration
      ? [
          { name: 'firstName', label: 'First Name', type: 'text' },
          { name: 'lastName', label: 'Last Name', type: 'text' },
        ]
      : []),
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <h2>{isRegistration ? 'Register' : 'Login'}</h2>

      {fields.map(field => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name as keyof RegisterPayload] ?? ''}
          onChange={handleChange}
          error={errors[field.name as keyof RegisterPayload]}
        />
      ))}

      <Button type="submit" variant="secondary" className="w-full">
        {isRegistration ? 'Register' : 'Login'}
      </Button>
    </form>
  );
}
