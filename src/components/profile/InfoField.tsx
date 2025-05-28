import { Label } from '@/components/ui/label/label';

interface InfoFieldProps {
  label: string;
  value: string | undefined;
}

const InfoField = ({ label, value }: InfoFieldProps) => (
  <div>
    <Label>{label}:</Label>
    <p>{value || 'N/A'}</p>
  </div>
);

export default InfoField;