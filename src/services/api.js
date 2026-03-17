import axios from "axios"

const API_URL = "http://psidly-api-env-env.eba-jiwtkzde.us-east-2.elasticbeanstalk.com/api/auth";

export async function postLogin(email, senha){
    try {

        const response = await axios.post(`${API_URL}/login`,{
            email:email,
            password:senha
        })

        return response.data;
    } catch (err) {
        console.log(err)    
    }
}

export async function postEmailEsqueciSenha(email) {
    console.log(" postEmailEsqueciSenha chamado com:", email);
    
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, {
            email: email
        })

        console.log(" Resposta da API:", response.data);
        return response.data;
    } catch (err) {
        console.log(" Erro na requisição:", err);
        console.log("Detalhes:", err.response?.data);
        throw err;
    }
}

export async function postCodigoEsqueciSenha(email, codigo) {
    try {
        const response = await axios.post(`${API_URL}/verify-reset-code`, {
            email: email,
            code: codigo
        })
        console.log(response.data)


        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function postConfirmarSenha(email, codigo, senha, senhaConfirmada) {
    try {
        console.log("📦 ENVIANDO PRO C#:", { email: email, code: codigo, newPassword: senha, confirmPassword: senhaConfirmada });

        console.log(senha);
        console.log(senhaConfirmada);
        const response = await axios.post(`${API_URL}/reset-password`, {
            email: email,
            code: codigo,
            newPassword: senha,
            confirmPassword: senhaConfirmada
        }); 

        console.log(response.data);  //debug
        alert(response.data.message)  //debug

        return response.data.success;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export async function postCadastro(crp, nome, email, dataNasc, senha, senhaConfirmada) {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            crp: crp,
            name: nome,              
            email: email,
            birthDate: dataNasc,     
            password: senha,         
            confirmPassword: senhaConfirmada  
        })

        if(response.data.success == false){
            alert(response.data.message);  //debug
        }
        
        return response.data.success;
    } catch (err) {
        console.log(err);  //debug
        throw err;  
    }
}

export async function getNomeProfile(email){
    try {
        const response = await axios.get(`${API_URL}/profile?email=${email}`);
        return response.data.nome;
    } catch (err) {
        console.log(err);
    }
}

export async function getEmailProfile(email){
    try {
        const response = await axios.get(`${API_URL}/profile?email=${email}`);
        return response.data.email;
    } catch (err) {
        console.log(err);
    }
}


export async function postSenhaExcluir(email, senhaExcluir){
    try {
        const response = await axios.delete(`${API_URL}/delete-account`, {
            data: {
                email: email,
                password: senhaExcluir
            }
        })

        alert(response.data.message);
        
        if(response.data.success){
            localStorage.clear();
        }
        
        return response.data.success;
    } catch (err) {
        console.log(err);
        alert("Erro ao excluir conta");
        throw err;
    }
}
