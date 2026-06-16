'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Estoque } from '../types/estoque';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export function useEstoque() {
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
            console.log(resposta.data);
            if (resposta.data) prepararEdicao(resposta.data);
        } catch (error) {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao buscar dados do estoque",
                icon: "error",
                confirmButtonColor: "#e91414",
            });
        } finally {
            setLoading(false);
        }
    };

    const salvarEstoque = async (e: React.FormEvent) => {
        e.preventDefault();
        const dados = { 
            localizacao, 
            quantidade: Number(quantidade), 
            produtos: {
                id: Number(idProduto)
            }
        };

        console.log("editandoId:", editandoId);
        console.log("idProduto:", idProduto);
        console.log("dados:", dados);

        try {
            if (editandoId) {
                await api.put(`/estoque/${editandoId}`, dados); 
            } else {
                await api.post('/estoque/', dados);
            }
            limparFormularioEstoque();
            Swal.fire({
                title: "Sucesso!",
                text: "Estoque atualizado com sucesso",
                icon: "success",
                confirmButtonColor: "#e91414",
            }).then(() => {
                router.push('/dashboard');
            });
        } catch (error) {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao salvar estoque",
                icon: "error",
                confirmButtonColor: "#e91414",
            });
        }
    };

    const prepararEdicao = (e: Estoque) => {
        setEditandoId(e.id!);
        setLocalizacao(e.localizacao);
        setQuantidade(e.quantidade.toString());
        const prodId = e.produtos ? e.produtos.id : (e as any).id_produto;
        setIdProduto(prodId ? prodId.toString() : '');
    };

    const limparFormularioEstoque = () => {
        setEditandoId(null);
        setLocalizacao('');
        setQuantidade('');
        setIdProduto('');
    };

    return {
        loading, salvarEstoque, prepararEdicao, buscarEstoquePorId,
        localizacao, setLocalizacao, quantidade, setQuantidade, idProduto, setIdProduto,
        editandoId, limparFormularioEstoque,
    };
}