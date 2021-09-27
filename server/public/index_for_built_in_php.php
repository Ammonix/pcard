<?php

/**
 * When using built-in Webserver dots in uri will be served as static files without this script
 * https://dev.to/crazedvic/improving-redirects-in-php-built-in-webserver-489d
 */

$_SERVER['SCRIPT_NAME'] = 'index.php';
include 'index.php';
