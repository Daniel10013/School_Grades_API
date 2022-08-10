import { GradesController} from "../controller/GradesController.js"

export function routeGrades(app){
    app.get("/" , async (req, res) =>{
        try{
            let data = await req.body;
            if(res.status == 200){
                res.send(data)
            }
        }
        catch(err){
            console.log(err);
        }
    })
}