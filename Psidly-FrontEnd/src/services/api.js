import axios from "axios"

const API_URL = "";

export async function postLogin(email, senha){
    try {

        const response = await axios.post(`${API_URL}`,{
            email:email,
            senha:senha
        })
        
        return response.data;
    } catch (err) {
        console.log(err)    
    }
}

export async function postEmailEsqueciSenha(email){
    try {
        const response = axios.post(`${API_URL}`, {
            email:email
        })

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function postCodigoEsqueciSenha(codigo){
    try {
        
        const response = await axios.post(`${API_URL}`, {
            codigo:codigo
        })

        return response.data;

    } catch (err) {
        console.log(err);
    }
}

export async function postConfirmarSenha(senha, senhaConfirmada){
    try {
        
        const response = await axios.post(senha, senhaConfirmada); 
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

export async function postCadastro(crp, nome, email, dataNasc, senha, senhaConfirmada) {
    try {
        const response = axios.post(`${API_URL}`, {
            crp:crp,
            nome:nome,
            email:email,
            dataNasc: dataNasc,
            senha: senha,
            senhaConfirmada: senhaConfirmada
        })

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getNomeProfile(){
    try {
        const response = await axios.get(`${API_URL}`);

        return response.data.nome;
    } catch (err) {
        console.log(err);
    }
}

export async function getEmailProfile(){
    try {
        const response = await axios.get(`${API_URL}`);

        return response.data.email;
    } catch (err) {
        console.log(err);
    }
}
