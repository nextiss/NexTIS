import React, { useState } from 'react';
import pagseguroIcon from '../../../public/images/pagseguro.png';

const CardapioTab = ({ onAdicionarPedido, pedidoPronto, pedidos, pedidosEmPreparo }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [pagamento, setPagamento] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [currentPedido, setCurrentPedido] = useState(null);
  
  const cardapio = [ 
    {id: 1, nome: 'Vinho Bordô Suave Tradição 1L', descricao: 'Vinho tinto suave da linha Tradição', preco: 45.90, precoDose: 12.90, categoria: "Bebidas", imagem: '/images/vinho-tinto.png'},
    {id: 2, nome: 'Whisky Jack Daniels N. 7 1L', descricao: 'Whisky Tennessee premium', preco: 189.90, precoDose: 25.90, categoria: "Bebidas", imagem: '/images/whisky.png'},
    {id: 3, nome: 'Cerveja Heineken Long Neck 330ML', descricao: 'Cerveja pilsen premium importada', preco: 12.90, categoria: "Bebidas", imagem: '/images/cerveja.png'},
    {id: 4, nome: 'Vodka Smirnoff 998ml', descricao: 'Vodka premium destilada', preco: 59.90, precoDose: 15.90, categoria: "Bebidas", imagem: '/images/vodka.png'}
  ];

  const adicionarAoCarrinho = (item, tipo) => {
    if (item.id === 3) {
      const nomeComTipo = `${item.nome} (Garrafa)`;
      setCarrinho([...carrinho, {...item, nome: nomeComTipo, preco: item.preco, tipo: 'garrafa'}]);
    } else {
      const preco = tipo === 'dose' ? item.precoDose : item.preco;
      const nomeComTipo = `${item.nome} (${tipo === 'dose' ? 'Dose' : 'Garrafa'})`;
      setCarrinho([...carrinho, {...item, nome: nomeComTipo, preco, tipo}]);
    }
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0 || !pagamento || !nomeCliente) return;
    
    const codigo = Math.floor(1000 + Math.random() * 9000);
    const novoPedido = {
      codigo,
      itens: [...carrinho],
      total: carrinho.reduce((sum, item) => sum + item.preco, 0),
      status: 'preparando',
      pagamento,
      cliente: nomeCliente,
      email: emailCliente,
      timestamp: new Date().getTime()
    };
    
    setCurrentPedido(novoPedido);
    onAdicionarPedido(novoPedido);
    setCarrinho([]);
    setPagamento('');
  };

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  const pedidoAtivo = pedidoPronto 
    ? pedidos.find(p => p.codigo === pedidoPronto) 
    : currentPedido;

  return (
    <div className="tab-content">
      {pedidoAtivo && (
        <div className={`nota-fiscal ${pedidoAtivo.status === 'pronto' ? 'pronto piscando' : ''}`}>
          <h3>Nota Fiscal Digital - Pedido #{pedidoAtivo.codigo}</h3>
          <div className="info-cliente">
            <p><strong>Cliente:</strong> {pedidoAtivo.cliente}</p>
            <p><strong>E-mail:</strong> {pedidoAtivo.email || 'Não informado'}</p>
            <p><strong>Pagamento:</strong> PagSeguro</p>
            <p><strong>Status:</strong> {pedidoAtivo.status === 'pronto' ? 'PRONTO' : 'Em preparo'}</p>
          </div>
          <div className="nota-itens">
            <h4>Itens do Pedido:</h4>
            <ul>
              {pedidoAtivo.itens.map((item, index) => (
                <li key={index}>
                  {item.nome} - R$ {item.preco.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="nota-total"><strong>Total: R$ {pedidoAtivo.total.toFixed(2)}</strong></p>
          </div>
          <div className={`nota-aviso ${pedidoAtivo.status}`}>
            {pedidoAtivo.status === 'pronto' 
              ? 'Seu pedido está pronto! Dirija-se ao balcão.' 
              : 'Seu pedido está sendo preparado!'}
          </div>
        </div>
      )}

      <h2>Cardápio de Bebidas</h2>
      <div className="cardapio-container">
        <div className="itens-cardapio">
          <div className="bebidas-grid">
            {cardapio.map((item) => (
              <div key={item.id} className="bebida-card">
                <img src={item.imagem} alt={item.nome} className="bebida-imagem" />
                <div className="bebida-info">
                  <span className="bebida-nome">{item.nome}</span>
                  <span className="bebida-descricao">{item.descricao}</span>
                  <div className="bebida-precos">
                    {item.id !== 3 ? (
                      <>
                        <span>Dose: R$ {item.precoDose.toFixed(2)}</span>
                        <span>Garrafa: R$ {item.preco.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>Garrafa: R$ {item.preco.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <div className="bebida-actions">
                  {item.id !== 3 ? (
                    <>
                      <button onClick={() => adicionarAoCarrinho(item, 'dose')} className="btn-adicionar">+ Dose</button>
                      <button onClick={() => adicionarAoCarrinho(item, 'garrafa')} className="btn-adicionar">+ Garrafa</button>
                    </>
                  ) : (
                    <button onClick={() => adicionarAoCarrinho(item, 'garrafa')} className="btn-adicionar">+ Garrafa</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="carrinho">
          <h3>Seu Pedido</h3>
          <div className="dados-cliente">
            <div className="form-group">
              <label>Nome do Cliente *</label>
              <input type="text" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="Seu nome" required />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} placeholder="Seu e-mail" className="email-input" />
            </div>
          </div>
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            <>
              <ul className="itens-carrinho">
                {carrinho.map((item, index) => (
                  <li key={index}>
                    <span>{item.nome}</span>
                    <span>R$ {item.preco.toFixed(2)}</span>
                    <button onClick={() => removerDoCarrinho(index)} className="btn-remover">-</button>
                  </li>
                ))}
              </ul>
              <div className="total">
                <strong>Total: R$ {total.toFixed(2)}</strong>
              </div>
              <div className="pagamento">
                <label>
                  <input type="radio" name="pagamento" value="pagseguro" checked={pagamento === 'pagseguro'} onChange={() => setPagamento('pagseguro')} />
                  <img src={pagseguroIcon} alt="PagSeguro" className="pagamento-icon" /> PagSeguro
                </label>
              </div>
              <button onClick={finalizarPedido} className="btn-finalizar" disabled={!pagamento || !nomeCliente}>
                Finalizar Pedido com PagSeguro
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardapioTab;
