# Ретро

Редактор ретро с экспортом в Markdown: блоки «Плюсы», «Минусы», «Вопросы», «Идеи», «Планы», «Преза», «Запись», стикеры размера задач и кнопка «Скопировать Markdown» для Mattermost.

**Открыть:** <https://dmitryyalchik.github.io/retro/>

Всё хранится в браузере (localStorage), на сервер ничего не уходит.

## Публикация

Сайт собирается GitHub Actions (`.github/workflows/deploy.yml`) и выкладывается на GitHub Pages **при публикации нового релиза**:

1. Releases → Draft a new release.
2. Тег вида `v1.0.1`, Publish release.
3. Через минуту обновлённая страница доступна по ссылке выше.

Внизу страницы видно версию (тег релиза), хеш коммита и дату. Пересобрать без релиза можно вручную: Actions → Deploy to GitHub Pages → Run workflow.
