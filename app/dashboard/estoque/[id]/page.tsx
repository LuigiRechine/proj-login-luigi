'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/components/navBar';
import '../../../formStyle.css';
import EstoqueForm from '@/app/components/EstoqueForm';

export default function EditarEstoquePage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
            <NavBar />
            <EstoqueForm estoqueId={id} />
        </>
    );
}