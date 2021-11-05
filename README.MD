# Stockbit Test

## Requirement

- Node >= 14.0.0
- Yarn >= 1.22.10

## Getting Start

1. First install all depedencies

```
yarn install
```

2. Setup .env

```
PORT=3001
OMDB_URL=https://www.omdbapi.com
OMDB_KEY=
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=
DB_NAME_TEST=
DB_USERNAME=root
DB_PASSWORD=
DB_DIALECT=mysql
```

3. Run app

```
yarn migrate
yarn start
```

4. Or if you want to run test for all answer-2, answer-3 and answer-4

```
yarn test
```

5. If want to run end-to-end test for answer-2

```
yarn test:e2e
```

## Answer 1

```
SELECT u.ID, u.UserName, p.UserName AS 'ParentUserName'
FROM USER AS u
LEFT JOIN USER AS p
ON u.Parent = p.ID
ORDER BY u.ID ASC;
```

File can be access on [answer-1](https://github.com/lugassawan/stockbit-test/blob/main/answer-1/query.sql)

## Answer 2

- URL app - [https://lugas-stockbit-test.herokuapp.com](https://lugas-stockbit-test.herokuapp.com)

- GET [/search](https://lugas-stockbit-test.herokuapp.com/search?q=batman&page=1)

```
Query
- q : string, required
- page : number
```

- GET [/detail/:id](https://lugas-stockbit-test.herokuapp.com/detail/tt0372784)

```
Param
- id : string, required
```

- GET [/logs](https://lugas-stockbit-test.herokuapp.com/logs?q=search)

```
Query
- q : string, required
- page : number
- limit : number
```

File can be access on [answer-2](https://github.com/lugassawan/stockbit-test/tree/main/answer-2)

## Answer 3

Run this script if you want to check the tests

```
yarn test:answer3
```

File can be access on [answer-3](https://github.com/lugassawan/stockbit-test/tree/main/answer-3)

## Answer 4

Run this script if you want to check the tests

```
yarn test:answer4
```

File can be access on [answer-4](https://github.com/lugassawan/stockbit-test/tree/main/answer-4)
