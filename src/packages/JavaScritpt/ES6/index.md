---
nav:
  title: Components
  path: /JavaScript
---

## JavaScript-ES6 相关

读阮一峰老师的[ECMAScript 6 入门](https://es6.ruanyifeng.com/)

### Symbol

- ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它属于 JavaScript 语言的原生数据类型之一，其他数据类型是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。
- Symbol 类型用于保证保证**唯一性**，避免属性名重复问题

#### 唯一性

```jsx | pure
let s = Symbol();
typeof s;
// "symbol"

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2; // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2; // false
```

#### 值描述

```jsx | pure
const sym = Symbol('foo');
sym.description; // "foo"
```

#### 作为对象属性

```jsx | pure
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!',
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"

// 注意对象不能使用点添加Symbol属性
```

#### 获得同一个 symbol 值 Symbol.for()

```jsx | pure
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2; // true
```

### Iterator 迭代器和 for...of

- Iterator 是解构赋值，剩余/扩展运算符，生成器，for of 循环实现的基础
- 所谓迭代器，其实就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function () {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;

      return {
        done: done,
        value: value,
      };
    },
  };
}

// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

### 剩余/扩展运算符

### Set 和 Map

### Proxy 和 Reflect

### Generator 函数的异步应用

### Module
