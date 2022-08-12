import fs from "fs";

export class GradesModel{
    async getData(path) {
        try{
            let data = await fs.readFileSync(path);
            return ((data.length == 0) ? {} : (await JSON.parse(data.toString())))
        }
        catch(err){
            console.log(err)
        }
    }

    async writeFile(path, data, reWriteFile = false){
        try{
            if(reWriteFile){
                return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
            }
            return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
        }
        catch(err){
            console.log(err)
        }
    }

    async getNextId(path){
        try{
            let data = await this.getData(path);
            return data["nextId"];
        }
        catch(err){
            console.log(err)
        }
    }

    async setNextId(path, oldNextId){
        try{
            let data = await this.getData(path);
            data.nextId = oldNextId + 1;
            this.reWriteFile(path, data, true)
        }
        catch(err){
            console.log(err)
        }
    }
}