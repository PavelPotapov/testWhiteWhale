# WhiteWhale

**Приветствую Вас в приложении WhiteWhale. Это тестовое задание написанное для компании [Белый Кит](https://belkit.ru/) по [ТЗ](https://github.com/Ahitkin-kitactive/test-js)**

## Описание

### `Node v20.9.0 и выше` <br>

### `npm 10.1.0 и выше` <br>

### Stack `React 18` / `Redux Toolkit` / `ReactRouterV6.` <br><br>

### В качестве UI components использовал [ChakraUI](https://chakra-ui.com/)<br><br><img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true" alt="Chakra logo" width="300" style="max-width: 100%;"> <br><br>

### В качестве сборщика решил использовать [Vite](https://vitejs.dev/)<br><br><img src="https://vitejs.dev/logo.svg" alt="Пример картинки" width="100" height="80" style="vertical-align: middle"/><br><br>

> Изначально в ТЗ не было роута для получения refresh token или проверки на корректность текущего токена, для проверки состояния авторизации сделал обертку над компонентами Route,
> в рамках которой совершал запрос на сервер за получением файлов и при успешности этого запроса перенаправлял пользователя на страницу /workspace, такой подход показался не совсем удачным. <br> На данный момент решил сделать обычную проверку на наличие `access_token` в куки. Ассинхронный чанк остался для примера.

## Установка

**Клонируйте репозиторий:**

```bash
git clone https://github.com/PavelPotapov/testWhiteWhale/
cd testWhiteWhale
```

**Установите зависимости:**

```bash
npm install
```

## Запуск

```bash
npm run dev
```

**ИЛИ**

```bash
vite
```

### <img src="https://freedombelarus.github.io/0004/t_logo.png" alt="Пример картинки" width="20" height="20" style=""/> [PavelPotapov](https://t.me/Pavel_Potapov)
