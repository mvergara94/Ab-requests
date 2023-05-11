const inputDeCEP = document.querySelector('#cep');
const rua = document.querySelector('#endereco');
const complemento = document.querySelector('#complemento');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');

inputDeCEP.addEventListener('focusout', () => {
  buscaEndereco(inputDeCEP.value);
});

async function buscaEndereco(numeroCEP) {
  var mensagemErro = document.querySelector('#erro');
  mensagemErro.innerHTML = '';
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${numeroCEP}/json`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error('CEP NAO EXISTE');
    }
    atribuirCampos(consultaCEPConvertida);
  } catch (erro) {
    mensagemErro.innerHTML = `<p> CEP INVALIDO. Tente Novamente</p>`;
    rua.value = '';
    complemento.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
  }
}

function atribuirCampos(data) {
  const rua = document.querySelector('#endereco');
  const complemento = document.querySelector('#complemento');
  const bairro = document.querySelector('#bairro');
  const cidade = document.querySelector('#cidade');
  const estado = document.querySelector('#estado');
  rua.value = data.logradouro;
  complemento.value = data.complemento;
  bairro.value = data.bairro;
  cidade.value = data.localidade;
  estado.value = data.uf;
}
