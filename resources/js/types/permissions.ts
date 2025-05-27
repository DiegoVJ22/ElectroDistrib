export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string; // o Date si los conviertes al recibirlos
    updated_at: string; // o Date si los conviertes al recibirlos
}
