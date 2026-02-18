<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:patients,email'],
            'phone' => ['required', 'string', 'max:20'],
            'document_photo' => ['required', 'image', 'mimes:jpeg,jpg', 'max:2048'],
        ];
    }
}
