# movies-explorer-api
Бэкенд часть приложения Дипломного проекта, Яндекс.Практикум, Веб-разработка  

# Адрес репозитория
https://github.com/MaxRMNK/movies-explorer-api  

## Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` — папка с файлами мидлвар
`/utils` — папка с файлами вспомогательных скриптов и констант

## Страницы
get `/signup` — Регистрация пользователя  
get `/signin` — Аутентификация пользователя  
  
get `/users/me` — Получение информации о текущем пользователе  
patch `/users/me` — Обновление данных пользователя  
  
get `/movies` — Получение фильмов добавленных в закладки текущим пользователем  
post `/movies` — Добавление фильма в закладки  
delete `/movies/:bookmarkId` — Удаление фильма из закладок  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload  

## Ссылки на проект

IP 84.201.135.155

Backend https://api.diplom.maxrmnk.nomoredomains.xyz  
