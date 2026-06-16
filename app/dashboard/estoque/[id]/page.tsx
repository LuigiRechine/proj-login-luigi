'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/components/navBar';
import '../../../formStyle.css';
import FormEstoque from '@/app/components/formEstoque';

export default function EditarEstoquePage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
          
            <FormEstoque estoqueId={id} />
        </>
    );
}