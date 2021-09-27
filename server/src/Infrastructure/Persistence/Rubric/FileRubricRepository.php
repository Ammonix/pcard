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
    public function addSubRubric(string $parentId, string $name, string $imageSource): Rubric
    {
        if (!isset($this->rubrics[$parentId])) {
            throw new RubricNotFoundException();
        }
        $childToAppend = new Rubric(uniqid(), $parentId, $name, null, $imageSource);
        $parent = $this->rubrics[$parentId];
        $parent->addChildId($childToAppend->getId());
        $this->rubrics[$childToAppend->getId()] = $childToAppend;
        file_put_contents($this->fileName, serialize($this->rubrics));
        return $this->rubrics[$parentId];
    }

    private function initalRubrics()
    {
        $parentId1 = "615079b183c00";
        $childId1 = "615079b183c12";
        $childId2 = "615079b183f13";
        $childId3 = "615079b152e15";
        $childId4 = "615079b181c08";
        return [
            $parentId1 => new Rubric(
                $parentId1,
                null,
                "wasserfahrzeug",
                "motorboot",
                "boat.jpg",
                [
                    $childId1,
                    $childId2,
                    $childId3,
                    $childId4,
                ]
            ),
            $childId1 =>  new Rubric(
                $childId1,
                $parentId1,
                "Motorenraum Schallschutz",
                null,
                "assets/imgs/motorboot.jpg"
            ),
            $childId2 => new Rubric(
                $childId2,
                $parentId1,
                "Innenraum Lärmschutz",
                null,
                "assets/imgs/motorboot.jpg"
            ),
            $childId3 =>  new Rubric(
                $childId3,
                $parentId1,
                "Schaumstoff Polster Matratzen",
                null,
                "assets/imgs/motorboot.jpg"
            ),
            $childId4 => new Rubric(
                $childId4,
                $parentId1,
                "Motorboot Dichtungen-Profile aus Gummi",
                null,
                "assets/imgs/motorboot.jpg"
            ),
        ];
    }
}
