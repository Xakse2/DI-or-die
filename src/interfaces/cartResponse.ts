import type { AllVariant, MasterVariant, Price } from './prodactResponse';

export interface ClientInfo {
  clientId?: string;
  isPlatformClient: boolean;
  anonymousId?: string;
}

interface ProductName {
  [key: string]: string;
}

export interface TotalPrice {
  centAmount: number;
  currencyCode: string;
}

export interface LineItem {
  id: string;
  name: ProductName;
  variant: MasterVariant | AllVariant;
  quantity: number;
  price: Price;
  totalPrice: TotalPrice;
}

export interface Cart {
  type: string;
  id: string;
  version: number;
  anonymousId?: string;
  customerId?: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: TotalPrice;
  priceRoundingMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  totalLineItemQuantity: string;
}

export type CartAction =
  | AddLineItemAction
  | RemoveLineItemAction
  | ChangeLineItemQuantity;

interface AddLineItemAction {
  action: 'addLineItem';
  sku: string;
  productId?: string;
  variantId?: number;
  quantity: number;
}

interface RemoveLineItemAction {
  action: 'removeLineItem';
  lineItemId: string;
  quantity?: number;
}

interface ChangeLineItemQuantity {
  action: 'changeLineItemQuantity';
  lineItemId: string;
  quantity: number;
}
