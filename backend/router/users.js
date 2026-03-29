const{Router}=require("express");

const router=Router();

//usuarios 
const usuarios = [
    'joani',
    'joshelyn'
]
//esto es la primera ruta
//la ruta seria http://localhost:8080/api/users/
router.get('/',(req,res)=>{
    res.json({
        msg:'ok users',
        data: usuarios
    })
})
//revisa esta parte esta interesante para definir rutas
//la ruta seria http://localhost:8080/api/users/2
router.get('/2',(req,res)=>{
    res.json({
        msg:'ok users2'
    })
})
module.exports=router;