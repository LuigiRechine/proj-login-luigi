'use client';

import Link from 'next/link';
import { useLogin } from './hooks/useLogin';
import './formStyle.css';

export default function Home() {
  // Puxamos as funções e variáveis do nosso Hook
  const { 
    username, setUsername, 
    password, setPassword, 
    entrar 
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Área de Acesso</h1>
        
        {/* Quando o formulário for submetido, chama a função entrar */}
        <form onSubmit={entrar}>
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza apenas o username
              className="input-field"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza apenas o password
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar no Sistema
          </button>
        </form>

        <div className="footer-link">
          <span>Ainda não tem conta? </span>
          <Link href="/registro">Cadastre-se aqui</Link>
        </div>
      </div>
    </div>
  );
}