'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Cookies from 'js-cookie';

export function useLogin() {
  const router = useRouter();

  // Estados simples e separados, iguais aos do cadastro de produtos
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função disparada ao clicar no botão Entrar
  function entrar(evento: React.FormEvent) {
    evento.preventDefault(); // Evita que a página recarregue

    // Montamos o objeto que vai para a API
    const dadosLogin = {
      username: username,
      password: password
    };

    api.post('/users/auth', dadosLogin)
      .then((resposta) => {
        Cookies.set('logged', 'true', { expires: 1 }); // Expira as credenciais de login em 1 dia
        Cookies.set('userName', resposta.data.name, { expires: 1 }); // Expira o nome em 1 dia

        // Vai para a página principal (Dashboard)
        router.push('/dashboard');
      })
      .catch(() => {
        // Mostra o erro simples se a senha estiver errada
        alert('Erro: Usuário ou senha incorretos!');
      });
  }

  // Exportamos tudo que a tela vai precisar
  return {
    username, setUsername,
    password, setPassword,
    entrar
  };
}