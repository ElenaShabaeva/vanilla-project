В первом уроке мы приступим к настройке проекта через таск-менеджер [Gulp](https://gulpjs.com/).
## Менеджер пакетов

Для начала мы должны инициализировать проект и подключить пакетный менеджер [npm](https://docs.npmjs.com/about-npm)
Создаем папку и переходим в нее с помощью терминала:

```
mkdir vanilla-project
```

```
cd vanilla-project
```

Далее необходимо инициализировать проект, не забудьте перед этим установив модуль [npm](https://docs.npmjs.com/about-npm) 

```
npm init
```

После инициализации проекта, в папке появится файл `package.json`, тут будут хранится базовые настройки проекта и список установленных пакетов.

После создания файла _package.json_, мы можем установить [Gulp](https://gulpjs.com/) в проект с помощью следующей команды:

```
npm install gulp --save-dev
```

## Структура проекта

** Создадим структуру проекта следующим образом

```
|- src/ 
	|- assets/
		|- svg/
	|- public/
	|- pug/
		|- views/
			index.pug
	|- js/
		main.js
	|- style/
		main.scss
|- build/
|- node_modules/
gulpfile.js
package.json
```

Мы будем использовать папку **src** для целей разработки, в то время как папка **build** используется для хранения оптимизированных файлов рабочего сайта. Поскольку src используется для целей разработки, то весь наш код размещается в этой папке.

Теперь перейдём к созданию вашей первой задачи в `gulpfile.js` — в этом файле хранятся все конфигурации Gulp.

## Настройка Gulp
### Pug

Pug - это препроцессор HTML и шаблонизатор, который был написан на JavaScript для Node.js.

С примерами использования pug можно будет ознакомиться [тут](https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228).

Для начала устанавливаем пакет:

```
npm install gulp-pug --save-dev
```

Далее переходим в файл `gulpfile.js`.
Тут создаем задачу и запускаем ее в параллельном режиме общей задачи serve:

```
const { src, dest, task, series, parallel } = require('gulp')  
const pug = require('gulp-pug');  
  
task('pug', () => {  
    return src('./src/pug/views/**/*.pug')  
        .pipe(  
            pug({  
                // Your options in here.  
            })  
        )  
        .pipe(dest('./build'));  
})  
  
task('serve', series(parallel('pug')))
```

В папке `.src/pug/views` будут хранится страницы будущего проекта, в ней мы можем создать любой pug файл и проверить работу задачи.

Для этого обновим файл `package.json`, добавив туда новый скрипт, его мы будем использовать для разработки:

```
"scripts": {  
  "serve": "gulp serve"  
}
```

Теперь сможем запустить задачи командой:

```
npm run serve
```

В папке `./build` появятся собранные HTML-файлы.

### Livereload

Далее настроим сервер для разработки, для этого установим пакет `browser-sync` и инициализируем его в файле `gulpfile.js`

```
npm i browser-sync --save-dev
```

Создадим задачу для инициализации сервера:

```
task('server', () => {  
    browserSync.init({  
        server: { baseDir: 'build/' },  
        notify: false,  
        online: true  
    })  
})
```

Добавляем эту задачу в базовую цепочку задач `serve`:

```
task('serve', series(parallel('pug'), parallel('server')))
```

Отлично, сервер работает, теперь осталось добавить watcher, который будет следить за файлами pug, при изменении обновлять их и сообщать об изменениях серверу.

```
const { src, dest, task, series, parallel, watch } = require('gulp')  
const pug = require('gulp-pug');  
const browserSync = require('browser-sync').create();  
  
task('pug', () => {  
    return src('./src/pug/views/**/*.pug')  
        .pipe(  
            pug({  
                // Your options in here.  
            })  
        )  
        .pipe(dest('./build'))  
        .pipe(browserSync.stream());  
})  
  
task('server', () => {  
    browserSync.init({  
        server: { baseDir: 'build/' },  
        notify: false,  
        online: true  
    })  
})  
  
task('watch', () => {  
    watch('./src/pug/**/*.pug', series('pug'));  
})  
  
task('serve', series(parallel('pug'), parallel('watch', 'server')))
```

Готово, теперь при любых изменениях в папке `./src/pug` заново выполняется задача `pug` и обновляется сервер.

### Сборка скриптов и Webpack

Для сборки скриптов нам потребуется [Webpack](https://webpack.js.org/), установим его в проект: 

```
npm i webpack webpack-stream --save-dev
```

Для корректной работы Webpack необходим файл конфигураций создадим его в корневой директории `./webpack.config.js`

```
module.exports = {  
  context: `${__dirname}/src/js/`,  
  entry: {  
    app: './main.js',  
  },  
  output: {  
    filename: '[name].js',  
  },  
  resolve: {  
    alias: {  
      '@js': `${__dirname}/src/js`,  
    },  
    modules: [`${__dirname}/node_modules/`],  
    extensions: ['.js'],  
    symlinks: false,  
  },  
  module: {  
    rules: [],  
  },  
}
```

Так же обновим `gulpfile.js`

```
const { src, dest, task, series, parallel, watch } = require('gulp')  
const pug = require('gulp-pug');  
const browserSync = require('browser-sync').create();  
const webpack = require('webpack');  
const webpackConfig = require('./webpack.config.js');  
const webpackStream = require('webpack-stream');  
  
task('pug', () => {  
    return src('./src/pug/views/**/*.pug')  
        .pipe(  
            pug({  
                // Your options in here.  
            })  
        )  
        .pipe(dest('./build'))  
        .pipe(browserSync.stream());  
})  
  
task('server', () => {  
    browserSync.init({  
        server: { baseDir: 'build/' },  
        notify: false,  
        online: true  
    })  
})  
  
task('webpack', () => {  
    return src('./src/js/main.js')  
        .pipe(webpackStream(webpackConfig, webpack))  
        .pipe(dest('./build/js'))  
        .pipe(browserSync.stream());  
})  
  
task('watch', () => {  
    watch('./src/pug/**/*.pug', series('pug'));  
})  
  
task('serve', series(parallel('pug', 'webpack'), parallel('watch', 'server')))
```

## Задание

- Настройте watcher для всех js-файлов проекта *
- Настройте сборку и обновление scss-файлов при помощи библиотеки  [gulp-sass](https://github.com/dlmanning/gulp-sass) *
- Настройте копирование публичных файлов проекта из папки `./src/public` в корень папки `./build` при помощи пакета [gulp-copy](https://github.com/klaascuvelier/gulp-copy) *
- Настройте очистку папки `./build` при запуске команда `serve` с помощью пакета [gulp-clean](https://github.com/peter-vilja/gulp-clean) *
- Добавте файл .gitignore и инициализируйте git-репозиторий (https://github.com/) *

## Дополнительные задания 

- Подключите к проекту линтер кода [Eslint](https://eslint.org/) 
- Подключите к проекту [Prettier](https://prettier.io/) 
- Добавте в Webpack компайлер [Babel.js](https://babeljs.io/)
- Подключите к проекту любую библиотеку для тестов.

## Материалы 

- Документация [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- Документация [Pug](https://pugjs.org/api/getting-started.html)
- Документация [Webpack](https://webpack.js.org/)
