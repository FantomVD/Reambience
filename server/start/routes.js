'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/ping', ({ response }) => response.res('pong!'))

Route.get('/api/v1/translate', 'TranslateController.translate').middleware(['valid:Translate'])
// Route.group(()=>{
//   Route.post('/', 'BookController.saveFavouriteBook').middleware(['auth'])
//   Route.get('/:id', 'BookController.getBookById').middleware()
//   Route.delete('/:id', 'BookController.deleteBookById').middleware(['auth','valid:Id'])
//   Route.get('/favourites', 'BookController.getFavourites').middleware
// }).prefix('/api/v1/books')

Route.group(() => {
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')
  Route.get('/me', 'AuthController.me').middleware(['auth'])
  Route.put('/', 'UserController.updateUser').middleware(['auth', 'valid:UpdateUser'])
}).prefix('api/v1/account')
