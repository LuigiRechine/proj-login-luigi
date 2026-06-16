'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useProdutos } from "../hooks/useProduto";
import NavBar from "../components/navBar";

export default function Dashboard() {
    const router = useRouter();
    const [name, setName] = useState("");
    const { produtos, loading, listarProdutos, excluir } = useProdutos();

    useEffect(() => {
        listarProdutos();
    }, [listarProdutos]);

    useEffect(() => {
        const userName = Cookies.get("userName");

        if (userName) {
            setName(userName);
        } else {
            router.push("/");
        }
    }, [router]);

    return (
        <div>
            <NavBar />
            <div className="login-card" style={{ width: '100%', padding: '60px' }}>
                <h2>Produtos Cadastrados</h2>
                {loading ? <p>Carregando...</p> : (
                    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ textAlign: 'left', padding: '10px' }}>Nome</th>
                                <th style={{ textAlign: 'left', padding: '10px' }}>Preço</th>
                                <th style={{ textAlign: 'center', padding: '10px' }}>Estoque</th>
                                <th style={{ textAlign: 'center', padding: '10px' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{p.nome}</td>
                                    <td style={{ padding: '10px' }}>R$ {(Number(p.preco) || 0).toFixed(2)}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                                        {p.estoque ? p.estoque.quantidade : 0} unid.
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => {
                                                if (p.estoque) {
                                                    router.push(`/dashboard/estoque/${p.estoque.id}`);
                                                } else {
                                                    router.push('/dashboard/estoque');
                                                }
                                            }}
                                            style={{ marginRight: '10px', color: '#28a745', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Alterar Estoque
                                        </button>
                                        <button onClick={() => router.push(`/dashboard/produto/${p.id}`)}
                                            style={{ marginRight: '10px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            Editar
                                        </button>
                                        <button onClick={() => excluir(p.id!)}
                                            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}