"use client"

import { useEffect } from 'react';
import '@/app/formStyle.css';
import { useEstoque } from '../hooks/useEstoque';
import { useProdutos } from '../hooks/useProduto';

export default function EstoqueForm({ estoqueId }: { estoqueId?: number }) {
    const {
        salvarEstoque, buscarEstoquePorId, localizacao, setLocalizacao,
        quantidade, setQuantidade, idProduto, setIdProduto, editandoId, limparFormularioEstoque,
        loading,
    } = useEstoque();

    const { produtos, listarProdutos } = useProdutos();

    useEffect(() => {
        listarProdutos();
        if (estoqueId) buscarEstoquePorId(estoqueId);
    }, [estoqueId]);

    useEffect(() => {
        if (estoqueId && produtos.length > 0) {
            const produtoDonoDoEstoque = produtos.find(p => p.estoque?.id === Number(estoqueId));

            if (produtoDonoDoEstoque && !idProduto) {
                setIdProduto(produtoDonoDoEstoque.id!.toString());
            }
        }
    }, [estoqueId, produtos, idProduto, setIdProduto]);

    if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando estoque...</p>;

    const produtosFiltrados = produtos.filter(p => {
        if (estoqueId && p.estoque?.id === Number(estoqueId)) return true;

        if (idProduto && p.id?.toString() === idProduto.toString()) return true;

        return !p.estoque;
    });

    const mostrarMensagemVazia = produtosFiltrados.length === 0 && !estoqueId;

    return (
        <section>
        <div className="login-container" style={{ padding: '20px', minHeight: '100vh' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
                <h1>{editandoId ? 'Editar Estoque' : 'Novo Estoque'}</h1>

                <form onSubmit={salvarEstoque}>
                    <div className="input-group">
                        <select className="input-field" value={idProduto} onChange={e => setIdProduto(e.target.value)} required disabled={!!estoqueId || mostrarMensagemVazia}>
                            {mostrarMensagemVazia ? (
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
                        <input type="text" placeholder="Localização do produto" className="input-field"
                        value={localizacao} onChange={e => setLocalizacao(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <input type="number" placeholder="Quantidade em estoque" className="input-field"
                            value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn-login">
                        {editandoId ? 'Atualizar Estoque' : 'Salvar Estoque'}
                    </button>

                    {editandoId && (
                        <button type="button" onClick={limparFormularioEstoque}
                                className='cancel'>
                            Cancelar Edição
                        </button>
                    )}
                </form>
            </div>
        </div>
        </section>
    );
}