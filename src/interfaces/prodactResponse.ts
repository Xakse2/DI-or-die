interface Image {
  url: string;
}

export interface Price {
  value: {
    centAmount: number;
    currencyCode: string;
  };
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
}

interface Attribute {
  name: string;
  value: string | number | { key: string; label: string };
}

export interface MasterVariant {
  attributesRaw: Attribute[];
  prices: Price[];
  images: Image[];
  key: string;
  sku: string;
  id: string;
}

export interface AllVariant {
  attributesRaw: Attribute[];
  prices: Price[];
  images: Image[];
  key: string;
  sku: string;
  id: string;
}

interface ProductData {
  name: string;
  allVariants: AllVariant[];
  masterVariant: MasterVariant;
  description: string;
}

export interface Product {
  id: string;
  masterData: {
    current: ProductData;
  };
}

export interface ProductsResponse {
  products: {
    total: number;
    results: Product[];
  };
}

export interface SingleProductResponse {
  product: {
    skus: string[];
    masterData: {
      current: ProductData;
    };
  };
}
