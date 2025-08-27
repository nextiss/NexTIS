import React from 'react';

const ComandaTab = ({ pedidos, onPedidoPronto, onLogout }) => {
  const pedidosPreparando = pedidos.filter(pedido => pedido.status === 'preparando');
  const pedidosProntos = pedidos.filter(pedido => pedido.status === 'pronto');

  return (
    <div className="tab-content comanda-tab">
      <div className="comanda-header">
        <h2>Gerenciar Comandas</h2>
        <button onClick={onLogout} className="btn-logout">Sair</button>
      </div>
      <div className="comanda-container">
        <div className="comanda-coluna">
          <h3>Pedidos em Preparo</h3>
          {pedidosPreparando.length === 0 ? (
            <p>Nenhum pedido em preparo</p>
          ) : (
            <div className="pedidos-grid">
              {pedidosPreparando.map((pedido, index) => (
                <div key={index} className="pedido-card">
                  <div className="pedido-header">
                    <span className="pedido-codigo">#{pedido.codigo}</span>
                    <span className="pedido-hora">{pedido.horaPedido}</span>
                  </div>
                  <div className="pedido-cliente">
                    <strong>{pedido.cliente}</strong>
                    {pedido.email && <span>{pedido.email}</span>}
                  </div>
                  <ul className="pedido-itens">
                    {pedido.itens.map((item, i) => (
                      <li key={i}>
                        <span>{item.nome}</span>
                        <span>R$ {item.preco.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pedido-footer">
                    <span>Total: R$ {pedido.total.toFixed(2)}</span>
                    <span>{pedido.pagamento}</span>
                  </div>
                  <button onClick={() => onPedidoPronto(pedido.codigo)} className="btn-pronto">
                    Pedido Pronto
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="comanda-coluna">
          <h3>Pedidos Prontos</h3>
          {pedidosProntos.length === 0 ? (
            <p>Nenhum pedido pronto</p>
          ) : (
            <div className="pedidos-grid">
              {pedidosProntos.map((pedido, index) => (
                <div key={index} className="pedido-card pronto">
                  <div className="pedido-header">
                    <span className="pedido-codigo">#{pedido.codigo}</span>
                    <span className="pedido-hora">{pedido.horaPedido}</span>
                  </div>
                  <div className="pedido-cliente">
                    <strong>{pedido.cliente}</strong>
                    {pedido.email && <span>{pedido.email}</span>}
                  </div>
                  <ul className="pedido-itens">
                    {pedido.itens.map((item, i) => (
                      <li key={i}>
                        <span>{item.nome}</span>
                        <span>R$ {item.preco.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pedido-footer">
                    <span>Total: R$ {pedido.total.toFixed(2)}</span>
                    <span>{pedido.pagamento}</span>
                  </div>
                  <div className="pedido-status">
                    <span className="status pronto">PRONTO</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComandaTab;
