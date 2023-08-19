let usersRow = document.querySelector(".users-row");
let postsRow = document.querySelector(".posts-row");
let photosRow = document.querySelector(".photos")

function getData(url, callback) {
  let xhr = new XMLHttpRequest();

  console.log(xhr.readyState);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let resJson = xhr.response;
      let res = JSON.parse(resJson);
      callback?.(res);
    } else if (xhr.readyState === 4) {
      console.log(xhr.statusText);
    }
  };

  xhr.open("get", url);

  xhr.send();
}

function getUserRow(id ,name, username ,email, adress ,street) {
  return `
    <div>
      <h2>Id: ${id}</h2>
      <h3>Name: ${name}</h3>
      <p>username:${username}</p>
      <p>Email: ${email}</p>
      <p>adress: ${adress}</p>
      <p>street: ${street}</p>

    </div>
  `;
}

usersRow.innerHTML = "...Loading";

getData("https://jsonplaceholder.typicode.com/users", (users) => {
  usersRow.innerHTML = "";
  users.map((user) => {
    getData(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
      (userPosts) => {
        userPosts.map((post) => {
          getData(
            `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
           
            (postComments) => {
              postsRow.innerHTML = "";
              console.log(post.id);
              console.table(postComments);
              usersRow.innerHTML += getUserRow(user);
              usersRow.innerHTML += JSON.stringify(userPosts);
            }
          );
        });
      }
    );
  });
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
getData("https://jsonplaceholder.typicode.com/users", (users) => {
  usersRow.innerHTML = "";
  users.map((user) => {
    usersRow.innerHTML += getUserRow(user);
  });
});

function getUserRow ({ id , name , email , username , phone, address, website }) {
   return `
   <h2>Id: ${id}</h2>
   <p>Name: ${name}</p>
   <p>email: ${email}</p>
   <p>username: ${username}}</p>
    <p>phone:${phone}</p>
    
    <div>adress:
    <li>suite: ${address.suite}</li>
    <li>city: ${address.city}</li>
    <li>zipcode: ${address.zipcode}</li>
    </div>
    <p>website:${website}</p>
    <a href="./photos" class="photoButton">Photos</a>
   `;
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
getData("https://jsonplaceholder.typicode.com/posts", (posts) => {
    postsRow.innerHTML = "";
  posts.map((post) => {
    postsRow.innerHTML += getPostRow(post);
  });
});
function getPostRow({ id, title, body }) {
  return `
    <div>
      <mark>Id: ${id}</mark>
      <h3>Title: ${title}</h3>
      <p>Body: ${body}</p>
    </div>
  `;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 getData(`https://jsonplaceholder.typicode.com/photos`, (photos) => {
    photos.map((photos) => {
      photosRow.innerHTML += getphotoRow(photos);
    });
  });

  function getphotoRow (albumId , id, title ,url ,thumbnailUrl) {
    return `
      <h2>AlbumId:${albumId}</h2>
      <h2>Id</h2>:${id}</h2>
      <p>title:${title}</p>
      <p>URL:${url}</p>
      <p>thumbnailUrl:${thumbnailUrl}</p>
    `;
  }