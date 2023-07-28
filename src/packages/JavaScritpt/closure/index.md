---
nav:
  title: Components
  path: /JavaScript
---

## JavaScript-作用域&闭包

## 作用域

作用域是指程序源代码中定义变量的区域。作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限

### 词法作用域和动态作用域

- JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
- 词法作用域：函数的作用域在函数定义的时候就决定了。
- 动态作用域：函数的作用域是在函数调用的时候才决定的。

```jsx | pure
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();

// 结果是 ???  答案 1
```

分析： 执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据定义函数的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

## 闭包

MDN 这样定义闭包：是指那些能够访问自由变量的函数。常见的现象就是把内部函数被保存到外部时，将会生成闭包，闭包会导致原有作用域链不释放，造成内存泄漏。

- 举例

```jsx | pure
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}

var foo = checkscope();
foo(); // "local scope"
```

### 闭包的应用场景

### 防抖

```jsx | pure
function debounce(fun, awit) {
  const timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
```

### 模块化

```jsx | pure
function fn() {
  let name = 'hello';
  function setName(n) {
    name = n;
  }
  function getName() {
    return name;
  }
  return {
    setName: setName,
    getName: getName,
  };
}
let fn1 = fn(); //返回对象，属性setName和getName是两个函数
fn1.getName();
fn1.setName('world'); //setter修改闭包里面的name
fn1.getName();
```

### 闭包总结

- 可以做缓存
- 实现封装，属性私有化
- 模块化开发，防止污染全局变量
