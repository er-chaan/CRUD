<?php

namespace App\Http\Controllers\CRUD;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
// use League\Flysystem\Filesystem;
// use League\Flysystem\Adapter\Local;
use DB;
use Validator;

class ControllerCRUD extends Controller
{
    public function index(Request $request,Response $response){
        return json_encode("Error : Restricted Zone !");
    }
    public function createEntry(Request $request,Response $response){
        $validator = Validator::make($request->all(), [
            'fullName' => 'required',
            'sex' => 'required',
            'birthDate' => 'required',
            'email' => 'required',
            'mobile' => 'required',
            'continent' => 'required',
            'photo' => 'required',
            'photoID' => 'required',
        ]);
        if ($validator->fails()) {
            echo $validator->errors();
            return $response->$validator->errors();
        }
        if(!$validator->fails()){
            try { 
                $fullName = $request->input("fullName");
                $sex = $request->input("sex");
                $birthDate = $request->input("birthDate");
                $email = $request->input("email");
                $mobile = $request->input("mobile");
                $continent = $request->input("continent");
                $skills = $request->input("skills");
                $skillsSet = "";
                foreach($skills as $key=>$value){
                    if($value == 1) {
                        $skillsSet .= $key.",";
                    }
                }
                $photo = $request->input("photoID");
                $status = "active";
                $query = DB::table('CRUD.users')->insertGetId(
                    ['fullName'=>$fullName,
                    'sex'=>$sex,
                    'birthDate'=>$birthDate,
                    'email'=>$email,
                    'mobile'=>$mobile,
                    'continent'=>$continent,
                    'skills'=>$skillsSet,
                    'photo'=>$photo,
                    'status'=>$status]);
                    $response = response("success", 200);
                    return $response;
              } catch(\Illuminate\Database\QueryException $ex){ 
                echo $ex->getMessage();
                $response = response($response->$ex->getMessage(), 307);
                return $response;
              }
        }
      }
      public function retrieveEntry(Request $request, Response $response){
        $sql = "SELECT * FROM CRUD.users order by id DESC";
        $result = DB::select($sql);
        return $result;
      }
      public function updateEntry(Request $request,Response $response){

      }
      public function deleteEntry($id, Request $request,Response $response){
        try{
            $photo = DB::table('users')->where('id', $id)->value('photo');
            $photo = base_path()."/public/images/".$photo;
            if(unlink($photo)){
                $sql = "DELETE FROM CRUD.users WHERE id=".$id."";
                DB::select($sql);
                $response = response("success", 200);
                return $response;
            }
            else{
                $response = response("failed", 200);
                return $response;
            }
        }
        catch(\Illuminate\Database\QueryException $ex){ 
            echo $ex->getMessage();
            $response = response($response->$ex->getMessage(), 307);
            return $response;
        }
      }
      public function uploadImage(Request $request, Response $response){
        $validator = Validator::make($request->all(), [
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048|min:1',
        ]);
        if ($validator->fails()) {
            echo $validator->errors();
            return $response->$validator->errors();
        }
        if (!$validator->fails()) {
            try{if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $name = $request->file("photo")->getClientOriginalName();
                $destinationPath = base_path()."/public/images/";
                $image->move($destinationPath, $name);
                $response = response("success", 200);
                return $response;
            }}
            catch(\Illuminate\Database\QueryException $ex){ 
                echo $ex->getMessage();
                $response = response($response->$ex->getMessage(), 307);
                return $response;
              }
        }
      }
}
