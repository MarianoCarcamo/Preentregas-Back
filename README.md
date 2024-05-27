## Desarrollo Backend

El servidor está vinculado a la ip local "127.0.0.1" en el puerto "8080"

### Api para manejo de productos

#### **api/products/?limit&sort&query&page**

-   Metodo GET: Lista los productos de la base de datos. En caso de no incluir query, se listaran los 10 primeros productos correspondientes a la primera pagina sin ordenamiento ni filtrado.

    -   limit: Limita el numero de productos a mostrar por pagina.
    -   sort: Ordena de forma ascendente o descendente con respecto al precio. Toma los valores de 'asc' o 'desc'
    -   page: Lista los porductos de la pagina indicada por la query
    -   query: Toma el valor que se le aplica al filtro del paginado. Por ejemplo: "/"category/":/"hogar/"".

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

-   Metodo PUT: Actualiza el carrito con un arreglo de productos con el formato obtenido por un metodo get en api/products

-   Metodo DELETE: Elimina todos los productos del carrito

#### **/api/carts/:cid/product/:pid**

-   Metodo POST: Agrega el producto de id "pid" al carrito de id "cid" como un objeto definido como:

    -   product: Number, contiene el id del producto
    -   quantity: Number, indica la cantidad de productos a incluir

    Al agregar un producto dos o mas veces, el campo quantity se incrementa.

-   Metodo PUT: Actualiza el campo quantity del objeto con una cantidad pasada por req.body

-   Metodo DELETE: Elimina del carrito el producto seleccionado por "pid"

### Vistas

#### **/products**

Renderiza una vista con los productos y su respectiva paginación

#### **/carts/:cid**

Renderiza una vista con todos los productos incluidos en el carrito especificado por "cid"

Se toma como metodo de presistencia de informacion una base de datos de MongoDB y como cliente se recomienda utilizar Postman
