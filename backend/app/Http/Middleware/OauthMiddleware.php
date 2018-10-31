<?php

namespace App\Http\Middleware;

use Closure;
class OauthMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $allowedDomains = array("http://localhost:4200");
        // $allowedDomains = array("");
        $origin = $request->server('HTTP_ORIGIN');
        if(in_array($origin, $allowedDomains)){
            if($request->isMethod('OPTIONS')) {
                $response = response('', 200);
            } else {
                $response = $next($request);
            }
            $response->header('Access-Control-Allow-Origin', $origin);
            // $response->header('Access-Control-Allow-Origin', "*");
            // $response->header('Content-Type', 'text/tab-separated-values');
            $response->header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE');
            $response->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
        }
        return $response;
    }
}
