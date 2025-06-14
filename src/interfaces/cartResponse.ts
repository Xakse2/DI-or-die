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
  anonymousId?: string;
  clientId?: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: Price;
  priceRoundingMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
}
