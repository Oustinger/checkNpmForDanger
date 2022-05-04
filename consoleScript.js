/**
 * Этот скрипт выводит имена package'эй, которые совпадают с теми, что указаны на сайте
 * https://docs.google.com/spreadsheets/d/1H3xPB4PgWeFcHjZ7NOPtrcya_Ua4jUolWm-7z9-jSpQ/htmlview#.
 *
 * Выполнять скрипт следует в консоли браузера.
 * */

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
const elems = document.querySelectorAll('td.s1');
const bigInnerTextFromElems = [...elems].reduce((acc, elem) => `${acc}, ${elem.innerText}`, '');

uniqueArr.forEach(str => bigInnerTextFromElems.match(new RegExp('\\b' + str + '\\b')) ? console.log(str) : null);
