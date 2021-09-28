<?php

declare(strict_types=1);

namespace App\Application\Actions\Rubric;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\UploadedFileInterface;

class AddSubRubricAction extends RubricAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $files = $this->request->getUploadedFiles();
        $file = $files["file"];
        if ($file->getError() === UPLOAD_ERR_OK) {
            $filename = $this->moveUploadedFile("../db/files", $file);
        }
        $body = $this->request->getParsedBody();
        $rubric = $this->rubricRepository->addSubRubric(
            $this->resolveArg("id"),
            $body["rubricName"],
            $filename,
            (int)$body["x"],
            (int)$body["y"]
        );
        if ($rubric->getChildrenIds()) {
            $children = [];
            foreach ($rubric->getChildrenIds() as $childId) {
                $children[] = $this->rubricRepository->findRubricOfId($childId);
            }
            $rubric->setChildren($children);
        }
        $this->logger->info("SubRubric was added.");
        return $this->respondWithData($rubric);
    }


    /**
     * Moves the uploaded file to the upload directory and assigns it a unique name
     * to avoid overwriting an existing uploaded file.
     *
     * @param string $directory The directory to which the file is moved
     * @param UploadedFileInterface $uploadedFile The file uploaded file to move
     *
     * @return string The filename of moved file
     */
    private function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        // see http://php.net/manual/en/function.random-bytes.php
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}
