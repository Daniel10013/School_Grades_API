import { PATH_GRADES_DATABASE } from '../config/Config.js';
import { GradesModel } from '../model/GradesModel.js'
import { formatDate } from '../functions/Functions.js'

const require = ["student", "subject", "type", "value"];
const gradesModel = new GradesModel();

export async function addData(req, res){
    let data = req.body
    validateParams(require, data);
    let db = gradesModel.getData(PATH_GRADES_DATABASE);
    data["timestamp"] = (formatDate(new Date()));
    data["id"] = await gradesModel.getNextId(PATH_GRADES_DATABASE);
    db["grades"].push(data);
    db["nextId"] = data["id"] + 1;
    await gradesModel.writeFile(PATH_GRADES_DATABASE, data, false)
    res.send(data)
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
