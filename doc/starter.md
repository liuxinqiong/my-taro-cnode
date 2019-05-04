taro 简介
* 多端运行
* React 语法风格
* 组件化
* TypeScript
* 开发体验
* 开发流程自动化

只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、RN等）运行的代码。

如何开始
* 全局安装 @tarojs/cli
* 初始化项目 taro init myapp
* npm run dev:platform
* npm run build:platform

路由功能
* 在 Taro 中路由功能是默认自带的，直接在 config.pages 下配置即可，无需额外配置，在代码中通过 Taro 提供的 api 来跳转即可
* 路由参数：路径添加查询字符串，this.$router.params 获取

生命周期和 state
* 状态更新一定是异步的，如果需要立刻拿到更新后的值，需要通过 setState 第二参数，回调函数
* 必须调用 setState 才会更新组件
* 和 react 的生命周期保持一致
  * componentWillMount、componentDidMount、componentWillUnmount，componentWillUpdate、componentDidUpdate
  * shouldComponentUpdate(nextProps, nextState) 一般用来多次的 setState 调用时，提升性能
  * componentWillReceiveProps(nextProps) 父组件传递给子组件的参数发生改变时触发
* 为小程序添加 componentDidShow、componentDidHide 钩子
* props 可以传递任意类型，原始性、对象、函数均可，但在小程序中函数传值必须给函数添加`on`字符，为保持统一，建议均采用该规范
* 为组件 props 设置默认值：component.defaultProps = {}

导入图片、音频、视频等本地静态资源：需要使用 require 或 import

条件渲染
* 短路表达式 ||
* 三元表达式

列表渲染
* map 循环，记得绑定 key 属性，提高渲染速度
* taro 的 map 回调不能写 if，即使在 react 中是可以的，因此我们需要先处理数据再处理模板

props.children 获取组件内容元素，由于小程序的限制，因此有如下特殊性
* 不要对 props.children 进行任何操作
* 无法用 defaultProps 设置默认值
* 不能把 props.children 分解为变量再使用
* 如果组件里需要多个组件，由于 props.children 不能拆解，可以通过 render props 的方式，通过属性传入一个组件

事件处理
* 驼峰命名
* 阻止冒泡必须明确使用 stopPropagation
* 事件处理函数 this 的问题
  * 在小程序中不能使用在 render 中使用箭头函数的方式处理
  * 因此在小程序中，如果事件需要传参，可以在 render 函数中使用 bind 的形式，这样既解决了 this 问题，也解决了传参问题

环境变量：process.env.TARO_ENV，可以用来针对不同平台做适配

CSS 限制
* 不能使用 id 选择器
* 不能使用标签选择
* 不能使用选择器
* `>` 不一定生效，因为结果的层级可能会改变
* 自定义组件样式，只对当前组件有效（仅限小程序，在 H5 端会全局生效，需额外配置）
* 推荐 flex 布局

数据不变性提升性能
