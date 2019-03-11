class PowerSearchStore {

  filterParameters = [];


  currentFilter = [];


  valueList = [];

  columns = [];

  constructor(columns) {
    this.columns = columns;
  }


  removeFilter(value) {
    this.currentFilter.replace(this.currentFilter.filter(val => val.text !== value));
    this.filterParameters.replace(this.filterParameters.filter(val => val.toString() !== value));
  }

  //<currentFilter operators>

  setCurrentFilter(arrayValue) {
    this.currentFilter.replace(arrayValue);
  }


  pushCurrentFilter(value) {
    this.currentFilter.push(value);
  }

  //</currentFilter operators>

  //<valueList operators>

  setValueList(arrayValue) {
    this.valueList.replace(arrayValue);
  }


  pushValueList(value) {
    this.valueList.push(value);
  }

  //</valueList operators>

  //<filterParameters operators>

  setFilterParameters(arrayValue) {
    this.filterParameters.replace(arrayValue);
  }


  pushFilterParameters(value) {
    this.filterParameters.push(value);
  }

  //</filterParameters operators>

  get concatArrays() {
    if (this.filterParameters.length > 0) {
      const result = this.filterParameters.map(item => {
        return item.toString();
      });

      return result.concat(this.currentFilter.map(item => item.text));
    }

    return this.filterParameters
      .map(item => {
        return item.toString();
      })
      .concat(this.currentFilter.map(item => item.text));
  }
}

export default PowerSearchStore;
