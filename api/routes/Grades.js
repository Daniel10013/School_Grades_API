import { addData, findData, updateData, deleteData, getNotaTotalAluno, getMediasMateria, getTresMaioresNotas} from "../controller/GradesController.js"

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
                await findData(req, res);
            }
            catch(err){
                console.log(err)
                res.send(err)
            }
        })
        .patch(async (req, res)=>{
            try{
                await updateData(req, res);
            }
            catch(err){
                console.log(err)
                res.send(err.msg)
            }
        })

    app.delete("/grades/delete/:id", async(req, res) =>{
        try{
            await deleteData(req, res)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    })

    app.post("/grades/notas/total", async (req, res) =>{
        try{
            await getNotaTotalAluno(req, res)
        }   
        catch(err){
            console.log(err);
            res.send("Erro: " + err.status + '\n' + err.msg)
        }
    })

    app.post("/grades/notas/media", async (req, res) =>{
        try{
            await getMediasMateria(req, res)
        }   
        catch(err){
            console.log(err);
            res.send("Erro: " + err.status + '\n' + err.msg)
        }
    })    
    
    app.post("/grades/notas/maiores", async (req, res) =>{
        try{
            await getTresMaioresNotas(req, res)
        }   
        catch(err){
            console.log(err);
            res.send("Erro: " + err.status + '\n' + err.msg)
        }
    })
}