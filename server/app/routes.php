<?php

declare(strict_types=1);

use App\Application\Actions\Rubric\ListRubricsAction;
use App\Application\Actions\Rubric\ViewRubricAction;
use App\Application\Actions\Rubric\AddSubRubricAction;
use App\Application\Actions\Files\FileAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->group('/rubrics', function (Group $group) {
        $group->get('', ListRubricsAction::class);
        $group->get('/{id}', ViewRubricAction::class);
        $group->post('/{id}/children', AddSubRubricAction::class);
    });

    $app->get('/files/{id}', FileAction::class);
};
