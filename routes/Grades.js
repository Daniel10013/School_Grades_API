import { addData } from "../controller/GradesController.js"

export function routeGrades(app){
    app.post("/api/create" , async (req, res) =>{
        try{
            let data = await req.body;
            await addData(req, res);
        }
        catch(err){
            console.log(err);
            res.send("Erro: " + err.status + '\n' + err.msg)
        }
    })
}