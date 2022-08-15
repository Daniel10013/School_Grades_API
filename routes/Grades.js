import { addData, getDataToUpdate } from "../controller/GradesController.js"

export function routeGrades(app){
    app.post("/grades/create" , async (req, res) =>{
        try{
            await addData(req, res);
        }
        catch(err){
            console.log(err);
            res.send("Erro: " + err.status + '\n' + err.msg)
        }
    })

    //route to update the data
    app.route("/grades/update/:id")
        .get(async (req, res) =>{
            try{
                await getDataToUpdate(req, res);
            }
            catch(err){
                console.log(err)
                res.send(err)
            }
        })
        .patch(async (req, res)=>{
            try{
                // await UpdateData(req, res);
            }
            catch(err){
                console.log(err)
                res.send(err.msg)
            }
        })
}