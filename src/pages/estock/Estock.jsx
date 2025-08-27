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
  FaCheck
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
    capacidade: 0
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
    mes: Array(30).fill().map((_, i) => ({ dia: i+1, valor: Math.floor(Math.random() * 500) })),
    ano: Array(12).fill().map((_, i) => ({ mes: i+1, valor: Math.floor(Math.random() * 3000) }))
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
      { 
        id: 1, 
        nome: 'Vinho Bordô Suave Tradição 1L', 
        quantidade: 25, 
        shots: 20,
        validade: '2024-12-31', 
        imagem: '/images/vinho-tinto.png',
        fornecedorId: 1,
        capacidade: 1000
      },
      { 
        id: 2, 
        nome: 'Whisky Jack Daniels N. 7 1L', 
        quantidade: 15, 
        shots: 20,
        validade: '2025-11-15', 
        imagem: '/images/whisky.png',
        fornecedorId: 1,
        capacidade: 1000
      },
      { 
        id: 3, 
        nome: 'Cerveja Heineken Long Neck 330ML', 
        quantidade: 50, 
        shots: 1,
        validade: '2023-10-30', 
        imagem: '/images/cerveja.png',
        fornecedorId: 2,
        capacidade: 330
      },
      { 
        id: 4, 
        nome: 'Vodka Smirnoff 998ml', 
        quantidade: 18, 
        shots: 20,
        validade: '2024-08-20', 
        imagem: '/images/vodka.png',
        fornecedorId: 1,
        capacidade: 998
      },
      { 
        id: 5, 
        nome: 'Gin Rock\'s Strawberry 700ml', 
        quantidade: 12, 
        shots: 14,
        validade: '2024-05-15', 
        imagem: '/images/gin.png',
        fornecedorId: 2,
        capacidade: 700
      }
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
      }
    ];
    setFornecedores(fornecedoresIniciais);

    const usuariosIniciais = [
      {
        id: 1,
        nome: 'João Alberto',
        cargo: 'Administrador',
        email: 'joao@empresa.com',
        notificacoesEmail: true
      },
      {
        id: 2,
        nome: 'Maria Silva',
        cargo: 'Estoquista',
        email: 'maria@empresa.com',
        notificacoesEmail: false
      }
    ];
    setUsuarios(usuariosIniciais);
  }, []);

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
    setNovoProduto({
      ...novoProduto,
      [name]: value
    });
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

  const calcularShots = (capacidade) => {
    return Math.floor(capacidade / 50);
  };

  const adicionarProduto = (e) => {
    e.preventDefault();
    const shotsCalculados = calcularShots(novoProduto.capacidade);
    const produto = {
      id: produtos.length + 1,
      nome: novoProduto.nome,
      quantidade: parseInt(novoProduto.quantidade),
      shots: shotsCalculados,
      validade: novoProduto.validade,
      imagem: previewImagem,
      fornecedorId: novoProduto.fornecedorId,
      capacidade: parseInt(novoProduto.capacidade)
    };
    setProdutos([...produtos, produto]);
    setNovoProduto({
      nome: '',
      quantidade: 0,
      shots: 0,
      validade: '',
      imagem: null,
      fornecedorId: '',
      capacidade: 0
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
    setEditandoFornecedor({...fornecedor});
  };

  const salvarEdicaoFornecedor = () => {
    setFornecedores(fornecedores.map(f => 
      f.id === editandoFornecedor.id ? editandoFornecedor : f
    ));
    setEditandoFornecedor(null);
  };

  const editarUsuario = (usuario) => {
    setEditandoUsuario({...usuario});
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
                <p className="estock-user-name">João Alberto</p>
                <p className="estock-user-role">Administrador</p>
              </div>
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
                  <label>Shots calculados:</label>
                  <input 
                    type="text" 
                    value={calcularShots(novoProduto.capacidade)}
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
                    className="white-select"
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
                        <label>Shots:</label>
                        <input 
                          type="number" 
                          value={produto.shots} 
                          onChange={(e) => atualizarShots(produto.id, e.target.value)}
                          min="0"
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
                      (e) => setEditandoFornecedor({...editandoFornecedor, nome: e.target.value}) : 
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
                      (e) => setEditandoFornecedor({...editandoFornecedor, contato: e.target.value}) : 
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
                      (e) => setEditandoFornecedor({...editandoFornecedor, email: e.target.value}) : 
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
                      (e) => setEditandoFornecedor({...editandoFornecedor, telefone: e.target.value}) : 
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
                <div key={fornecedor.id} className= "estock-fornecedor-card">
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
                      (e) => setEditandoUsuario({...editandoUsuario, nome: e.target.value}) : 
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
                      (e) => setEditandoUsuario({...editandoUsuario, cargo: e.target.value}) : 
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
                      (e) => setEditandoUsuario({...editandoUsuario, email: e.target.value}) : 
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
                        (e) => setEditandoUsuario({...editandoUsuario, notificacoesEmail: e.target.checked}) : 
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