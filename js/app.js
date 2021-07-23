$('select').change(function () {
    var val = $('select option:selected').val();
    if (val == 'select') return;
    $('section').fadeOut();
    $('section#' + val).fadeIn();
});

const select = document.querySelector('select');
select.addEventListener('change', function () {
    console.log(select.value);
    $.getJSON('../sign.json', (data) => {
        for (const property in data) {
            let newElement = document.createElement("div");
            let newImageElement = document.createElement("img");
            let newContent = document.createElement("h2");

            if ('red-circle' === data[property].category) {
                newImageElement.setAttribute('src', `../images/${data[property].filename}`);
                newContent.textContent = data[property].name;

                newElement.appendChild(newImageElement);
                newElement.appendChild(newContent);

                newElement.setAttribute("class", "item");
                console.log(newElement);
            }
        }
    });
});