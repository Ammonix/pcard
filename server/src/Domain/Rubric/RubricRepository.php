<?php

declare(strict_types=1);

namespace App\Domain\Rubric;

interface RubricRepository
{
    /**
     * @return Rubric[]
     */
    public function findMainRubrics(): array;

    /**
     * @param string $id
     * @return Rubric
     * @throws RubricNotFoundException
     */
    public function findRubricOfId(string $id): Rubric;

    /**
     * @param string $parentId
     * @return Rubric
     * @throws RubricNotFoundException
     */
    public function addSubRubric(string $id, string $name, string $imageSource): Rubric;
}
