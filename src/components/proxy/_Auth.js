import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para a rota
 */
class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderChildren() {
    return <div>{this.props.children}</div>;
  }

  _renderReadOnly() {
    return (
      <div>
        <div className="sv-messagebox warning">
          <header>
            <h6>Esse registro esta disponível apenas para visualização.</h6>
          </header>
        </div>
        {this.props.children}
      </div>
    );
  }

  _renderNoAuth() {
    return (
      <div className="sv-text-center">
        <h3>Acesso negado.</h3>
      </div>
    );
  }

  _renderNoValidatedLicense(msg) {
    return (
      <div className="sv-text-center">
        <h3>{msg}</h3>
      </div>
    );
  }

  _renderNoRoute() {
    return (
      <div className="sv-text-center">
        <h3>Página não encontrada.</h3>
      </div>
    );
  }

  render() {
    // let canAcess, baseUrl;
    // let url = this.context.router.route.location.pathname;

    // // validacao de licenciamento REINF
    // if (!AppStore.get('licenciamentoReinf').licenciamentoValido) {
    //   return this._renderNoValidatedLicense(AppStore.get('licenciamentoReinf').observacao);
    // }

    // // a home sempre é permitida
    // if (url === '/synbase') return this._renderChildren();

    // baseUrl = `/synbase/${url.split('/')[2]}`;

    // //Remove this line if you uncooment the code above
    // return this._renderChildren();

    // //
    // // Uncomment this part with you need to check if the user has access to the route
    // //
    // // canAcess = AppStore.permiteAcessoByUrl(baseUrl);
    // // verifica se possuí acesso a página
    // // if (canAcess) {
    // //   // verifica se esta inserindo um registro novo
    // //   if (url.includes('/novo')) {
    // //     return AppStore.permiteIncluirByUrl(baseUrl) ? this._renderChildren() : this._renderNoAuth();
    // //   } else if (url.includes('/editar/')) {
    // //     // verifica se esta editando o registro, obs.: nesse cenário mesmo sem permissão ele pode visualizar o conteudo
    // //     return AppStore.permiteAlterarByUrl(baseUrl) ? this._renderChildren() : this._renderReadOnly();
    // //   }
    // //   return this._renderChildren();
    // // } else if (canAcess === undefined) {
    // //   // quando não foi encontrada a rota
    // //   return this._renderNoRoute();
    // // } else {
    // //   // sem permissão de acesso para a rota
    // //   return this._renderNoAuth();
    // // }

    return this._renderChildren();
  }
}

Auth.displayName = 'Auth';

Auth.propTypes = {
  children: PropTypes.any.isRequired,
};

Auth.contextTypes = {
  router: PropTypes.object,
};

export default Auth;
