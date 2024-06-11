export interface IDrug {
    active_substance: string;
    brand: string;
    category: string;
    created_at: string;
    description: string;
    dozens: number;
    drug_name: string;
    expiration_date: string;
    id: number;
    image: string;
    manufacturer: string;
    manufacturer_country: string;
    price: string;
    quantity: number;
    seller: number;
    type: string;
  }

  export interface ILogin {
    accessTokens: string;
    refreshTokens: string;
  }

  export interface IUser {
    id:string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    business_name?: string;
    address?: string;
    data_joined?: string;
    phone: string;
    role: string;
  }


  export interface ICartState { 
    drugs: IDrug[];
    cartQuantity: number;
    setOrderedProducts: (drugs: IDrug[]) => void;
    setCartQuantity: (quantity: number) => void;
  }

