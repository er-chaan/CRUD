<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['namespace' => 'CRUD'], function() use ($router){
    // APICallTracker starts
    $router->post('createEntry','ControllerCRUD@createEntry');
    $router->get('retrieveEntry/{id}','ControllerCRUD@retrieveEntry');
    $router->patch('updateEntry','ControllerCRUD@updateEntry');
    $router->delete('deleteEntry/{id}/','ControllerCRUD@deleteEntry');
    $router->post('uploadImage','ControllerCRUD@uploadImage');
    // APICallTracker ends
});