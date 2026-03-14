<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class BreadcrumbService
{
    public static function generate($routeName)
    {
        if (!$routeName) {
            return [];
        }

        $parts = explode('.', $routeName);

        $breadcrumbs = [];

        foreach ($parts as $index => $part) {

            // Handle dashboard root
            if ($index === 0) {
                $breadcrumbs[] = [
                    'label' => Str::title($part),
                    'route' => Route::has($part) ? $part : null
                ];
                continue;
            }

            // Skip action names
            if (in_array($part, ['index','create','edit','show'])) {
                continue;
            }

            $resourceRoute = implode('.', array_slice($parts, 0, $index + 1)) . '.index';

            $breadcrumbs[] = [
                'label' => Str::title(str_replace('_',' ',$part)),
                'route' => Route::has($resourceRoute) ? $resourceRoute : null
            ];
        }

        // Add final action
        $action = last($parts);

        if (in_array($action, ['create','edit','show'])) {
            $breadcrumbs[] = [
                'label' => Str::title($action),
                'route' => null
            ];
        }

        return $breadcrumbs;
    }
}