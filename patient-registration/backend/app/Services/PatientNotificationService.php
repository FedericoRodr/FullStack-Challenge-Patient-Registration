<?php

namespace App\Services;

use App\Mail\PatientRegisteredMail;
use App\Models\Patient;
use Illuminate\Support\Facades\Mail;

class PatientNotificationService
{
    public static function sendRegistrationConfirmation(Patient $patient): void
    {
        Mail::to($patient->email)
            ->queue(new PatientRegisteredMail($patient));
    }
}
