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

## 1.11 事件处理

### 1.11.1 事件的基本使用

​	事件的基本使用：

		1. 使用`v-on:xxx` 或 `@xxx`绑定事件，其中`xxx`为事件名
		1. 事件的回调需要配置在`methods`对象中，最终会在`vm`上
		1. `methods`中配置的函数，不要用箭头函数！否则`this`就不是`vm`的了
		1. `methods`中配置的函数，都是被Vue所管理的函数，`this`的指向是`vm`或`组件实例对象`
		1. `@click='demo'`和`@click='demo($event)'`效果一致，但后者可以传参

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件的基本使用</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>欢迎来到{{name}}</h2>
        <!-- <button v-on:click="showInfo">点我提示信息</button> -->
        <button @click="showInfo1">点我提示信息1（不传参）</button>
        <button @click="showInfo2(66, $event)">点我提示信息2（传参）</button>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'HuBei'
            },
            methods: {
                showInfo1(e){
                    // console.log(this); //此处的this是vm
                    console.log('同学您好');
                },
                showInfo2(number, e){
                    // console.log('同学你好2');
                    console.log(number, e);
                }
            }
        })
        console.log(vm);
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230306163951680.png" alt="image-20230306163951680" style="zoom:50%;" />

### 1.11.2 事件修饰符

​	Vue中的事件修饰符：

		1. `prevent`：复制默认事件（常用）
		1. `stop`：阻止事件冒泡（常用）
		1. `once`：事件只触发一次（常用）
		1. `capture`：使用事件的捕获模式
		1. `self`：只有`event.target`是当前操作的元素才触发事件
		1. `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件修饰符</title>
    <script src="../js/vue.js"></script>
    <style>
        * {
            margin-top: 20px;
        }

        .demo1 {
            height: 50px;
            background-color: skyblue;
        }

        .box1 {
            padding: 5px;
            background-color: purple;
        }

        .box2 {
            padding: 5px;
            background-color: red;
        }

        .list {
            height: 200px;
            width: 200px;
            background-color: peru;
            overflow: auto;
        }

        li {
            height: 100px;
        }
    </style>
</head>

<body>
    <div id="root">
        <h2>欢迎来到{{name}}</h2>
        <!-- 阻止默认事件（常用） -->
        <a href="http://www.baidu.com" @click.prevent="showInfo">点我提示信息1</a>

        <!-- 阻止事件冒泡（常用） -->
        <div class="demo1" @click="showInfo">
            <button @click.stop="showInfo">点我提示信息</button>
          	<!-- 链式编程 -->
            <!-- <button @click.stop.prevent="showInfo">点我提示信息</button> -->
        </div>

        <!-- 事件只触发一次（常用） -->
        <button @click.once="showInfo">点我提示信息</button>

        <!-- 使用事件的捕获模式 -->
        <div class="box1" @click.capture="showMsg(1)">
            div1
            <div class="box2" @click="showMsg(2)">
                div2
            </div>
        </div>

        <!-- self:只有event.target是当前操作的元素才触发事件 一定程度上也可以阻止冒泡 -->
        <div class="demo1" @click.self="showInfo">
            <button @click="showInfo">点我提示信息</button>
        </div>

        <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕 -->
        <ul @scroll="demo" class="list">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'HuBei'
            },
            methods: {
                showInfo(e) {
                    // e.preventDefault()
                    alert('同学您好')
                },
                showMsg(msg) {
                    console.log(msg);
                },
                demo(){
                    for(let i = 0; i < 10000; i++){
                        console.log('#');
                    }
                    console.log('累坏了');
                }
            }
        })
    </script>
</body>

</html>
```

### 1.11.3 键盘事件

 1. Vue中常用的按键别名：

    回车 => enter

    删除 => delete（捕获“删除 delete”和“退格键 ←”）

    退出 => esc

    空格 => space

    换行 => tab（特殊，必须配合keydown去使用）

    上 => up

    下 => down

    左 => left

    右 => right

 2. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但要注意转为`kebab-case`（短横线命名）

 3. 系统修饰键（用法特殊）：`ctrl、alt、shift、meta`

    	1. 配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
        	2. 配合`keydown`使用：正常触发事件

 4. 也可以使用`keyCode`去指定具体的案件（不推荐）

 5. `Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>键盘事件</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>欢迎来到{{name}}</h2>
        <input type="text" placeholder="按下回车提示输入" @keyup.enter="showInfo">
    </div>
    <script>
        Vue.config.keyCodes.huiche = 13
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'HuBei'
            },
            methods: {
                showInfo(e){
                    console.log(e.target.value);
                }
            }
        })
    </script>
</body>
</html>
```

![image-20230306185814130](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230306185814130.png)

## 1.12 计算属性

	1. 定义：要用的属性不存在，要通过已有的属性计算得来
	1. 原理：底层借助了`Object.defineProperty()`方法提供的`getter`和`setter`
	3. get函数什么时候执行？
	 	1. 初次读取时会执行一次
	 	2. 当依赖的数据发生改变时会被再次调用
	1. 优势：与`methods`实现相比，内部会有缓存机制（复用），效率更高，测试方便
	5. 备注：
	 	1. 计算属性最终会出现在`vm`上，直接用`this`读取使用即可
	 	2. 如果计算属性要被修改，那必须写`setter`函数去相应修改，且set中要引起计算时依赖的数据发生改变

在这个说明案例中，有太多需要注意的点，我们可以发现使用计算属性更利于性能节省以及调试方便

1. 插值语法实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>姓名案例_插值语法实现</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        姓：<input type="text" v-model="firstName"> <br/>
        名：<input type="text" v-model="lastName"> <br/>
        全名：<span>{{firstName.slice(0, 3) + '-' + lastName}}</span>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                firstName: '张',
                lastName: '三'
            }
        })
    </script>
</body>
</html>
```

![image-20230306202717232](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230306202717232.png)

2. 用methods实现

​	如果页面上有n个需要展示的地方，则methods对应的函数会调用n次，不利于性能节约

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>姓名案例_methods实现</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        姓：<input type="text" v-model="firstName"> <br/>
        名：<input type="text" v-model="lastName"> <br/>
        全名：<span>{{fullName()}}</span>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                firstName: '张',
                lastName: '三'
            },
            methods: {
                fullName(){
                    return this.firstName + '-' + this.lastName
                }
            }
        })
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230306202930528.png" alt="image-20230306202930528" style="zoom:50%;" />

3. 计算属性实现以及简写

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>姓名案例_计算属性实现</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        姓：<input type="text" v-model="firstName"> <br/>
        名：<input type="text" v-model="lastName"> <br/>
        全名：<span>{{fullName}}</span>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                firstName: '张',
                lastName: '三'
            },
            computed: {
                fullName: {
                    // get有什么作用？当有人读取fullName时，get就会被调用且返回值就作为fullName的值
                    // get什么时候调用？ 1.初次读取fullName时。 2.所依赖的数据发生变化时
                    get(){
                        console.log(this); // 此处的this是vm
                        return this.firstName + '-' + this.lastName
                    },

                    // set什么时候调用？当fullName被修改时
                    set(value){
                        const arr = value.split('-')
                        this.firstName = arr[0]
                        this.lastName = arr[1]
                    }
                }
            }
        })
    </script>
</body>
</html>
```

![image-20230306203022576](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230306203022576.png)

​	**注意：当我们的计算属性不需要进行修改，而只是展示在页面上时，则可以触发简写方式，将计算属性直接当成其`getter()`使用**

```javascript
computed: {
  fullname(){
    console.log(this)
    return this.firstName + '-' + 'lastName'
  }
}
```

## 1.13 监视属性

### 1.13.1 天气案例

​	用前面学过的只知识来写天气案例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>天气案例</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <!-- 绑定事件的时候：@xxx="yyy" yyy可以写一些简单的语句 -->
        <!-- <button @click="isHot = !isHot"></button> -->
        <button @click="changeWeather">切换天气</button>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                isHot: true,
            },
            methods: {
                changeWeather(){
                    this.isHot = !this.isHot
                }
            },
            computed: {
                info(){
                    return this.isHot ? '炎热' : '凉爽'
                }
            },
        })
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307162129309.png" alt="image-20230307162129309" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307162147550.png" alt="image-20230307162147550" style="zoom:50%;" />

### 1.13.2 监视属性写天气案例

​	监视属性`watch`：

	1. 当监视的属性变化时，回调函数自动调用，进行相关操作
	1. 监视的属性必须存在，才能进行监视！！
	3. 监视的两种写法：
	 	1. `new Vue`时传入`watch`配置
	 	2. 通过`vm.$watch`监视

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>天气案例_监视属性</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather">切换天气</button>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            },
            computed: {
                info() {
                    return this.isHot ? '炎热' : '凉爽'
                }
            },
            watch: {
                isHot: {
                    // 初始化时让handler调用一下
                    immediate: true,
                    // handler函数什么时候调用？ 当isHot发生改变时
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue);
                    },

                }
            }
        })
        // 也可以在配置对象外面进行监视
        // 如果在创建Vue实例的时候就想好了监视谁，则可以用上面的写法
        // vm.$watch('isHot', {
        //     // 初始化时让handler调用一下
        //     immediate: true,
        //     // handler函数什么时候调用？ 当isHot发生改变时
        //     handler(newValue, oldValue) {
        //         console.log('isHot被修改了', newValue, oldValue);
        //     },
        // })
    </script>
</body>

</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307164716568.png" alt="image-20230307164716568" style="zoom:50%;" />

### 1.13.3 深度监视

	1. Vue中的`watch`默认不监测对象内部值的改变（一层）
	1. 配置`deep: true`可以监测对象内部值改变（多层）

备注：

1. Vue自身可以监测对象内部值的改变，但Vue提供的`watch`默认不可以！
2. 使用`watch`时根据数据的具体结构，决定是否采用深度监视

**没有加deep进行深度监视之前：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>天气案例_深度监视</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather">切换天气</button>
        <hr/>
        <h3>a的值是：{{numbers.a}}</h3>
        <button @click="addA">点我让a+1</button>
        <hr/>
        <h3>b的值是：{{numbers.b}}</h3>
        <button @click="addB">点我让b+1</button>
    </div>
    <script>
        
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true,
                numbers: {
                    a: 1,
                    b: 1,
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                },
                addA(){
                    this.numbers.a++
                },
                addB(){
                    this.numbers.b++
                }
            },
            computed: {
                info() {
                    return this.isHot ? '炎热' : '凉爽'
                }
            },
            watch: {
                isHot: {
                    // 初始化时让handler调用一下
                    // immediate: true,
                    // handler函数什么时候调用？ 当isHot发生改变时
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue);
                    },

                },
                // 监视多级结构中某个属性的变化
                'numbers.a': {
                    handler(){
                        console.log('a值改变了');
                    }
                },
                // 监视多级结构中所有属性的变化
                numbers: {
                    // deep: true,
                    handler(){
                        console.log('number发生改变了');
                    }
                }
            }
        })
    </script>
</body>

</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307172825480.png" alt="image-20230307172825480" style="zoom:50%;" />

​	这里可以看出，number里面的a和b都发生了改变，没有引起监视里的handle函数执行

**加deep进行深度监视之后：**

```javascript
            watch: {
                // 监视多级结构中某个属性的变化
                'numbers.a': {
                    handler(){
                        console.log('a值改变了');
                    }
                },
                // 监视多级结构中所有属性的变化
                numbers: {
                    deep: true,
                    handler(){
                        console.log('number发生改变了');
                    }
                }
            }
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307173047187.png" alt="image-20230307173047187" style="zoom:50%;" />

这里可以看到已经引起了handler函数执行

### 1.13.4 监视属性的简写

**写在Vue实例对象内：**

​	完整写法：

```javascript
            watch: {
                // 完整写法：
                isHot: {
                    // 初始化时让handler调用一下
                    immediate: true,
                    deep: true, //深度监视
                    // handler函数什么时候调用？ 当isHot发生改变时
                    handler(newValue, oldValue) {
                        console.log('isHot被修改了', newValue, oldValue);
                    },
                },
            }
```

​	当且仅当我们需要监视的属性里面只需要用到handler函数时，就可以用到我们的简写方式，与上面的计算属性简写类似

```
watch{
		//简写
		isHot(newValue, oldValue){
				console.log('isHot被修改了', newValue, oldValue)
		}
}
```

**写在Vue实例对象外：**

```javascript
				// 完整写法
        vm.$watch('isHot', {
            immediate: true,
            deep: true,
            handler(newValue, oldValue){
                console.log('isHot被修改了', newValue, oldValue);
            }
        })
```

​	简写：

```javascript
        // 简写：
        vm.$watch('isHot', function(newValue, oldValue){
            console.log('isHot被修改了', newValue, oldValue);
        })
```

### 1.13.5 computed与watch之间的区别

	1. `computed`能完成的功能，`watch`都可以完成
	1. `watch`能完成的功能，`computed`不一定能完成，例如：`watch`可以进行异步操作

两个重要的小原则：

	1. 所有被Vue所管理的函数，最好写成普通函数，这样`this`的只想才是`vm`或`组件实例对象`
	1. 所有不被Vue所管理的函数（如定时器的回调函数、ajax的回调函数、Promise的回调函数等），最好写成箭头函数，这样`this`的指向才是`vm`或`组件实例对象`

**watch实现：**

```html
        姓：<input type="text" v-model="firstName"> <br/>
        名：<input type="text" v-model="lastName"> <br/>
        全名：<span>{{fullName}}</span>
```

```js
            data: {
                firstName: '张',
                lastName: '三',
                fullName: '张-三'
            },
            watch: {
                firstName(newFirstName){
                    setTimeout(() => {
                        this.fullName = newFirstName + '-' + this.lastName
                    }, 1000);
                },
                lastName(newLastName){
                    this.fullName = this.firstName + '-' + newLastName
                }
            }
```

​	这里的代码是用监视属性watch实现的，监视属性可以进行一些异步操作（如设置定时器），但是我们必须知道定时器的回调函数（下图的红色框）由`window`所管理，它不隶属Vue管理

![image-20230307194816493](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307194816493.png)

​	如果我们将定时器的回调函数写成普通函数，那么下面语句中的`this`将不再是`vm`，下面的语句就无法顺利执行

```javascript
            watch: {
                firstName(newFirstName){
                    setTimeout(function(){
                      	console.log(this)
                        this.fullName = newFirstName + '-' + this.lastName
                    }, 1000);
                },
                lastName(newLastName){
                    this.fullName = this.firstName + '-' + newLastName
                }
            }
```

调试结果：

![image-20230307195057284](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307195057284.png)

如果我们写成箭头函数，由于箭头函数没有自己的`this`，它会往外查找`firstName`这个函数所对应的this指向，而`firstName`的指向为`vm`，我们才能在下面的`this.fullName`中拿到`data`里面的相关属性

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307195339204.png" alt="image-20230307195339204" style="zoom:50%;" />

## 1.14 绑定样式

1. class样式

   写法：`class=xxx` 可以是字符串、对象、数组

   ​	字符串写法适用于：类名不确定，要动态获取

   ​	对象写法适用于：要绑定多个样式，个数不确定，名字也不确定

   ​	数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

2. style样式

   `style="{{fontSize: xxx}}"`其中xxx是动态值

   `style="[a, b]"`其中a、b是样式对象

### 1.14.1 绑定class样式

​	绑定class样式\--共有三种写法

1. 绑定class样式\--字符串写法，适用于样式的类名不确定，需要动态指定时

```css
        .basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
        .happy {
            border: 4px solid red;
            background-color: rgba(255, 255, 0, 0.644);
            background: linear-gradient(30deg, yellow, pink, orange, yellow);
        }
        .sad {
            border: 4px dashed rgb(2, 197, 2);
            background-color: gray;
        }
        .normal {
            background-color: skyblue;
        }
```

<div class="basic" v-bind:class="mood" @click="changeMood">{{name}}</div>

```javascript
            data: {
                name: 'qifei',
                mood: 'normal',
            },
            methods: {
                changeMood(){
                    const arr = ['happy', 'sad', 'normal']
                    this.mood = arr[Math.floor(Math.random() * 3)]
                }
            }
```

可以实现点击随机切换的效果

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307205441060.png" alt="image-20230307205441060" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307205453205.png" alt="image-20230307205453205" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307205506528.png" alt="image-20230307205506528" style="zoom:50%;" />

2. 绑定class样式--数组写法，适用于要绑定的样式个数不确定、名字也不确定时

下面的三个样式随便选 个数随便排布

```css
        .basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
        .atguigu1 {
            background-color: yellowgreen;
        }
        .atguigu2 {
            font-size: 30px;
            text-shadow: 2px 2px 10px red;
        }
        .atguigu3 {
            border-radius: 20px;
        }
```



```html
<div class="basic" v-bind:class="classArr">{{name}}</div>
```

```javascript
classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307205928118.png" alt="image-20230307205928118" style="zoom:50%;" />

3. 绑定class样式--对象写法，适用于要绑定的样式个数确定、名字也确定，但要动态决定用不用时

​	随着属性的布尔值的改变决定用于不用

```css
        .basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
        .atguigu1 {
            background-color: yellowgreen;
        }
        .atguigu2 {
            font-size: 30px;
            text-shadow: 2px 2px 10px red;
        }
```

```html
<div class="basic" v-bind:class="classObj">{{name}}</div>
```

```javascript
                classObj: {
                    atguigu1: false,
                    atguigu2: true
                }
```

​	如图发现布尔值为true的atguigu2成功应用上样式

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230307210128286.png" alt="image-20230307210128286" style="zoom:50%;" />

### 1.14.2 绑定style样式

1. 绑定style样式--对象写法

```css
.basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
```

```html
<div class="basic" v-bind:style="styleObj">{{name}}</div>
```

data里面的配置项：

```javascript
								styleObj: {
                    fontSize: 40 + 'px',
                    color: 'red',
                },
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309185814043.png" alt="image-20230309185814043" style="zoom:50%;" />

2. 绑定style样式--数组写法

```css
.basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
```

```html
<div class="basic" v-bind:style="[styleObj1, styleObj2]">{{name}}</div>
```

​	这里将多个对象存入内联样式的数组中并交给vue管理

```javascript
								styleObj: {
                    fontSize: 40 + 'px',
                    color: 'red',
                },
                styleObj2: {
                    backgroundColor: 'orange'
                }
```

![image-20230309185901264](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309185901264.png)

​	由此可见，两个存在data里的对象全部生效

**完整程序代码：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>绑定样式</title>
    <script src="../js/vue.js"></script>
    <style>
        .basic {
            width: 400px;
            height: 100px;
            border: 1px solid black;
        }
        .happy {
            border: 4px solid red;
            background-color: rgba(255, 255, 0, 0.644);
            background: linear-gradient(30deg, yellow, pink, orange, yellow);
        }
        .sad {
            border: 4px dashed rgb(2, 197, 2);
            background-color: gray;
        }
        .normal {
            background-color: skyblue;
        }


        .atguigu1 {
            background-color: yellowgreen;
        }
        .atguigu2 {
            font-size: 30px;
            text-shadow: 2px 2px 10px red;
        }
        .atguigu3 {
            border-radius: 20px;
        }
    </style>
</head>

<body>
    <div id="root">
        <!-- 绑定class样式--字符串写法，适用于样式的类名不确定，需要动态指定时 -->
        <div class="basic" v-bind:class="mood" @click="changeMood">{{name}}</div>
        <br/>
        <br/>
        <br/>

        <!-- 绑定class样式--数组写法，适用于要绑定的样式个数不确定、名字也不确定时 -->
        <div class="basic" v-bind:class="classArr">{{name}}</div>

        <!-- 绑定class样式--对象写法，适用于要绑定的样式个数确定、名字也确定，但要动态决定用不用时 -->
        <div class="basic" v-bind:class="classObj">{{name}}</div>
        <br/>

        <!-- 绑定style样式--对象写法 -->
        <div class="basic" v-bind:style="styleObj">{{name}}</div>
        <!-- 绑定style样式--数组写法 -->
        <div class="basic" v-bind:style="[styleObj, styleObj2]">{{name}}</div>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                name: 'qifei',
                mood: 'normal',
                classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
                classObj: {
                    atguigu1: false,
                    atguigu2: true
                },
                styleObj: {
                    fontSize: 40 + 'px',
                    color: 'red',
                },
                styleObj2: {
                    backgroundColor: 'orange'
                }
            },
            methods: {
                changeMood(){
                    const arr = ['happy', 'sad', 'normal']
                    this.mood = arr[Math.floor(Math.random() * 3)]
                }
            }
        })
    </script>
</body>

</html>
```

## 1.15 条件渲染

​	条件渲染一般有两条指令可供使用：

 1. `v-if`

    ​	写法：

    		1. `v-if='表达式'`
    		1. `v-else-if='表达式`'
    		1. `v-else='表达式'`

    适用于：切换频率较低的场景

    特点：不展示的DOM元素直接删除

    注意：`v-if`可以和`v-else-if`、`v-else`一起使用，但要求结构不能被“打断”

    

​	当我们使用v-if时，如果其值直接为false，则我们可能在此页面中无法找到该元素

```html
    <div id="root">
        <h2>当前的n值是:{{n}}</h2>
        

        <!-- 用v-if做条件渲染 -->
        <h2 v-if="false">我是{{name}}</h2>
        <h2 v-if="1 === 1">我是{{name}}</h2>


    </div>
```

```javascript
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'czq',
                n: 0
            }
        })
```

当其值为true时：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309195649314.png" alt="image-20230309195649314" style="zoom:50%;" />

当其值为false时：

```html
<h2 v-if="false">我是{{name}}</h2>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309195749196.png" alt="image-20230309195749196" style="zoom:50%;" />

我们则完全无法在页面中找到此元素

`v-if`和`v-else`和`v-else-if`的逻辑与普通的`if`、`else`、`else-if`相同，使用时请注意思考

且两个`v-if`和`v-elseif`中不能插入其他语句，否则会引起其他的`v-if`无法判断

```html
<div id="root">
  			<h2>当前n的值是:{{n}}</h2>
  			<button @click="n++">点我n+1</button>
  			<div v-if="n === 1">Angular</div>
        <div v-else-if="n === 2">React</div>
  			<!-- 如果我们在此插入不对应的其他元素则会引起编译错误 -->
  			<div>@</div>
        <div v-else-if="n === 3">Vue</div>
        <div v-else>哈哈</div>
</div>
```

```javascript
const vm = new Vue({
            el: '#root',
            data: {
                name: 'czq',
                n: 0
            }
        })
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309200443192.png" alt="image-20230309200443192" style="zoom:50%;" />

**补充：当我们不得不批量操作元素时候，通常会选择将其包在一个特定的容器中，但是问题在于我们如果这样做就会导致结构被破坏，template则会为我们完美的解决这个问题，它会在我们成功进行批量操作之后，在挂载页面的时候自动消失 但是要注意只能`v-if`才能配合它**

```html
        <h2>当前的n值是:{{n}}</h2>
        <button @click="n++">点我n+1</button>
				<template v-if='n === 1'>
            <h2>捞</h2>
            <h2>逊</h2>
            <h2>逆天</h2>
        </template>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309200823884.png" alt="image-20230309200823884" style="zoom:50%;" />

我们会发现 在挂在页面的元素之中，三个`h2`并没有被包裹住

2. `v-show`

​		写法：`v-show=表达式`

​		适用于：切换频率较高的场景

​		特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

​		

```html
    <div id="root">

        <!-- 使用v-show做条件渲染 -->
        <h2 v-show="true">我是{{name}}</h2>

    </div>
```

```javascript
const vm = new Vue({
            el: '#root',
            data: {
                name: 'czq',
                
            }
        })
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309201248223.png" alt="image-20230309201248223" style="zoom:50%;" />

当其值为false时：

```html
        <h2 v-show="false">我是{{name}}</h2>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309201340633.png" alt="image-20230309201340633" style="zoom:50%;" />

​	由此可见，`v-show`底层是通过操作`display`这个属性实现的

3. 备注：使用`v-if`时，元素可能无法获取到，而使用`v-show`一定可以获取到

​	这在前面`v-if`值为false，`v-show`的值为false的调试结果可以印证

**本节完整代码：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>条件渲染</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>当前的n值是:{{n}}</h2>
        <button @click="n++">点我n+1</button>

        <!-- 使用v-show做条件渲染 -->
        <h2 v-show="false">我是{{name}}</h2>
        <!-- <h2 v-show="1 === 1">我是{{name}}</h2> -->

        <!-- 用v-if做条件渲染 -->
        <h2 v-if="false">我是{{name}}</h2>
        <h2 v-if="1 === 1">我是{{name}}</h2>

        <div v-if="n === 1">Angular</div>
        <div v-else-if="n === 2">React</div>
        <div>@</div>
        <div v-else-if="n === 3">Vue</div>
        <div v-else>哈哈</div>

        <!-- v-if与template的配合 -->
        <template v-if='n === 1'>
            <h2>捞</h2>
            <h2>逊</h2>
            <h2>逆天</h2>
        </template>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                name: 'czq',
                n: 0
            }
        })
    </script>
</body>

</html>
```

## 1.16 列表渲染

### 1.16.1 基本列表

需求：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309210631075.png" alt="image-20230309210631075" style="zoom:50%;" />

​	一般我们要定义人员信息，都会将其放在li这种顺序列表中，将每个人的信息以对象的方式存入一个数组中将其遍历放到li中

​	我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

​	`v-for`指令

	1. 用于展示列表数据
	1. 语法：`v-for="(item, index)  in xxx" :key="yyy"`
	1. 可遍历：数组、对象、字符串（用的很少）、指定次数遍历（用的很少）

**用`v-for`遍历数组：**

​	我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

```html
    <div id="root">
        <h2>人员列表</h2>
        <ul>
            <!-- 遍历数组 -->
            <li v-for="(person, index) in persons" :key="person.id">
                {{person.name}}-{{person.age}}-{{index}}
            </li>
        </ul>
     </div>
```

```javascript
        const vm = new Vue({
            el: '#root',
            data: {
                persons: [
                    { id: 001, name: '张三', age: 18 },
                    { id: 002, name: '李四', age: 19 },
                    { id: 003, name: '王五', age: 18 }
                ],
            }
        })
```

在这里，`key`的指定尤为重要，其将会作为遍历生成的每一个li的标识符

调试结果如下：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230309211349763.png" alt="image-20230309211349763" style="zoom:50%;" />

**用`v-for`遍历对象**

```html
        <h2>汽车信息</h2>
        <ul>
            <!-- 遍历对象 -->
            <ul>
                <li v-for="(val, key, index) in carMessage" :key="key">{{key}}-{{val}}-{{index}}</li>
            </ul>
        </ul>
```

```javascript
                carMessage: {
                    name: '奥迪A8',
                    price: 700000,
                    color: 'black',
                },
```

​	调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310193021888.png" alt="image-20230310193021888" style="zoom:50%;" />

​	**用`v-for`遍历字符串：**

```html
        <h2>测试遍历字符串</h2>
        <!-- 遍历字符串 -->
        <ul>
            <li v-for="(char, index) in str" :key="index">{{char}}-{{index}}</li>
        </ul>
```

```javascript
str: 'hello'
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310193231151.png" alt="image-20230310193231151" style="zoom:50%;" />

**用`v-for`指定次数遍历：**

```html
        <h2>测试遍历指定次数</h2>
        <!-- 遍历制定次数 -->
        <ul>
            <li v-for="(number, index) in 5" :key="index">{{number}}-{{index}}</li>
        </ul>
```

第一个参数是遍历的次数，第二个则为索引值

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310193404291.png" alt="image-20230310193404291" style="zoom:50%;" />

### 1.16.2 key的原理和重要作用

​	当我们在页面遍历数组以及其他元素的时候，通常Vue会让我们定义一个`key`，这个`key`都会当做唯一标识被Vue用`diffing算法`进行高效的工作 当我们使用`index`或者用户唯一标识`id`的时候，这两者有什么区别呢？

需求：在人员列表中添加一个老刘，需要让其信息放在最前面，其他人的信息往后推，并在后面生成文本框编辑信息后再进行添加信息操作

**遍历列表时以`index`作为`key`**

```html
    <div id="root">
        <h2>人员列表</h2>
        <button @click.once="add">添加一个老刘</button>
        <ul>
            <!-- 遍历数组 -->
            <li v-for="(person, index) in persons" :key="index">
                {{person.name}}-{{person.age}}-{{index}}
                <input type="text">
            </li>
        </ul>
    </div>
```

```javascript
        const vm = new Vue({
            el: '#root',
            data: {
                persons: [
                    { id: 001, name: '张三', age: 18 },
                    { id: 002, name: '李四', age: 19 },
                    { id: 003, name: '王五', age: 18 }
                ],

            },
            methods: {
                add(){
                    const person = {id: 004, name: '老刘', age: 40}
                    this.persons.unshift(person)
                }
            },
        })
```

呈现在页面上的效果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310200910659.png" alt="image-20230310200910659" style="zoom:50%;" />

由于用户操作的是真实DOM，当用户在页面上留下信息的时候，信息就会残留在真实DOM上，而在渲染页面的时候，Vue会在中间生成虚拟DOM，页面更新时，Vue会根据`diffing算法`对比更新前后的每个节点来决定是否复用更新前的元素用以提升效率，当我们用`index`作为Vue要使用的`key`时

​	![image-20230310201259891](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310201259891.png)

​	Vue会对比两个`key`相同的元素以及里面的子节点，这里面新增的老刘`key`为0，初始的虚拟DOM中`key`也为0的是张三，根据`diffing算法`这部分需要重新生成并渲染到页面中。后面`key`为1的张三完全可以在初始虚拟DOM找到，这会导致严重的效率问题

​	而后面的input框，由于`diffing算法`对比的两个虚拟DOM完全一致，Vue会复用初始虚拟DOM的input框，若用户在页面更新之前在input中输入数据，在页面更新之后，会造成无法容忍的错误：**数据混乱**

页面更新前：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310201747085.png" alt="image-20230310201747085" style="zoom:50%;" />

页面更新后：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310201831717.png" alt="image-20230310201831717" style="zoom:50%;" />

我们发现数据已经错乱了，所以当我们添加的数据会打乱原本列表的顺序是，是不可以用`index`作为Vue所管理的`key`的

但是如果是将老刘添加在后面的时候，由于三个老数据的`key`值没变，所以不会出现降低效率以及数据错乱的问题

**遍历列表时以`唯一标识符（如id）`作为`key`**

```html
<!-- 遍历数组 -->
            <li v-for="(person, index) in persons" :key="person.id">
                {{person.name}}-{{person.age}}-{{index}}
                <input type="text">
            </li>
```

由于我们使用了唯一的标识符，`id`为004的老刘将会作为列表的第一个添加进原有的列表中，且其`key`为004，其他三位的`key`由于也用了唯一的`id`，则没有影响其原来的`key`值

Vue会根据`key`进行新旧虚拟DOM的比较，无论我们把老刘放在哪儿，由于老数据张三李四王五的`key`没变，又因为其子节点数据完全一致，Vue会复用其节点，只会新增一个`key`为004的老刘

且由于老刘是新增进页面的节点，其input框是新生成的，不会出现用户在真实DOM残留的数据错乱的情况

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310202824166.png" alt="image-20230310202824166" style="zoom:50%;" />

页面更新前：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310202911689.png" alt="image-20230310202911689" style="zoom:50%;" />

页面更新后：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230310202932321.png" alt="image-20230310202932321" style="zoom:50%;" />

在这个案例中，以`唯一标识符`作为`key`效率得到了提升，也不会有数据错乱的问题。

**小结：**

​	面试题：react、vue中的key有什么作用？（key的内部原理）

		1. 虚拟DOM中key的作用：

​		key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

2. 对比规则：

   1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：

      1. 若虚拟DOM中内容没变，直接使用之前的真实DOM
      2. 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

   2. 旧虚拟DOM中未找到与新虚拟DOM相同的key：

      ​	创建新的真实DOM，随后渲染到页面

3. 用index作为key可能会引发的问题：

   1. 若对数据进行：逆序添加、逆序删除等破坏顺序的操作时：

      ​	会产生没有必要的真实DOM更新 ==> 页面效果没问题，但效率低

   2. 若结构中还包含输入类的DOM：

      ​	会产生错误的DOM更新 ==> 页面效果有问题

4. 开发中如何选择key？

   1. 最好使用每条数据的唯一标识符作为key，比如id、手机号、身份证号、学号等唯一值
   2. 若不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表用于展示，使用index作为key是没问题的

### 1.16.3 列表过滤

​	需求：我们会将一整个列表按照名字进行模糊搜索

​	搜索前：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311175216882.png" alt="image-20230311175216882" style="zoom:50%;" />

搜索后：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311175242258.png" alt="image-20230311175242258" style="zoom:50%;" />

```html
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <ul>
            <!-- 遍历数组 -->
            <!-- <li v-for="(person, index) in persons" :key="person.id">
                {{person.name}}-{{person.age}}-{{person.sex}}
            </li> -->
            <li v-for="(filledPerson, index) in filledPersons" :key="filledPerson.id">
                {{filledPerson.name}}-{{filledPerson.age}}-{{filledPerson.sex}}
            </li>
        </ul>
    </div>
```

在这里我们需要对原数组persons进行过滤，用`filter`方法过滤并生成符合条件的新数组，我们将其命名为filteredPersons

由于我们的关注点是keyWord这个属性的变化，所以我们可以用watch和computed两个写法实现

**用watch监视keyWord实现：**

```javascript
        // 用watch实现
        const vm = new Vue({
            el: '#root',
            data: {
                keyWord: '',
                persons: [
                    { id: 001, name: '马冬梅', age: 18, sex: '女' },
                    { id: 002, name: '周冬雨', age: 19, sex: '女' },
                    { id: 003, name: '周杰伦', age: 18, sex: '男' },
                    { id: 004, name: '温兆伦', age: 18, sex: '男' }
                ],
                filteredPersons: []
            },
            watch: {
                keyWord: {
                    //由于任何字符串都包含了空字符串，为了让一开始显示所有列表，所以配置了立即执行一次
                    immediate: true,
                    handler(newVal) {
                        this.filteredPersons = this.persons.filter((person) => {
                            // filter的第一个参数为被过滤数组的每一项
                            // return后面接的是筛选条件
                            return person.name.indexOf(newVal) !== -1
                        })
                    }
                }
            }
        })
```

为什么我们不用watch的简写？

如果我们不需要配置watch的其他配置项的话，我们可以省略`handler`函数并把我们监视的属性直接写成一个函数`keyWord(){}`

由于这里监视的是`keyWord`，当我们将其改变的时候，就会执行这个方法，当我们第一次刷新页面的时候，这个函数无法执行，则会引起没有`filteredPersons`数组为空，页面没有东西

没有配置`immediate`属性时：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311180336705.png" alt="image-20230311180336705" style="zoom:50%;" />

这样不符合我们的需求 所以我们需要用到`immediate`这个配置项，要其在页面挂在的时候，`handler`立即执行一次。所以我们不能简写，要写完整的watch

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311180526348.png" alt="image-20230311180526348" style="zoom:50%;" />

![image-20230311180543872](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311180543872.png)

**用computed计算keyWord实现：**

```javascript
        // 用computed实现
        const vm = new Vue({
            el: '#root',
            data: {
                keyWord: '',
                persons: [
                    { id: 001, name: '马冬梅', age: 18, sex: '女' },
                    { id: 002, name: '周冬雨', age: 19, sex: '女' },
                    { id: 003, name: '周杰伦', age: 18, sex: '男' },
                    { id: 004, name: '温兆伦', age: 18, sex: '男' }
                ],
            },
            computed: {
                filledPersons(){ 
                    // 第一个return是计算属性的get需要的 第二个是filter这个方法需要的过滤条件
                    return this.persons.filter((person) => {
                        return person.name.indexOf(this.keyWord) !== -1
                    })
                }
            }
        })
```

​	在`computed`计算属性中，里面的getter是在第一次挂在页面以及`keyWord`的每一次变化的时候执行，所以它会在页面一挂在就显示

​	但是值得注意的是，`computed`中的`getter`可不像`watch`中的`handler()`可以使用`newValue`，所以我们`indexOf()`中对比的字符串则是我们每次变化的`keyWord`

​	还有需要注意`getter`的`return`（返回给filteredPerson的元素）与`filter`的return（过滤条件）

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311181329044.png" alt="image-20230311181329044" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311181343803.png" alt="image-20230311181343803" style="zoom:50%;" />

由此更有力证明了，当watch和computed都可以实现时，用computed计算属性更简便

### 1.16.4 列表排序

需求：根据年龄对人员列表进行排序，过滤后的列表也可以完成排序

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311185349446.png" alt="image-20230311185349446" style="zoom:50%;" />

```html
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <button @click="sortType = 'up'">年龄升序</button>
        <button @click="sortType = 'down'">年龄降序</button>
        <button @click="sortType = 'origin'">原顺序</button>
        <ul>
            <li v-for="(filteredPerson, index) in filteredPersons" :key="filteredPerson.id">
                {{filteredPerson.name}}-{{filteredPerson.age}}-{{filteredPerson.sex}}
            </li>
        </ul>
    </div>
```

我们要想排序，得知道用户的点击行为，所以我们在data中新配置了一个属性`sortType`以区分升降序以及原排序

```javascript
            data: {
                keyWord: '',
                sortType: 'origin', //排序类型
                persons: [
                    { id: 001, name: '马冬梅', age: 18, sex: '女' },
                    { id: 002, name: '周冬雨', age: 19, sex: '女' },
                    { id: 003, name: '周杰伦', age: 23, sex: '男' },
                    { id: 004, name: '温兆伦', age: 22, sex: '男' }
                ],
            },
```

我们需要先过滤，再排序 所以我们不着急返回，我们可以拿一个变量接住过滤后的数组，再将这个数组进行排序， 需要用到排序数组的`sort`方法 。由于`sort`方法会改变原数组，所以我们可以直接将排序后的数组当成返回值放给`filteredPersons` 

```javascript
            computed: {
                filteredPersons() {
                    // 第一个return是计算属性的get需要的 第二个是filter这个方法需要的过滤条件
                    const arr = this.persons.filter((person) => {
                        return person.name.indexOf(this.keyWord) !== -1
                    })
                    // 判断一下是否需要排序
                    if (this.sortType !== 'origin') {
                        if (this.sortType !== 'down') {
                            arr.sort((a, b) => {
                                return a.age - b.age
                            })
                        } else {
                            arr.sort((a, b) => {
                                return b.age - a.age
                            })
                        }
                    }
                    return arr
                }
            }
```

**扩展：简略了解排序数组的sort方法：**

```javascript
// 箭头函数
sort((a, b) => { /* … */ } )
```

参数：

`a`：第一个用于比较的元素。

`b`：第二个用于比较的元素。

返回值为排序后的数组。请注意，数组已原地排序，并且不进行复制。

`retrun a - b`则是升序 `return b - a`则是降序

```javascript
const numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers);
// [1, 2, 3, 4, 5]

// 或者

const numbers2 = [4, 2, 5, 1, 3];
numbers2.sort((a, b) => a - b);
console.log(numbers2);
// [1, 2, 3, 4, 5]

```



列表排序案例调试结果：

​	升序：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311190336552.png" alt="image-20230311190336552" style="zoom:50%;" />

降序：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311190403232.png" alt="image-20230311190403232" style="zoom:50%;" />

搜索后降序：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230311190437509.png" alt="image-20230311190437509" style="zoom:50%;" />

原顺序则为开头的场景

### 1.16.5 Vue监测data中的数据

先来个案例引入一下：

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul> 
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:'女'},
                {id:'002',name:'周冬雨',age:31,sex:'女'},
                {id:'003',name:'周杰伦',age:18,sex:'男'},
                {id:'004',name:'温兆伦',age:19,sex:'男'}
            ]
        },
        methods: {
            updateMei(){
                // this.persons[0].name = '马老师' //奏效
                // this.persons[0].age = 50 //奏效
                // this.persons[0].sex = '男' //奏效
                this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
                // this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
            }
        }
    }) 

</script>

```

点击更新马冬梅的信息，马冬梅的数据并没有发生改变。

![image-20230313152729229](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313152729229.png)

我们来看看控制台：

![image-20230313152813061](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313152813061.png)

控制台上的数据发生了改变，说明，这个更改的数据并没有被 vue 监测到。

所以我们来研究一下 Vue 监测的原理。

我们先研究**Vue 如何监测对象里的数据**

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            name:'浙江师范大学',
            address:'金华',
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                friends:[
                    {name:'jerry',age:35}
                ]
            }
        }
    })
</script>

```

![image-20230313152845241](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313152845241.png)

```
讲一下解析模板后面的操作→ 调用 set 方法时，就会去解析模板----->生成新的虚拟 DOM----->新旧DOM 对比 -----> 更新页面
```

```html
<script type="text/javascript" >

    let data = {
        name:'尚硅谷',
        address:'北京',
    }

    //创建一个监视的实例对象，用于监视data中属性的变化
    const obs = new Observer(data)		
    console.log(obs)	

    //准备一个vm实例对象
    let vm = {}
    vm._data = data = obs

    function Observer(obj){
        //汇总对象中所有的属性形成一个数组
        const keys = Object.keys(obj)
        //遍历
        keys.forEach((k) => {
            Object.defineProperty(this, k, {
                get() {
                    return obj[k]
                },
                set(val) {
                    console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                    obj[k] = val
                }
            })
        })
    }
</script>

```

![image-20230313152909619](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313152909619.png)

### 1.16.6 Vue.set的使用

```javascript
Vue.set(target, propertyName/index, value) 或
vm.$set(target, propertyName/index, value)
```

**用法：**

​	向响应式对象中添加一个`property`，并确保这个新`property`同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新`property`，因为Vue无法探测普通的新增`property`（比如`vm.myObject.newProperty = 'hi'`）

代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue.set的使用</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h1>学生信息</h1>
        <button @click="addSex">添加一个性别属性，默认为男</button>
        <h2>学生姓名：{{student.name}}</h2>
        <h2 v-if="student.sex">学生性别：{{student.sex}}</h2>
        <h2>学生年龄：真实{{student.age.rAge}}，对外{{student.age.sAge}}</h2>
        <h2>朋友们</h2>
        <ul>
            <li v-for="(friend, index) in student.friends" :key="index">
                {{friend.name}}-{{friend.age}}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                student: {
                    name: 'tom',
                    // sex: '男',
                    age: {
                        rAge: 40,
                        sAge: 29,
                    },
                    friends: [
                        {name: 'jerry', age: 35},
                        {name: 'tony', age: 36}  
                    ]
                }
            },
            methods: {
                addSex(){
                        // Vue.set(this.student, 'sex', '男')
                        this.$set(this.student, 'sex', '男')
                }
            }
        })
    </script>
</body>
</html>
```

调试结果：

点击前：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313162109221.png" alt="image-20230313162109221" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313162121578.png" alt="image-20230313162121578" style="zoom:50%;" />

但是`Vue.set()`或vm.$set()有缺陷：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313162325848.png" alt="image-20230313162325848" style="zoom:50%;" />

意思就是 不能在vm和_data里面直接添加数据对象



再研究**Vue如何监测数组里的数据**

代码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue监测数据改变的原理_数组</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>爱好</h2>
        <ul>
            <li v-for="(item, index) in student.hobby" :key="index">
                {{item}}
            </li>
        </ul>
        <h2>朋友们</h2>
        <ul>
            <li v-for="(friend, index) in student.friends" :key="index">
                {{friend.name}}-{{friend.age}}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                student: {
                    name: 'tom',
                    // sex: '男',
                    hobby: ['唱', '跳', 'rap', '篮球'],
                    friends: [
                        { name: 'jerry', age: 35 },
                        { name: 'tony', age: 36 }
                    ]
                }
            },
            methods: {
            }
        })
    </script>
</body>

</html>
```

我们通过`vm._data.student.hobby[0] = '起飞'`尝试往数组里添加元素是不行的，页面并没有更新我们的信息，这跟前面提出来的问题是一个性质

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313193900640.png" alt="image-20230313193900640" style="zoom:50%;" />

​	而且查看Vue对象发现，数组中并没有为各个数组元素服务的getter和settter

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313194007563.png" alt="image-20230313194007563" style="zoom:50%;" />

​	那么Vue是如何监测到数组中数据改变的呢？

​	答：Vue对数组的监测是通过 包装数组上常用的用于修改数组的方法来实现的。

官网解释：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313194143623.png" alt="image-20230313194143623" style="zoom:50%;" />

​	所谓包裹，就是Vue对原生的数组方法进行了重写，当我们在Vue所接管的数组里面调用数组相关方法，会发现我们在Vue中调用和原生调用是不同的

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313194454159.png" alt="image-20230313194454159" style="zoom:50%;" />

​	被包裹的方法中主要有这几个操作：

		1. Vue会老老实实的在里面调用原生的方法
		1. 解析模板，生成虚拟DOM，对比前后的虚拟DOM.....

所以我们要想在Vue接管的数组中更新数据，得用被Vue重写的数组方法 注意图中的数据代理 和_data一样

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313194729745.png" alt="image-20230313194729745" style="zoom:50%;" />

另外，还可以用到我们上面提到的set方法来操作被Vue管理的数组（`Vue.set()和vm.$set()`都可以）

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230313195011043.png" alt="image-20230313195011043" style="zoom:50%;" />

### 1.16.7 总结Vue数据监测 

Vue监视数据的原理：

1. Vue会监视data中所有层次的数据

2. 如何监测对象中的数据？

   通过setter实现监视，切要在`new Vue`时就传入要监测的数据

   1. 对象中后追加的属性，Vue不做响应式处理

   2. 如需给后添加的属性做响应式，请使用如下API:

      ​	`Vue.set(target, propertyName/index, value)`或

      ​	`vm.$set(target, propertyName/index, value)`

3. 如何监测数组中的数据？

   通过包裹数组更新元素的方法实现，本质就是做了两件事：

   1. 调用原生对应的方法对数组进行更新
   2. 重新解析模板，进而更新页面

4. 在Vue修改数组中的某个元素一定要用到如下方法：

   1. 使用这些API:`push()、pop()、shift()、unshift()、splice()、sort()、reverse()`
   2. `Vue.set()`或`vm.$set()`

​	特别注意：`Vue.set()`和`vm.$set()`不能给vm或vm的根数据对象添加属性！！！

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>总结Vue数据监测</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div>
        <h1>学生信息</h1>

        <button @click="student.age++">年龄+1岁</button><br/>
        <button @click="addSex">添加性别属性：默认值：男</button><br/>
        <button @click="addFriend">在列表首位添加一个朋友</button><br/>
        <button @click="changeFirstName">修改第一个朋友的名字为：张三</button><br/>
        <button @click="addHobby">添加一个爱好</button><br/>
        <button @click="changeFirstHobby">修改第一个爱好为：开车</button><br/>
        <button @click="removeBask('跳')">过滤掉括号中的爱好</button><br/>

        <h3>姓名：{{student.name}}</h3>
        <h3 v-if="student.sex">性别：{{student.sex}}</h3>
        <h3>年龄：{{student.age}}</h3>
        <h3>爱好：</h3>
        <ul>
            <li v-for="(h, index) in student.hobby" :key="index">
                {{h}}
            </li>
        </ul>
        <h3>朋友们：</h3>
        <ul>
            <li v-for="(f, index) in student.friends" :key="index">
                {{f.name}}-{{f.age}}
            </li>
        </ul>
    </div>

    <script>
        const vm = new Vue({
            el: 'div',
            data: {
                student: {
                    name: 'tom',
                    age: 18,
                    hobby: ['唱', '跳', 'rap', '篮球'],
                    friends: [
                        {name: 'jerry', age: 36},
                        {name: 'tony', age: 37}
                    ]
                }
            },
            methods: {
                addSex(){
                    // Vue.set(this.student, 'sex', '男')
                    vm.$set(this.student, 'sex', '男')
                },
                addFriend(){
                    vm.student.friends.unshift({name: 'czq', age: 21})
                },
                changeFirstName(){
                    vm.student.friends[0].name = '张三'
                },
                addHobby(){
                    vm.student.hobby.push('鸡你太美')
                },
                changeFirstHobby(){
                    // vm.$set(this.student.hobby, 0, '开车')
                    vm.student.hobby.splice(0, 1, '开车')
                },
                removeBask(value){
                    vm.student.hobby = vm.student.hobby.filter((hobby) => {
                        return hobby !== value
                    })
                }
            },
        })
    </script>
</body>

</html>
```

## 1.17 收集表单数据

收集表单数据：

​	若：`<input type="text"/>`，则v-model收集的是`value`值，用户输入的就是`value`值

​	若：`<input type="radio"/>`，则v-model收集的是`value`值，切要给标签配置`value`值

​	若：`<input type="checkbox"/>`

				1. 没有配置input的`value`属性，那么收集的就是`checked`（勾选 或 未勾选，是布尔值）
   				2. 配置input的`value`属性：
          				1. v-model的初始值是非数组，那么收集的就是`checked`（勾选 或 未勾选，是布尔值）
          				2. v-model的初始值是数组，那么收集的就是`value`组成的数组

备注：v-model的三个修饰符：

​		`lazy`：失去焦点时收集数据

​		`number`：输入字符串转为有效的数字

​		`trim`：输入首尾空格过滤

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>收集表单数据</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <form @submit.prevent="submit">
            <label for="account">账号：</label>
            <input type="text" id="account" v-model.trim="userInfo.account"> <br /><br />
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="userInfo.password"> <br /><br />

            年龄：<input type="number" v-model.number="userInfo.age"><br/><br/>
            性别：
            男 <input type="radio" name="sex" value="male" v-model="userInfo.sex">
            女 <input type="radio" name="sex" value="female" v-model="userInfo.sex"> <br /><br />
            爱好：
            唱 <input type="checkbox" value="sing" v-model="userInfo.hobby">
            跳 <input type="checkbox" value="dance" v-model="userInfo.hobby">
            rap <input type="checkbox" value="rap" v-model="userInfo.hobby">
            篮球 <input type="checkbox" value="bask" v-model="userInfo.hobby"><br /><br />
            所属校区
            <select v-model="userInfo.city">
                <option value="">请选择校区</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="shenzhen">深圳</option>
                <option value="wuhan">武汉</option>
            </select><br /><br />
            其他信息:
            <textarea v-model.lazy="userInfo.other"></textarea><br /><br />
            <input type="checkbox" v-model="userInfo.confirm">阅读并接受<a href="http://www.baidu.com">《用户协议》</a>
            <button>提交</button>
        </form>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                userInfo: {
                    account: '',
                    password: '',
                    age: null,
                    sex: 'female',
                    hobby: [],
                    city: 'beijing',
                    other: '',
                    confirm: false
                }
            },
            methods: {
                submit() {
                    console.log(JSON.stringify(this.userInfo));
                }
            },
        })
    </script>
</body>

</html>
```

调试结果：

![image-20230315205820436](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230315205820436.png)

![image-20230315205916128](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230315205916128.png)

最后使用了json里面的解析字符串方法`stringify()`
