'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produtos';
import { useRouter } from 'next/navigation';

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [url, setUrl] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    // GET - Listar todos
    const listarProdutos = useCallback(async () => {
        setLoading(true);
        try {
            const resposta = await api.get('/produtos/');
            setProdutos(resposta.data);
        } catch (error) {
            alert("Erro ao buscar produtos");
        } finally {
            setLoading(false);
        }
    }, []);

    // GET - Buscar um produto específico pelo ID
    const buscarProdutoPorId = async (id: number) => {
        try {
            const resposta = await api.get(`/produtos/${id}`);
            prepararEdicao(resposta.data);
        } catch (error) {
            alert("Erro ao buscar os detalhes do produto.");
            router.push('/dashboard/produtos');
        }
    };

    // POST / PUT - Salvar
    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const dados: Produto = { nome, descricao, preco: Number(preco), url };

        try {
            if (editandoId) {
                await api.put(`/produtos/${editandoId}`, dados);
            } else {
                await api.post('/produtos/', dados);
            }
            limparFormulario();
            alert("Sucesso!");
            router.push('/dashboard');
        } catch (error) {
            alert("Erro ao salvar produto");
        }
    };

    // DELETE
    const excluir = async (id: number) => {
        if (!confirm("Excluir este produto?")) return;
        try {
            await api.delete(`/produtos/${id}`);
            listarProdutos();
        } catch (error) {
            alert("Erro ao excluir");
        }
    };

    const prepararEdicao = (p: Produto) => {
        setEditandoId(p.id!);
        setNome(p.nome);
        setDescricao(p.descricao);
        setPreco(p.preco.toString());
        setUrl(p.url);
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setUrl('');
    };

    return {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario, buscarProdutoPorId
    };
}