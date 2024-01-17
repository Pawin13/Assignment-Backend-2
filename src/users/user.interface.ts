export interface Users {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair: {
    color: string;
    type: string;
  };
  domain?: string;
  ip?: string;
  address: {
    address?: string;
    city?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
    postalCode: string;
    state?: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };
  company: ICompany;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: {
    coin?: string;
    wallet?: string;
    network?: string;
  };
  [key: string]: any;
}

export interface ICompany {
  address?: any;
  department: string;
  name: string;
  title: string;
}

export interface IGenderCounts {
  male: number;
  female: number;
}

export interface IDataDepartment {
  male: number;
  female: number;
  ageRange: string;
  hair: {};
  addressUser: {};
}
