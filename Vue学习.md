# 1. Vue基础知识和原理

## 1.1 初识Vue

​	Vue是一套用于**构建用户页面**的**渐进式**JavaScript框架

​	![image-20230225111825583](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230225111825583.png)

## 1.2 谁开发的

![image-20230225112521513](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230225112521513.png)

## 1.3 Vue的特点

1. 采用**组件化**模式，提高代码复用率、且让代码更好的维护

![image-20230225112828963](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230225112828963.png)

2. **声明式**编码，让编码人员无需直接操作DOM，提高开发效率

![image-20230225113156793](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230225113156793.png)

3. 使用**虚拟DOM**+优秀的**Diffing算法**，尽量复用DOM节点

## 1.4 学习Vue之前要掌握的JavaScript基础知识

```
ES6语法规范、ES6模块化、包管理器、原型，原型链、数组常用方法、axios、promise...
```

## 1.5 Hello小案例

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
1. root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
1. root容器里的代码被称为【Vue模板】
1. Vue示例和容器是一一对应的
1. 真实开发中只有一个Vue实例，并且会配合着组件一起使用
1. `{{xxx}}`中的`xxx`要写js表达式，且`xxx`可以自动读取到`data`中的所有属性
1. 一旦`data`中的数据发生改变，那么页面中用到该数据的地方也会自动更新

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>初识Vue</title>
    <!-- 引入Vue -->
    <script src="../01-初识Vue/js/vue.js"></script>
</head>
<body>
    <!-- 准备好一个容器 -->
    <div id="root">
        <!-- 插值语法 -->
        <h1>Hello,{{name}}</h1>
    </div>
    <script>
        Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示
        // 创建Vue实例
        new Vue({
            // element 找到id为root的容器
            el: '#root',  //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
            data: { // data中用于存储数据，数据供el所指定的容器所使用，值我们暂时先写成一个对象
                name: 'czq'
            },
        })

    </script>
</body>
</html>
```

![image-20230228194722006](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230228194722006.png)

​	注意区分js表达式和js代码（语句）

		1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

​		（1）a

​		（2）a+b

​		（3）demo(1)

​		（4）x === y ? 'a' : 'b'

2. js代码（语句）

​		（1）if(){}

​		（2）for(){}

## 1.6 模板语法

### 	Vue模板语法有2大类：

1. 插值语法：

   功能：用于解析标签体内容

   写法：`{{xxx}}`，`xxx`是js表达式，且可以直接读取到`data`中的所有属性

2. 指令语法：

   功能：用于解析标签（包括标签属性、标签体内容、绑定事件......）

   举例：`v-bind:href='xxx'`或简写为`:href='xxx'`,`xxx`同样要写js表达式，且可以直接读取到`data`中的所有属性

   备注：Vue中有很多的指令，且形式都是`v-xxx`，此处我们只是拿`v-bind`举例子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>模板语法</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h1>插值语法</h1>
        <h3>你好，{{name}}</h3>
        <hr/>
        <h1>指令语法</h1>
        <a v-bind:href="school.url" v-bind:x="hello">点我去{{school.name}}1</a>
        <a :href="url.toUpperCase()" :x="hello">点我去百度2</a>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                name: 'abcabc',
                url: "http://www.baidu.com",
                hello: '真的逊',
                school: {
                    name: '大学',
                    url: 'http://www.4399.com'
                }
            }
        })
    </script>
</body>
</html>
```

![image-20230228210057056](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230228210057056.png)

## 1.7 数据绑定

​	Vue中有2种数据绑定的方式：

​		（1）单向绑定（v-bind）：数据只能从`data`流向`页面`

​		（2）双向绑定（v-model）：数据不仅能从`data`流向`页面`，还可以从`页面`流向`data`

​			备注：

					1. 双向绑定一般都应用在表单类元素上（如：`input`、`select`等）
					1. `v-model:value`可以简写为`v-model`，因为`v-model`默认收集的就是`value`值

```vue
<!-- 如下代码是错误的。因为v-model只能应用在表单类元素（输入类元素）上 -->
<h2 v-model:x="name">真的逊</h2>
```

示例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数据绑定</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <!-- 普通写法 -->
        <!-- 单向数据绑定：<input type="text" name="" id="" v-bind:value="name">
        <br/>
        双向数据绑定：<input type="text" name="" id="" v-model:value="name"> -->
        <br/>
        <!-- 简写 -->
        单向数据绑定：<input type="text" name="" id="" :value="name">
        <br/>
        双向数据绑定：<input type="text" name="" id="" v-model="name">


        <!-- 如下代码是错误的。因为v-model只能应用在表单类元素（输入类元素）上 -->
        <!-- <h2 v-model:x="name">真的逊</h2> -->
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                name: 'czq'
            }
        })
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230302195541061.png" alt="image-20230302195541061" style="zoom:50%;" />

## 1.8 el与data的两种写法

 1. el有2种写法

    	1. new Vue的时候配置el属性
    	2. 先创建Vue实例，然后通过`vm.$mount('#root')`指定el的值

 2. data有2种写法

    	1. 对象式
    	2. 函数式

    如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则就会报错

 3. 一个重要的原则：

​		由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

​	el的两种写法：

```javascript
        const v = new Vue({
            // el: '#root', // 第一种写法
            data: {
                name: 'abc'
            }
        })
        console.log(v);
        v.$mount('#root') // 第二种写法
```

​	data的两种写法：

​		对象式：

```javascript
new Vue({
		el: '#root',
		data: {
				name: 'czq',
		}
})
```

​	函数式：

```javascript
new Vue({
		el: '#root',
		data: function(){ //省略写法：data(){}
				console.log(this) //此处的this是Vue实例对象
		// 必须要返回一个对象
				return {
						name: 'czq'
				}
		}
})
```

​	整体程序：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>el与data的两种写法</title>
    <script src="../js/vue.js"></script>
    <!-- 容器 -->
    <div id="root">
        <h1>你好,{{name}}</h1>
    </div>
</head>
<body>
    <script>
        // el的两种写法
        // const v = new Vue({
        //     // el: '#root', // 第一种写法
        //     data: {
        //         name: 'abc'
        //     }
        // })
        // console.log(v);
        // v.$mount('#root') // 第二种写法

        // data的两种写法
        new Vue({
            el: '#root',
            // data的第一种写法：对象式
            // data: {
            //     name: 'czq',
            // }
            // data的第二种写法：函数式
            data: function(){ //省略写法：data(){}
                console.log(this); //此处的this是Vue实例对象
                return {
                    name: 'czq'
                }
            }
        })
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303143047502.png" alt="image-20230303143047502" style="zoom:50%;" />

## 1.9 MVVM模型

	1. M：模型（Model）：对应data中的数据
	1. V：视图（View）：模板
	1. VM：视图模型（ViewModel）：Vue实例对象	

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303183500434.png" alt="image-20230303183500434" style="zoom:50%;" />

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>理解MVVM</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h1>学校名称:{{name}}</h1>
        <h1>学校地址:{{address}}</h1>
        <h1>test:{{$options}}</h1>
        <h1>tets2:{{$emit}}</h1>
        <h1>test4:{{_c}}</h1>
    </div>

    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'fly school',
                address: 'China'
            }
        })
        console.log(vm);
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303185256955.png" alt="image-20230303185256955" style="zoom:50%;" />

​	观察发现：

1. data身上中所有的属性，最后都出现在了vm身上
2. vm身上以及Vue原型上的所有属性，在Vue模板中都可以直接使用

## 1.10 数据代理

### 1.10.1 学习Object.defineProperty方法

​	https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

​	**`Object.defineProperty()`** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```javascript
Object.defineProperty(obj, prop, descriptor)


obj
要定义属性的对象。

prop
要定义或修改的属性的名称或 Symbol 。

descriptor
要定义或修改的属性描述符。
```

​	默认情况下，使用此方法添加进对象的属性不参与枚举 在Chrome浏览器显示的key为淡色（比如无法遍历到此属性的key和value）

​	下面的`Object.keys() ` 此方法传入一个对象作为参数，可以把传入对象里面所有属性的属性名提取出来变成一个数组

```javascript
        let person = {
            name: '陈正清',
            sex: '男',
            // age: 21
        }

        // 使用此方法添加进对象的属性不参与枚举 在Chrome浏览器显示的key为淡色（比如无法遍历到此属性的key和value）
        Object.defineProperty(person, 'age', {
            value: 18
        })
        // 验证：
        // Object.keys() 此方法传入一个对象作为参数，可以把传入对象里面所有属性的属性名提取出来变成一个数组
         console.log(Object.keys(person));
        console.log(person);
```

![image-20230303193347292](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303193347292.png)	

​	遍历出来的数组中没有名为`age`的元素 证明此属性未参与遍历

​	扩展：forin遍历对象

​		`forin`既能遍历数组又能遍历对象 其会逐一输出对象里面每一个属性的属性值

```javascript
        for(let key in person){
            // 输出person对象里面每一个属性的属性值
            console.log(person[key]);
        }
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303193748657.png" alt="image-20230303193748657" style="zoom:50%;" />

​	由此可见添加进去的age属性仍未参与遍历

​	**如需让添加进去的属性可遍历，则需要在添加的第三个参数加一个配置项：`enumerable`**

​	**如需让添加进去的属性可修改，则需要在添加的第三个参数加一个配置项：`writable`**

​	**如需让添加进去的属性可删除，则需要在添加的第三个参数加一个配置项：`configurable`**

```javascript
        let person = {
            name: '陈正清',
            sex: '男',
            // age: 21
        }

        // 使用此方法添加进对象的属性不参与枚举 在Chrome浏览器显示的key为淡色（比如无法遍历到此属性的key和value）
        Object.defineProperty(person, 'age', {
            value: 18,
            enumerable: true, //控制属性是否可以枚举，默认值是false
            writable: true, //控制属性是否可以被修改，默认值是false
            configurable: true //控制属性是否可以被删除，默认值是false
        })
```

​	新需求：person对象新加的属性将会读取全局变量number  对象的value随number的变化而变化

```javascript
        let number = 18
        let person = {
            name: '陈正清',
            sex: '男',
            // age: 21
        }

        Object.defineProperty(person, 'age', {
            //value: 18,

            // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
            get: function(){
                return number
            }
        })
```

 调试结果

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303200438784.png" alt="image-20230303200438784" style="zoom:50%;" />

​	另外还有setter方法 由于此对象中 age的value是来自于变量number 的 则在最后需要将number的值进行绑定

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>回顾Object.defineProperty方法</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <script>
        let number = 19
        let person = {
            name: '陈正清',
            sex: '男',
            // age: 21
        }

        // 使用此方法添加进对象的属性不参与枚举 在Chrome浏览器显示的key为淡色（比如无法遍历到此属性的key和value）
        Object.defineProperty(person, 'age', {
            // value: 18,
            // enumerable: true, //控制属性是否可以枚举，默认值是false
            // writable: true, //控制属性是否可以被修改，默认值是false
            // configurable: true //控制属性是否可以被删除，默认值是false

            // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
            get: function(){
                console.log('有人读取age属性了');
                return number
            },
            // 当有人读取person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
            set: function(value){
                console.log('有人修改了age属性，且值是:' + value);
                number = value
            }
        })
        // 验证：
        // Object.keys() 此方法传入一个对象作为参数，可以把传入对象里面所有属性的属性名提取出来变成一个数组
        // console.log(Object.keys(person));

        // forin既能遍历数组又能遍历对象
        // for(let key in person){
        //     // 输出person对象里面每一个属性的属性值
        //     console.log(person[key]);
        // }
        console.log(person);
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303201307991.png" alt="image-20230303201307991" style="zoom:50%;" />

### 1.10.2 何为数据代理

​	数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

```javascript
        let obj = {
            x: 100,
        }
        let obj2 = {
            y: 200,
        }
        Object.defineProperty(obj2, 'x', {
            get(){
                return obj.x
            },
            set(value){
                obj.x = value
            }
        })
```

​	实现数据代理：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303202101924.png" alt="image-20230303202101924" style="zoom:50%;" />

### 1.10.3 Vue中的数据代理

 1. Vue中的数据代理:

    通过vm对象来代理data对象中属性的操作（读/写）

 2. Vue中数据代理的好处：

    更加方便的操作data中的数据

 3. 基本原理：

    通过`Object.defineProperty()`把data对象中所有的属性添加到vm上

    为每一个添加到vm上的属性，都指定一个getter/setter

    在getter/setter内部去操作（读/写）data中对应的属性

    ![image-20230303211232696](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303211232696.png)

​	![image-20230303203955212](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303203955212.png)

 这里要知道 我们Vue实例对象中的`data`和控制台里面的`_data`是一样的

`_data`里面做的是一个数据劫持，所以点开里面不是一个纯正的对象

​	注意：因为data我们写在了Vue实例对象里面，不是全局变量，则我们想了个办法把它放出来

```javascript
        const data =  {
                name: 'TsingHua',
                address: 'Beijing',
            }
        const vm = new Vue({
            el: '#root',
            data,
        })
        
```

![image-20230303205747989](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230303205747989.png)

​	这可以证明我们操作的data可以被Vue的getter和setter调用
