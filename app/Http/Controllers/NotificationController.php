<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
class NotificationController extends Controller
{
    public function index()
    {
        $notifications = DatabaseNotification::latest()->paginate(10);
        return inertia('Notifications/Index',[
            'notifications' => $notifications,
        ]);
    }

    public function update(DatabaseNotification $notification)
    {
        $notification->markAsRead();
        return redirect()->back()->with('success', 'Notification marked as read.');
    }
}
