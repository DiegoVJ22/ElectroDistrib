// resources/js/types/user.ts

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    estado: boolean;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
}
