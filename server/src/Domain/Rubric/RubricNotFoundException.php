<?php
declare(strict_types=1);

namespace App\Domain\Rubric;

use App\Domain\DomainException\DomainRecordNotFoundException;

class RubricNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The rubric you requested does not exist.';
}
