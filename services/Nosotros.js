const NosotrosModel = require('../models/Nosotros.js');

class NosotrosService{
    constructor() {
        this.NosotrosModel = new NosotrosModel();
        this.collection = 'nosotros';
    }

    async get(){
        const nosotros = await this.NosotrosModel.get().then(res=>{
            return res;
        })
        return nosotros;
    }

    async create(nosotros){
        const response = await this.NosotrosModel.create(nosotros).then(res=>{
            return res;
        })
        return response;
    }

    async update(nosotros,id,header=null){
        const data = await this.NosotrosModel.update(id,nosotros,header).then(res=>{
            return res;
        })
        return data;
    }
}

module.exports=NosotrosService;