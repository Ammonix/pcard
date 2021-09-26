<?php

declare(strict_types=1);

namespace App\Application\Actions\Rubric;

use Psr\Http\Message\ResponseInterface as Response;

class ListRubricsAction extends RubricAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $rubrics = $this->rubricRepository->findMainRubrics();

        foreach ($rubrics as $rubric) {
            $children = [];
            foreach ($rubric->getChildrenIds() as $childId) {
                $children[] = $this->rubricRepository->findRubricOfId($childId);
            }
            $rubric->setChildren($children);
        }
        
        $this->logger->info("Rubrics list was viewed.");

        return $this->respondWithData($rubrics);
    }
}
