<?php

declare(strict_types=1);

namespace App\Application\Actions\Files;

use App\Application\Actions\Action;
use Psr\Log\LoggerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use GuzzleHttp\Psr7\LazyOpenStream;

class FileAction extends Action
{
    /**
     * @param LoggerInterface $logger
     * @param RubricRepository $rubricRepository
     */
    public function __construct(
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $fileId = (string) $this->resolveArg('id');

        $this->logger->info("File of id `${fileId}` was requested.");
        return $this->response->withBody(new LazyOpenStream('../db/files/' . $fileId, 'r'))->withHeader("Content-Type", "image");
    }
}
