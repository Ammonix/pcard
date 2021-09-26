<?php

declare(strict_types=1);

namespace App\Domain\Rubric;

use JsonSerializable;

class Rubric implements JsonSerializable
{
    /**
     * @var string|null
     */
    private $id;

    /**
     * @var string|null
     */
    private $parentId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string|null
     */
    private $subTitle;

    /**
     * @var string
     */
    private $imageSource;

    /**
     * @var string[]|null
     */
    private $childrenIds;

    /**
     * @var Rubric[]|null
     */
    private $children;

    /**
     * @param string|null   $id
     * @param string        $name
     * @param string|null   $subTitle
     * @param string        $imageSource
     * @param string[]|null $childrenIds
     */
    public function __construct(?string $id, ?string $parentId, string $name, ?string $subTitle, string $imageSource, ?array $childrenIds = null)
    {
        $this->id = $id;
        $this->parentId = $parentId;
        $this->name = strtoupper($name);
        $this->subTitle = $subTitle;
        $this->imageSource = $imageSource;
        $this->childrenIds = $childrenIds;
    }

    /**
     * @return string|null
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getParentId(): ?string
    {
        return $this->parentId;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string|null
     */
    public function getSubTitle(): ?string
    {
        return $this->subTitle;
    }

    /**
     * @return string
     */
    public function getImageSource(): string
    {
        return $this->imageSource;
    }

    /**
     * @return string[]|null
     */
    public function getChildrenIds(): ?array
    {
        return $this->childrenIds;
    }

    /**
     * @param Rubric[]|null $children
     */
    public function setChildren(array $children)
    {
        $this->children = $children;
    }

    /**
     * @param string $childId
     */
    public function addChildId(string $childId)
    {
        return $this->childrenIds[] = $childId;
    }

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'subTitle' => $this->subTitle,
            'imageSource' => $this->imageSource,
            'children' => $this->children,
        ];
    }
}
