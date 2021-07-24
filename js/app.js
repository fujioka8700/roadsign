$('select').change(function () {
    var val = $('select option:selected').val();
    if (val == 'select') return;
    $('section').fadeOut();
    $('section#' + val).fadeIn();
});

let lastDisplayedElement;
const select = document.querySelector('select');

// 前回、表示していた標識を消去
function erasePreviousDisplay(lastParentSection) {
    if (lastParentSection != null) {
        const removeParent = lastParentSection.getElementsByClassName('wrap')[0];
        while (removeParent.firstChild) {
            removeParent.removeChild(removeParent.firstChild);
        }
    }
}

// sign.json の情報から、div要素を作成
function createDivElement(newImageElement, newContent, newElement, property, data) {
    newImageElement.setAttribute('src', `../images/${data[property].filename}`);
    newContent.textContent = data[property].name;

    newElement.appendChild(newImageElement);
    newElement.appendChild(newContent);

    newElement.setAttribute("class", "item");

    return newElement;
}

// 選択したカテゴリの、表示する標識を作成
function selectCategoryDisplay(newElement, newImageElement, newContent, property, data) {
    if (select.value === data[property].category) {
        const parentSection = document.getElementById(select.value);
        let childDiv = parentSection.getElementsByClassName('wrap')[0];

        newElement = createDivElement(newImageElement, newContent, newElement, property, data);

        childDiv.appendChild(newElement);
    }
}

// sign.json から標識の情報を取得
function getSignInformation() {
    $.getJSON('./sign.json', (data) => {
        for (const property in data) {
            let newElement = document.createElement("div");
            let newImageElement = document.createElement("img");
            let newContent = document.createElement("h2");

            selectCategoryDisplay(newElement, newImageElement, newContent, property, data);
        }
    });
}

// セレクタを変更すると、標識の表示変更
select.addEventListener('change', function () {
    const lastParentSection = document.getElementById(lastDisplayedElement);

    erasePreviousDisplay(lastParentSection);

    getSignInformation();

    lastDisplayedElement = select.value;
});