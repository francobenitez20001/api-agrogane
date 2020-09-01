const Multer = require('multer');
const path = require('path');
//como quiero almacenar las imagenes	const multer = Multer({
    const storage = Multer.diskStorage({storage: Multer.memoryStorage(),
        destination:'./public/img',	
        filename:(req,file,cb)=>{	
            cb(null,file.originalname);	
        }	
    })	
    
    const upload = Multer({	
        storage:storage,	
        dest:'./public/img',	
        limits:{fieldSize:1000000000},	
        fileFilter:(req,file,cb)=>{	
            //validando extensiones.	
            const fileTypes = /jpeg|jpg|png|pptx|xlsx|xls|gif|doc|pdf|txt/;//extensiones aceptadas	
            const mimetype = fileTypes.test(file.mimetype);	
            const extname = fileTypes.test(path.extname(file.originalname));	
            if (mimetype && extname) {	
                return cb(null,true);	
            }	
            cb(JSON.stringify({status:400,message:"Archivo no soportado"}));	
        }	
    });   
module.exports = upload; 
//const multer = Multer({
//    storage: Multer.memoryStorage(),
//});
//module.exports = multer;