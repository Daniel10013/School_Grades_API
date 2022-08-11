import { PATH_GRADES_DATABASE } from '../config/Config.js';
import { GradesModel } from '../model/GradesModel.js'


const require = ["student", "subject", "type", "value", "timestamp"];

export async function addData(data){
    let gradesModel = new GradesModel();
    let grades = await gradesModel.getData(PATH_GRADES_DATABASE);
    console.log(grades);
    console.log(data);

    return grades
}

function validateParams(){
    // let a = ["id", "name"];
    // let b = {"id": 1}

    // let check = a.filter(field => !b.hasOwnProperty(field))
    // console.log(check)
}
