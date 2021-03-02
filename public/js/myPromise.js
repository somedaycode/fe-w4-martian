class MyPromise {
  constructor(initialStr) {
    this.cbList = [initialStr];

    setTimeout(() => {
      const result = this.cbList.reduce((prev, curr) => {
        return curr(prev);
      });
      return result;
    }, 0);
  }

  then(cb) {
    this.cbList.push(cb);

    return this;
  }
}

// test case
// console.log('start');

// new MyPromise('hello') //
//   .then((v) => v + ' world')
//   .then((v) => v + ' and crong');

// console.log('end');

// 실행결과 :
//   start
//   end
//   hello world and crong
