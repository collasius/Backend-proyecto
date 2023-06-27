const fs = require('fs/promises')
const path = require('path')

class ProductManager {
  constructor(path) {
    this.filepath = path
  }

  async addProduct(product) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)
    const newId = products[products.length - 1]?.id || 0

    products.push({
      ...product,
      id: newId + 1
    })
    await fs.writeFile(this.filepath, JSON.stringify(products, null, 2))
  }

  async getProducts() {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)

    return products
  }

  async getProductById(id) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)
    const product = products.find((item) => item.id === id)
  
    if (!product) {
      throw new Error(`No se encontró ningún producto con el ID: ${id}`)
    }
    return product
  }

  async updateProduct(id, updatedFields) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)
    const productIndex = products.findIndex((item) => item.id === id)

    if (productIndex === -1) {
      console.log(`No se encontró ningún producto con el ID: ${id}`)
    }

    const updatedProduct = {
      ...products[productIndex],
      ...updatedFields,
      id: id
    }

    products[productIndex] = updatedProduct
    await fs.writeFile(this.filepath, JSON.stringify(products, null, 2))
    return updatedProduct
  }

  async deleteProduct(id) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const products = JSON.parse(data)
    const productIndex = products.findIndex((item) => item.id === id)

    if (productIndex === -1) {
      console.log(`No se encontró ningún producto con el ID: ${id}`)
    }

    products.splice(productIndex, 1)

    await fs.writeFile(this.filepath, JSON.stringify(products, null, 2))
  }

}

const manager = new ProductManager(path.join(__dirname, 'products.json'))

async function ShowProducts(){
    console.log(await manager.getProducts())
}

async function main() {
  console.log(await manager.getProducts())

  await manager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25

  })

  console.log(await manager.getProducts())
}

async function SearchID(id) {
    const productId = id
  
    try {
      const product = await manager.getProductById(productId)
      console.log(product)
    } catch (error) {
      console.error(error.message)
    }
}

async function UpdateProduct(a) {
    const productId = a;
    const updatedFields = {
      title: 'producto prueba actualizado',
      description: 'se actualizó la descripción',
      price: 444,
    };
  
    try {
      const product = await manager.getProductById(productId);
  
      if (product) {
        const updatedProduct = await manager.updateProduct(productId, updatedFields);
        console.log('Producto actualizado:', updatedProduct);
      } else {
        console.log(`No se encontró ningún producto con el ID: ${productId}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  

async function deleteProduct(id) {
    const productId = id; // ID del producto que se va a eliminar
  
    try {
      const product = await manager.getProductById(productId);
  
      if (product) {
        await manager.deleteProduct(productId);
        console.log('Producto eliminado correctamente');
      } else {
        console.log(`No se encontró ningún producto con el ID: ${productId}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  

// ShowProducts()
SearchID(1) //completar con el id a buscar
// main()
UpdateProduct(1) // completar con el id a modificar
deleteProduct(3) // completar con el id a eliminar