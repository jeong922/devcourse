// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
const arr = ['🍎', '🍓', '🥑', '🍐', '🍒'];

const mapResult = arr.map((currentValue, index, array) => {
  // currentValue : 처리할 현재 요소
  // index : 처리할 현재 요소의 인덱스
  // array : map()을 호출한 배열
  console.log(
    `currentValue : ${currentValue}, index : ${index}, array : ${array}`
  );
});

const forEachArr = arr.forEach((element) => {
  // 리턴값 없음(undefined)
  return element + '😊';
});

const mapArr1 = arr.map((element) => {
  // 배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열.
  return element + '😊';
});

const mapArr2 = arr.map((element) => element + '😊');

console.log(arr);

console.log(`forEach로 return: ${forEachArr}`);

console.log(`map으로 return: ${mapArr1}`);

console.log(`map으로 return: ${mapArr1}`);

const arr2 = ['1', '2', '3'];

function returnInt(element) {
  return parseInt(element, 10);
}

const result1 = ['1', '2', '3'].map(returnInt); // [1, 2, 3]

const result2 = ['1', '2', '3'].map((str) => parseInt(str));

const result3 = ['1', '2', '3'].map(Number); // [1, 2, 3]

const result4 = ['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
