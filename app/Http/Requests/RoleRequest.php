<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'role_title' => 'required|unique:roles|max:255',
            'role_desc' => 'required|max:255',
        ];
    }

    public function messages()
    {
        return [
            'role_title.required' => 'Role title is required',
            'role_desc.required' => 'Role description is required',
        ];
    }
}
