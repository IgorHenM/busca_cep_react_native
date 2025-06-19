import axios from "axios";

export async function getCepInformation(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}