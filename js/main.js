//1. Создайте инпут и при помощи этого инпута меняйте цвет бэкграунда на тот, который будет прописан в этом инпуте(учесть, что может быть передан не только текст, но еще и HEX, а также rgb)

// let colorInp = document.querySelector('#input-color');
// let colorInp = document.createElement('input');
// document.body.append(colorInp)
// colorInp.addEventListener('input', e => {
//     document.body.style.background = e.target.value
// })

//2. Создайте блок и две кнопки для него(left и right), кнопка лефт отвечает за прокрутку блока в лево на 180 градусов, а right аналогично вправо(используйте гугл для поиска информации о прокрутке блока)

// let block = document.querySelector('.task-2');
// let leftBtn = document.querySelector('#left-btn');
// let rightBtn = document.querySelector('#right-btn');

// // block.style.width = '100px';
// // block.style.height = '100px';
// // block.style.backgroundColor = 'red'

// leftBtn.addEventListener('click', ()=> {
//     block.style.transform = 'rotate(-0.5turn)'; //1 - 360degree. //против часовой стрелки
// });

// rightBtn.addEventListener('click', () => {
//     block.style.transform = 'rotate(180deg)'; //по часовой стрелке
// });

//3. Математическое округление. Создайте инпут, который будет округлять десятичное число в зависимости от его десятичной части к примеру, если ввести 5.7 вывести 6, если 5.4 вывести 5

// let numberInp = document.querySelector('#inp-number');

// numberInp.addEventListener('change', () => {
//     let res = +numberInp.value;
//     res = res.toFixed();
//     console.log(res);
//     numberInp.value = res
// })

// const pi = 3.14159265359;
// console.log(pi.toFixed(2)); // => 3.14

//решение Кожояра

// let inp = document.querySelector("#inp-number");
// inp.addEventListener("change", (e) => {
//   let res = Math.round(e.target.value);
//   e.target.value = res;
// });

//4 Реализуйте логику контактной книжки, то есть, реализовать CR(создание и просмотр). Контакт должен иметь поля(name, lastName, age, address). Использовать bootstrap(карточки), json-server;

// let inpName = document.querySelector('#name-inp');
// let inpLastname = document.querySelector('#lastname-inp');
// let inpAge = document.querySelector('#age-inp');
// let inpAdress = document.querySelector('#adress-inp');

// let addBtn = document.querySelector('#add-contact');

// let CONTACTS_API = 'http://localhost:8000/contacts';

// async function createContact () {

//     let contactObj = {
//         name: inpName.value,
//         lastname: inpLastname.value,
//         age: inpAge.value,
//         adress: inpAdress.value
//     };

//     await fetch(CONTACTS_API, {
//         method: 'POST',
//         body: JSON.stringify(contactObj),
//         headers: {'Content-Type': 'application/json; charset=utf-8'}
//     });

//     inpName.value = '';
//     inpLastname.value = '';
//     inpAge.value = '';
//     inpAdress.value = '';

//     read()
// };

// async function read () {
//     let res = await fetch (CONTACTS_API);
//     let data = await res.json();
//     let contactRead = document.querySelector('.contact-read');
//     contactRead.innerHTML = ''

//     data.forEach(item => {
//         contactRead.innerHTML += `
//             <div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                     <h5 class="card-title">${item.name}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${item.lastname}</h6>
//                     <p class="card-text">${item.age}</p>
//                     <p class="card-text">${item.adress}</p>
//                 </div>
//             </div>
//         `
//     })
// };

// addBtn.addEventListener('click', createContact)
// read()

//решение у доски

// const CONTACT_API ="http://localhost:3000/contacts";

// let inpName = document.querySelector("#inp-name");
// let inpLastname = document.querySelector("#inp-lastname");
// let inpAge = document.querySelector("#inp-age");
// let inpAddress = document.querySelector("#inp-address");
// let btnCreate= document.querySelector("#btn-create");
// let btnRead = document.querySelector("#btn-read");

// function createContact(e) {
//     e.preventDefault();
//     let contact = {
//         name: inpName.value,
//         lastname: inpLastname.value,
//         age: inpAge.value,
//         address: inpAddress.value
//     };

//     let res = fetch(CONTACT_API, {
//         method: "POST",
//         body: JSON.stringify(contact),
//         headers: {
//             "Content-Type": "application/json;charset=utf-8"
//         }
//     })
// }

// btnCreate.addEventListener("click", createContact);

// function readContact() {
//     let container =document.querySelector(".container");
//     container.innerHTML ="";
//     fetch(CONTACT_API)
//         .then(res => res.json())
//         .then(contacts => {
//             contacts.forEach(item => {
//                 container.innerHTML += `<div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                   <p class="card-text">${item.name}</p>
//                   <p class="card-text">${item.lastname}</p>
//                   <p class="card-text">${item.age}</p>
//                   <p class="card-text">${item.address}</p>
//                 </div>
//               </div>`
//             })
//         }
//    )       
// }
// btnRead.addEventListener("click", readContact);

// 5. Отправить запрос на API: https://rickandmortyapi.com/api/character ; изучить эту ссылку и отобразить на странице карточки, в карточках должна быть следующая информация(картинка, имя, статус)

// let RICKY_API = 'https://rickandmortyapi.com/api/character';

// let block = document.querySelector('.rickycards');

// async function readRicky () {
//     let res = await fetch(RICKY_API);
//     let data = await res.json();

//     let characters = data.results;
//     console.log(characters);

//     block.innerHTML = '';
//     characters.forEach(item => {
//         block.innerHTML += `
//         <div class="card" style="width: 18rem;">
//             <img src="${item.image}" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title">${item.name}</h5>
//                 <p class="card-text">${item.status}</p>
//             </div>
//         </div>
//         `
//     });
// };

// readRicky();

//6 Используя готовые данные для файла db.json, Сделайте R-отображение, U-изменение
//6.1. Продолжаем предыдущий таск. Реализуйте логику корзины. Local Storage. У вас есть карточка с товаром, нажав на кнопку «добавить в корзину» добавляйте товар в локал сторадж, с возможностью указать количество товаров. input Также в карточке должна быть кнопка, УДАЛИТЬ ИЗ КОРЗИНЫ, нажав на которую, товар удаляется из корзины, также на странице должна быть кнопка ОЧИСТИТЬ КОРЗИНУ, при нажатии на эту кнопку, все товары должны быть удалены из хранилища
//объект корзины по айди 

//delete - удалить все штуки
// total cost по желанию sub price у каждого продукта в массиве

//Подключение к элементам
let content = document.querySelector('.content');
let showProductsBtn = document.querySelector('#show-products');
let cartContent = document.querySelector('#cart-content')

let PRODUCTS_API = 'http://localhost:8000/products';

//функция чтения
async function showAllProducts () {
    let res = await fetch(PRODUCTS_API);
    let data = await res.json();

    cartContent.innerHTML = ''

    content.innerHTML = '';

    data.forEach(item => {
        content.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
                <img src="${item.image}" class="card-img-top img-fluid img-thumbnail" alt="error:(" width="250" height="250">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5><hr>
                    <p class="card-text"><b>Brand</b>: ${item.brand}</p>
                    <p class="card-text"><b>Color</b>: ${item.color}</p>
                    <p class="card-text"><b>Price</b>: ${item.price}</p>
                    <p class="card-text"><b>Description</b>: ${item.description}</p>
                    <div class="d-flex flex-column justify-content-end">
                        <a href="#" class="btn btn-dark change-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="changeId-${item.id}">Change Products</a>
                        <a href="#" class="btn btn-dark addToBuy-btn" id="buy-${item.id}">Add to shopping cart
                        </a>
                    </div>
                </div>
            </div>
        `
    });

    if (data.length == 0) return;

    addChangeEvent();
    addBuyEvent();

};

//событие чтения на кнопку
showProductsBtn.addEventListener('click', showAllProducts);

//событие для изменения
function addChangeEvent () {
    let changeBtns = document.querySelectorAll('.change-btn');
    changeBtns.forEach (item => item.addEventListener('click', changeProduct))
};

//подключение к инпутам для изменения
let nameInp = document.querySelector('#name-inp');
let brandInp = document.querySelector('#brand-inp');
let colorInp = document.querySelector('#color-inp');
let priceInp = document.querySelector('#price-inp');
let descInp = document.querySelector('#desc-inp');
let imageInp = document.querySelector('#img-inp');

//функция изменения продукта (вызов модалки)
async function changeProduct (e) {

    let productId = +e.target.id.split('-')[1];
    // console.log(productId);

    let res = await fetch(PRODUCTS_API);
    let data = await res.json();

    let productObj = data.find(item => item.id === productId);
    // console.log(productObj);

    nameInp.value = productObj.name;
    brandInp.value = productObj.brand;
    colorInp.value = productObj.color;
    priceInp.value = productObj.price;
    descInp.value = productObj.description;
    imageInp.value = productObj.image;

    let saveBtn = document.querySelector('.save-btn');
    saveBtn.setAttribute('id', productId);
    saveBtn.addEventListener('click', saveProductChanges)

};

//продолжение функции изменения (само изменение и сохранение)
async function saveProductChanges (e) {

    let productId = +e.target.id;

    let res = await fetch(PRODUCTS_API);
    let data = await res.json();

    let productObj = data.find(item => item.id === productId);

    productObj.name = nameInp.value;
    productObj.brand = brandInp.value;
    productObj.color = colorInp.value;
    productObj.price = priceInp.value;
    productObj.description = descInp.value;
    productObj.image = imageInp.value;
    
    fetch (`${PRODUCTS_API}/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(productObj),
        headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
    });

    nameInp.value = '';
    brandInp.value = '';
    colorInp.value = '';
    priceInp.value = '';
    descInp.value = '';
    imageInp.value = ''; 

    e.target.removeAttribute('id');
    
    showAllProducts()
};

//функции для работы с local storage
function initStorage () {
    if(!localStorage.getItem("shoppingcart")){
        localStorage.setItem("shoppingcart", JSON.stringify({"products": []}));
    };
}; 

initStorage();

function setProductsToStorage (productsData) {
    localStorage.setItem("shoppingcart", JSON.stringify(productsData));
};

function getProductsFromStorage () {
    let productsData = JSON.parse(localStorage.getItem("shoppingcart"));
    return productsData;
};


//функция для вызова нашей базы данных
async function getAllProductsData () {
    let res = await fetch(PRODUCTS_API);
    let productsData = await res.json();
    return productsData
}

//событие на кнопку добавить в корзину
function addBuyEvent () {
    let addToBuyBtns = document.querySelectorAll('.addToBuy-btn');
    addToBuyBtns.forEach(item => item.addEventListener('click', addToCart));
};

//функция добавления в корзину
async function addToCart (e) {

    // console.log(productsDataBase);
    let productId = +e.target.id.split('-')[1];
    // console.log(productId);

    let productsData = await getAllProductsData()
    let shopProductObj = productsData.find(item => item.id == productId)
    shopProductObj.count = 1;
    shopProductObj.subprice 

    let productsDataCart = getProductsFromStorage();
    // console.log(productsDataCart);

    if(productsDataCart.products.some(item => item.id === productId)) {
        alert('You have already added this product');
        return;
    };

    productsDataCart.products.push(shopProductObj);
    setProductsToStorage(productsDataCart);

}

let showCartBtn = document.querySelector('#show-shopping-cart');
showCartBtn.addEventListener('click', showCart);

function showCart (e) {

    let buyProducts = getProductsFromStorage();

    content.innerHTML = '';

    let totalPrice = totalPriceFunc()

    cartContent.innerHTML= `<p id="total"><b>Total price:</b> ${totalPrice}$</p>`;

    buyProducts.products.forEach(item => {
        cartContent.innerHTML += `
        <div class="card m-5 w-75 d-flex" style="width: 18rem;">
                     <div class="card-body d-flex">
                            <img src="${item.image}" class="img-fluid img-thumbnail" alt="error:(" height="50">
                            <div class="container">
                                   <h5 class="card-title">${item.name}</h5><hr>
                                   <p class="card-text"><b>Brand</b>: ${item.brand}</p>
                                   <p class="card-text"><b>Color</b>: ${item.color}</p>
                                   <p class="card-text"><b>Price</b>: ${item.price}$</p>
                                   <p class="card-text"><b>Quantity</b>: ${item.count}
                                   <p class="card-text"><b>Subprice</b>: ${item.price*item.count}$</p>
                                   <a href="#" class="btn btn-outline-success btn-plus-count" id="add-${item.id}">+</a>
                                   <a href="#" class="btn btn-outline-danger btn-minus-count" id="del-${item.id}">-</a>
                                   </p>
                                   <a href="#" class="btn btn-danger btn-del" id="del-${item.id}">Delete from shopping cart</a>
                            </div>
                     </div>
            </div>
        `
    });

    if (buyProducts.products.length == 0) return;

    plusOneEvent()
    minusOneEvent()
    addDeleteBtnEvent ()
};

function totalPriceFunc() {

    let totalPrice = 0
    let buyProducts = getProductsFromStorage();

    buyProducts.products.forEach(item => {
        item.subprice = item.price*item.count
    })

    buyProducts.products.forEach(item => {
        totalPrice = totalPrice + item.subprice
    });

    return totalPrice
}

function addDeleteBtnEvent () {
    let deleteBtns = document.querySelectorAll('.btn-del');
    deleteBtns.forEach(item => item.addEventListener('click', deleteFromCart))
};

function deleteFromCart (e) {

    let productId = e.target.id.split('-')[1];
    let buyProducts = getProductsFromStorage();

    buyProducts.products = buyProducts.products.filter(item => item.id != productId);

    setProductsToStorage(buyProducts);
    showCart()
}

let clearCartBtn = document.querySelector('#btn-clear');
clearCartBtn.addEventListener('click', clearShoppingCart);

function clearShoppingCart () {
    localStorage.clear();
    initStorage()
    showCart()
};

function plusOneEvent () {
    let btnPlusCounts = document.querySelectorAll('.btn-plus-count');
    btnPlusCounts.forEach(item => item.addEventListener('click', addOne))
}

function addOne (e) {
    console.log(e.target);

    let productId = e.target.id.split('-')[1];
    // console.log(productId);

    let buyProducts = getProductsFromStorage();
    let buyProductObj = buyProducts.products.find(item => item.id == productId);
    // console.log(buyProductObj);

    buyProductObj.count += 1;
    
    setProductsToStorage(buyProducts);

    showCart();

};

function minusOneEvent() {
    let btnMinusCounts = document.querySelectorAll('.btn-minus-count');
    btnMinusCounts.forEach(item => item.addEventListener('click', minusOne))
}

function minusOne (e) {
    // console.log(e.target);

    let productId = e.target.id.split('-')[1];
    // console.log(productId);

    let buyProducts = getProductsFromStorage();
    let buyProductObj = buyProducts.products.find(item => item.id == productId);
    // console.log(buyProductObj);

    if(buyProductObj.count === 1) {
        return
    }

    buyProductObj.count -= 1
    
    setProductsToStorage(buyProducts)

    showCart();
};


//7 Super Task
// Реализовать имитацию блога

// 1. Каждый пользователь должен иметь возможность зарегистрироваться и авторизоваться на сайте, вид объекта пользователя: 

// {
//   id: 12,
//   name: 'Jack',
//   password: 'superJack',
//   favorites: []
// }

//2. Полный CRUD на посты, каждый зарегистрированный и авторизованный пользователь должен получить доступ к созданию, редактированию, удалению ТОЛЬКО СВОИХ постов, вид объекта поста:
// admin -- author ориентир на ID
// title content только вводит пользователь 

// {
//   id: 4,
//   title: SomeTitle,
//   content: SomeContent,
//   likes: 8,
//   author: {
//     id: 12,
//     name: 'Jack',
//   }
// }

// 3. Незарегистрированные и неавторизованные пользователи могут только просматривать посты

//4. Каждый пользователь может поставить лайк любому посту, после чего пост, который нравится пользователю, отображается в массиве favorites, например пользователю с id-12, нравится пост с id-4, пользователь ставит лайк посту, пост добавляется в массив favorites, который находится в объекте пользователя:
// {
//     id: 12,
//     name: 'Jack',
//     password: 'superJack',
//     favorites: [
//       {
//         id: 4,
//         title: SomeTitle,
//         content: SomeContent,
//         likes: 8
//       }
//     ]
//   }, в свою очередь количество лайков у поста повышается:
//   {
//     id: 4,
//     title: SomeTitle,
//     content: SomeContent,
//     likes: 8 -> 9
//   }, также у поста кнопка ЛАЙК должна измениться на ДИЗЛАЙК, при нажатии количество лайков у поста должно уменьшиться на 1, а у пользователя данный пост должен быть удален из массива favorites

//ВАЖНО: если пользователь ставик лайк посту, то для него исчезает кнопка лайк и появляется кнопка дизлайк(для данного поста), но если зайти под другим аккаунтом, который еще не ставил лайк, то кнопка лайк снова должна появиться

//