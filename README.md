## Практика по реактивному программированию

Я подумал, что практика `async/await` очень хорошо ложилась на ТЗ для лабораторной 2. Казалось бы,
просто пользуйся встроенными в язык future при общении с БД и радуйся.

Но я все таки решил попробовать `RxJS`, просто, чтобы потрогать. Сценарий получился игрушечный -
веб-сервис поддерживает копию данных у себя, но он подписался на обновления данных в БД. Как только
в БД обновляются данные, обновляется представление и у веб-сервера.

Database простая, in-memory, чтобы меньше нужно было телодвижений для запуска (тестов, например).

#### Структура:

- Простой веб-сервер описан в `server.ts` + `handlers.ts`
- Основная логика магазина в `shop.ts`
- Логика базы данных - в `database.ts`

#### Запуск:

```
npm install
npm test
```


