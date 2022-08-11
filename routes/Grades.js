import { addData } from "../controller/GradesController.js"

export function routeGrades(app){
    app.post("/api/create" , async (req, res) =>{
        try{
            let data = await req.body;
            addData(data)
            if(res.status == 200){
                res.send(data)
            }
        }
        catch(err){
            console.log(err);
        }
    })
}