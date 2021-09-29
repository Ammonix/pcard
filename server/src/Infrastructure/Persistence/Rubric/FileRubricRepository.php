<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Rubric;

use App\Domain\Rubric\Rubric;
use App\Domain\Rubric\RubricNotFoundException;
use App\Domain\Rubric\RubricRepository;

class FileRubricRepository implements RubricRepository
{
    /**
     * @var Rubric[]
     */
    private $rubrics;

    /**
     * @var string
     */
    private $fileName = "../db/rubrics.db";

    /**
     * FileRubricRepository constructor.
     *
     * @param array|null $rubrics
     */
    public function __construct()
    {
        if (!file_exists($this->fileName)) {
            $file = fopen($this->fileName, "w");
            fwrite($file, serialize($this->initalRubrics()));
            fclose($file);
        }
        $this->rubrics = unserialize(file_get_contents($this->fileName));
    }

    /**
     * {@inheritdoc}
     */
    public function findMainRubrics(): array
    {
        return array_values(array_filter($this->rubrics, fn ($v) => !$v->getParentId()));
    }

    /**
     * {@inheritdoc}
     */
    public function findRubricOfId(string $id): Rubric
    {
        if (!isset($this->rubrics[$id])) {
            throw new RubricNotFoundException();
        }

        return $this->rubrics[$id];
    }

    /**
     * {@inheritdoc}
     */
    public function addSubRubric(string $parentId, string $name, string $imageSource, int $x, int $y): Rubric
    {
        if (!isset($this->rubrics[$parentId])) {
            throw new RubricNotFoundException();
        }
        $childToAppend = new Rubric(uniqid(), $parentId, $name, null, $imageSource, $x, $y);
        $parent = $this->rubrics[$parentId];
        $parent->addChildId($childToAppend->getId());
        $this->rubrics[$childToAppend->getId()] = $childToAppend;
        file_put_contents($this->fileName, serialize($this->rubrics));
        return $this->rubrics[$parentId];
    }

    private function initalRubrics()
    {
        $id1 = "615079b183c00";
        $id2 = "615079b183c12";
        $id3 = "615079b183f13";
        return [
            $id1 => new Rubric(
                $id1,
                null,
                "wasserfahrzeug",
                "motorboot",
                "boat.jpg"
            ),
            $id2 => new Rubric(
                $id2,
                null,
                "landfahrzeug",
                "Auto",
                "car.jpg"
            ), 
            $id3 => new Rubric(
                $id3,
                null,
                "luftfahrzeug",
                "Propellerflugzeug",
                "plane.jpg"
            )
        ];
    }
}
