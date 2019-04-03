- 项目工程初始化
  - env2 保存环境变量到process.env中
- 接口契约与入参校验

## RESTful
每个网址代表一种资源，所以网址不能有动词，只能有名次，所用的名字往往与数据库中的表相对应。数据库中的表都是同种记录的"集合"，所以API中的名字也应该用复数。

### 过滤信息（Filtering）
- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件


## hapi
- 配置优于代码
- 许多高质量的插件
- 和 Swagger 结合

### 项目工程化设计原则
- 单业务模块化 //便于维护 模块间物理独立性
- 模块二百行原则 // 两百行以内便于阅读和维护，保持各模块相对精简维护
- 同类模块分组化 // 同类型模块分组管理
- 配置文件分离 //

## 接口契约与入参校验 —— 使用 Swagger & Joi
#### Joi 验证模块

```
// 安装
npm i joi@13
```
**适用于动态路由的 params 验证**

#### 使用 Swagger 插件配置接口文档

```
{
    met hod: 'POST',
    path: `/${GROUP_NAME}/{orderId}/pay`,
    config: {
      validate: {
        params: {
          orderId: Joi.string().required(),
        }
      }
    }
},
```

```
# 安装适配 hapi v16 的 swagger 插件
npm i hapi-swagger@7
npm i inert@4
npm i vision@4
npm i package
```
## 表结构设计、迁移与数据填充 Sequelize-cli
提供了大量常用数据库增删改查的函数式 API，
大量减少书写冗长的基础数据库查询语句
```
npm i sequelize-cli -D
npm i sequelize
npm i mysql2
```

```
//初始化数据结构
node_modules/.bin/sequelize init
```

```
├── config                       # 项目配置目录
|   ├── config.json              # 数据库连接的配置
├── models                       # 数据库 model
|   ├── index.js                 # 数据库连接的样板代码
├── migrations                   # 数据迁移的目录
├── seeders                      # 数据填充的目录
```

### models 目录与 models/index.js
用户定义数据库表结构对应的关系目录，sequelize-cli 会在 models 目录中自动生成一个 index.js，该模块会自动读取 config/config.js 中的数据库连接配置，并且动态加载未来在 models 目录中所增加的数据库表结构定义的模块，最终可以方便我们通过 models.tableName.operations 的形式来展开一系列的数据库表操作行为。
### migrations 目录
用于通过管理数据库表结构迁移的配置目录
### seeders 
用于在数据库完成 migrations 初始化后，填补一些打底数据的配置目录

### sequelize db:create 创建数据库

执行下面的命令，可以默认使用 development 下的配置，**来创建项目数据库**。增加例如 --env production，则使用 config/config.js 中的 production 项配置，来完成数据库的创建


```
node_modules/.bin/sequelize db:create

# 通过 --env 参数，指定为生产环境创建项目数据库
# node_modules/.bin/sequelize db:create --env production
```
## migrate 数据迁移
### 1. sequelize migration:create 创建迁移文件
数据库被创建完成后，需要进行数据表的创建，为了让表结构的修改可追溯，可以通过`migration`进行。`migration`来跟踪数据库表结构的更改。 通过 migration，我们可以将现有的数据库表结构迁移到另一个表结构定义，反之亦然。这些表结构的转换，将保存在数据库的迁移文件定义中，它们描述了如何进入新状态以及如何还原更改以恢复旧状态。

使用 `sequelize migration:create` 来创建一个迁移文件 `create-shops-table`

```
node_modules/.bin/sequelize migration:create --name create-shops-table
```
在migrations目录下，会新增一个`xxxxxxxxx-create-shops-table.js`迁移文件，xxxx为创建时候的时间戳，用来备注表结构更改的时间顺序。文件中包含up、down两个空函数，**up表示表结构正向改变的细**节，**down表示表结构的回退逻辑**，比如 up 中有 createTable 的建表行为，则 down 中配套有一个对应的 dropTable 删除表行为。

### 2 sequelize model:generate
或者通过`Creating first Model(and migration)`同时创建model和migration
```
/node_modules/.bin/sequelize model:generate --name shops --attributes name:string,thumb_url:string
```
this will do following

```
Create a model file shop in models folder

Create a migration file with name like XXXXXXXXXXXXXX-create-shop.js in migrations folder
```

### 3 sequelize db:migrate 迁移自动化生成创建数据表
将`migrations`目录下的迁移行为定义，按时间戳的顺序，逐个的执行描述，最终完成数据表结构的自动化创建。并且，在数据库中会默认创建一个名为`SequelizeMeta`的表，用于记录在当前数据库上所运行的迁移历史版本。

```
node_modules/.bin/sequelize db:migrate
```
### 4 sequelize db:migrate:undo 回退数据表迁移状态
帮助我们按照down中定义的回退规则，回退一个数据库表结构的迁移状态，

```
node_modules/.bin/sequelize db:migrate
```
撤销所有迁移，可以恢复到最初状态
```
equelize db:migrate:undo:all
```
`--to`恢复到特定迁移

```
node_modules/.bin/sequelize db:migrate:undo:all --to xxxxxxxxx-create-shops-table.js
```
### 4 向表中追加字段
并非所有的迁移场景都是创建新表，随着业务的不断深入展开，表结构的字段新增，也是常见的需求。

比如店铺 shops 表中增加一列 address 地址信息。

创建一个名叫 add-columns-to-shops-table 的迁移迁移文件：

```
node_modules/.bin/sequelize migration:create --name add-columns-to-shops-table
```

```
// 文件中添加如下代码
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('shops', 'address', { type: Sequelize.STRING }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('shops', 'address'),
  ]),
};
```
## seeders 种子数据填充
数据库表结构初始化完成后，使用`seeders`向表中初始化一些基础数据
### 1. sequelize seed:create
添加基础数据，遵循相同的 up/down 语义
```
node_modules/.bin/sequelize seed:create --name init-shops
```
### 2. sequelize db:seed:all
执行`sequlize db:seed:all`,将向数据库中填充seeders目录中所有up方法所定义的数据

*注意: seeders 的执行，不会将状态存储在 SequelizeMeta 表中。*

当然，我们也可以通过 --seed 来制定特定的 seed 配置来做填充：

```
node_modules/.bin/sequelize db:seed --seed xxxxxxxxx-init-shops.js
```
### sequelize db:seed:undo:all
撤销所有填充的数据

```
# 撤销所有的种子
node_modules/.bin/sequelize db:seed:undo:all

# 撤销指定的种子
node_modules/.bin/sequelize db:seed:undo --seed XXXXXXXXXXXXXX-demo-user.js
```
