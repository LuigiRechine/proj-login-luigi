'use client';

import { useEstoque } from "../hooks/useEstoque";
import { useProdutos } from "../hooks/useProduto";
import '@/app/formStyle.css'
import { useEffect } from "react";

export default function EstoqueForm({ estoqueId }: { estoqueId?: number }) {
    const {
        salvar, buscarEstoquePorId,
        localizacao, setLocalizacao, quantidade, setQuantidade, idProduto, setIdProduto,
        editandoId, loading
    } = useEstoque();

    const { produtos, listarProdutos } = useProdutos();

    // 1. Carrega os produtos e busca o estoque se houver um estoqueId
    useEffect(() => {
        listarProdutos();

        if (estoqueId) {
            buscarEstoquePorId(estoqueId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estoqueId]);

    // 2. Sincronização imediata: Se veio do dashboard, encontra o produto dono do estoque
    // e já pré-seleciona no select antes mesmo da API de estoque terminar de carregar
    useEffect(() => {
        if (estoqueId && produtos.length > 0) {
            // CORRIGIDO O ESPAÇO AQUI
            const produtoDonoDoEstoque = produtos.find(p => p.estoque?.id === Number(estoqueId));
            if (produtoDonoDoEstoque && !idProduto) {
                setIdProduto(produtoDonoDoEstoque.id!.toString());
            }
        }
    }, [estoqueId, produtos, idProduto, setIdProduto]);

    if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando estoque...</p>;

    // LÓGICA DE FILTRO APERFEIÇOADA:
    const produtosFiltrados = produtos.filter(p => {
        // Se for o produto dono deste estoque (edição), ele DEVE aparecer na lista
        if (estoqueId && p.estoque?.id === Number(estoqueId)) return true;
        
        // Se o idProduto já foi definido pelo hook, mantém ele visível
        if (idProduto && p.id?.toString() === idProduto.toString()) return true;

        // Para novas criações, mostra apenas quem está sem estoque
        return !p.estoque;
    });

    // Só exibe a mensagem de trava total se não for edição e realmente não houver produtos livres
    const mostrarMensagemVazio = produtosFiltrados.length === 0 && !estoqueId;

    return (
        <div className="login-container" style={{ padding: '20px', minHeight: '100vh' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
                <h1>{editandoId ? 'Atualizar Estoque' : 'Adicionar Estoque'}</h1>

                <form onSubmit={salvar}>
                    {/* Select de Produtos */}
                    <div className="input-group">
                        <select
                            className="input-field"
                            value={idProduto}
                            onChange={e => setIdProduto(e.target.value)}
                            required
                            // Bloqueia o campo se for edição ou se a lista estiver vazia no cadastro
                            disabled={!!estoqueId || mostrarMensagemVazio} 
                            style={{ backgroundColor: (estoqueId || mostrarMensagemVazio) ? '#f0f0f0' : '#fff' }}
                        >
                            {mostrarMensagemVazio ? (
                                <option value="" disabled>Todos os produtos estão com estoque</option>
                            ) : (
                                <>
                                    <option value="" disabled>Selecione um Produto</option>
                                    {produtosFiltrados.map(p => (
                                        // Convertendo o value para string garante o vínculo correto com o estado idProduto
                                        <option key={p.id} value={p.id?.toString()}>{p.nome}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                    
                    <div className="input-group">
                        <input type="text" placeholder="Localização (Ex: Prateleira A)" className="input-field"
                            value={localizacao} onChange={e => setLocalizacao(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <input type="number" placeholder="Quantidade" className="input-field"
                            value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn-login" style={{ backgroundColor: '#28a745' }}>
                        {editandoId ? 'Atualizar Estoque' : 'Salvar Estoque'}
                    </button>
                </form>
            </div>
        </div>
    );
}