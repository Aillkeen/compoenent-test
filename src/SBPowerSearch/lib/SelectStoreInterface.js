
class SelectStoreInterface {

  lista = [];

  loading;

  query;

  constructor() {
    this._onPowerSearch = this._onPowerSearch.bind(this);
  }

  _onPowerSearch(query, key, label) {
    throw new Error(
      'Implemente o método para realizar a busca. O atributo lista deve conter os valores que serão apresentados como options'
    );
  }
}

export default SelectStoreInterface;
