import { useEffect } from 'react';
import '@/app/formStyle.css';
import NavBar from '@/app/components/navBar';
import { useEstoque } from '../hooks/useEstoque';
import { useProdutos } from '../hooks/useProduto';

export default function FormEstoque({ estoqueId }: { estoqueId?: number }) {
    const {
        salvar, buscarEstoquePorId, localizacao, setLocalizacao,
        quantidade, setQuantidade, idProduto, setIdProduto, editandoId, limparFormulario
    } = useEstoque();

    const { produtos, listarProdutos } = useProdutos();

    useEffect(() => {
        listarProdutos();
        if (estoqueId) buscarEstoquePorId(estoqueId);
    }, [estoqueId]);

    // Filtra para exibir apenas produtos sem estoque (ou o produto atual em caso de edição)
    const produtosFiltrados = produtos.filter(p => {
        if (estoqueId && p.estoque?.id === Number(estoqueId)) return true;
        return !p.estoque;
    });

    return (
        <>
        <NavBar />
        <div className="login-container" style={{ padding: '20px', minHeight: '100vh' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
                <h1>{editandoId ? 'Editar Estoque' : 'Novo Estoque'}</h1>

                <form onSubmit={salvar}>
                    <div className="input-group">
                        <select className="input-field" value={idProduto} onChange={e => setIdProduto(e.target.value)} required disabled={!!estoqueId}>
                            <option value="" disabled>Selecione um Produto</option>
                            {produtosFiltrados.map(p => (
                                <option key={p.id} value={p.id?.toString()}>{p.nome}</option>
                            ))}
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

                    <button type="submit" className="btn-login" style={{ backgroundColor: '#28a745' }}>
                        {editandoId ? 'Atualizar Estoque' : 'Salvar Estoque'}
                    </button>

                    {editandoId && (
                        <button type="button" onClick={limparFormulario}
                                style={{ background: 'none', border: 'none', color: 'gray', marginTop: '10px', cursor: 'pointer' }}>
                            Cancelar Edição
                        </button>
                    )}
                </form>
            </div>
        </div>
        </>
    );
}