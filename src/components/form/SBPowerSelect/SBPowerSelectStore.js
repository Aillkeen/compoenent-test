import { observable, action, runInAction } from 'mobx';
import { showErrorApiNotification } from '~/utils/notification';
class SBPowerSelectStore {
  @observable
  lista = [];

  @observable
  loading;

  @observable
  query;

  @observable
  selectedObject;

  constructor(domain, service, options = {}, attributes = []) {
    this.domain = domain;
    this.service = service;
    this.options = options;
    //se os atributos para busca não for passado,
    //deve ser passado todos os atributos do dominio
    this.attributes = attributes.length == 0 ? this.domain.getAttributesTable() : attributes;
    this._onSearch = this._onSearch.bind(this);
    this._onPowerSearch = this._onPowerSearch.bind(this);
    this.updateSelectAttributeDecorator = this.updateSelectAttributeDecorator.bind(this);
  }

  @action
  _onSearch(query) {
    this.query = query;
    this.options['query'] = query;
    if (!query) {
      this.lista.replace([]);
      return;
    }

    this.loading = true;
    this.service
      .getBySearch(this.options, this.attributes)
      .then(result => {
        runInAction(`${this.domain} list load with success`, () => {
          this.loading = false;
          let content = result.data && result.data.content ? result.data.content : [];
          this.lista.replace(content);
        });
      })
      .catch(error => {
        runInAction(`Error on load ${this.domain} list`, () => {
          this.lista.replace([]);
          this.loading = false;
          showErrorApiNotification(`Não foi possível carregar o ${this.domain}`);
        });
      });
  }

  @action
  _onPowerSearch(query, key, label) {
    this.query = query;
    this.options['query'] = query;
    if (!query) {
      this.lista.replace([]);
      return;
    }

    this.loading = true;
    this.service
      .getBySearchFilter(this.attributes, this.filter, this.options)
      //.getBySearch(this.options, this.attributes)
      .then(result => {
        runInAction(`${this.domain} list load with success`, () => {
          this.loading = false;
          let content = result.data && result.data.content ? result.data.content : [];
          content = content.map(value => {
            return { value: value[key], text: value[label ? label : key], type: 'value' };
          });
          this.lista.replace(content);
        });
      })
      .catch(error => {
        runInAction(`Error on load ${this.domain} list`, () => {
          this.lista.replace([]);
          this.loading = false;
          showErrorApiNotification(`Não foi possível carregar o ${this.domain}`);
        });
      });
  }

  @action
  updateSelectAttributeDecorator(value, options, callback) {
    if (options) {
      this.selectedObject = this.lista.find(i => i[options.key] === value);
    } else {
      this.selectedObject = null;
    }
    if (callback) {
      callback(value, options, this.selectedObject);
    }
  }
}

export default SBPowerSelectStore;
