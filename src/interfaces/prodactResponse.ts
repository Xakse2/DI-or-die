interface Image {
  url: string;
}

interface Price {
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

interface MasterVariant {
  attributesRaw: Attribute[];
  prices: Price[];
  images: Image[];
  key: string;
}

interface ProductData {
  // allVariants: AllVariant[];
  masterVariant: MasterVariant;
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
