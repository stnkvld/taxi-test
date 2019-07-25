<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request) {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8|max:24',
        ]);

        $user = new User($request->all());
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:8|max:24',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!empty($user) && Hash::check($request->password, $user->password)) {
            $user->api_token = Str::random(60);
            $user->save();

            return response()->json([
                'success' => true,
                'user_name' => $user->name,
                'api_token' => $user->api_token
            ]);
        }

        return abort(403, "Неверный email или пароль");
    }

    public function logout(Request $request) {
        $user = User::where('api_token', $request->api_token)->first();
        $user->api_token = null;
        $user->save();

        return response()->json([
            'success' => true
        ]);
    }
}
