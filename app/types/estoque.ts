export interface Estoque {
    id?: number;
    localizacao: string;
    quantidade: number;
    produto?: {
        id: number;
    };
}