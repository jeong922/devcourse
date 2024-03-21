// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Array 인스턴스의 forEach() 메서드는 각 배열 요소에 대해 제공된 함수를 한 번씩 실행

const arr = ['🍎', '🍓', '🥑', '🍐', '🍒'];

arr.forEach((element, index, array) => {
  // element : 배열에서 처리 중인 요소
  // index : 배열에서 처리 중인 현재 요소의 인덱스
  // array : forEach()를 호출한 배열
  console.log(`element : ${element}, index : ${index}, array : ${array}`);
});

const result = arr.forEach((element) => {
  // forEach는 리턴값 없음(undefined)
  return element + '😊';
});

console.log('result', result);

// Map, 객체 사용 확인
const map = new Map();
map.set(1, '🍎');
map.set(2, '🍓');
map.set(3, '🥑');

map.forEach((element, index, array) => {
  console.log(`element : ${element}, index : ${index}, array : ${array}`);
});

const obj = { length: 3, 1: '🍎', 2: '🍓', 3: '🥑' };

// 이건 안됨
// obj.forEach((element, index, array) => {
//   console.log(`element : ${element}, index : ${index}, array : ${array}`);
// });

// 배열이 아닌 객체에 forEach() 사용
// this의 length 속성을 읽은 다음 키가 length 보다 작은 음수가 아닌 정수인 각 속성에 접근
Array.prototype.forEach.call(obj, (x) => console.log(x));

const arr3 = [1, 2, 3, 4, 5];
const testForEach = [];
const testFor = [];
const testForOF = [];

// return문으로 순회 중단 확인
function forEachTest(arr) {
  arr.forEach((v) => {
    if (v === 3) {
      return;
    }
    testForEach.push(v);
  });
}

function forTest(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 3) {
      return;
    }
    testFor.push(arr[i]);
  }
}

function forOfTest(arr) {
  for (let v of arr) {
    if (v === 3) {
      return;
    }
    testForOF.push(v);
  }
}
forEachTest(arr3);
forTest(arr3);
forOfTest(arr3);

console.log('arr3', arr3);
console.log('testForEach', testForEach); // ❌
console.log('testFor', testFor); // ⭕
console.log('testForOF', testForOF); // ⭕
