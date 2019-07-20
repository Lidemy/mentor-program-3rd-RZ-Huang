$(document).ready(() => {
  $('.add-btn').on('click', () => {
    const inputValue = $('#input-item')[0].value;
    if (inputValue !== '') {
      $('ul').append(`<li class='item'><span class='item-name'>${inputValue}</span> <button class='delete-btn'>X</button></li>`);
    }
    $('#input-item')[0].value = '';
  });

  $('.Todo-items').on('click', (event) => {
    const clickArea = $(event.target);
    if (clickArea.hasClass('delete-btn')) {
      clickArea.parent().remove();
    } else if (clickArea.hasClass('item-name')) {
      clickArea.addClass('checked');
    }
  });
});
