const axios = require("axios");
const sha1 = require("js-sha1");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

async function load() {
  const response = await axios
    .create()
    .get(
      "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=92ecd291671200ba5a9afa7b3c6e8b3f04505019"
    );

  const { cifrado } = response.data;

  let decifrado = "";

  [...cifrado].forEach((letra) => {
    if (alphabet.includes(letra))
      if (alphabet.indexOf(letra) >= 9)
        decifrado = decifrado.concat(alphabet[alphabet.indexOf(letra) - 9]);
      else decifrado = decifrado.concat(alphabet[alphabet.indexOf(letra) + 17]);
    else decifrado = decifrado.concat(letra);
  });

  const resumo = sha1(decifrado);

  const newResponse = {
    ...response.data,
    decifrado,
    resumo_criptografico: resumo,
  };

  console.log(newResponse);

  return newResponse;
}

const result = load();

module.exports = result;
