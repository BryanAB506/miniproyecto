const fs = require("fs").promises

// funcion get para optener los productos
const getProduc = async (req, res) => {
    try {
        //leer un archivo del texto
        let data = await fs.readFile("data.json", 'utf8')
        res.json(JSON.parse(data)
        )
    } catch (error) {
        res.status(500).json({ message: 'error al obtener el producto', error })
    }
}

// funcion post para guardar los productos
const addProduct = async (req, res) => {
    const { name, precio, fecha_de_vencimiento } = req.body;
    //validacion para que sea obligatorio el guardado de el post
    if (!name || !precio || !fecha_de_vencimiento) {
        return res.status(400), json({
            message: 'Todos los datos son obligatorios: name y precio'
        })
    }
    try {
        const data = await fs.readFile('data.json', 'utf8');
        let productos = JSON.parse(data);

        const newProducto = {
            id: productos.products.length + 1,
            name,
            precio,
            fecha_de_vencimiento,
        };  

        productos.products.push(newProducto);
        const jsonData = JSON.stringify(productos, null, 2);
        await fs.writeFile("data.json", jsonData);
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};




// funcion delete para poder eliminar productos mediante su ID   
// (.findIndex para lo que nos ayuda es a buscar a ver si exite un id por algun lado - (.splice nos ayuda a poder eliminar el produco de se seleccione))
const DeletePrduct  = async (req, res) => {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        let productos = JSON.parse(data);

        const { id } = req.params;
        const productIndex = productos.products.findIndex(product => product.id === parseInt(id))
        productos.products.splice(productIndex, 1);
        await fs.readFile('data.json',JSON.stringify(productos, null, 2), 'utf8')
        res.status(200).json({ message: 'Se ha eliminado el producto correctamente' })
    } catch (error) {
        console.error('error al eliminar el producto', error);
        res.status(500).json({ message: 'error interno del servidor', error })
    }
}


// funcion PUT lo  que hacemos es poder asignarle un producto mediante el id para poder modificarlo
const modifyProduct = (req, res) => {
    try {
        const { id } = req.params
        const { name, precio, fecha_de_vencimiento } = req.body
        const productIndex = product.findIndex(product => product.id === parseInt(id))
        if (name) {
            product[productIndex].name = name
        }

        if (precio) {
            product[productIndex].name = name
        }

        if (fecha_de_vencimiento) {
            product[productIndex].fecha_de_vencimiento = fecha_de_vencimiento
        }

        res.status(200).json({ message: 'el producto ha sido modifcado exitosamente' })
    } catch (error) {
        console.error('error al actualizar el producto', error);
        res.status(500).json({ message: 'error interno del servidor', error })
    }
}

module.exports = {
    getProduc,
    addProduct,
    DeletePrduct,
    modifyProduct
}



