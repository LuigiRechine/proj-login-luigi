'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/components/navBar';
import ProdutosForm from '@/app/components/ProdutosForm';
import '@/app/formStyle.css';

export default function EditarProdutoPage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
            <NavBar />
            <ProdutosForm produtoId={id} />
        </>
    );
}