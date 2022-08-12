import { PATH_GRADES_DATABASE } from '../config/Config.js';
import { GradesModel } from '../model/GradesModel.js'


const require = ["student", "subject", "type", "value"];
const gradesModel = new GradesModel();

export async function addData(req, res){
    let data = req.body
    validateParams(require, data);
    data["id"] = await gradesModel.getNextId(PATH_GRADES_DATABASE);
    data["timestamp"] = (new Date(Date.now()).getTime());
    //ECONTRCARFORMA DE CONVERTER HORARIO
    //TERMINAR FUNCAO DE INSERIR DADOS
    //JA EXISTEM FUNCOES PARA O TRATAMENTO DO ID NA MODEL
    //DEVE SER FEITO O TESTE DELAS, E DEVE SER FEITO O TESTE DE REESCREVER O ARQUIVO
    //O ARQUIVO DEVE SER REESCRITO ANTES DE SE MUDAR O ID PARA QUE POSSA SER FEITA A CRIAÇÃO DO NOVO ID
    res.send(data)
}


function validateParams(require, data){
    let check = require.filter(field => !data.hasOwnProperty(field))
    if(check.length > 0){
        let missingParameters = check.join(', ');
        let error = {status: 400, msg: 'Parâmetros necessários não encontrados: ' + missingParameters}
        throw error;
    }
    return true;
}
