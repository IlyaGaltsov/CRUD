function showRows(users) {
  for (let user of users) {
    showUserRow(user);
  }
}

function showUserRow(user) {
  const container = createElement('div', '#users', '', { 'data-user-id': user.id }); // container

  createElement('div', container, user.id); // idElement

  createElement('div', container, user.name + ' ' + user.lastName); // nameElement

  const actionsElement = createElement('div', container, '', { className: 'actions', 'data-id': user.id });

  createElement(
    'input',
    actionsElement,
    '',
    { type: 'button', value: 'Edit', 'data-type': 'edit' },
    {
      click: handleEditUser
    }
  ); // editBtnElement

  createElement(
    'input',
    actionsElement,
    '',
    { type: 'button', value: 'Delete', 'data-type': 'delete' },
    {
      click: handleDeleteUser
    }
  );
  // deleteBtnElement
  createElement(
    'input',
    actionsElement,
    '',
    { type: 'button', value: 'View', 'data-type': 'view', 'data-user-id': user.id },
    {
      click: handleViewUser
    }
  ) 
}

function showAddUserForm() {
  const parentSelector = '#form form';

  const userDetailsContainer = document.getElementById('user-details-container');
  userDetailsContainer.innerHTML = '';

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'login',
      type: 'text',
      placeholder: 'Enter login'
    }
  ); // login input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'password',
      type: 'text',
      placeholder: 'Enter password'
    }
  );

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter name'
    }
  ); // name input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter last name'
    }
  ); // lastName input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'age',
      type: 'number',
      placeholder: 'Enter age'
    }
  );

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'email',
      type: 'text',
      placeholder: 'Enter email'
    }
  ); // email input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'tel',
      type: 'number',
      placeholder: 'Enter tel'
    }
  );

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'card',
      type: 'number',
      placeholder: 'Enter card number'
    }
  );

  createElement(
    'input',
    parentSelector,
    '',
    {
      type: 'button',
      value: 'Save'
    },
    {
      click: handleSaveUser
    }
  );

}

function handleSaveUser() {
  const formElements = document.forms[0].elements;

  const login = formElements.login.value;
  const password = formElements.password.value;
  const name = formElements.name.value;
  const lastName = formElements.lastName.value;
  const age = formElements.age.value;
  const email = formElements.email.value;
  const tel = formElements.tel.value;
  const cardNumber = formElements.card.value;

  const user = {
    login,
    password,
    name,
    lastName,
    age,
    email,
    tel,
    cardNumber,
    id: Date.now(), // TODO: think about other options
  };

  const isValid = validate(user);

  if (!isValid) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Введите корректные данные';
    return;
  }
  
  // Очищаем сообщение об ошибке, если данные валидны
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';

  saveUser(user);
  cleanElement('#form form');
}

function validate(user) {
  // Регулярное выражение для проверки email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Регулярное выражение для проверки имени и фамилии (разрешены только буквы и пробелы)
  const nameRegex = /^[A-Za-z\s]+$/;

  // Регулярное выражение для проверки логина (разрешены только буквы, цифры и символы _ и -)
  const loginRegex = /^[A-Za-z0-9_-]+$/;

  // Проверяем логин
  if (!loginRegex.test(user.login)) {
    return false;
  }

  // Проверяем имя
  if (!nameRegex.test(user.name)) {
    return false;
  }

  // Проверяем фамилию
  if (!nameRegex.test(user.lastName)) {
    return false;
  }

  // Проверяем email
  if (!emailRegex.test(user.email)) {
    return false;
  }

  return true;
}

function saveUser(newUser) {
  users.push(newUser);
  updateStorage();
  showUserRow(newUser);
}

function handleEditUser (){
  showAddUserForm();
}

function handleDeleteUser(event) {
  const userId = event.target.parentNode.getAttribute('data-id');

  // Используйте confirm() для запроса подтверждения
  const confirmDelete = confirm("Вы уверены, что хотите удалить этого пользователя?");

  if (confirmDelete) {
    deleteUserById(+userId);
    userDetailsContainer.innerHTML = '';
  }
}

function getUsersFromStorage() {
  // Получаем данные из localStorage
  const storedUsers = localStorage.getItem('users');

  // Проверяем, есть ли данные в localStorage
  if (storedUsers) {
    // Разбираем строку JSON и преобразуем её в массив объектов пользователей
    const parsedUsers = JSON.parse(storedUsers);
    return parsedUsers;
  } else {
    // Если данных нет в localStorage, возвращаем пустой массив
    return [];
  }
}

function handleViewUser(event) {
  const userId = event.target.getAttribute('data-user-id');
  const user = getUserById(+userId);
  const userDetailsContainer = document.getElementById('user-details-container');

  if (user) {
    // Очистите контейнер перед отображением новых данных
    userDetailsContainer.innerHTML = '';

    // Создайте элементы для отображения данных пользователя
    const userIdElement = document.createElement('div');
    userIdElement.textContent = `User ID: ${user.id}`;

    const loginElement = document.createElement('div');
    loginElement.textContent = `Login: ${user.login}`;

    const passwordElement = document.createElement('div');
    passwordElement.textContent = `Password: ${user.password}`;

    const nameElement = document.createElement('div');
    nameElement.textContent = `Name: ${user.name}`;

    const lastNameElement = document.createElement('div');
    lastNameElement.textContent = `Last Name: ${user.lastName}`;

    const ageElement = document.createElement('div');
    ageElement.textContent = `Age: ${user.age}`;

    const emailElement = document.createElement('div');
    emailElement.textContent = `Email: ${user.email}`;

    const telElement = document.createElement('div');
    telElement.textContent = `Tel: ${user.tel}`;

    const cardElement = document.createElement('div');
    cardElement.textContent = `Credit Card: ${user.cardNumber}`;

    // Добавьте созданные элементы к контейнеру
    userDetailsContainer.appendChild(userIdElement);
    userDetailsContainer.appendChild(loginElement);
    userDetailsContainer.appendChild(nameElement);
    userDetailsContainer.appendChild(lastNameElement);
    userDetailsContainer.appendChild(emailElement);
    userDetailsContainer.appendChild(passwordElement);
    userDetailsContainer.appendChild(telElement);
    userDetailsContainer.appendChild(ageElement);
    userDetailsContainer.appendChild(cardElement);

  } else {
    userDetailsContainer.textContent = 'User not found';
  }
}

function getUserById(id) {
  return users.find(user => user.id === id);
}

function deleteUserById(id) {
  const indexToRemove = users.findIndex(user => user.id === id);
  users.splice(indexToRemove, 1);
  removeElement(`div[data-user-id="${id}"]`);
  updateStorage();
}

function updateStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}