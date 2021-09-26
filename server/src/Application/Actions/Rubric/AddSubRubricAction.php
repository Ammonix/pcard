<?php

declare(strict_types=1);

namespace App\Application\Actions\Rubric;

use Psr\Http\Message\ResponseInterface as Response;

class AddSubRubricAction extends RubricAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $rubrics = $this->rubricRepository->addSubRubric($this->resolveArg("id"), $this->getFormData()->name, $this->getFormData()->imageSource);
        $this->logger->info("SubRubric was added.");
        return $this->respondWithData($rubrics);
    }
}
