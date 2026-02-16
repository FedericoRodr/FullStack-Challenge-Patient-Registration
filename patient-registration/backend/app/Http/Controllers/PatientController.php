<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:patients,email'],
            'phone' => ['required', 'string', 'max:20'],
        ]);

        $patient = Patient::create($validatedData);

        return response()->json(['message' => 'Patient registered successfully', 'patient' => $patient], 201);
    }
}
