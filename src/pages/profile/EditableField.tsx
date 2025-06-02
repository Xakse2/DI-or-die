import { useState } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const EditableField = ({ label, value, onChange }: EditableFieldProps) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="flex flex-col space-y-1">
      <label className="font-medium">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          onChange(e.target.value);
        }}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
      />
    </div>
  );
};