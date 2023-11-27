const foodsmodel = require('../models/foodsModel')
const potosmodel = require('../models/potosmodel')
const upload = require('../helper/fileupload')
const {Op} = require('sequelize')

const methodGetCondition = async(req, res)=>{
    const param1 = req.body.namamakanan
    const param2 = req.body.daerah
    try {
        const getdata = await foodsmodel.findAll({
            attributes:[['namamakanan', 'nama'],['deskripsi', 'desc']],
            // where:{
            //     // [Op.or]:[
            //     //     {namamakanan: param1},
            //     //     {daerah:param2},
            //     // ]s
            //     // [Op.and]:[
            //     //     {namamakanan: param1},
            //     //     {daerah:param2},
            //     // ]
            //     // namamakanan:{
            //     //     [Op.in]:[param1, param2]
            //     // }
            //     namamakanan:{
            //         [Op.like]: '%' +param1 + '%'
            //     }
            // },
            order:[['namamakanan', 'asc']]
        })
        res.json(getdata)
    } catch (error) {
        return res.status(400).send("Error uy")
        
    }
}

const methoduploadFoods = async (req, res)=>{
    try {
        // Upload File
        await upload(req, res);

        if(req.file == undefined){
            console.error(req.file)
            return res.status(400).send({message: "Image belum di upload"})
        }

        // Uuntuk DB
        potosmodel.create({
            idfoods : req.body.idfoods,
            path :req.file.originalname
        }).then((data)=>{
            res.status(200).send({
                message:"File berhasil di upload" + data.path
            })
        })
    } catch (error) {
        console.error(error.message)
        res.status(400).send('Error file')
    }
}

const methodPost = async (req, res) =>{
    try {
        const {namamakanan, daerah, deskripsi} = req.body;
        const store = new foodsmodel({
            namamakanan, daerah, deskripsi
        })

        await store.save();
        res.json(store)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error kuy')
    }
}

const methodGet = async (req, res) =>{
    try {
        const getData = await foodsmodel.findAll({})
        res.json(getData)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error kuy')
    }
}

const methodGetId = async (req, res) =>{
    try {
        const id = req.params.id
        const getData = await foodsmodel.findOne({
            where:{id:id}
        })
        res.json(getData)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error kuy')
    }
}

const methodPut = async (req, res) =>{
    try {
        const {namamakanan, daerah, deskripsi} = req.body
        const id = req.params.id

        const updateFood = foodsmodel.update({
            namamakanan, daerah, deskripsi
        },{
            where:{id:id}
        })

        await updateFood
        res.send("berhasi di update")

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error kuy')
    }
}

const methodDelete = async (req, res) =>{
    try {
        const id = req.params.id
        const deleteFood = foodsmodel.destroy({
            where:{id:id}
        })
        await deleteFood
        res.send("data berhasil di hapus")
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error kuy')
    }
}


module.exports = {
    methodPost,
    methodGet,
    methodGetId,
    methodPut,
    methodDelete,
    methoduploadFoods,
    methodGetCondition
}