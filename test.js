// var p1 = new Promise(function(resolve, reject) {
//     resolve('Success');
//   });
  
//   p1.then(function(value) {
//     console.log(value); // "Success!"
//     throw new Error('oh, no!');
//   }).catch(function(e) {
//     console.error(e.message); // "oh, no!"
//   }).then(function(){
//     console.log('after a catch the chain is restored');
//   }, function () {
//     console.log('Not fired due to the catch');
//   });
  
//   The following behaves the same as above
//   p1.then(function(value) {
//     console.log(value); // "Success!"
//     return Promise.reject('oh, no!');
//   }).catch(function(e) {
//     console.error(e); // "oh, no!"
//   }).then(function(){
//     console.log('after a catch the chain is restored');
//   }, function () {
//     console.log('Not fired due to the catch');
//   }).then(
//       ()=>(console.log("second then after catch"))
//   )
//   ;


// const promise1 = new Promise((resolve, reject) => {
//     throw 'Uh-oh!';
//   });
  
//   promise1.catch((error) => {
//     console.error(error);
//   })
//   .then(console.log("then after catch"))
//   ;

// const promise2 = new Promise((resolve, reject) => {
// throw 'Uh-oh!';
// });

// promise2.catch((error) => {
// console.error(error);
// return error;
// })
// .then( (value)=>{ console.log("then after catch1"), value})
// .then( (value)=>{ console.log("then after catch2", value)})
// ;


// promise2

//     .catch((error) => {console.error(error);return error;    })
//     .then( (value)=>{ console.log("then after catch1"), value})
//     .then( (value)=>{ console.log("then after catch2", value)})
//     ;

// const a = new Promise((resolve, reject) => {
//         // throw 'Uh-oh!';
//         resolve("OK"  );
//       });
//     a.then(function() {
//         console.log("1st then")
//         // makes promise chain assume rejected state
//         return Promise.reject();
//     }).then(function() {
//         console.log("2nd then")
//         // this will not get called because promise is in rejected state
//     }).catch(function() {
//         // this will get called
//         // returning a reject promise will keep the promise in the reject state
//         console.log("3rd catch")
//         return Promise.reject();
//     }).then(function() {
//         console.log("4th then")
//         // this will not get called because promise is in rejected state
//     }).catch(function() {
//         // this will get called
//         console.log("5th catch")
//         return 2;
//     }).then(function(val) {
//         // this will get called because prior `.catch()` "handled" the rejection
//         // already
//         console.log("6th then")
//         console.log(val);    // logs 2
//     }).catch(function() {
//         console.log("7th catch")
//         // return Promise.resolve();
//          // this is not called because promise is in resolved state
//     }).then(()=>{
//         console.log("8th then")}
//     )
//     .then(
//         ()=>{
//         console.log("9th then")}
//     )
Promise.resolve('foo')
// 1. Receive "foo", concatenate "bar" to it, and resolve that to the next then
.then(function(string) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      string += 'bar';
      console.log(string);
      resolve(string);
    }, 3000);
  });
})
// 2. receive "foobar", register a callback function to work on that string
// and print it to the console, but not before returning the unworked on
// string to the next then
.then(function(string) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          string += 'abc';
          console.log(string);
          resolve(string);
        }, 3000);
      });
})
.then(function(string) {

    console.log(string); // foobar
  });