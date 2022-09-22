<?php
 
namespace App\Http\Controllers\API;
 
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
 
class AuthController extends Controller
{
    public function register(Request $request){
        $requestData = $request->all();
        $validator = Validator::make($requestData,[
            'name' => 'required|max:70',
            'email' => 'email|required|unique:users,email',
            'password' => 'required|min:8',
            'password_confirm' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $requestData['password'] = Hash::make($requestData['password']);

        $user = User::create($requestData);

        return response([ 'status' => true, 'message' => 'User successfully register.' ], 200);
    }
  
    public function login(Request $request){
        $requestData = $request->all();
        $validator = Validator::make($requestData,[
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if(! auth()->attempt($requestData)){
            return response()->json(['error' => 'UnAuthorised Access'], 401);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken], 200);
    }
 
    public function userInfo(){
 
        $user = auth()->user();
        //$user = $request->user();
        return response()->json(['user' => $user], 200);
 
    }

    public function setPassword(Request $request){
        $this->validate($request, [
            'password' => 'required|min:3',
        ]);

        if (auth()->attempt($data)) {
            $token = auth()->user()->createToken('authToken')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function logout (Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }
}