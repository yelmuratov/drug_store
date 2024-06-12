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


  export interface ICategory {
    id: number;
    name: string;
  }

  interface DrugDetails {
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
  
  export interface Item {
    drug: number;
    drug_details: DrugDetails;
    id: number;
    price: string;
    quantity: number;
  }
  
  export interface Order {
    created_at: string;
    id: number;
    items: Item[];
    status: string;
  }
  
  export interface OrderItem {
    id: number;
    drug: number;
    quantity: number;
    price: string;
    drug_details: DrugDetails;
  }

  export interface IMyDrug {
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
  
  
