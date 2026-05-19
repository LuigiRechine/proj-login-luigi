'use client';

import { useEffect } from 'react';
import { useProdutos } from '@/app/hooks/useProduto';
import Link from 'next/link';
import '@/app/formStyle.css';
import NavBar from '@/app/components/navBar';

export default function ProdutoPage() {
    const {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario
    } = useProdutos();

    useEffect(() => {
        listarProdutos();
    }, [listarProdutos]);

    return (
        <>
        <NavBar />
        
        <div className="login-container" style={{ padding: '20px', minHeight: '100vh' }}>
            
            <div className="login-card" style={{ width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
                <h1>{editandoId ? 'Editar Produto' : 'Novo Produto'}</h1>
                
                <form onSubmit={salvar}>
                    <div className="input-group">
                        <input type="text" placeholder="Nome do Produto" className="input-field"
                            value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Descrição" className="input-field"
                            value={descricao} onChange={e => setDescricao(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="number" step="0.01" placeholder="Preço (Ex: 99.90)" className="input-field"
                            value={preco} onChange={e => setPreco(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="URL da Imagem" className="input-field"
                            value={url} onChange={e => setUrl(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn-login">
                        {editandoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
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