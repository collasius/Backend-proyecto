class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      const id = this.products.length + 1;
  
      this.products.push({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(productId) {
        const product = this.products.find((e) => e.id === productId);
    
        if (!product) {
          return "not found";
        }
    
        return product;
    }
  }
  
  const t = new ProductManager();
  
  t.addProduct({
    title: 'Yerba',
    description: 'Yerba mate de 1 kilo',
    price: 1200,
    thumbnail: 'url: yerba',
    code: 11111,
    stock: 20,
  });

  t.addProduct({
    title: 'Coca-Cola',
    description: 'bebida sabor cola',
    price: 700,
    thumbnail: 'url: coca',
    code: 13223,
    stock: 100,
  });
  
  console.log(t.getProducts());
  console.log(t.getProductById(1)); //devuelve yerbe
  console.log(t.getProductById(2)); //devuelve coca
  console.log(t.getProductById(3)); //devuelve not foud
  