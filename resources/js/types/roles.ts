import { Permission } from './permissions';

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    team_id?: number | null; // solo si usas equipos (multitenancy)
    created_at: string; // o Date si lo conviertes
    updated_at: string; // o Date si lo conviertes
    permissions: Permission[];
}
