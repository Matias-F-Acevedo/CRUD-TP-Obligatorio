// Trabajo práctico obligatorio. Entrega viernes 9. Crear un backend de prueba en MockAPI. Realizar el frontend de las operaciones CRUD que fueron provistas en clase (pueden usarlas, modificarlas o hacer otras distintas).

const urlBase = "https://647a88b8d2e5b6101db06985.mockapi.io/users";

let table = document.querySelector("#table");
let container = document.getElementById("container");
let header = document.querySelector(".header");
let allContent = document.querySelector("#allContent");
let buttonCreateNewUser = document.getElementById("CreateNewUser");
let inputSearch = document.getElementById("inputSearch");
inputSearch.placeholder = "Search user by name";

// ----------------------------------users------------------------------------------

fetch(urlBase)
  .then((response) => response.json())
  .then((data) =>
    data.forEach((element) => {
      let id = element.id;
      let createdAt = new Date(element.createdAt).toLocaleDateString();
      let name = element.name;
      let lastName = element.lastName;
      let email = element.email;
      let phone = element.phone;

      let td0 = document.createElement("td");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");

      let showButton = document.createElement("button");
      showButton.id = "showButton";
      showButton.textContent = "Show";

      td0.textContent = id;
      td1.textContent = name;
      td2.textContent = lastName;
      td3.textContent = email;
      td4.textContent = phone;
      td5.textContent = createdAt;

      td6.appendChild(showButton);

      let tr = document.createElement("tr");
      tr.className = "buscador";

      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);

      let tbody = document.getElementById("tableTbody");

      tbody.appendChild(tr);

      table.appendChild(tbody);

      // ---------------------------------opciones CRUD--------------------------------

      showButton.addEventListener("click", () => {
        table.remove();
        header.remove();
        container.id = "card";
        allContent.id = "cardContainer";

        let divShow = document.createElement("div");
        divShow.id = "divShow";
        container.appendChild(divShow);

        let p1 = document.createElement("p");
        p1.id = "p1";
        let span1 = document.createElement("span");
        p1.innerText = "Name: ";
        p1.appendChild(span1);
        span1.textContent = element.name.toUpperCase();

        let p2 = document.createElement("p");
        p2.id = "p2";
        let span2 = document.createElement("span");
        p2.textContent = "LastName: ";
        p2.appendChild(span2);
        span2.textContent = element.lastName.toUpperCase();

        let p3 = document.createElement("p");
        p3.id = "p3";
        let span3 = document.createElement("span");
        p3.textContent = "Email: ";
        p3.appendChild(span3);
        span3.textContent = element.email;

        let p4 = document.createElement("p");
        p4.id = "p4";
        let span4 = document.createElement("span");
        p4.textContent = "Phone: ";
        p4.appendChild(span4);
        span4.textContent = element.phone;

        let p5 = document.createElement("p");
        p5.id = "p5";
        let span5 = document.createElement("span");
        p5.textContent = "CreateAt: ";
        p5.appendChild(span5);
        span5.textContent = new Date(element.createdAt).toLocaleDateString();

        let editButton = document.createElement("button");
        editButton.id = "editButton";
        editButton.textContent = "Edit User";

        let deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.textContent = "Delete User";

        let cancelButton = document.createElement("button");
        cancelButton.className = "cancelButton";
        cancelButton.textContent = "Cancel";

        let cancelLink = document.createElement("a");
        cancelLink.className = "cancelLink";
        cancelLink.href = "./allUsers.html";
        cancelLink.appendChild(cancelButton);

        divShow.appendChild(p1);
        divShow.appendChild(p2);
        divShow.appendChild(p3);
        divShow.appendChild(p4);
        divShow.appendChild(p5);

        container.appendChild(editButton);
        container.appendChild(deleteButton);
        container.appendChild(cancelLink);

        // ---------------------------------EDIT USER----------------------------------
        editButton.addEventListener("click", () => {
          divShow.remove();
          p1.remove();
          p2.remove();
          p3.remove();
          p4.remove();
          p5.remove();
          editButton.remove();
          deleteButton.remove();

          let h2editUser = document.createElement("h2");
          h2editUser.textContent = "Edit User";
          h2editUser.id = "h2editUser";
          container.appendChild(h2editUser);

          let formEditUser = document.createElement("form");
          formEditUser.id = "formEditUser";
          container.appendChild(formEditUser);

          let inputName = document.createElement("input");
          inputName.placeholder = "Name";
          let inputLastName = document.createElement("input");
          inputLastName.placeholder = "LastName";
          let inputEmail = document.createElement("input");
          inputEmail.placeholder = "Email";
          let inputPhone = document.createElement("input");
          inputPhone.placeholder = "Phone Number";

          inputName.id = "nameInput";
          inputName.type = "text";
          inputName.required = "true";
          inputName.value = element.name;
          formEditUser.appendChild(inputName);

          inputLastName.id = "lastNameInput";
          inputLastName.type = "text";
          inputLastName.required = "true";
          inputLastName.value = element.lastName;
          formEditUser.appendChild(inputLastName);

          inputEmail.id = "emailInput";
          inputEmail.type = "email";
          inputEmail.required = "true";
          inputEmail.value = element.email;
          formEditUser.appendChild(inputEmail);

          inputPhone.id = "phoneInput";
          inputPhone.type = "tel";
          inputPhone.required = "true";
          inputPhone.value = element.phone;
          formEditUser.appendChild(inputPhone);

          let buttonAcceptEdit = document.createElement("button");
          buttonAcceptEdit.id = "buttonAcceptEdit";
          buttonAcceptEdit.innerText = "Save Changes";

          formEditUser.appendChild(buttonAcceptEdit);
          container.appendChild(cancelLink);

          // ---------------------------------ACCEPT EDIT USER---------------------------
          buttonAcceptEdit.addEventListener("click", () => {
            if (
              inputName.value == "" ||
              inputLastName.value == "" ||
              inputEmail.value == "" ||
              inputPhone.value == ""
            ) {
              alert("Complete all data input fields");
            } else {
              const updatedUser = {
                name: inputName.value,
                lastName: inputLastName.value,
                email: inputEmail.value,
                phone: inputPhone.value,
              };

              function updateOne(id, user) {
                fetch(urlBase + `/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(user),
                })
                  .then((res) => res.json())
                  .then((data) => console.log(data))
                  .catch((err) => console.error(err));
              }

              updateOne(element.id, updatedUser);

              inputName.remove();
              inputLastName.remove();
              inputEmail.remove();
              inputPhone.remove();
              formEditUser.remove();

              h2editUser.innerText = "The changes have been saved Successfully";
              h2editUser.id = "editedUser";

              buttonAcceptEdit.remove();
              cancelButton.textContent = "Back to home";
            }
          });
        });

        // ---------------------------------DELETE USER---------------------------------
        deleteButton.addEventListener("click", () => {
          divShow.remove();
          p1.remove();
          p2.remove();
          p3.remove();
          p4.remove();
          p5.remove();
          editButton.remove();
          deleteButton.remove();

          let h2Delete = document.createElement("h2");
          h2Delete.innerText = "Are you sure you want to delete this user?";
          h2Delete.id = "editedUser";
          container.appendChild(h2Delete);

          let buttonDeleteAccept = document.createElement("button");
          buttonDeleteAccept.id = "buttonDeleteAccept";
          buttonDeleteAccept.innerText = "Delete";

          container.appendChild(buttonDeleteAccept);
          container.appendChild(cancelLink);

          buttonDeleteAccept.addEventListener("click", () => {
            function deleteOne(id) {
              fetch(urlBase + `/${id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
            }

            deleteOne(element.id);

            h2Delete.innerText = "User Successfully Deleted";
            h2Delete.id = "h2deletedUser";

            buttonDeleteAccept.remove();
            cancelButton.textContent = "Back to home";
          });
        });
      });
    })
  )
  .catch((error) => console.log(error, "No se puedo resolver la peticion"));

// ---------------------------------CREATE USER--------------------------------------

buttonCreateNewUser.addEventListener("click", () => {
  table.remove();
  header.remove();
  container.id = "card";
  allContent.id = "cardContainer";

  let h2CreateNewUser = document.createElement("h2");
  h2CreateNewUser.textContent = "Create New User";
  h2CreateNewUser.id = "h2CreateNewUser";
  container.appendChild(h2CreateNewUser);

  let formCreateNewUser = document.createElement("form");
  formCreateNewUser.id = "formCreateNewUser";
  container.appendChild(formCreateNewUser);

  let inputName = document.createElement("input");
  inputName.placeholder = "Name";
  let inputLastName = document.createElement("input");
  inputLastName.placeholder = "LastName";
  let inputEmail = document.createElement("input");
  inputEmail.placeholder = "Email";
  let inputPhone = document.createElement("input");
  inputPhone.placeholder = "Phone Number";

  inputName.id = "nameInput";
  inputName.type = "text";
  inputName.required = "true";
  formCreateNewUser.appendChild(inputName);

  inputLastName.id = "lastNameInput";
  inputLastName.type = "text";
  inputLastName.required = "true";
  formCreateNewUser.appendChild(inputLastName);

  inputEmail.id = "emailInput";
  inputEmail.type = "email";
  inputEmail.required = "true";
  formCreateNewUser.appendChild(inputEmail);

  inputPhone.id = "phoneInput";
  inputPhone.type = "tel";
  inputPhone.required = "true";
  formCreateNewUser.appendChild(inputPhone);

  let confirmCreateNewUser = document.createElement("button");
  confirmCreateNewUser.id = "confirmCreateNewUser";

  confirmCreateNewUser.innerText = "Create new user";

  let cancelButton = document.createElement("button");
  cancelButton.className = "cancelButton";
  let cancelLink = document.createElement("a");
  cancelLink.className = "cancelLink";
  cancelButton.innerText = "Cancel";
  cancelLink.href = "./allUsers.html";
  cancelLink.appendChild(cancelButton);

  formCreateNewUser.appendChild(confirmCreateNewUser);
  container.appendChild(cancelLink);

  confirmCreateNewUser.addEventListener("click", () => {
    if (
      inputName.value == "" ||
      inputLastName.value == "" ||
      inputEmail.value == "" ||
      inputPhone.value == ""
    ) {
      alert("Complete all data input fields");
    } else {
      const newUser = {
        name: inputName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        phone: inputPhone.value,
      };

      function addOne(user) {
        fetch(urlBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      }

      addOne(newUser);

      inputName.remove();
      inputLastName.remove();
      inputEmail.remove();
      inputPhone.remove();
      formCreateNewUser.remove();

      h2CreateNewUser.innerText = "User has been created Successfully";
      h2CreateNewUser.id = "Usercreated";

      confirmCreateNewUser.remove();
      cancelButton.textContent = "Back to home";
    }
  });
});

// ---------------------------------Buscador--------------------------------------

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#inputSearch")) {
    document.querySelectorAll(".buscador").forEach((element) => {
      if (
        element.firstElementChild.nextSibling.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        element.classList.remove("filtro");
      } else {
        element.classList.add("filtro");
      }
    });
  }
});

// ---------------------------------------------------------------------------------------

// -----------------------Ordenamiento alfabetico-----------------------------------------

function sortGrid(colNum, type) {
  //busco el cuerpo de la tabla (tbody).
  let tbody = table.querySelector("tbody");

  // se utiliza el método Array.from para crear una copia superficial de las filas de la tabla en un nuevo array llamado rowsArray. Esto se hace para poder ordenar las filas.
  let rowsArray = Array.from(tbody.rows);

  // compare(a, b) compara dos filas, necesario para ordenar. es la variable donde guardo el retorno de la funcion.
  let compare;

  //segun el tipo de dato especificado en th.dataset.type la variable compare recibe la funcion especifica para ordenerar los elementos, la cual se la pasara como parametro de ordenamiento al metodo sort:

  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        // si yo resto las resto entre ellas(el valor de cada una, osea su contenido) y me da un numero negativo, significa que la rowA es MENOR a rowB(si da positivo rowA es MAYOR a rowB). el resultado es el retorno de la funcion.

        // rowA.cells[colNum]=    fila 1(tr).celdas(td).columna 0

        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };

      break;

    case "string":
      compare = function (rowA, rowB) {
        // operador ternario
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }
  // el metodo sort ordena el array superficial que se encuentra en rowsArray ( que son las filas de  la tabla (los tr)) y se le pasa por parametro una funcion que es el orden de clasificacion en el caso de los numeros (id) se restan entre ellos y si da negativo el resultado B> A  y si da positivo A<B . en cuanto a los strings se le asigna un valor numerico, si es mayor 1 y si es menor -1 .
  rowsArray.sort(compare);

  // agrego la filaS ordenadas al cuerpo de la tabla. el operador "..." desempaqueta los elementos(cada fila) del array y los pasa como argurmentos separados a append().
  // es parecido a esto: tbody.append(fila1, fila2, fila3, etc)
  tbody.append(...rowsArray);
}

table.addEventListener("click", (e) => {
  // compruebo si el elemento en el que se hizo clic no es un encabezado de tabla (TH). si no es un encabezado, la función no retorna nada y por consecuencia finaliza ahi.
  if (e.target.tagName != "TH") return;
  // si se hizo click en un TH, guardo una referencia(es el elemento del dom) al mismo en la variable:
  let th = e.target;

  //th.cellIndex devuelve la posición del encabezado de la columna en la colección de celdas de la fila de la tabla. Es decir, el número de columna (0 para la primera columna, 1 para la segunda columna, etc)
  // th.dataset.type obtiene el valor del atributo de datos type del encabezado de columna.
  // id =  data-type="number"
  // name y lastname = data-type="string"

  sortGrid(th.cellIndex, th.dataset.type);
});

// ---------------------------------------------------------------------------------------
