import { useState, useEffect } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
}

export const EditableField = ({
  label,
  value,
  onChange,
  type = 'text',
  error,
}: EditableFieldProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value);
          onChange(event.target.value);
        }}
        className="border-2 border-green-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 bg-green-50 transition-colors"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
