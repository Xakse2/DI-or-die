import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import './registration.css';
// import { loginUser } from '@/api/auth';
// import { registerUser } from '@/api/register';
// import { useDispatch } from 'react-redux';
// import { setToken } from '@/app/slices/tokenSlice';
// import { storage } from '@/service/local-storage';

// const COUNTRIES = new Set([
//     'USA',
//     'Canada',
//     'Germany',
//     'Russia',
//     'Belarus',
//     'Ukraine',
//     'Kazakhstan',
//     'Uzbekistan',
//     'France',
//     'Italy',
// ]);

// const POSTAL_CODE_REGEX: Record<string, RegExp> = {
//     USA: /^\d{5}(-\d{4})?$/,
//     Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
//     Germany: /^\d{5}$/,
//     Russia: /^\d{6}$/,
//     Belarus: /^\d{6}$/,
//     Ukraine: /^\d{5}$/,
//     Kazakhstan: /^\d{6}$/,
//     Uzbekistan: /^\d{6}$/,
//     France: /^\d{5}$/,
//     Italy: /^\d{5}$/,
// };

interface FormFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // dateOfBirth: string;
  // country: string;
  // city: string;
  // street: string;
  // postalCode: string;
}

const validators: Record<
  keyof FormFields,
  (value: string, country?: string) => string
> = {
  email: value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Invalid email format';
  },
  password: value => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Zа-яА-ЯёЁ])[a-zA-Zа-яА-ЯёЁ\d]{8,}$/;
    return regex.test(value)
      ? ''
      : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
  },
  firstName: value => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return nameRegex.test(value) && value.trim()
      ? ''
      : 'Must contain only letters and spaces';
  },
  lastName: value => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return nameRegex.test(value) && value.trim()
      ? ''
      : 'Must contain only letters and spaces';
  },
  // dateOfBirth: value => {
  //     if (!value) return 'Please select your date of birth';

  //     const today = new Date();
  //     const birthDate = new Date(value);
  //     let age = today.getFullYear() - birthDate.getFullYear();
  //     const monthDifference = today.getMonth() - birthDate.getMonth();
  //     if (
  //         monthDifference < 0 ||
  //         (monthDifference === 0 && today.getDate() < birthDate.getDate())
  //     ) {
  //         age--;
  //     }

  //     return age >= 13 ? '' : 'You must be at least 13 years old';
  // },
  // country: value => {
  //     return COUNTRIES.has(value) ? '' : 'Invalid country';
  // },
  // city: value => {
  //     const cityRegex = /^[a-zA-Z\s]+$/;
  //     return cityRegex.test(value) && value.trim()
  //         ? ''
  //         : 'City must contain only letters and spaces';
  // },
  // street: value => {
  //     return value.trim() ? '' : 'Street is required';
  // },
  // postalCode: (value, country) => {
  //     if (!country) return 'Please select country first';
  //     const regex = POSTAL_CODE_REGEX[country] || /.*/;
  //     return regex.test(value) ? '' : `Invalid postal code format for ${country}`;
  // },
};

const validateField = (
  name: keyof FormFields,
  value: string,
  country?: string,
) => {
  return validators[name](value, country);
};

export function RegistrationPage() {
  const [formData, setFormData] = useState<FormFields>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    // dateOfBirth: '',
    // country: '',
    // city: '',
    // street: '',
    // postalCode: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors: Partial<FormFields> = {};
    let isValid = true;

    for (const key of Object.keys(formData) as Array<keyof FormFields>) {
      const error = validateField(
        key,
        formData[key],
        // formData.country
      );
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
    if (!validateForm()) return;

    try {
      //отправить данные на сервер
      //редирект

      // await registerUser(formData); //отправка данных регитсрации

      // const token = await loginUser(formData.email, formData.password);

      // localStorage.setItem('authToken', token);

      await navigate('/home', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        ...errors,
        password: 'Registration error. Check your details',
      });
    }
  };

  const renderInput = (
    name: keyof FormFields,
    label: string,
    type: string = 'text',
    placeholder?: string,
  ) => (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder ?? `Enter your ${label.toLowerCase()}`}
      />
    </div>
  );

  const formFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    // { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    // { name: 'country', label: 'Country', type: 'text' },
    // { name: 'city', label: 'City', type: 'text' },
    // { name: 'street', label: 'Street', type: 'text' },
    // { name: 'postalCode', label: 'Postal Code', type: 'text' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <form
        role="form"
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4"
      >
        <h2>Registration</h2>
        <p>
          Have an Account?{' '}
          <Link to="/login" className="text-green-500 underline">
            Log in
          </Link>
        </p>

        {formFields.map(field => (
          <div key={field.name}>
            {renderInput(
              field.name as keyof FormFields,
              field.label,
              field.type,
            )}
            {errors[field.name as keyof FormFields] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name as keyof FormFields]}
              </p>
            )}
          </div>
        ))}

        {!errors.password && (
          <p className="text-xs text-gray-500">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number
          </p>
        )}

        <Button type="submit" variant="secondary" size="sm" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
