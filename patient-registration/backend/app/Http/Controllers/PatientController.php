<?php

namespace App\Http\Controllers;

use App\Mail\PatientRegisteredMail;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:patients,email'],
            'phone' => ['required', 'string', 'max:20'],
            'document_photo_path' => ['required', 'string'],
        ]);

        $patient = Patient::create($validatedData);

        Mail::to($patient->email)->queue(
            new PatientRegisteredMail($patient)
        );

        return response()->json(['message' => 'Patient registered successfully', 'patient' => $patient], 201);
    }
}
