/**
 * Формируем массив package'эй из package-lock.json.
 * */
    // В packagesObj вставляем всё из package-lock.json
const packagesObj = {};

const objInString = JSON.stringify(packagesObj);

const regExp1 = /"\w+(-*)\w+":{/g;
const dirtyPackages = objInString.match(regExp1);

const regExp2 = /\w+(-*)\w+/g;
const cleanPackages = (dirtyPackages.toString()).match(regExp2);

/**
 * Унифицируем массив зависимостей
 * */
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

const uniqueArr = arrayUnique(cleanPackages);

/**
 * Поиск совпадений с текстом на сайте
 * */
const elems = [...document.querySelectorAll('td')];

const resultArr = uniqueArr.filter(str =>
    elems.find(el =>
        el.textContent === str
    )
);

const resultString = resultArr.join(', ');

console.log(resultString);

