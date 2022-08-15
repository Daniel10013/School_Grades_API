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
