export type ApiError = {
  message: string;
};

export type AdminUser = {
  id: string;
  name: string;
  role: "admin";
};

export type LoginAdminRequest = {
  email: string;
  password: string;
};

export type LoginAdminResponse = {
  token: string;
  user: AdminUser;
};

export type Store = {
  id: string;
  code: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
};

export type Terminal = {
  id: string;
  storeId: string;
  status: "ONLINE" | "OFFLINE";
  lastUsedAt?: string;
};

export type Product = {
  id: string;
  barcode: string;
  name: string;
  priceCents: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPriceCents: number;
};

export type SubmitOrderRequest = {
  customerDocument: string;
  customerIdentifier: string;
  items: OrderItem[];
  paymentMethod: "PIX" | "DEBIT" | "CREDIT" | "CREDIARIO";
  installments?: number;
};

export type SubmitOrderResponse = {
  orderNumber: string;
};

export type Contracts = {
  loginAdmin: (req: LoginAdminRequest) => Promise<LoginAdminResponse>;
  getStores: () => Promise<Store[]>;
  getTerminals: (storeId?: string) => Promise<Terminal[]>;
  getProductByBarcode: (barcode: string) => Promise<Product | null>;
  submitOrder: (req: SubmitOrderRequest) => Promise<SubmitOrderResponse>;
};

