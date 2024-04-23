## Desarrollo Backend

El servidor está vinculado a la ip local "127.0.0.1" en el puerto "8080"

### Api para manejo de productos

#### **api/products/?limit**

-   Metodo GET: Lista los productos de la base de datos hasta el item indicado por la query "limit". En caso de no incluir query, se listaran todos los productos.

-   Metodo POST: Agrega un producto a la base de datos definido como un objeto con los siguientes campos:

    -   "title" : String.
    -   "descrition": String.
    -   "code": String.
    -   "price": Number.
    -   "status": boolean default "True"
    -   "stock": Number.
    -   "category": String.
    -   "thumbnail": Array de Strings.

    Thumbnail es el unico campo opcional.

    La query no se utiliza en el metodo POST.

#### **/api/products/:pid**

-   Metodo PUT: Tomara un producto con el parametro "pid" y lo actualizará por campos

-   Metodo DELETE: Eliminara el producto indicado por "pid"

### Api para manejo de carritos

#### **/api/carts/**

-   Metodo POST: Creará un nuevo carrito vacío con los campos:
    -   id: Number, otorgado de forma automatica
    -   products: Array de objetos vacío

#### **/api/carts/:cid**

-   Metodo GET: Lista los productos del carrito con id "cid" enviado como parametro

#### **/api/carts/:cid/product/:pid**

-   Metodo POST: Agrega el producto de id "pid" al carrito de id "cid" como un objeto definido como:

    -   product: Number, contiene el id del producto
    -   quantity: Number, indica la cantidad de productos a incluir

    Al agregar un producto dos o mas veces, el campo quantity se incrementa.

El flujo de informacion se realiza mediante archivos json y como cliente se recomienda utilizar Postman
