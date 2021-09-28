<?php

declare(strict_types=1);

namespace App\Application\Actions\Rubric;

use Psr\Http\Message\ResponseInterface as Response;

class ViewRubricAction extends RubricAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $rubricId = (string) $this->resolveArg('id');
        $rubric = $this->rubricRepository->findRubricOfId($rubricId);

        if ($rubric->getChildrenIds()) {
            $children = [];
            foreach ($rubric->getChildrenIds() as $childId) {
                $children[] = $this->rubricRepository->findRubricOfId($childId);
            }
            $rubric->setChildren($children);
        }

        $this->logger->info("Rubric of id `${rubricId}` was viewed.");

        return $this->respondWithData($rubric);
    }
}
