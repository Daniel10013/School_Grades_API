import { PATH_GRADES_DATABASE } from '../config/Config.js';
import { GradesModel } from '../model/GradesModel.js'
import { formatDate } from '../functions/Functions.js'

const require = ["student", "subject", "type", "value"];
const gradesModel = new GradesModel();

export async function addData(req, res){
    try{
        let data = req.body
        validateParams(require, data);
        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        data["timestamp"] = (formatDate(new Date()));
        data["id"] = await gradesModel.getNextId(PATH_GRADES_DATABASE);
        db["grades"].push(data);
        db["nextId"] = data["id"] + 1;
        await gradesModel.writeFile(PATH_GRADES_DATABASE, db, true)
        res.send({status: 200, msg: "Registro adicionado com sucesso"})
    }
    catch(err){
        res.send("Erro: " + err)
    }
}

export async function findData(req, res){
    try{
        let id = req.params.id;
        if(isNaN(id)){
            res.status(400);
            throw {err: "BAD REQUEST", msg: "Parametro invalido"}
        }
        //Return the searched data if it exists
        let data = await checkIfExist(id);
        res.send(data);
    }
    catch(err){
        res.send("Erro: " + err.err + '\n' + err.msg)
    }
}

export async function updateData(req, res){
    try{
        const fields = ["student", "subject", "type", "value"];
        let id = req.params.id;
        if(isNaN(id)){
            res.status(400);
            throw {err: "BAD REQUEST", msg: "Parametro invalido"}
        }
        let data = await checkIfExist(id);
        let dataToUpdate = req.body;

        let existFields = fields.filter(field => dataToUpdate.hasOwnProperty(field))

        for(let i = 0; i < existFields.length; i++){
            data[existFields[i]] = dataToUpdate[existFields[i]];
        }
        data["timestamp"] = (formatDate(new Date()));

        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        let indexToUpdate = db["grades"].findIndex((eachData) => eachData.id == id);

        db["grades"][indexToUpdate] = data;
        await gradesModel.writeFile(PATH_GRADES_DATABASE, db, true);

        res.send({status: 200, msg: "Registro atualizado com sucesso"});
    }
    catch(err){
        res.send("Erro: " + err.err + '\n' + err.msg)
    }
}

export async function deleteData(req, res){
    try{
        let id = req.params.id
        if(isNaN(id)){
            res.status(400);
            throw {err: "BAD REQUEST", msg: "Parametro invalido"}
        }
        await checkIfExist(id);
        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        let indexToDelete = db["grades"].findIndex((grade) => grade.id == id);
        db["grades"].splice(indexToDelete, 1)
        await gradesModel.writeFile(PATH_GRADES_DATABASE, db, true);

        res.send({status: 200, msg: "Registro Deletado com Sucesso"})
    }
    catch(err){
        res.send("Erro: " + err.err + '\n ' + err.msg)
    }
}

export async function getNotaTotalAluno(req, res){
    try{
        const require = ["student", "subject"];
        let data = req.body
        console.log(data)
        validateParams(require, data);

        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        let maior_nota = 0;
        db["grades"].map((eachData) =>{
            if(eachData.student == data.student && eachData.subject == data.subject){
                maior_nota += eachData.value
            }
        })

        res.send({note: maior_nota, msg: "A maior nota do aluno " + data.student + "na matéria " +  data.subject + " é " + maior_nota});
    }
    catch(err){
        res.send("Erro: " + err)
    }
}

export async function getMediasMateria(req, res){
    try{
        const require = ["student", "subject"];
        let data = req.body;
        validateParams(require, data);

        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        let media = 0;
        let total_materias = 0;
        db["grades"].map((eachData) =>{
            if(eachData.student == data.student && eachData.subject == data.subject){
                media += eachData.value;
                total_materias++;                
            }
        })

        media = media / total_materias;

        res.send({note: media, msg: "A média de nota do aluno " + data.student + "na matéria " +  data.subject + " é " + media});
    }
    catch(err){
        res.send("Erro: " + err)
    }
}

export async function getTresMaioresNotas(req, res){
    try{
        const require = ["subject"];
        let data = req.body;
        validateParams(require, data);

        let db = await gradesModel.getData(PATH_GRADES_DATABASE);
        let nota = {value: 0};
        let nota2 = {value: 0};
        let nota3 = {value: 0};
        db["grades"].map((eachData) =>{
            if(eachData.subject == data.subject){
                if(eachData.value > nota["value"]){       
                    nota = eachData
                }    
            }
        })
        db["grades"].map((eachData) =>{
            if(eachData.value > nota2.value && eachData.value < nota.value){
                nota2 = eachData;
            }
        })
        db["grades"].map((eachData) =>{
            if(eachData.value < nota2.value && eachData.value > nota3.value){
                nota3 = eachData;
            }
        })

        res.send({Maior_nota_1: nota, Maior_nota_2: nota2, Maior_nota_3: nota3});
    }
    catch(err){
        res.send("Erro: " + err)
    }
}

async function checkIfExist(id){
    let data = await gradesModel.findData(PATH_GRADES_DATABASE, id)
    if(data == -1){
        throw {err: "Not Found | ", msg: 'Não foi encontrado nenhum registro com o id ' + id}
    }
    return data
    }

//Validate if the requisition data is ok to be saved
function validateParams(require, data){
    let check = require.filter(field => !data.hasOwnProperty(field))
    if(check.length > 0){
        let missingParameters = check.join(', ');
        let error = {status: 400, msg: 'Parâmetros necessários não encontrados: ' + missingParameters}
        throw error;
    }
    return true;
}
