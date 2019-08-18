let itemsList = [{ todo: 'do homework', checked: false }];

function render() {
  $('ul').empty();
  for (let i = 0; i < itemsList.length; i += 1) {
    if (itemsList[i].checked === true) {
      $('ul').append(`<li class='item'><span class='item-name checked'>${itemsList[i].todo}</span> <button class='delete-btn'>X</button></li>`);
    } else {
      $('ul').append(`<li class='item'><span class='item-name'>${itemsList[i].todo}</span> <button class='delete-btn'>X</button></li>`);
    }
  }
}

$(document).ready(() => {
  $('.add-btn').on('click', () => {
    const inputValue = $('#input-item')[0].value;
    if (inputValue !== '') {
      itemsList.push({ todo: inputValue, checked: false });
      render();
    }
    $('#input-item')[0].value = '';
  });

  $('.Todo-items').on('click', (event) => {
    const clickArea = $(event.target);
    if (clickArea.hasClass('delete-btn')) {
      const deletedItem = clickArea.siblings($('.item-name')).html();
      itemsList = itemsList.filter(item => item.todo !== deletedItem);
      render();
    } else if (clickArea.hasClass('item-name')) {
      for (let i = 0; i < itemsList.length; i += 1) {
        if (itemsList[i].todo === clickArea.html()) {
          itemsList[i].checked = true;
        }
      }
      render();
    }
  });
});

render();
