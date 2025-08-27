import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginPage.css";

const LoginPage = () => {
  const [isCadastro, setIsCadastro] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    empresa: "",
    senha: "",
    confirmacao: "",
    lembrar: false,
    aceitarTermos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const hasMinLength = formData.senha.length >= 8;
  const hasLettersAndNumbers = /[a-zA-Z]/.test(formData.senha) && /[0-9]/.test(formData.senha);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          <img src="/images/login-estock.png" alt="Pessoa no estoque" />
        </div>

        <div className="login-form">
          <h2 className="logo">
            <img src="/images/icon-nextis.png" alt="NexTIS" className="logo-icon" />
            <span className="logo-green">NexTIS</span>
          </h2>
          <p className="subtitle">
            {isCadastro ? "" : "Controle de Estoque Inteligente"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isCadastro ? (
              <>
                <div className="login-input-group">
                <div className="space">
                  <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="black-text"
                  />
                    </div>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                      className="black-text"
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="login-options">
                  <label className="checkbox-text">
                    <input
                      type="checkbox"
                      name="lembrar"
                      checked={formData.lembrar}
                      onChange={handleChange}
                      className="small-checkbox"
                    />
                    Lembrar-me
                  </label>
                  <a href="#" className="forgot-link">
                    Esqueceu a senha?
                  </a>
                </div>
                <button type="submit" className="btn-login">
                  Entrar
                </button>
                <p className="ou">Ou entre com</p>
                <div className="social-login">
                  <button type="button" className="social-btn">
                    <img src="/images/logo-google.png" alt="Google" />
                  </button>
                  <button type="button" className="social-btn">
                    <img src="/images/logo-facebook.png" alt="Facebook" />
                  </button>
                  <button type="button" className="social-btn">
                    <img src="/images/logo-microsoft.png" alt="Microsoft" />
                  </button>
                </div>
                <p className="register center">
                  Não tem uma conta?{" "}
                  <span onClick={() => setIsCadastro(true)}>Cadastre-se</span>
                </p>
              </>
            ) : (
              <>
                <div className="double-input">
                  <input
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="black-text"
                  />
                  <input
                    type="text"
                    placeholder="Sobrenome"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                    required
                    className="black-text"
                  />
                </div>
                <input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="black-text"
                />
                <div className="input-spacing"></div>
                <input
                  type="text"
                  placeholder="Empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="black-text"
                />
                <div className="input-spacing"></div>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className="black-text"
                  />
                  <span className="eye-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {!hasMinLength && (
                  <p className="password-hint">Pelo menos 8 caracteres</p>
                )}
                {!hasLettersAndNumbers && (
                  <p className="password-hint">Letras e números</p>
                )}
                <div className="password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmação"
                    name="confirmacao"
                    value={formData.confirmacao}
                    onChange={handleChange}
                    required
                    className="black-text"
                  />
                  <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="terms-container">
                  <label className="checkbox-text">
                    <input
                      type="checkbox"
                      name="aceitarTermos"
                      checked={formData.aceitarTermos}
                      onChange={handleChange}
                      className="small-checkbox"
                    />
                    <span className="terms-text">
                      Concordo com os <a href="#">Termos de Serviço</a> e a{" "}
                      <a href="#">Política de Privacidade</a>
                    </span>
                  </label>
                </div>
                <button type="submit" className="btn-login">
                  Criar Conta
                </button>
                <p className="register center">
                  Já tem uma conta?{" "}
                  <span onClick={() => setIsCadastro(false)}>Entrar</span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;