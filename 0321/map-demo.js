// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

const arr = ['🍎', '🍓', '🥑'];
const map = new Map();

// 추가
arr.forEach((v, i) => map.set(i + 1, v));

console.log(map);
map.set(4, '🥝');
console.log(map);

// 크기 확인
console.log(map.size);

// 순회
map.forEach((value, key) => console.log(key, value));
console.log(map.keys()); // [Map Iterator] { 1, 2, 3, 4 }
console.log(map.values()); // [Map Iterator] { '🍎', '🍓', '🥑', '🥝' }
console.log(map.entries()); // [Map Entries] { [ 1, '🍎' ], [ 2, '🍓' ], [ 3, '🥑' ], [ 4, '🥝' ] }

// 찾기
console.log(map.get(1));
console.log(map.get(2));
console.log(map.get(3));
console.log(map.get(4));

// 존재 확인
console.log(map.has(1)); // true
console.log(map.has(12)); // false

// 삭제
map.delete(1);
console.log(map);

// 전체 삭제
map.clear();
console.log(map);

// ----------------------------------------------------------------------------------------------
// Map vs Object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#object_and_map_compared
/**
 * The keys of an Object are strings or symbols, whereas they can be of any value for a Map.
 * You can get the size of a Map easily, while you have to manually keep track of size for an Object.
 * The iteration of maps is in insertion order of the elements.
 * An Object has a prototype, so there are default keys in the map. (This can be bypassed using map = Object.create(null).)
 */

const key = { name: '커피', icon: '☕' };
const pudding = { name: '푸딩', icon: '🍮' };

const obj2 = {
  [key]: pudding,
};

const mapTest = new Map([[key, pudding]]);
console.log(obj2); //{ '[object Object]': { name: '푸딩', icon: '🍮' } }
console.log(mapTest); // Map(1) { { name: '커피', icon: '☕' } => { name: '푸딩', icon: '🍮' } }
console.log(obj2[key]); // { name: '푸딩', icon: '🍮' }
console.log(mapTest[key]); // undefined -> 이렇게 접근 안된다.
console.log(mapTest.get(key)); //{ name: '푸딩', icon: '🍮' }

const map2 = new Map();
arr.forEach((v, i) => map2.set(i + 1, v));
const obj = { 1: '🍎', 2: '🍓', 3: '🥑' };

// 객체는 forEach 안됨 -> TypeError: obj.forEach is not a function
// obj.forEach((v, key) => {
//   console.log(`v : ${v}, key : ${key}`);
// });

for (const key in obj) {
  console.log(`obj: ${key} = ${obj[key]}`);
}

console.log(`Object.keys(): ${Object.keys(obj)}`); // 1,2,3

console.log(`Object.entries(): ${Object.entries(obj)}`); // [ [ '1', '🍎' ], [ '2', '🍓' ], [ '3', '🥑' ] ]

for (const [key, value] of Object.entries(obj)) {
  console.log(`Object.entries() + for..of : ${key}: ${value}`);
}

//-------------------------------
map2.forEach((v, i, array) => {
  console.log(`forEach - v : ${v}, i : ${i}, array : ${array}`);
});

for (const [key, value] of map2) {
  console.log(`${key} = ${value}`);
}

for (const key of map2.keys()) {
  console.log(key);
}

for (const value of map2.values()) {
  console.log(value);
}

for (const [key, value] of map2.entries()) {
  console.log(`${key} = ${value}`);
}
