<?php
 
namespace App\Http\Controllers\API;
 
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\SetPassword;
use Illuminate\Support\Facades\DB;
 
class AuthController extends Controller
{
    public function register(Request $request){
        $requestData = $request->all();
        $requestData['name'] = $requestData['firstname'].' '.$requestData['lastname'];
        $validator = Validator::make($requestData,[
            'firstname' => 'required|max:70',
            'lastname' => 'required|max:70',
            'email' => 'email|required|unique:users,email',
            'useragree' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create($requestData);
        $token = md5(uniqid($user['id'], true)) ;

        $email = $requestData['email'];
        $data = ([
            'name' => $requestData['name'],
            'email' => $requestData['email'],
            'token' => $token,
            'link'=> url('').'/set-password/'.  $user['id'] .'/'. $token,
        ]);

        DB::table('set_password')->insert([
            'email' => $data['email'], 
            'token' => $data['token'],
            'created_at' => NOW(),
        ]);

        Mail::to($email)->send(new SetPassword($data));

        return response([ 'status' => true, 'message' => 'User successfully register.'], 200);
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

    public function logout (Request $request){
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }

    public function set_password(Request $request, $id, $token){
        $requestData = $request->all();
        $validator = Validator::make($requestData,[
            'password' => 'required|min:8',
            'password_confirm' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $requestData['password'] = Hash::make($requestData['password']);

        $user = User::find($id);
        $user->password = $requestData['password'];
        $user->update();

        DB::table('set_password')
              ->where('token', $token)
              ->update(['status' => 0]
        );

        return response([ 'status' => true, 'message' => 'Password set successful.'], 200);

    }

    public function set_password_status(Request $request){
        $token = $request->route('token');
        $status = DB::table('set_password')->where([['token', '=', $token],['status', '=', '0']])->get();
        if(!$status){
            return response()->json([
                'errors' => 'Token Expired'
            ], 422);
        }
    }
}