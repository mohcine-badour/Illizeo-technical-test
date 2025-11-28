export type LoginPayload = { email: string; password: string; company_id: string };

export type RegisterPayload = { 
  name: string; 
  email: string; 
  password: string; 
  password_confirmation: string;
  company_id?: number;
  company_name?: string;
};

export type Note = {
    id: number;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user?: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
  };
  
  export type NotesResponse = {
    data: Note[];
    total: number;
  };

  export type Company = {
    id: number;
    name: string;
    domain: string;
    created_at: string;
    updated_at: string;
  };

  export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    company?: Company;
  };