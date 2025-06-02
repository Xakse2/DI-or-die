import { Label } from '@/components/ui/label/label';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}

interface AddressCardProps {
  address: Address;
}

const AddressCard = ({ address }: AddressCardProps) => (
  <li className="p-4 border rounded-lg">
    <div>
      <Label>Street:</Label>
      <p>{address.street}</p>
    </div>
    <div>
      <Label>City:</Label>
      <p>{address.city}</p>
    </div>
    <div>
      <Label>State:</Label>
      <p>{address.state}</p>
    </div>
    <div>
      <Label>Zip Code:</Label>
      <p>{address.zipCode}</p>
    </div>
    <div>
      <Label>Country:</Label>
      <p>{address.country}</p>
    </div>
    {address.isDefaultBilling && (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
        Default Billing Address
      </span>
    )}
    {address.isDefaultShipping && (
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        Default Shipping Address
      </span>
    )}
  </li>
);

export default AddressCard;
