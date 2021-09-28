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
     * @param string $name
     * @param string $imageSource
     * @param int $x
     * @param int $y
     * @return Rubric
     * @throws RubricNotFoundException
     */
    public function addSubRubric(string $parentId, string $name, string $imageSource, int $x, int $y): Rubric;
}
