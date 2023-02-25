# Metric Tracking

Full name : Vo Dinh Dung\
Framework : ExpressJS\
Language  : Typescript\
API       : Restful API\
Database  : MongoDB


## Installation
- clone env.example file to .env and run below commands
```bash
# build to js file
$ npm run build

# run watch mode
$ npm run dev

```


## API Reference

#### User should be able to add new metric with: Date, Value, Unit

```http
  POST /api/addMetric
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `value` | `string` | **Required**  |
| `unitName` | `string` | **Required**: value is same blow Enum |
| `typeName` | `string` | **Required**: value is same blow Enum  MetricType|

```
enum UnitType {
    meter = "meter",
    centimeter = "centimeter",
    inch = "inch",
    feet = "feet",
    yard = "yard",
    C = "°C",
    F = "°F",
    K = "°K",
}
```

```
enum MetricType {
    distance = "distance",
    temperature = "temperature",
}
```


#### User should be able get a List of all Metrics base on the type ( Distance / Temperature)

```http
  GET /api/getMetrics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. value is same blow Enum  MetricType |


#### User should be able to get data to draw a chart, which take the latest metric insert for a day, based on the type and specific time period (1 Month, 2 Month)

```http
  GET /api/getMetrics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. value is same blow Enum  MetricType |
| `startDate`      | `string format yyyy-mm-dddd` | **Required**. value is same blow Enum  MetricType |
| `endDate`      | `string format yyyy-mm-dddd` | **Required**. value is same blow Enum  MetricType |

- To take the latest metric insert for a day base on type : 
just set startDate and endDate is the same value\

Example : 
```
http://localhost:3500/api/getMetrics?type=temperature&startDate=2023-02-25&endDate=2023-02-25
```

- To take the latest metric the type and specific time period:
Example : 
```
http://localhost:3500/api/getMetrics?type=temperature&startDate=2023-02-25&endDate=2023-03-25
```

#### If User specific a unit when calling the above APIs, it should also convert the value for them.

```http
  GET /api/getMetrics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. value is same blow Enum  MetricType |
| `startDate`      | `string format yyyy-mm-dddd` | **Required**. value is same blow Enum  MetricType |
| `endDate`      | `string format yyyy-mm-dddd` | **Required**. value is same blow Enum  MetricType |
| `unitName`      | `string` | **Required**. value is same blow Enum  UnitType |

Example:
```
http://localhost:3500/api/getMetrics?type=temperature&startDate=2023-02-25&endDate=2023-03-2&unitName=°C
```
