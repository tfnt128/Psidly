import axios from "axios"

const API_URL = "https://psidly-api-env-env.eba-jiwtkzde.us-east-2.elasticbeanstalk.com/api";

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
        const response = await axios.post(`${API_URL}/auth/register`, {
            crp: crp,
            name: nome,              
            email: email,
            birthDate: dataNasc,     
            password: senha,         
            confirmPassword: senhaConfirmada,  
            insurances: convs
        })


        
        return response.data;
    } catch (err) {
        console.log(err);  //debug
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
        const response = await axios.put(`${API_URL}/patients/${id}`, {
            name: nome,
            email: email,
            cpf: cpf,
            birthDate: dataNasc,
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

export async function createAvaliation(id, alegria, tristeza, raiva, estresse, ansiedade, obsPat, date, hour) {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`${API_URL}/avaliation/create-avaliation`, {
            PatientId: id,
            Alegria: alegria,
            Tristeza: tristeza,
            Raiva: raiva,
            Estresse: estresse,
            Ansiedade: ansiedade,
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