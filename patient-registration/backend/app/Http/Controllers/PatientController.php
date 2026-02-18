<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;
use App\Services\PatientNotificationService;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    public function store(StorePatientRequest $request)
    {
        $path = $request->file('document_photo')->store('documents', 'public');

        $patient = Patient::create([
            ...$request->validated(),
            'document_photo_path' => $path,
        ]);

        PatientNotificationService::sendRegistrationConfirmation($patient);

        return response()->json(['message' => 'Patient registered successfully', 'patient' => $patient], 201);
    }
}
