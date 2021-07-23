$('select').change(function () {
    var val = $('select option:selected').val();
    if (val == 'select') return;
    $('section').fadeOut();
    $('section#' + val).fadeIn();
});

let lastDisplayedElement;
const select = document.querySelector('select');

select.addEventListener('change', function () {
    let lastParentSection = document.getElementById(lastDisplayedElement);
    if (lastParentSection != null) {
        const removeParent = lastParentSection.getElementsByClassName('wrap')[0];
        while (removeParent.firstChild) {
            removeParent.removeChild(removeParent.firstChild);
        }
    }

    $.getJSON('../sign.json', (data) => {
        for (const property in data) {
            let newElement = document.createElement("div");
            let newImageElement = document.createElement("img");
            let newContent = document.createElement("h2");

            if (select.value === data[property].category) {
                const parentSection = document.getElementById(select.value);
                let childDiv = parentSection.getElementsByClassName('wrap')[0];

                newImageElement.setAttribute('src', `../images/${data[property].filename}`);
                newContent.textContent = data[property].name;

                newElement.appendChild(newImageElement);
                newElement.appendChild(newContent);

                newElement.setAttribute("class", "item");

                childDiv.appendChild(newElement);
            }
        }
    });

    lastDisplayedElement = select.value;
});