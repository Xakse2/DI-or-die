export interface ClientInfo {
  clientId?: string;
  isPlatformClient: boolean;
  anonymousId?: string;
}

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  price: Price;
}

export interface Price {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
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
