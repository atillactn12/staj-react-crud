export interface User {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  isLocal?: boolean;
}