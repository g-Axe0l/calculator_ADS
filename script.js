let expressao = "";

function add(valor) {
  expressao += valor;
  document.getElementById("display").value = expressao;
}

function limpar() {
  expressao = "";
  document.getElementById("display").value = "";
}

function calcular() {
  try {
    let resultado = resolverExpressao(expressao);
    document.getElementById("display").value = resultado;
    expressao = resultado.toString();
  } catch {
    document.getElementById("display").value = "Erro";
    expressao = "";
  }
}

function resolverExpressao(expr) {
  let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      let a = parseFloat(tokens[i - 1]);
      let b = parseFloat(tokens[i + 1]);

      let res = tokens[i] === "*" ? a * b : a / b;

      tokens.splice(i - 1, 3, res.toString());
      i--;
    }
  }

  let resultado = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    let op = tokens[i];
    let num = parseFloat(tokens[i + 1]);

    if (op === "+") resultado += num;
    if (op === "-") resultado -= num;
  }

  return resultado;
}