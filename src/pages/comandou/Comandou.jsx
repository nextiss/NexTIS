import React, { useState } from 'react';
import './Comandou.css';
import Header from '../../components/header/Header';
import TabNavigation from '../../components/tabnavigation/TabNavigation';
import ComandaTab from '../../components/comandatab/ComandaTab';
import CardapioTab from '../../components/cardapiotab/CardapioTab';
import LoginComanda from '../../components/logincomanda/LoginComanda';
import logo from '../../../public/images/logo-comandou.png';

function Comandou() {
  const [activeTab, setActiveTab] = useState('cardapio');
  const [pedidos, setPedidos] = useState([]);
  const [pedidoPronto, setPedidoPronto] = useState(null);
  const [pedidosEmPreparo, setPedidosEmPreparo] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const adicionarPedido = (novoPedido) => {
    const pedidoComStatus = { 
      ...novoPedido, 
      status: 'preparando',
      horaPedido: new Date().toLocaleTimeString(),
    };
    setPedidos([...pedidos, pedidoComStatus]);
    setPedidosEmPreparo([...pedidosEmPreparo, pedidoComStatus.codigo]);
    window.scrollTo(0, 0);
  };

  const marcarComoPronto = (codigoPedido) => {
    setPedidos(pedidos.map(pedido => 
      pedido.codigo === codigoPedido ? {...pedido, status: 'pronto'} : pedido
    ));
    setPedidosEmPreparo(pedidosEmPreparo.filter(codigo => codigo !== codigoPedido));
    setPedidoPronto(codigoPedido);
    setTimeout(() => setPedidoPronto(null), 120000); 
  };

  return (
    <div className="comandou">
      <Header logo={logo} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'comanda' && !isAuthenticated ? 
          <LoginComanda onLogin={handleLogin} /> : 
          activeTab === 'comanda' ? 
          <ComandaTab 
            pedidos={pedidos} 
            onPedidoPronto={marcarComoPronto}
            onLogout={handleLogout}
          /> : 
          <CardapioTab 
            onAdicionarPedido={adicionarPedido} 
            pedidoPronto={pedidoPronto}
            pedidos={pedidos}
            pedidosEmPreparo={pedidosEmPreparo}
          />
        }
      </main>
      
      <footer className="footer">
        <img src={logo} alt="Comandou" className="footer-logo" />
        <p>© 2025 Comandou - Comanda Virtual + Cardápio</p>
        <div className="contact-info">
          <span>(11) 0002-8922</span>
          <span>nextiscontato@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}

export default Comandou;
