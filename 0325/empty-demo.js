// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps
// Map : The number of items in a Map is easily retrieved from its size property.
// Object : Determining the number of items in an Object is more roundabout and less efficient. A common way to do it is through the length of the array returned from Object.keys().
const obj1 = {};
const obj2 = { message: '❤' };
const num = 1;
const str1 = 'one';
const str2 = ''; // 문자열도 객체

console.log(Object.keys(obj1).length === 0);
console.log(Object.keys(obj2).length === 0);

console.log(Object.keys(num).length === 0);
console.log(Object.keys(str1).length === 0);
console.log(Object.keys(str2).length === 0);

console.log(isEmpty(obj1)); // true
console.log(isEmpty(obj2)); // false

console.log(isEmpty(num)); // undefined
console.log(isEmpty(str1)); // flase
console.log(isEmpty(str2)); // true

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
function isEmpty(obj) {
  // if (obj.constructor !== Object) {
  // 	// 이렇게 하면 문자도 객체라고 했는데 문자도 여기서 필터링됨
  //   return;
  // }

  if (obj.constructor === Number) {
    // 숫자인 경우만 필터링 되게 설정
    // throw new Error('숫자 ㄴㄴ'); // 에러던지기 -> 이렇게 하면 프로그램이 죽어버리니까 try..catch로 에러처리 잘 해야 함
    return;
  }

  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}
