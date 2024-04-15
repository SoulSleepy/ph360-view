Это проект Next.js (https://nextjs.org/), инициализированный с использованием create-next-app (https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Проект написан при версии Node.js v16.15.0

Проект представляет из себя проводник, отображающий добавленные фото, с возможностью добавлять новые фото (1 или несколько), удалять и просматривать их в режиме сферы360 при клике на них,
внутри сферы организован блок для перемещения между фото и возможность вернуться в проводник, так же мы можем масштабировать фото при прокрутке колесика мыши и имеем полный обзор 360.
Предзагруженные фото для тестирования находят в папке public/photo360, вы так же можете загрузить их из других мест.
## Фото добавленные в проводник, хранятся в стейт менеджере для работы с ними так как это демонстрационная версия. 
При необходимости можно дописать логику их отправки на сервер или др. подобную.

## Для старта, необходимо:
- Скачать репозиторий на свой компьютер
- Установить все зависимости 
```bash
npm install
```
- Запустить проект
```bash
npm run dev
```
Открыть [http://localhost:3000](http://localhost:3000) в вашем браузере для просмотра результата.
