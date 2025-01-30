<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illumminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function ShowLoginForm(){
        return view('auth.login');
    }

    public function ShowLogoutForm(){
        return view('auth.logout');
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }

    public function Login(Request $request){
        try{
            $request -> validate([
                'team' =>'required',
                'password'=> 'required'
            ]);
            if (Auth::attempt(credentials: $request->only('team', 'password'))){
                $request->session()->regenerate();
                return redirect()->route('welcome')->with('success','login successful');
            }else{
                dump('Login failed credential is not found. Please try again!');
                return redirect()->route('login')->with('error','login unsuccessful');
            }
        }catch(\Exception $error){
            dump($error->getMessage());
        }
    }
}
