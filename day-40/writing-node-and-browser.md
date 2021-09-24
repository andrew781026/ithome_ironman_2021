# Writing for node and the browser
- 01 July 2010
> Modules that can be used both on the server and the client-side are a useful way to reuse code. This is one way of writing a module that will work well with both systems, while allowing you to write code in the familiar node style.

In node you use module.exports (or just exports) to expose a function:

```javascript
exports.test = function(){
    return 'hello world';
};
```
However, in the browser this will break since 'exports' is not defined. So, to work around this, we first need to check if exports is defined, and if not, create a sensible object for exporting functions to. In the browser this could be a global with the same name as the module:
```javascript
if(typeof exports == 'undefined'){
    var exports = this['mymodule'] = {};
}
```
The second problem is that anything you define in the module but don't export can become available in the browser:
```javascript
function notExported(){
    return "shh, I'm not here";
}

exports.test = function(){
    return 'hello world';
};
```
In the example above, requiring the module in node would return an object with the method test and nothing else, but in the browser this code would create a new global function called notExported. To fix this problem its a good idea to wrap the module's code in a closure (this is good practice anyway!).

Below is an example module that uses a closure which accepts an exports object as an argument. A sensible exports object is created if one does not already exist.

> mymodule.js
```javascript
(function(exports){

    // your code goes here

   exports.test = function(){
        return 'hello world'
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports);
```
Note the use of this['mymodule'] as an export location in the browser. This code can now be used both client and server side:

### node
```javascript
var mymodule = require('./mymodule'),
    sys = require('sys');

sys.puts(mymodule.test());
```
### browser
```javascript
<script src="mymodule.js"></script>
<script>
    alert(mymodule.test());
</script>
```
Of course, the browser doesn't support many other node features like require(), so you'll need to test that your code is suitable for use in the browser first. Also, be careful when using code originally written only for node because the V8 javascript engine supports newer language features than many browsers.

