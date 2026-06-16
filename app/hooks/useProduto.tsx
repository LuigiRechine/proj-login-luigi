'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produto';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
            Swal.fire({
                title: "Erro!",
                text: "Erro ao buscar produtos",
                icon: "error",
                confirmButtonColor: "#e91414",
            });
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
            Swal.fire({
                title: "Erro!",
                text: "Erro ao buscar os detalhes do produto",
                icon: "error",
                confirmButtonColor: "#e91414",
            });
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
                await Swal.fire({
                    title: "Produto atualizado com sucesso!",
                    text: "As alterações foram salvas com sucesso",
                    icon: "success",
                    confirmButtonColor: "#e91414",
                });
            } else {
                await api.post('/produtos/', dados);
                await Swal.fire({
                    title: "Produto cadastrado!",
                    text: "O produto foi adicionado com sucesso",
                    icon: "success",
                    confirmButtonColor: "#e91414",
                });
            }
            limparFormulario();
            router.push('/dashboard');
        } catch (error) {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao adicionar o produto",
                icon: "error",
                confirmButtonColor: "#e91414",
            });
        }
    };

    // DELETE
    const excluir = async (id: number) => {
        Swal.fire({
          title: "Excluir produto?",
          text: "Essa ação não poderá ser desfeita",
          icon: "warning",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Sim, excluir",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#e91414",
          cancelButtonColor: "#848484",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/produtos/${id}`);
                    listarProdutos();
                    Swal.fire({
                        title: "Produto excluído",
                        text: "Produto excluído com sucesso!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: "Não foi possível excluir o produto",
                        icon: "error",
                        confirmButtonColor: "#e91414",
                    });
                }
            }
        });
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

        router.push("/dashboard");
    };

    const visualizarProduto = (p: Produto) => {
        Swal.fire({
            title: p.nome,
            text: p.descricao,
            imageUrl: p.url,
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: "Fechar",
            confirmButtonColor: "#e91414",
        });
    };    

    return {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario, buscarProdutoPorId, visualizarProduto,
    };
}