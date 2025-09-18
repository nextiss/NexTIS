import React, { useState, useEffect, useRef } from 'react';
import {
  FaTachometerAlt,
  FaBoxes,
  FaWarehouse,
  FaTruck,
  FaExchangeAlt,
  FaCog,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaPlus,
  FaTrash,
  FaUpload,
  FaEdit,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaBars,
  FaCheck,
  FaSignOutAlt,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import './Estock.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Estock() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeMetric, setActiveMetric] = useState('dia');
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    quantidade: 0,
    shots: 0,
    validade: '',
    imagem: null,
    fornecedorId: '',
    capacidade: 0,
    shotMl: 50
  });
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: '',
    contato: '',
    email: '',
    telefone: ''
  });
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    cargo: '',
    email: '',
    notificacoesEmail: true
  });
  const [editandoFornecedor, setEditandoFornecedor] = useState(null);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [configuracoes, setConfiguracoes] = useState({
    notificacoesEmail: true,
    alertaEstoqueMinimo: 5,
  });
  const [previewImagem, setPreviewImagem] = useState(null);
  const fileInputRef = useRef(null);

  const [vendasData, setVendasData] = useState({
    dia: Array(24).fill().map((_, i) => ({ hora: i, valor: Math.floor(Math.random() * 100) })),
    mes: Array(30).fill().map((_, i) => ({ dia: i + 1, valor: Math.floor(Math.random() * 500) })),
    ano: Array(12).fill().map((_, i) => ({ mes: i + 1, valor: Math.floor(Math.random() * 3000) }))
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const produtosIniciais = [
      { id: 1, nome: 'Vinho Bordô Suave Tradição 1000ml', quantidade: 10, shots: 20, validade: '2024-12-31', imagem: '/images/vinho-tinto.png', fornecedorId: 1, capacidade: 1000, shotMl: 50, categoria: "vinho", preco: 28.40, precoDose: 12.90 },
      { id: 2, nome: 'Whisky Jack Daniels N. 7 1000ml', quantidade: 8, shots: 20, validade: '2025-11-15', imagem: '/images/whisky.png', fornecedorId: 1, capacidade: 1000, shotMl: 50, categoria: "destilado", preco: 145.00, precoDose: 25.90 },
      { id: 3, nome: 'Cerveja Heineken Long Neck 330ml', quantidade: 24, shots: 1, validade: '2023-10-30', imagem: '/images/cerveja.png', fornecedorId: 2, capacidade: 330, shotMl: 330, categoria: "cerveja", preco: 7.49 },
      { id: 4, nome: 'Vodka Smirnoff 998ml', quantidade: 12, shots: 20, validade: '2024-08-20', imagem: '/images/vodka.png', fornecedorId: 1, capacidade: 998, shotMl: 50, categoria: "destilado", preco: 39.99, precoDose: 15.90 },
      { id: 5, nome: 'Gin Rock\'s Strawberry 700ml', quantidade: 6, shots: 14, validade: '2024-05-15', imagem: '/images/gin.png', fornecedorId: 2, capacidade: 700, shotMl: 50, categoria: "destilado", preco: 45.00, precoDose: 16.90 },
      { id: 6, nome: 'Tequila Jose Cuervo Especial Gold 750ml', quantidade: 7, shots: 15, validade: '2024-09-20', imagem: '/images/tequila.png', fornecedorId: 1, capacidade: 750, shotMl: 50, categoria: "destilado", preco: 169.00, precoDose: 28.90 },
      { id: 7, nome: 'Rum Explorer Trinidad 700ml', quantidade: 5, shots: 14, validade: '2025-01-15', imagem: '/images/rum.png', fornecedorId: 2, capacidade: 700, shotMl: 50, categoria: "destilado", preco: 245.13, precoDose: 35.90 },
      { id: 8, nome: 'Licor Sheridans Coffee Layered Liqueur 700ml', quantidade: 4, shots: 14, validade: '2024-11-30', imagem: '/images/licor.png', fornecedorId: 1, capacidade: 700, shotMl: 50, categoria: "licor", preco: 199.00, precoDose: 22.90 },
      { id: 9, nome: 'Conhaque Hennessy Very Special 700ml', quantidade: 2, shots: 14, validade: '2026-03-10', imagem: '/images/conhaque.png', fornecedorId: 1, capacidade: 700, shotMl: 50, categoria: "destilado", preco: 480.00, precoDose: 65.90 },
      { id: 10, nome: 'Champagne Veuve Clicquot Brut 750ml', quantidade: 9, shots: 15, validade: '2024-07-25', imagem: '/images/champagne.png', fornecedorId: 2, capacidade: 750, shotMl: 50, categoria: "espumante", preco: 519.90, precoDose: 45.90 },
      { id: 11, nome: 'Caneca De Vidro Roma Para Chopp 345ml', quantidade: 15, shots: 1, validade: '2024-12-31', imagem: '/images/chopp.png', fornecedorId: 3, capacidade: 345, shotMl: 345, categoria: "chopp", preco: 28.50 },
      { id: 12, nome: 'Cerveja Skol Lata 269ml', quantidade: 36, shots: 1, validade: '2023-12-31', imagem: '/images/cerveja-skol.png', fornecedorId: 3, capacidade: 269, shotMl: 269, categoria: "cerveja", preco: 3.39 },
      { id: 13, nome: 'Cerveja Budweiser American Lager 350ml', quantidade: 30, shots: 1, validade: '2023-12-31', imagem: '/images/cerveja-bud.png', fornecedorId: 3, capacidade: 350, shotMl: 350, categoria: "cerveja", preco: 4.29 },
      { id: 14, nome: 'Água Mineral Minalba 510ml Sem Gás', quantidade: 20, shots: 1, validade: '2024-12-31', imagem: '/images/agua-semgas.png', fornecedorId: 4, capacidade: 510, shotMl: 510, categoria: "agua", preco: 2.50 },
      { id: 15, nome: 'Água Mineral Com Gás Garrafa 500ml Crystal', quantidade: 18, shots: 1, validade: '2024-12-31', imagem: '/images/agua-comgas.png', fornecedorId: 4, capacidade: 500, shotMl: 500, categoria: "agua", preco: 3.50 },
      { id: 16, nome: 'Amendoim 100g', quantidade: 15, shots: 1, validade: '2023-10-30', imagem: '/images/amendoim.png', fornecedorId: 5, capacidade: 100, shotMl: 100, categoria: "petisco", preco: 8.00 },
      { id: 17, nome: 'Mix Castanhas 150g', quantidade: 12, shots: 1, validade: '2023-11-15', imagem: '/images/mix-castanhas.png', fornecedorId: 5, capacidade: 150, shotMl: 150, categoria: "petisco", preco: 15.00 },
      { id: 18, nome: 'Batata Chips 120g', quantidade: 20, shots: 1, validade: '2023-10-20', imagem: '/images/batata-chips.png', fornecedorId: 5, capacidade: 120, shotMl: 120, categoria: "petisco", preco: 10.00 },
      { id: 19, nome: 'Salame 100g', quantidade: 8, shots: 1, validade: '2023-09-30', imagem: '/images/salame.png', fornecedorId: 5, capacidade: 100, shotMl: 100, categoria: "petisco", preco: 18.00 },
      { id: 20, nome: 'Queijos 150g', quantidade: 10, shots: 1, validade: '2023-09-25', imagem: '/images/queijos.png', fornecedorId: 5, capacidade: 150, shotMl: 150, categoria: "petisco", preco: 25.00 },
      { id: 21, nome: 'Azeitonas 100g', quantidade: 18, shots: 1, validade: '2023-11-10', imagem: '/images/azeitonas.png', fornecedorId: 5, capacidade: 100, shotMl: 100, categoria: "petisco", preco: 12.00 },
      { id: 22, nome: 'Batata Frita 200g', quantidade: 25, shots: 1, validade: '2023-10-05', imagem: '/images/batata-frita.png', fornecedorId: 5, capacidade: 200, shotMl: 200, categoria: "porcao", preco: 20.00 },
      { id: 23, nome: 'Mandioca Frita 200g', quantidade: 15, shots: 1, validade: '2023-10-10', imagem: '/images/mandioca-frita.png', fornecedorId: 5, capacidade: 200, shotMl: 200, categoria: "porcao", preco: 22.00 },
      { id: 24, nome: 'Frango a Passarinho 250g', quantidade: 12, shots: 1, validade: '2023-09-20', imagem: '/images/frango-passarinho.png', fornecedorId: 5, capacidade: 250, shotMl: 250, categoria: "porcao", preco: 28.00 },
      { id: 25, nome: 'Isca de Peixe 250g', quantidade: 10, shots: 1, validade: '2023-09-15', imagem: '/images/isca-peixe.png', fornecedorId: 5, capacidade: 250, shotMl: 250, categoria: "porcao", preco: 32.00 },
      { id: 26, nome: 'Linguiça Acebolada 200g', quantidade: 14, shots: 1, validade: '2023-10-15', imagem: '/images/linguica-acebolada.png', fornecedorId: 5, capacidade: 200, shotMl: 200, categoria: "porcao", preco: 26.00 },
      { id: 27, nome: 'Torresmo 150g', quantidade: 20, shots: 1, validade: '2023-10-25', imagem: '/images/torresmo.png', fornecedorId: 5, capacidade: 150, shotMl: 150, categoria: "porcao", preco: 18.00 },
      { id: 28, nome: 'Queijo Coalho 200g', quantidade: 16, shots: 1, validade: '2023-09-28', imagem: '/images/queijo-coalho.png', fornecedorId: 5, capacidade: 200, shotMl: 200, categoria: "porcao", preco: 24.00 },
      { id: 29, nome: 'Onion Rings 150g', quantidade: 18, shots: 1, validade: '2023-10-08', imagem: '/images/onion-rings.png', fornecedorId: 5, capacidade: 150, shotMl: 150, categoria: "porcao", preco: 16.00 }
    ];
    setProdutos(produtosIniciais);

    const fornecedoresIniciais = [
      {
        id: 1,
        nome: 'Distribuidora de Bebidas LTDA',
        contato: 'Carlos Silva',
        email: 'contato@distribuidora.com',
        telefone: '(11) 1234-5678'
      },
      {
        id: 2,
        nome: 'Importadora de Vinhos',
        contato: 'Ana Santos',
        email: 'vendas@importvinhos.com',
        telefone: '(11) 9876-5432'
      },
      {
        id: 3,
        nome: 'Cervejaria Nacional',
        contato: 'Pedro Almeida',
        email: 'pedro@cervejarianacional.com',
        telefone: '(11) 5555-9999'
      },
      {
        id: 4,
        nome: 'Águas Puras',
        contato: 'Maria Oliveira',
        email: 'vendas@aguaspuras.com',
        telefone: '(11) 4444-8888'
      },
      {
        id: 5,
        nome: 'Petiscos & Companhia',
        contato: 'João Santos',
        email: 'joao@petiscos.com',
        telefone: '(11) 3333-7777'
      }
    ];
    setFornecedores(fornecedoresIniciais);

    const usuariosIniciais = [
      {
        id: 1,
        nome: 'João Alberto',
        cargo: 'Administrador',
        email: 'joao@empresa.com',
        password: 'admin123',
        notificacoesEmail: true
      },
      {
        id: 2,
        nome: 'Maria Silva',
        cargo: 'Estoquista',
        email: 'maria@empresa.com',
        password: 'user123',
        notificacoesEmail: false
      }
    ];
    setUsuarios(usuariosIniciais);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'nextiscontato@gmail.com' && loginForm.password === 'nextis') {
      setIsAuthenticated(true);
      const usuarioJoao = usuarios.find(user => user.nome === 'João Alberto');
      setCurrentUser(usuarioJoao || { nome: 'João Alberto', email: loginForm.email, cargo: 'Administrador' });
      setLoginError('');
    } else {
      setLoginError('Email ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginForm({ email: '', password: '' });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const vendasChartData = {
    labels: vendasData[activeMetric].map(item => activeMetric === 'dia' ? `${item.hora}h` : activeMetric === 'mes' ? item.dia : `Mês ${item.mes}`),
    datasets: [
      {
        label: 'Vendas',
        data: vendasData[activeMetric].map(item => item.valor),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const estoqueChartData = {
    labels: produtos.slice(0, 5).map(produto => produto.nome.split(' ')[0]),
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: produtos.slice(0, 5).map(produto => produto.quantidade),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (e.target.type === "number") {
      newValue = value.replace(/^0+(?=\d)/, "");
    }

    setNovoProduto(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };


  const handleFornecedorChange = (e) => {
    const { name, value } = e.target;
    setNovoFornecedor({
      ...novoFornecedor,
      [name]: value
    });
  };

  const handleUsuarioChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoUsuario({
      ...novoUsuario,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleConfiguracaoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracoes({
      ...configuracoes,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNovoProduto({
        ...novoProduto,
        imagem: file
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calcularShots = (capacidade, shotMl) => {
    return Math.floor(capacidade / shotMl);
  };

  const adicionarProduto = (e) => {
    e.preventDefault();
    const shotsCalculados = calcularShots(novoProduto.capacidade, novoProduto.shotMl);
    const produto = {
      id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
      nome: novoProduto.nome,
      quantidade: parseInt(novoProduto.quantidade),
      shots: shotsCalculados,
      validade: novoProduto.validade,
      imagem: previewImagem,
      fornecedorId: novoProduto.fornecedorId,
      capacidade: parseInt(novoProduto.capacidade),
      shotMl: parseInt(novoProduto.shotMl)
    };

    setProdutos([produto, ...produtos]);

    setNovoProduto({
      nome: '',
      quantidade: 0,
      shots: 0,
      validade: '',
      imagem: null,
      fornecedorId: '',
      capacidade: 0,
      shotMl: 50
    });
    setPreviewImagem(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const adicionarFornecedor = (e) => {
    e.preventDefault();
    const fornecedor = {
      id: fornecedores.length + 1,
      ...novoFornecedor
    };
    setFornecedores([...fornecedores, fornecedor]);
    setNovoFornecedor({
      nome: '',
      contato: '',
      email: '',
      telefone: ''
    });
  };

  const adicionarUsuario = (e) => {
    e.preventDefault();
    const usuario = {
      id: usuarios.length + 1,
      ...novoUsuario
    };
    setUsuarios([...usuarios, usuario]);
    setNovoUsuario({
      nome: '',
      cargo: '',
      email: '',
      notificacoesEmail: true
    });
  };

  const editarFornecedor = (fornecedor) => {
    setEditandoFornecedor({ ...fornecedor });
  };

  const salvarEdicaoFornecedor = () => {
    setFornecedores(fornecedores.map(f =>
      f.id === editandoFornecedor.id ? editandoFornecedor : f
    ));
    setEditandoFornecedor(null);
  };

  const editarUsuario = (usuario) => {
    setEditandoUsuario({ ...usuario });
  };

  const salvarEdicaoUsuario = () => {
    setUsuarios(usuarios.map(u =>
      u.id === editandoUsuario.id ? editandoUsuario : u
    ));
    setEditandoUsuario(null);
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  const removerFornecedor = (id) => {
    setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
  };

  const removerUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  const atualizarQuantidade = (id, novaQuantidade) => {
    setProdutos(produtos.map(produto =>
      produto.id === id ? { ...produto, quantidade: parseInt(novaQuantidade) } : produto
    ));
  };

  const atualizarShots = (id, novosShots) => {
    setProdutos(produtos.map(produto =>
      produto.id === id ? { ...produto, shots: parseInt(novosShots) } : produto
    ));
  };

  const atualizarShotMl = (id, novoShotMl) => {
    setProdutos(produtos.map(produto =>
      produto.id === id ? {
        ...produto,
        shotMl: parseInt(novoShotMl),
        shots: calcularShots(produto.capacidade, parseInt(novoShotMl))
      } : produto
    ));
  };

  const calcularTotalVendas = () => {
    return vendasData[activeMetric].reduce((total, item) => total + item.valor, 0);
  };

  const calcularTotalProdutos = () => {
    return produtos.reduce((total, produto) => total + produto.quantidade, 0);
  };

  const calcularTotalShots = () => {
    return produtos.reduce((total, produto) => total + (produto.quantidade * produto.shots), 0);
  };

  const getFornecedorNome = (id) => {
    const fornecedor = fornecedores.find(f => f.id === id);
    return fornecedor ? fornecedor.nome : 'Fornecedor não encontrado';
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="estock-login-container">
        <div className="estock-login-card">
          <div className="estock-login-header">
            <img src="/images/logo-estock.png" alt="Logo Estock" />
            <h2>Estock - Sistema de Gestão</h2>
            <p>Faça login para acessar o sistema</p>
          </div>

          <form onSubmit={handleLogin} className="estock-login-form">
            {loginError && <div className="error-message">{loginError}</div>}

            <div className="estock-form-group">
              <label className="white-label">Email:</label>
              <div className="estock-input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="Seu email"
                  className="white-input"
                />
              </div>
            </div>

            <div className="estock-form-group">
              <label className="white-label">Senha:</label>
              <div className="estock-input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="Sua senha"
                  className="white-input"
                />
                <button
                  type="button"
                  className="estock-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="estock-login-btn">
              Entrar no Sistema
            </button>
          </form>

          <div className="estock-login-footer">
            <p>Entre com suas credenciais de administrador</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="estock-container">
      {isMobile && (
        <div className="estock-mobile-header">
          <button className="estock-mobile-menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
      )}

      <aside className={`estock-sidebar ${sidebarCollapsed && !isMobile ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="estock-sidebar-header">
          {(!sidebarCollapsed || isMobile) && (
            <div className="estock-sidebar-logo">
              <img src="/images/logo-estock.png" alt="Logo Estock" />
            </div>
          )}
          {!isMobile && (
            <button className="estock-sidebar-toggle" onClick={toggleSidebar}>
              {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          )}
        </div>

        {(!sidebarCollapsed || isMobile) && (
          <>
            <p className="estock-sidebar-title">Menu Principal</p>

            <nav className="estock-sidebar-nav">
              <button className={`estock-sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); closeMobileSidebar(); }}>
                <FaTachometerAlt className="estock-icon" /> <span>Dashboard</span>
              </button>
              <button className={`estock-sidebar-btn ${activeTab === 'produtos' ? 'active' : ''}`} onClick={() => { setActiveTab('produtos'); closeMobileSidebar(); }}>
                <FaBoxes className="estock-icon" /> <span>Produtos</span>
              </button>
              <button className={`estock-sidebar-btn ${activeTab === 'estoque' ? 'active' : ''}`} onClick={() => { setActiveTab('estoque'); closeMobileSidebar(); }}>
                <FaWarehouse className="estock-icon" /> <span>Estoque</span>
              </button>
              <button className={`estock-sidebar-btn ${activeTab === 'fornecedores' ? 'active' : ''}`} onClick={() => { setActiveTab('fornecedores'); closeMobileSidebar(); }}>
                <FaTruck className="estock-icon" /> <span>Fornecedores</span>
              </button>
              <button className={`estock-sidebar-btn ${activeTab === 'movimentacoes' ? 'active' : ''}`} onClick={() => { setActiveTab('movimentacoes'); closeMobileSidebar(); }}>
                <FaExchangeAlt className="estock-icon" /> <span>Movimentações</span>
              </button>
            </nav>

            <p className="estock-sidebar-title">Configurações</p>

            <nav className="estock-sidebar-nav">
              <button className={`estock-sidebar-btn ${activeTab === 'sistema' ? 'active' : ''}`} onClick={() => { setActiveTab('sistema'); closeMobileSidebar(); }}>
                <FaCog className="estock-icon" /> <span>Sistema</span>
              </button>
              <button className={`estock-sidebar-btn ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => { setActiveTab('usuarios'); closeMobileSidebar(); }}>
                <FaUsers className="estock-icon" /> <span>Usuários</span>
              </button>
            </nav>

            <div className="estock-user-info">
              <img src="/images/user-avatar.png" alt="Usuário" className="estock-user-avatar" />
              <div>
                <p className="estock-user-name">{currentUser?.nome || 'Usuário'}</p>
                <p className="estock-user-role">{currentUser?.cargo || 'Administrador'}</p>
              </div>
              <button className="estock-logout-btn" onClick={handleLogout} title="Sair">
                <FaSignOutAlt />
              </button>
            </div>
          </>
        )}
      </aside>

      {isMobile && mobileSidebarOpen && (
        <div className="estock-sidebar-overlay" onClick={closeMobileSidebar}></div>
      )}

      <main className={`estock-main ${sidebarCollapsed && !isMobile ? 'collapsed' : ''}`}>
        {activeTab === 'dashboard' && (
          <div className="estock-dashboard">
            {isMobile && (
              <div className="estock-mobile-logo-above-metrics">
                <img src="/images/logo-estock.png" alt="Logo Estock" />
              </div>
            )}

            <div className="estock-metrics-container">
              <div className="estock-metric-card compact">
                <div className="estock-metric-header">
                  <h3>Total de Produtos</h3>
                </div>
                <div className="estock-metric-value">{calcularTotalProdutos()}</div>
              </div>

              <div className="estock-metric-card compact">
                <div className="estock-metric-header">
                  <h3>Vendas</h3>
                  <div className="estock-metric-selector">
                    <button className={activeMetric === 'dia' ? 'active' : ''} onClick={() => setActiveMetric('dia')}>
                      Dia
                    </button>
                    <button className={activeMetric === 'mes' ? 'active' : ''} onClick={() => setActiveMetric('mes')}>
                      Mês
                    </button>
                    <button className={activeMetric === 'ano' ? 'active' : ''} onClick={() => setActiveMetric('ano')}>
                      Ano
                    </button>
                  </div>
                </div>
                <div className="estock-metric-value">R$ {calcularTotalVendas().toLocaleString()}</div>
              </div>

              <div className="estock-metric-card compact">
                <div className="estock-metric-header">
                  <h3>Total de Shots</h3>
                </div>
                <div className="estock-metric-value">{calcularTotalShots()}</div>
              </div>
            </div>

            <div className="estock-chart-container">
              <div className="estock-chart-card">
                <h3>Vendas por Período</h3>
                <div className="estock-chart-content">
                  <Line
                    data={vendasChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="estock-chart-card">
                <h3>Top 5 Produtos em Estoque</h3>
                <div className="estock-chart-content">
                  <Bar
                    data={estoqueChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="estock-activity-card">
              <h3>Atividades Recentes</h3>
              <ul className="estock-activity-list">
                <li>Produto "Vinho Bordô" atualizado - 10:30</li>
                <li>Novo produto "Whisky Jack Daniels" adicionado - 09:45</li>
                <li>Venda realizada - R$ 150,00 - 09:20</li>
                <li>Estoque de "Cerveja Heineken" reabastecido - Ontem</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'produtos' && (
          <div className="estock-produtos">
            <h2>Gerenciamento de Produtos</h2>

            <div className="estock-produtos-form">
              <h3>Adicionar Novo Produto</h3>
              <form onSubmit={adicionarProduto}>
                <div className="estock-form-group compact">
                  <label>Nome do Produto:</label>
                  <input
                    type="text"
                    name="nome"
                    value={novoProduto.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Quantidade:</label>
                  <input
                    type="number"
                    name="quantidade"
                    value={novoProduto.quantidade}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Capacidade (ml):</label>
                  <input
                    type="number"
                    name="capacidade"
                    value={novoProduto.capacidade}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Tamanho do Shot (ml):</label>
                  <input
                    type="number"
                    name="shotMl"
                    value={novoProduto.shotMl}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Shots calculados:</label>
                  <input
                    type="text"
                    value={calcularShots(novoProduto.capacidade, novoProduto.shotMl)}
                    disabled
                    className="shots-calculados"
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Data de Validade:</label>
                  <input
                    type="date"
                    name="validade"
                    value={novoProduto.validade}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Fornecedor:</label>
                  <select
                    name="fornecedorId"
                    value={novoProduto.fornecedorId}
                    onChange={handleInputChange}
                    required
                    className="gray-select"
                  >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map(fornecedor => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="estock-form-group compact">
                  <label>Imagem do Produto:</label>
                  <div className="estock-image-upload">
                    <button
                      type="button"
                      className="estock-upload-btn"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <FaUpload /> Selecionar Imagem
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    {previewImagem && (
                      <img
                        src={previewImagem}
                        alt="Preview"
                        className="estock-image-preview"
                      />
                    )}
                  </div>
                </div>
                <div className="form-button-spacing">
                  <button type="submit" className="estock-adicionar-btn">
                    <FaPlus /> Adicionar Produto
                  </button>
                </div>
              </form>
            </div>

            <div className="estock-produtos-grid">
              {produtos.map(produto => (
                <div key={produto.id} className="estock-produto-card">
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="estock-produto-imagem"
                    />
                  ) : (
                    <div className="estock-produto-sem-imagem">
                      <FaBoxes />
                    </div>
                  )}
                  <div className="estock-produto-info">
                    <h3>{produto.nome}</h3>
                    <p>Quantidade: {produto.quantidade}</p>
                    <p>Capacidade: {produto.capacidade}ml</p>
                    <p>Tamanho do shot: {produto.shotMl}ml</p>
                    <p>Shots por unidade: {produto.shots}</p>
                    <p>Total de shots: {produto.quantidade * produto.shots}</p>
                    <p>Validade: {new Date(produto.validade).toLocaleDateString()}</p>
                    <p>Fornecedor: {getFornecedorNome(produto.fornecedorId)}</p>
                    <div className="estock-produto-acoes">
                      <div className="estock-produto-controles">
                        <label>Quantidade:</label>
                        <input
                          type="number"
                          value={produto.quantidade}
                          onChange={(e) => atualizarQuantidade(produto.id, e.target.value)}
                          min="0"
                        />
                      </div>
                      <div className="estock-produto-controles">
                        <label>Shot (ml):</label>
                        <input
                          type="number"
                          value={produto.shotMl}
                          onChange={(e) => atualizarShotMl(produto.id, e.target.value)}
                          min="1"
                        />
                      </div>
                      <button className="estock-remover-btn-small" onClick={() => removerProduto(produto.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'estoque' && (
          <div className="estock-estoque">
            <h2>Gestão de Estoque</h2>
            <div className="estock-estoque-content">
              <div className="estock-estoque-card">
                <h3>Níveis de Estoque</h3>
                <div className="estock-estoque-chart">
                  {produtos.map(produto => (
                    <div key={produto.id} className="estock-estoque-item">
                      <span>{produto.nome}</span>
                      <div className="estock-estoque-bar-container">
                        <div
                          className="estock-estoque-bar"
                          style={{ width: `${Math.min(100, (produto.quantidade / 30) * 100)}%` }}
                        ></div>
                      </div>
                      <span>{produto.quantidade}/30</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="estock-estoque-alertas">
                <h3>Alertas</h3>
                <ul>
                  {produtos.filter(p => p.quantidade < 5).map(produto => (
                    <li key={produto.id}>
                      Estoque baixo: {produto.nome} ({produto.quantidade} unidades)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fornecedores' && (
          <div className="estock-fornecedores">
            <h2>Fornecedores</h2>

            <div className="estock-fornecedores-form">
              <h3>{editandoFornecedor ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}</h3>
              <form onSubmit={editandoFornecedor ? salvarEdicaoFornecedor : adicionarFornecedor}>
                <div className="estock-form-group compact">
                  <label>Nome do Fornecedor:</label>
                  <input
                    type="text"
                    name="nome"
                    value={editandoFornecedor ? editandoFornecedor.nome : novoFornecedor.nome}
                    onChange={editandoFornecedor ?
                      (e) => setEditandoFornecedor({ ...editandoFornecedor, nome: e.target.value }) :
                      handleFornecedorChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Pessoa de Contato:</label>
                  <input
                    type="text"
                    name="contato"
                    value={editandoFornecedor ? editandoFornecedor.contato : novoFornecedor.contato}
                    onChange={editandoFornecedor ?
                      (e) => setEditandoFornecedor({ ...editandoFornecedor, contato: e.target.value }) :
                      handleFornecedorChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editandoFornecedor ? editandoFornecedor.email : novoFornecedor.email}
                    onChange={editandoFornecedor ?
                      (e) => setEditandoFornecedor({ ...editandoFornecedor, email: e.target.value }) :
                      handleFornecedorChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Telefone:</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={editandoFornecedor ? editandoFornecedor.telefone : novoFornecedor.telefone}
                    onChange={editandoFornecedor ?
                      (e) => setEditandoFornecedor({ ...editandoFornecedor, telefone: e.target.value }) :
                      handleFornecedorChange}
                    required
                  />
                </div>
                <div className="form-button-spacing">
                  <div className="estock-form-buttons">
                    {editandoFornecedor ? (
                      <>
                        <button type="submit" className="estock-salvar-btn">
                          <FaSave /> Salvar
                        </button>
                        <button type="button" className="estock-cancelar-btn" onClick={() => setEditandoFornecedor(null)}>
                          <FaTimes /> Cancelar
                        </button>
                      </>
                    ) : (
                      <button type="submit" className="estock-adicionar-btn">
                        <FaPlus /> Adicionar Fornecedor
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="estock-fornecedores-list">
              {fornecedores.map(fornecedor => (
                <div key={fornecedor.id} className="estock-fornecedor-card">
                  <div className="estock-fornecedor-info">
                    <h3>{fornecedor.nome}</h3>
                    <p>Contato: {fornecedor.contato}</p>
                    <p>Email: {fornecedor.email}</p>
                    <p>Telefone: {fornecedor.telefone}</p>
                  </div>
                  <div className="estock-fornecedor-acoes">
                    <button className="estock-editar-btn" onClick={() => editarFornecedor(fornecedor)}>
                      <FaEdit /> Editar
                    </button>
                    <button className="estock-remover-btn-small" onClick={() => removerFornecedor(fornecedor.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'movimentacoes' && (
          <div className="estock-movimentacoes">
            <h2>Movimentações</h2>
            <div className="estock-movimentacoes-content">
              <table className="estock-movimentacoes-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Produto</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10/05/2023</td>
                    <td>Vinho Bordô</td>
                    <td>Entrada</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>09/05/2023</td>
                    <td>Whisky Jack Daniels</td>
                    <td>Saída</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sistema' && (
          <div className="estock-sistema">
            <h2>Configurações do Sistema</h2>
            <div className="estock-sistema-content">
              <div className="estock-sistema-config">
                <h3>Preferências</h3>
                <div className="estock-config-item compact">
                  <label>Receber notificações por email:</label>
                  <div className="estock-checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="notificacoesEmail"
                      checked={configuracoes.notificacoesEmail}
                      onChange={handleConfiguracaoChange}
                      id="notificacoesEmail"
                      className="estock-checkbox"
                    />
                    <label htmlFor="notificacoesEmail" className="estock-checkbox-label">
                      <span className="estock-checkbox-icon">
                        {configuracoes.notificacoesEmail && <FaCheck />}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="estock-config-item compact">
                  <label>Alerta de estoque mínimo:</label>
                  <input
                    type="number"
                    name="alertaEstoqueMinimo"
                    value={configuracoes.alertaEstoqueMinimo}
                    onChange={handleConfiguracaoChange}
                    min="1"
                    className="small-input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="estock-usuarios">
            <h2>Gerenciamento de Usuários</h2>

            <div className="estock-usuarios-form">
              <h3>{editandoUsuario ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
              <form onSubmit={editandoUsuario ? salvarEdicaoUsuario : adicionarUsuario}>
                <div className="estock-form-group compact">
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    value={editandoUsuario ? editandoUsuario.nome : novoUsuario.nome}
                    onChange={editandoUsuario ?
                      (e) => setEditandoUsuario({ ...editandoUsuario, nome: e.target.value }) :
                      handleUsuarioChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Cargo:</label>
                  <input
                    type="text"
                    name="cargo"
                    value={editandoUsuario ? editandoUsuario.cargo : novoUsuario.cargo}
                    onChange={editandoUsuario ?
                      (e) => setEditandoUsuario({ ...editandoUsuario, cargo: e.target.value }) :
                      handleUsuarioChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editandoUsuario ? editandoUsuario.email : novoUsuario.email}
                    onChange={editandoUsuario ?
                      (e) => setEditandoUsuario({ ...editandoUsuario, email: e.target.value }) :
                      handleUsuarioChange}
                    required
                  />
                </div>
                <div className="estock-form-group compact">
                  <label>Receber notificações por email:</label>
                  <div className="estock-checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="notificacoesEmail"
                      checked={editandoUsuario ? editandoUsuario.notificacoesEmail : novoUsuario.notificacoesEmail}
                      onChange={editandoUsuario ?
                        (e) => setEditandoUsuario({ ...editandoUsuario, notificacoesEmail: e.target.checked }) :
                        handleUsuarioChange}
                      className="estock-checkbox"
                      id="notificacoesUsuario"
                    />
                    <label htmlFor="notificacoesUsuario" className="estock-checkbox-label">
                      <span className="estock-checkbox-icon">
                        {(editandoUsuario ? editandoUsuario.notificacoesEmail : novoUsuario.notificacoesEmail) && <FaCheck />}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="form-button-spacing">
                  <div className="estock-form-buttons">
                    {editandoUsuario ? (
                      <>
                        <button type="submit" className="estock-salvar-btn">
                          <FaSave /> Salvar
                        </button>
                        <button type="button" className="estock-cancelar-btn" onClick={() => setEditandoUsuario(null)}>
                          <FaTimes /> Cancelar
                        </button>
                      </>
                    ) : (
                      <button type="submit" className="estock-adicionar-btn">
                        <FaPlus /> Adicionar Usuário
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="estock-usuarios-list">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="estock-usuario-card">
                  <div className="estock-usuario-info">
                    <h3>{usuario.nome}</h3>
                    <p>Cargo: {usuario.cargo}</p>
                    <p>Email: {usuario.email}</p>
                    <p>Notificações: {usuario.notificacoesEmail ? 'Ativadas' : 'Desativadas'}</p>
                  </div>
                  <div className="estock-usuario-acoes">
                    <button className="estock-editar-btn" onClick={() => editarUsuario(usuario)}>
                      <FaEdit /> Editar
                    </button>
                    <button className="estock-remover-btn-small" onClick={() => removerUsuario(usuario.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Estock;