import axios from "axios"


const API_URL = "https://psidly-api.thiago-fontoura120.workers.dev/api";

export async function postLogin(email, senha){
    try {

        const response = await axios.post(`${API_URL}/auth/login`,{
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
        const response = await axios.post(`${API_URL}/auth/forgot-password`, {
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
        const response = await axios.post(`${API_URL}/auth/verify-reset-code`, {
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

        const response = await axios.post(`${API_URL}/auth/reset-password`, {
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


export async function postCadastro(crp, nome, email, dataNasc, senha, senhaConfirmada, convs) {
    try {

        console.log(crp)
        const response = await axios.post(`${API_URL}/auth/register`, {
            crp: crp,
            name: nome,              
            email: email,
            birthDate: dataNasc,     
            password: senha,         
            confirmPassword: senhaConfirmada,  
            insurances: convs
        })

        console.log(response.data)


        
        return response.data;
    } catch (err) {
        console.log("ERRO COMPLETO:");
        console.log(err);

        console.log("RESPONSE:");
        console.log(err.response);

        console.log("DATA:");
        console.log(err.response?.data);

        console.log("MESSAGE:");
        console.log(err.message);

        throw err;
    }
}

export async function editPsi(name, email, crp, birthDate) {
    try {
        const token = localStorage.getItem("token")
        console.log(name)
        const response = await axios.put(`${API_URL}/auth/update-user`,{

                name: name,
                email: email,
                crp: crp,
                birthDate: birthDate
            
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
    
}

export async function createPatient(
    nome,
    cpf,
    email,
    senha,
    telefone,
    dataNasc,
    convenio,
    fotoBase64
) {
    try {
        const idPsi = localStorage.getItem("id")
        const token = localStorage.getItem("token")

        const response = await axios.post(
            `${API_URL}/patients/create-patient`,
            {
                name: nome,
                email: email,
                cpf: cpf,
                birthDate: dataNasc,
                insurance: convenio,
                phoneNumber: telefone,
                password: senha,
                PsychologistId: idPsi,
                photo: fotoBase64
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }
        )

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function editPatient(id, nome, cpf, email, dataNasc, convenio, foto) {
    try {
        const idPsi = localStorage.getItem("id")
        const token = localStorage.getItem("token")

        // GARANTIA DA DATA: Se 'dataNasc' vier como objeto Date ou String longa, 
        // convertemos para o formato YYYY-MM-DD exigido pelo DateOnly do .NET
        const dataFormatada = dataNasc
            ? dataNasc.includes('/')
                ? dataNasc.split('/').reverse().join('-')  // dd/mm/aaaa → aaaa-mm-dd
                : dataNasc  // já está no formato correto
            : null;

        const response = await axios.put(`${API_URL}/patients/${id}`, {
            name: nome,
            email: email,
            cpf: cpf,
            birthDate: dataFormatada, // Envia a data tratada aqui
            insurance: convenio,
            photo: foto
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function deletePatient(id){
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/patients/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function listPatient(idPsi){
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/patients/list-patients`, {
            params: {
                PsychologistId: idPsi
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data     
    } catch (err) {
        console.log(err)
        throw err
    }
}


export async function searchPatient(name) {
    try {
        const idPsi = localStorage.getItem("id")
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/patients/find-pat-by-name`, {
            params:{
                PsychologistId: idPsi,
                name: name
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function listOcultPat(){
    try {
        const idPsi = localStorage.getItem("id")
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/patients/list-ocult`, {
            params:{
                PsychologistId: idPsi
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function ocultPat(id){
    try {
        const token = localStorage.getItem("token")
        const response = await axios.patch(`${API_URL}/patients/ocult/${id}`, null ,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function activePat(id){
    try {
        const token = localStorage.getItem("token")
        const response = await axios.patch(`${API_URL}/patients/active/${id}`, null ,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function findPatById(id) {
    const token = localStorage.getItem("token")
    try{
        const response = await axios.get(`${API_URL}/patients/patient-infos`, {
            params: { id: id },
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function findPsi(patId) {
    const token = localStorage.getItem("token")

    try {
        const response = await axios.get(`${API_URL}/patients/get-psicologo/${patId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function createAvaliation(id, alegria, tristeza, raiva, ansiedade, estresse, obsPat, date, hour) {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`${API_URL}/avaliation/create-avaliation`, {
            PatientId: id,
            Alegria: alegria,
            Tristeza: tristeza,
            Raiva: raiva,
            Estresse: ansiedade,
            Ansiedade: estresse,
            ObsPaciente: obsPat,
            Date: date,
            Hour: hour
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(err) {
        console.log(err)
    }
}

export async function findAvaliation(date, patId){
    try {
        const response = await axios.get(`${API_URL}/avaliation/find?date=${date}&patientId=${patId}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function commentPsicologo(idAvaliation, obsPsi){
    const token = localStorage.getItem("token")
    try {

        const response = await axios.patch(`${API_URL}/avaliation/comment/${idAvaliation}`, {
            obsPsicologo: obsPsi
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) 

        return response.data
    } catch (err) {
        
    }
}

export async function postSenhaExcluir(email, senhaExcluir){
    try {
        const response = await axios.delete(`${API_URL}/auth/delete-account`, {
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

export async function listAvaliations(patientId, startDate, endDate) {
    try {
        const response = await axios.get(`${API_URL}/avaliation/list`, {
            params: {
                patientId,
                startDate,
                endDate
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}