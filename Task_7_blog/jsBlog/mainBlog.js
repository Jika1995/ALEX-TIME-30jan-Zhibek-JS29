//7 Super Task
// Реализовать имитацию блога

// 1. Каждый пользователь должен иметь возможность зарегистрироваться и авторизоваться на сайте, вид объекта пользователя: 

// {
//   id: 12,
//   name: 'Jack',
//   password: 'superJack',
//   favorites: []
// }

//connecting to elements
let registerModalBtn = document.querySelector('#register-modal');
let loginModalBtn = document.querySelector('#login-modal');
let registerModalBlock = document.querySelector('#register-block');
let loginModalBlock = document.querySelector('#login-block');
let registerBtn = document.querySelector('#register-btn');
let loginBtn = document.querySelector('#login-btn');
let closeModalBtn = document.querySelector('.btn-close');
let logoutBtn = document.querySelector('#logout-btn')

//hide/show modals
registerModalBtn.addEventListener('click', () => {
    registerModalBlock.setAttribute('style', 'display: flex !important;');
    registerBtn.setAttribute('style', 'display: flex !important;');
    loginModalBlock.setAttribute('style', 'display: none !important');
    loginBtn.setAttribute('style', 'display: none !important');
});

loginModalBtn.addEventListener('click', () => {
    registerModalBlock.setAttribute('style', 'display: none !important;');
    registerBtn.setAttribute('style', 'display: none !important;');
    loginModalBlock.setAttribute('style', 'display: flex !important');
    loginBtn.setAttribute('style', 'display: flex !important');
});

//const Web Api from JSON
const USERS_API = ' http://localhost:5000/users';

//get data
async function getUsersData () {
    let res = await fetch(USERS_API);
    let users = await res.json();
    return users
};

//register

let regUsernameInp = document.querySelector('#reg-username');
let regPasswordInp = document.querySelector('#reg-password');
let regConfPasswordInp = document.querySelector('#reg-passwordConfirm');

registerBtn.addEventListener('click', register)

async function register () {

    if(
        !regUsernameInp.value.trim() ||
        !regPasswordInp.value.trim() ||
        !regConfPasswordInp.value.trim()
    ) {
        alert('Fill all inputs, some of them are empty!');
        return
    };

    if (regPasswordInp.value !== regConfPasswordInp.value) {
        alert('Passwords don\'t match');
        return;
    };

    let userObj = {
        username: regUsernameInp.value,
        password: regPasswordInp.value,
        favorites: []
    };

    let users = await getUsersData();

    fetch(USERS_API, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });

    regUsernameInp.value = '';
    regPasswordInp.value = '';
    regConfPasswordInp.value = '';

    closeModalBtn.click();

    render()

}

//authorization || login

let loginUsernameInp = document.querySelector('#login-username');
let loginPassInp = document.querySelector('#login-password');

let showUsername = document.querySelector('#showUsername');

function checkLoginLogoutStatus () {
    let user = localStorage.getItem('user');

    if(!user) {
        loginModalBtn.parentNode.style.display = 'block'; //если не авторизован то покажи
        logoutBtn.parentNode.style.display = 'none'; //спрячь
        showUsername.innerText = 'No user';
    } else {
        loginModalBtn.parentNode.style.display = 'none';  //спрячь
        logoutBtn.parentNode.style.display = 'block'; //покажи
        showUsername.innerText = JSON.parse(user).username;
    };

    showCreatePostPanel();

}

checkLoginLogoutStatus(); //в момент загрузки, потому что вдруг он авторизовался еще вчера

function checkExistingUser (username, users) {
    return users.some(item => item.username === username)
};

function checkUserPass (user, password) {
    return user.password === password
};

function setUsersToStorage(username, id, favorites) {
    localStorage.setItem('user', JSON.stringify({
        username, 
        id,
        favorites
    }));
};

loginBtn.addEventListener('click', login);

async function login () {

    if (
        !loginUsernameInp.value.trim() || 
        !loginPassInp.value.trim()   
    ) {
        alert('Fill all inputs, some of them are empty!');
        return;
    };

    let users = await getUsersData();

    if(!checkExistingUser(loginUsernameInp.value, users)) {
        alert('There is no such user');
        return;
    };

    let userObj = users.find(item => item.username === loginUsernameInp.value); 

    if (!checkUserPass(userObj, loginPassInp.value)) {
        alert('Wrong password!');
        return;
    };

    setUsersToStorage(userObj.username, userObj.id, userObj.favorites);

    loginUsernameInp.value = '';
    loginPassInp.value = '';

    checkLoginLogoutStatus();

    closeModalBtn.click();

    render()

};

//logout logic 
logoutBtn.addEventListener('click', ()=> {
    let user = localStorage.getItem('user');

    fetch(`${USERS_API}/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'}
    });

    localStorage.removeItem('user');
    checkLoginLogoutStatus();
    render();
});

//CRUD 
//Create

function checkUserForCreatePost () {
    let user = JSON.parse(localStorage.getItem('user'));

    if(user) return user.id;
    return false
}; 

function showCreatePostPanel () {
    let createPanel = document.querySelector('#create-panel');

    if(!checkUserForCreatePost()) {
        createPanel.setAttribute('style', 'display: none !important;')
    } else {
        createPanel.setAttribute('style', 'display: flex !important;')
    }
};

let postTitle = document.querySelector('#post-title');
let postContent = document.querySelector('#post-content');

let POSTS_API = 'http://localhost:5000/posts';

async function getPostsData () {
    let res = await fetch(POSTS_API);
    let posts = await res.json();
    return posts
};

async function createPost () {
    let user = JSON.parse(localStorage.getItem('user'));

    if (
        !postTitle.value.trim() ||
        !postContent.value.trim()
    ) {
        alert('Fill all inputs, some of them are empty!')
        return
    };

    let postObj = {
        title: postTitle.value,
        content: postContent.value,
        likes: 0,
        author: {
            id: user.id,
            name: user.username
        }
    };

    fetch(POSTS_API, {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    })

    postTitle.value = '';
    postContent.value = '';

    render()

};

let addPostBtn = document.querySelector('.add-post-btn');
addPostBtn.addEventListener('click', createPost);

//render

let postsBlock = document.querySelector('#posts-list');

let like = false;

async function render () {

    postsBlock.innerHTML = '';

    let posts = await getPostsData();
    // console.log(posts);
    if (posts.length === 0) return;

    posts.forEach(item => {
        postsBlock.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.content}</p>
                <p class="card-text"><b>Author</b>: ${item.author.name}</p>
                    <div class="d-flex">
                        <p class="likes-num">${item.likes}</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png" width="30" height="30">
                    </div>
                    ${checkUserForCreatePost() == item.author.id? 
                    `<a href="#" class="btn btn-dark btn-edit" id="edit-${item.id}">EDIT</a>
                    <a href="#" class="btn btn-danger btn-delete" id=del-${item.id}>DELETE</a>
                    `
                    :
                    '' 
                    }
                    ${checkUserForCreatePost() ? 
                        `<button class="btn btn-primary like-btn" id="like-${item.id}">Like</button>
                        <button class="btn btn-primary dislike-btn" id="dislike-${item.id}">DisLike</button>
                        `
                        :
                        '' 
                    }
            </div>
        </div>
        `
    });

    addDeleteEvent();
    addEditEvent();
    addLikeEvent();
    addDislikeEvent();
    // checkLikeDislike();

    // let user = JSON.parse(localStorage.getItem('user'));
    // if(!user) return
    // // console.log(user.favorites);

    // let dislikeBtns = document.querySelectorAll('.dislike-btn');
    // // console.log(dislikeBtns);
    // let likeBtns = document.querySelectorAll('.like-btn');
    // // console.log(likeBtns);
    // let newArrDislike = [];
    // let newArrLike = [];

    // if(user.favorites) {
    //     let newArrdisLikeBtns = [...dislikeBtns];
    //     newArrdisLikeBtns.map(function(item){
    //         user.favorites.forEach(i => {
    //             if(item.id.split('-')[1] == i.id) {
    //                 console.log(item)
    //                 newArrDislike.push(item)
    //                 // newArrLike.forEach(item => {
    //                 //     item.setAttribute('style', 'display: none !important');
    //                 // });
    //             }
    //         })
    //     })
    //     // console.log(newArr)
    //     newArrdisLikeBtns.forEach(item => {
    //         item.setAttribute('style', 'display: block !important');
    //     });

    //     let newArrLikeBtns = [...likeBtns];
    //     newArrLikeBtns.map(function(item){
    //         user.favorites.forEach(i => {
    //             if(item.id.split('-')[1] == i.id) {
    //                 newArrLike.push(item)
                    
    //                 // console.log(item);
    //                 // newArrDislike.forEach(item => {
    //                 //     item.setAttribute('style', 'display: block !important');
    //                 // }); 
    //             }
    //         })
    //     })
    //     console.log(newArrLike)
    //     newArrLike.forEach(item => {
    //         item.setAttribute('style', 'display: none !important');
    //     });
    // } 
    
};

// !!!${checkUserForCreatePost() ? 
// `<button class="btn btn-primary like-btn" id="like-${item.id}">Like</button>
// <button class="btn btn-primary dislike-btn" id="dislike-${item.id}">DisLike</button>
// `
// :
// '' 
// }

render()

//delete

function addDeleteEvent () {
    let delBtns = document.querySelectorAll('.btn-delete');
    delBtns.forEach(item => item.addEventListener('click', deletePost))
};

async function deletePost (e) {

    let postId = e.target.id.split('-')[1];

    await fetch (`${POSTS_API}/${postId}`, {
        method: 'DELETE'
    });

    render();

};

//update
let saveBtn = document.querySelector('.save-changes-btn');

function checkCreateAndSaveBtn() {
    if(saveBtn.id) {
        addPostBtn.setAttribute('style', 'display: none;');
        saveBtn.setAttribute('style', 'display: block;');
    } else {
        addPostBtn.setAttribute('style', 'display: block;');
        saveBtn.setAttribute('style', 'display: none;');
    };
};
checkCreateAndSaveBtn();

function addEditEvent() {
    let editBtns = document.querySelectorAll('.btn-edit');
    editBtns.forEach(item => item.addEventListener('click', addPostDataToForm))
}

async function addPostDataToForm(e) {

    let postId = e.target.id.split('-')[1];

    let res = await fetch (`${POSTS_API}/${postId}`)
    let postObj = await res.json();

    postTitle.value = postObj.title;
    postContent.value = postObj.content;

    saveBtn.setAttribute('id', postObj.id);

    checkCreateAndSaveBtn();
};

saveBtn.addEventListener('click', saveChanges)

async function saveChanges(e) {

    let updatedPostObj = {
        id: e.target.id,
        title: postTitle.value,
        content: postContent.value
    };

    await fetch (`${POSTS_API}/${e.target.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedPostObj),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'}
    })

    postTitle.value = '';
    postContent.value = '';

    saveBtn.removeAttribute('id');

    checkCreateAndSaveBtn();

    render();

}

//like

function addLikeEvent () {
    let likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(item => item.addEventListener('click', putLike))
    likeBtns.forEach(item => item.addEventListener('click', checkLIKES))
}

function addDislikeEvent () {
    let dislikeBtns = document.querySelectorAll('.dislike-btn');
    dislikeBtns.forEach(item => item.addEventListener('click', putDislike))
    dislikeBtns.forEach(item => item.addEventListener('click', checkdisLIKES))
}

async function putLike (e) {

    let user = JSON.parse(localStorage.getItem('user'));
    let postId = e.target.id.split('-')[1];

    let posts = await getPostsData();
    let postObj = posts.find(item => item.id == postId);
    console.log(postObj);

    function checkIfLiked (favorites, postId) {
        let likedPost = favorites.find(item => item.id == postId) //true or false
        return likedPost
    }
    
    if(!checkIfLiked(user.favorites, postId)) {
        
        postObj.likes += 1

        user.favorites.push(postObj);
        localStorage.setItem('user', JSON.stringify(user));

        await fetch (`${POSTS_API}/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(postObj),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'}
        });

        await fetch(`${USERS_API}/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({favorites: user.favorites}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'}
        });
    };

    user.favorites.push(postObj);
    render();

    return like = true

};

async function putDislike (e) {

    let user = JSON.parse(localStorage.getItem('user'));
    let postId = e.target.id.split('-')[1];

    let posts = await getPostsData();
    let postObj = posts.find(item => item.id == postId);
    console.log(postObj);

    function checkIfLiked (favorites, postId) {
        let likedPost = favorites.find(item => item.id == postId) //true or false
        return likedPost
    };

    if(postObj.likes === 0) return

    if (checkIfLiked(user.favorites, postId)) {
        
        postObj.likes -= 1

        await fetch (`${POSTS_API}/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(postObj),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'}
        });

        let favorites = user.favorites.filter(item => item.id != postId);
        user.favorites = favorites;

        await fetch(`${USERS_API}/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({favorites: user.favorites}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'}
        });
        
        localStorage.setItem('user', JSON.stringify(user));

    } 
    render();

    return like = false
}

function checkLIKES (e) {
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user) return

    let likeBtnId = e.target.id.split('-')[1];
    let postObj = user.favorites.find(item => item.id == likeBtnId)

    if (postObj){
        e.target.setAttribute('style', 'display: none !important')
    } else {
        e.target.setAttribute('style', 'display: block !important')
    }

    return postObj.id;

    // if (user.favorites.some(item => item.id == postId)) {
    //     e.target.setAttribute('style', 'display: block !important')
    // } else {
    //     e.target.setAttribute('style', 'display: none !important')
    // }

    
}

function checkdisLIKES (e) {
    
        let user = JSON.parse(localStorage.getItem('user'));
        if(!user) return
    
        let likeBtnId = e.target.id.split('-')[1];
        let postObj = user.favorites.find(item => item.id == likeBtnId)
    
        console.log(postObj.id);
        if (postObj){
            e.target.setAttribute('style', 'display: block !important')
        } else {
            e.target.setAttribute('style', 'display: none !important')
        }
        
        return postObj.id;
}
// async function checkAuthorPost () {

//     let posts = await getPostsData();
//     let user = JSON.parse(localStorage.getItem('user'));
//     if(!user) return

//     // console.log(user);
//     // console.log(posts);

//     let postObj = posts.find(item => item.author.id === user.id && item.author.name === user.username);

//     // console.log(postObj);

//     if(postObj) {
//         return true
//     } else {
//         console.log('OK');
//         return false
//     }
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

//ЧЕРНОВИК 

    //     let newArr = []
    //     newArr = newArrDislikeBtns.filter(item => {
    //         user.favorites.forEach(i => {
    //             console.log(item.id.split('-')[1])
    //             console.log(i.id);
    //             item.id.split('-')[1] == i.id
    //             console.log(newArr)
    //     })
    // })
    // dislikeBtns.forEach(item => {
    //     let likedPost = item.id.split('-')[1];
    //     // console.log(likedPost);
    //     user.favorites.forEach(i => {
    //         if(i.id == likedPost) {
    //             console.log('OK');
    //             item.setAttribute('style', 'display: block !important');
    //             likeBtns.forEach(item => item.setAttribute('style', 'display: none !important'));
    //         } else {
    //             item.setAttribute('style', 'display: none !important');
    //             likeBtns.forEach(item => item.setAttribute('style', 'display: block !important'));
    //         }
    //     })
    // })

// function checkLikedOrDisliked (user, postId){
    // let user = JSON.parse(localStorage.getItem('user'));

    // let dislikeBtns = document.querySelectorAll('.dislike-btn');
    // let likeBtns = document.querySelectorAll('.like-btn');

    // dislikeBtns.forEach(item => {
    //     let likedPostId = item.id.split('-')[1];

    //     if(user.favorites.some(item => item.id === likedPostId)) {
    //         dislikeBtns.forEach(item => item.setAttribute('style', 'display: none !important'));
    //         likeBtns.forEach(item => item.setAttribute('style', 'display: block !important'));
    //     } else {
    //         dislikeBtns.forEach(item => item.setAttribute('style', 'display: block !important'));
    //         likeBtns.forEach(item => item.setAttribute('style', 'display: none !important'));
    //     };
    // })

    // likeBtns.forEach(item => {
    //     let dislikedPostId = item.id.split('-')[1];
    //     if(user.favorites.some(item => item.id === dislikedPostId)) {
    //         dislikeBtns.forEach(item => item.setAttribute('style', 'display: block'));
    //         likeBtns.forEach(item => item.setAttribute('style', 'display: none'));
    //     } else {
    //         dislikeBtns.forEach(item => item.setAttribute('style', 'display: none'));
    //         likeBtns.forEach(item => item.setAttribute('style', 'display: block'));
    //     };
    // })

// }

// function checkLikeDislike (e) {

//     if(like) {
//         e.target.setAttribute('style', 'display: block !important');
//     } 
//     if(!like) {
//         e.target.setAttribute('style', 'display: none !important')
//     }
// };

//     let dislikeBtns = document.querySelectorAll('.dislike-btn')
//     let likeBtns = document.querySelectorAll('.like-btn')

//    if(like) {
//         dislikeBtns.forEach(item => item.setAttribute('style', 'display: block'));
//         likeBtns.forEach(item => item.setAttribute('style', 'display: none'));
//     } else {
//         dislikeBtns.forEach(item => item.setAttribute('style', 'display: none'));
//         likeBtns.forEach(item => item.setAttribute('style', 'display: block'));
//     };

// if(like) {
//     let likeBtn = document.querySelectorAll('.like-btn');
//     let dislikeBtn = document.querySelectorAll('.dislike-btn');
//     likeBtn.forEach(item => item.setAttribute('style', 'display: none'));
//     dislikeBtn.forEach(item => item.setAttribute('style', 'display: block'))
// } else {
//     let likeBtn = document.querySelectorAll('.like-btn');
//     let dislikeBtn = document.querySelectorAll('.dislike-btn');
//     likeBtn.forEach(item => item.setAttribute('style', 'display: block'));
//     dislikeBtn.forEach(item => item.setAttribute('style', 'display: none'))
// }
// console.log(e.target.id.split('-')[1]);
// if(like) {
//     dislikeBtn.forEach(item => item.setAttribute('style', 'display: block'));
//     likeBtns.forEach(item => item.setAttribute('style', 'display: none'));
// } else {
//     dislikeBtns.forEach(item => item.setAttribute('style', 'display: none'));
//     likeBtns.forEach(item => item.setAttribute('style', 'display: block'));
// };
