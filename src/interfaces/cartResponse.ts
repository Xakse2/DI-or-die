import type { AllVariant, MasterVariant, Price } from './prodactResponse';

export interface ClientInfo {
  clientId?: string;
  isPlatformClient: boolean;
  anonymousId?: string;
}

interface ProductName {
  [key: string]: string;
}

export interface LineItem {
  id: string;
  name: ProductName;
  variant: MasterVariant | AllVariant;
  quantity: number;
  price: Price;
}

export interface Cart {
  type: string;
  id: string;
  version: number;
  anonymousId?: string;
  customerId?: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: Price;
  priceRoundingMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
}

export type CartAction = AddLineItemAction | RemoveLineItemAction;

export interface AddLineItemAction {
  action: 'addLineItem';
  sku: string;
  productId?: string;
  variantId?: number;
  quantity: number;
}

export interface RemoveLineItemAction {
  action: 'removeLineItem';
  lineItemId: string;
  quantity?: number;
}
