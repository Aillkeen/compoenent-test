# PowerSearch

PowerSearch é um componente de busca avançada desenvolvido para facilitar a filtragem de dados a partir de *user friendly inputs*.

## **Como usar**
Para utilizar o componente siga as instruções abaixo.

---

### **No Domain**
Deve ser implementado o método que retorna um array com as colunas que devem entrar no escopo de pesquisa.

```js
static getSearchAttributes() {
    return [...searchableColumns]
};
```
As *Searchable Columns*, que compõem o array retornado por `getSearchAttributes()`, devem obrigatóriamente conter os seguintes campos:
 * value: *nome do atributo do domain que o objeto referencia*
 * text: *nome user friendly do atributo*
 * type: *tipo de input busca do campo* **SBSearchType** 

 > Cada **SBSearchType** tem seus respectivos campos opcionais

---
### **No IndexStore**

O `getSearchAttributes()` do Domain em questão, deve ser inserido no construtor do store da view.

```js
class IndexStore extends IndexBase {
  constructor() {
    super(IndexStore, Domains.getAttributesTable,Domains.getSearchAttributes());
  }
}
```
---
### **Na IndexView**

Importe o componente e insira ele no JSX passando o IndexStore como prop.
```html
<SBPowerSearch store={this.store}/>
```
---
## Outras props opcionais
* **columns**: Array de searchable attributes, caso seja necessária uma relação de colunas diferetes da especificada no getSearchAttributes do Domain;

* **fixedFilter**: Atributo para ser sempre inserido como um dos parâmetros da pesquisa.

## **SBSearchType**

O tipo do atributo de pesquisa irá definir o que o PowerSearch espera de input, além das operações possíveis

Os tipos reconhecidos pelo **SBSearchType** são:

### Text 
 Textos como descrições, nomes de pessoas e ruas.

#### Atributos do *Searchable Column*
```js
{ 
  value: 'column', 
  text: 'Coluna', 
  type: SBSearchType.TEXT 
}

```
> **Operações disponíveis**
> *  Igual a
> *  Diferente de
> *  Contém

---

### Enum
 Uma quantidade fixa de valores estáticos
#### Atributos do *Searchable Column*
```js
{ 
  value: 'column', 
  text: 'Coluna', 
  options: [
    { value: 'OPCAO_1', text: 'Opção 1' },
    { value: 'OPCAO_2', text: 'Opção 2' },
  ],
  type: SBSearchType.ENUM 
}

```
> **Operações disponíveis**
> *  Igual a
> *  Diferente de

---

### PowerSelect
 O PowerSearch irá fornecer um autocomplete, essa opção deve referenciar atributos que sejam únicos na base de dados
#### Atributos do *Searchable Column*
```js
{ 
  value: 'column',
  text: 'Coluna',
  type: SBSearchType.POWER_SELECT,
  powerSelectProps: {
    domain: ColunaDomain,
    service: ColunaService,
    options: { sort: 'COLUMN,asc' },
    attributes: ['column']
  }, 
}
```
> **Operações disponíveis**
> *  Igual a
> *  Diferente de
> *  Entre
> *  No mês de

---

### Number
 Valores numéricos
#### Atributos do *Searchable Column*
```js
{ 
  value: 'column',
  text: 'Coluna',
  type: SBSearchType.NUMBER,
}
```
> **Operações disponíveis**
> *  Igual a
> *  Diferente de
> *  Maior que
> *  Maior ou igual que
> *  Menor que
> *  Menor ou igual que
> *  Entre

---

### Date
 O PowerSearch irá fornecer um datepicker para o usuário informar uma data
#### Atributos do *Searchable Column*
```js
{ 
  value: 'column',
  text: 'Coluna',
  type: SBSearchType.DATE,
}
```
> **Operações disponíveis**
> *  Igual a
> *  Diferente de
> *  Maior que
> *  Maior ou igual que
> *  Menor que
> *  Menor ou igual que
> *  Entre

---

### Month
 Semelhante ao Date, mas nesse caso, escolhe-se um mês inteiro no DatePicker
#### Atributos do *Searchable Column*
```js
{ 
  value: 'column',
  text: 'Coluna',
  type: SBSearchType.MONTH,
}
```
> **Operações disponíveis**
> *  No mês

---

## **Pesquisa Sensível ao Contexto**

É possível configurar o **PowerSearch** de uma determinada tela para ser sensível ao context selecionado.

### Como fazer
  
1. Identificar o atributo do domain em questão que tem relação com algum atributo do contexto;
2. Inserir o campo `context` no objeto Searchable Column do atributo em questão;
3. O atributo `context` deve receber uma string com o nome do campo que se deseja do contexto.

>ex: 
>``` js
>{ 
>   value: 'column',
>   context: 'periodoDefault',
>   text: 'Coluna',
>   type: SBSearchType.MONTH
> }
>```

---
