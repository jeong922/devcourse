// == vs ===

// equality
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
// The equality (==) operator checks whether its two operands are equal, returning a Boolean result.
//  Unlike the strict equality operator, it attempts to convert and compare operands that are of different types.

1 == '1' ? console.log('일치') : console.log('불일치'); // 일치

1 != '1' ? console.log('일치') : console.log('불일치'); // 불일치 -> 1과 '1'을 같다고 봤다는 의미

// strict equality
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
// The strict equality (===) operator checks whether its two operands are equal, returning a Boolean result.
// Unlike the equality operator, the strict equality operator always considers operands of different types to be different.

1 === '1' ? console.log('일치') : console.log('불일치'); // 불일치
1 !== '1' ? console.log('일치') : console.log('불일치'); // 일치 -> 1과 '1'을 같지 않다고 봤다는 의미
