import { Estoque } from "./estoque";

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    url: string;
    estoque?: Estoque;
}