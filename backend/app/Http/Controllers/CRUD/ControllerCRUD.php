<?php

namespace App\Http\Controllers\CRUD;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use DB;

class ControllerCRUD extends Controller
{
    public function index(Request $request){
        return json_encode("Error : Restricted Zone !");
    }
    ///////////////////////////////////////////////
    public function createEntry(Request $request){
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
        $photo = $request->input("photo");
        $status = "active";
        $query = DB::table('CRUD.users')->insertGetId(
            ['fullName'=>$fullName,
            'sex'=>$sex,
            'birthDate'=>$birthDate,
            'email'=>$email,
            'mobile'=>$mobile,
            'continent'=>$continent,
            'skills'=>$skillsSet,
            'photo'=>time().'_'.$photo,
            'status'=>$status]);
        if($query){
            return "success";
        }
        else{
            return false;
        }
      }
      public function retrieveEntry(Request $request){
        $sql = "SELECT * FROM CRUD.users order by id DESC";
        $result = DB::select($sql);
        return $result;
      }
      public function uploadImage(Request $request){
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $name = time().'_'.$request->file("photo")->getClientOriginalName();
            $destinationPath = storage_path('/app/images');
            $image->move($destinationPath, $name);
            return "success";
        }
        else{
            return false;
        }
      }
      ////////////////////////////////////////
    public function getAPICallTracker(){
        $sql = "SELECT * FROM DataEngine.Tracker_APICalls";
        $result = DB::select($sql);
        return $result;
    }
    public function changeAPICallSignal($id,$signal){
      if($id > 5){
          return json_encode("Error : Under Development !");
      }
        $sql = "SELECT * FROM DataEngine.Tracker_APICalls where id=".$id."";
        $currentSignal = '';
        $APICallName = '';
        $result = DB::select($sql);
        if($result){
            foreach ($result as $row){
                $currentSignal = $row->CurrentSignal;
                $APICallName = $row->APICallName;
            }
        }
        $EmergencyExit = 'no';
        if($signal == 'red'){
            $EmergencyExit = 'yes';
            DB::table('DataEngine.Tracker_APICalls')->where('id', $id)->update(['CurrentSignal'=>$signal,'EmergencyExit'=>$EmergencyExit]);
            return json_encode("Success : Signal changed successfully !");
        }
        if($id == 1 || $id == 2){
          if($currentSignal == 'red'){
              DB::table('DataEngine.Tracker_APICalls')->where('id', $id)->update(['CurrentSignal'=>$signal,'EmergencyExit'=>$EmergencyExit]);
              // $out = exec('cd && cd /home/edubooks/Web/Crons/ApiCalls/ && ./ApiCalls.sh '.$APICallName.' 2>&1');
              $out = exec('cd .. && cd /Web/Crons/ApiCalls && ./ApiCalls.sh '.$APICallName.' 2>&1');
              return $out;
          }
          if($currentSignal != 'red'){
              DB::table('DataEngine.Tracker_APICalls')->where('id', $id)->update(['CurrentSignal'=>$signal,'EmergencyExit'=>$EmergencyExit]);
              return json_encode("Success : Signal changed successfully !");
          }
        }else{
          if($currentSignal == 'red'){
              DB::table('DataEngine.Tracker_APICalls')->where('id', $id)->update(['CurrentSignal'=>$signal,'EmergencyExit'=>$EmergencyExit]);
              // $out = exec('cd && cd /home/edubooks/Web/Crons/ApiCalls/ && ./ApiCalls.sh '.$APICallName.' 2>&1');
              $out = exec('cd && cd /Web/Crons/ApiCalls && ./US_ApiCalls_Trigger.php 2>&1');
              // $out = exec('wget http://198.199.78.178/US_ApiCalls_Trigger.php');
              return $out;
              // $connection = ssh2_connect('198.199.78.178', 22);
              // ssh2_auth_password($connection, 'root', '22cb594187783b0496f5efcf49aa');
              // $stream = ssh2_exec($connection, 'cd .. && cd Web/Crons/ApiCalls/ && ./US_ApiCalls.sh');
              // return var_dump($stream);
          }
          // if($currentSignal != 'red'){
          //     DB::table('DataEngine.Tracker_APICalls')->where('id', $id)->update(['CurrentSignal'=>$signal,'EmergencyExit'=>$EmergencyExit]);
          //     return json_encode("Success : Signal changed successfully !");
          // }
        }
    }
    public function editAPICallAccountKeys(Request $request){
      $id = $request->input("id");
      $public_key = $request->input("public_key");
      $private_key = $request->input("private_key");
      $assocaite_tag = $request->input("assocaite_tag");
      $region = $request->input("region");
      DB::table('DataEngine.Tracker_APICalls')->where('id', $id)
          ->update(['PublicKey'=>$public_key,'PrivateKey'=>$private_key, 'AssociateTag'=>$assocaite_tag, 'Region'=>$region ]);
      return json_encode("Success : Environment changed successfully !");
    }
}
