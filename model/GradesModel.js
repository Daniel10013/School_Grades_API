import fs from "fs";

export class GradesModel{
    async getData(path) {
        try{
            let data = fs.readFileSync(path);
            return ((data.length == 0) ? {} : (await JSON.parse(data.toString())))
        }
        catch(err){
            console.log(err)
        }
    }
}