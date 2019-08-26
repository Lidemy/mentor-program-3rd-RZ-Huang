const baseUrl = 'http://rzmessageboard.tw/TodoList/api.php';
let itemList;

// send a request to server
async function sendRequest(method, data) {
  await $.ajax({
    method,
    url: baseUrl,
    async: true,
    data,
  });
}

// render
async function render() {
  try {
    await $.ajax({
      method: 'GET',
      url: baseUrl,
      async: true,
    }).done((res) => {
      $('ul').empty();
      itemList = JSON.parse(res);
      for (let i = 0; i < itemList.length; i += 1) {
        // 未完成
        if (itemList[i].state === '1') {
          $('ul').append(`
          <li class='item' data-id='${itemList[i].id}'>
            <span class='item-name'>${itemList[i].item_name}</span>
            <button class='delete-btn'>X</button>
            <button class='btn btn-outline-success edit-btn'>Edit</button>
          </li>
          `);
          // 已完成
        } else if (itemList[i].state === '2') {
          $('ul').append(`
          <li class='item' data-id='${itemList[i].id}'>
            <span class='item-name checked'>${itemList[i].item_name}</span>
            <button class='delete-btn'>X</button>
            <button class='btn btn-outline-success edit-btn'>Edit</button>
          </li>
          `);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// add a item of todo
async function addItem() {
  try {
    const itemName = $('#input-item')[0].value;
    if (itemName !== '') {
      await sendRequest('POST', { itemName });
      $('#input-item')[0].value = '';
      render();
    }
  } catch (error) {
    console.log(error);
  }
}

// delete a item of todo
async function deleteItem() {
  try {
    if (!window.confirm('確定刪除此項目？')) return;
    const id = $(this).parent().attr('data-id');
    await sendRequest('DELETE', { id });
    render();
  } catch (error) {
    console.log(error);
  }
}


// edit item state of todo
async function editState() {
  try {
    const id = $(this).parent().attr('data-id');
    await sendRequest('PATCH', { id });
    render();
  } catch (error) {
    console.log(error);
  }
}

// click a editing button of item
function clickEditButton() {
  const itemName = $(this).siblings('.item-name').html();

  $(this).parent().html(`
  <span class='item-name'>${itemName}</span>
  <button class='delete-btn'>X</button>
  <button class='btn btn-outline-danger cancel-btn'>Cancel</button> 
  <input type='text' name='edit-item' id='edit-item' value='${itemName}'>
  <button class='done-btn btn btn-primary btn-sm'>Done</button>
  `);
}

// edit a item of todo
async function editItem() {
  try {
    const id = $(this).parent().attr('data-id');
    const itemName = $(this).siblings('#edit-item')[0].value;
    await sendRequest('PATCH', { id, itemName });
    render();
  } catch (error) {
    console.log(error);
  }
}


// cancel editing
function cancelEdit() {
  render();
}

// add a item by Enter key
async function enterToSubmit(e) {
  try {
    const itemName = $('#input-item')[0].value;
    if (itemName !== '' && e.keyCode === 13) {
      e.preventDefault();
      await sendRequest('POST', { itemName });
      $('#input-item')[0].value = '';
      render();
    }
  } catch (error) {
    console.log(error);
  }
}

// edit a item by Enter key
async function enterToEditingSubmit(e) {
  try {
    const id = $(this).parent().attr('data-id');
    const itemName = $(this)[0].value;
    if (e.keyCode === 13) {
      await sendRequest('PATCH', { id, itemName });
      render();
    }
  } catch (error) {
    console.log(error);
  }
}

render();

$(document).ready(() => {
  $('.add-btn').on('click', addItem);
  $('.Todo-items').on('click', '.delete-btn', deleteItem);
  $('.Todo-items').on('click', '.item-name', editState);
  $('.Todo-items').on('click', '.edit-btn', clickEditButton);
  $('.Todo-items').on('click', '.done-btn', editItem);
  $('.Todo-items').on('click', '.cancel-btn', cancelEdit);

  $('#input-item').on('keydown', enterToSubmit);
  $('.Todo-items').on('keydown', '#edit-item', enterToEditingSubmit);
});
