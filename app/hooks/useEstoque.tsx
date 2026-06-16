'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Estoque } from '../types/estoque';
import { useRouter } from 'next/navigation';

export function useEstoque(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [localizacao, setLocalizacao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    const buscarEstoquePorId = async (id: number) => {
        setLoading(true);
        try {
            const resposta = await api.get(`/estoque/${id}`);
            if (resposta.data) prepararEdicao(resposta.data);
        } catch (error) {
            alert("Erro ao buscar os dados do estoque.");
        } finally {
            setLoading(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const dados = {
            localizacao,
            quantidade: Number(quantidade),
            produto: { id: Number(idProduto) } // Vinculando ao produto via Jackson WRITE_ONLY
        };

        try {
            if (editandoId) {
                await api.put(`/estoque/${editandoId}`, dados);
            } else {
                await api.post('/estoque/', dados);
            }
            limparFormulario();
            alert("Estoque atualizado com sucesso!");
            router.push('/dashboard');
        } catch (error) {
            alert("Erro ao salvar estoque.");
        }
    };

    const prepararEdicao = (e: Estoque) => {
        setEditandoId(e.id!);
        setLocalizacao(e.localizacao);
        setQuantidade(e.quantidade.toString());
        // Trata a leitura do ID dependendo do retorno da API
        const prodId = e.produto ? e.produto.id : (e as any).id_produto;
        setIdProduto(prodId ? prodId.toString() : '');
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setLocalizacao('');
        setQuantidade('');
        setIdProduto('');
    };

    return {
        loading, salvar, buscarEstoquePorId,
        localizacao, setLocalizacao, quantidade, setQuantidade, idProduto, setIdProduto,
        editandoId, limparFormulario
    };
}