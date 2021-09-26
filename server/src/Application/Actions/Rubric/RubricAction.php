<?php
declare(strict_types=1);

namespace App\Application\Actions\Rubric;

use App\Application\Actions\Action;
use App\Domain\Rubric\RubricRepository;
use Psr\Log\LoggerInterface;

abstract class RubricAction extends Action
{
    /**
     * @var RubricRepository
     */
    protected $rubricRepository;

    /**
     * @param LoggerInterface $logger
     * @param RubricRepository $rubricRepository
     */
    public function __construct(LoggerInterface $logger,
                                RubricRepository $rubricRepository
    ) {
        parent::__construct($logger);
        $this->rubricRepository = $rubricRepository;
    }
}
