const express = require('express')
const Contenedor = require('./container')
//const Contenedor = require ('./src/container')
const { Router } = express


const app = express()
app.use(express.json())
app.use(express.urlencoded({entended: true }))
app.use(express.static('public'))

const routerProducto = new Router()

let contenedor = new Contenedor('./src/productos.json')
const productos = []

routerProducto.get('/', async (req, res) => {
    const lista = await contenedor.getAll()
    res.send(lista)
        
    })

routerProducto.get('/:id:', async (req, res) => {
        const { id } = req.params
        const productById = await contenedor.getBYId(id)
        if(productById) {
            res.send(productById)
        } else {
            res.send(`No existe un Producto con ID ${id} `)
        }
            
        })
    

routerProducto.post('/',async (req, res) => {

    const { body } = req
    await contenedor.saveNewProduct(body);
    res.send(body)
    })



app.use('api/productos', routerProducto)

const PORT = 8080
app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`)
})
