// resources/js/types/product.ts

export interface Product {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    estado: boolean;
    created_at: string;
    updated_at: string;
}
