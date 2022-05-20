<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QrcodeController;

Route::get('/', function () {
    return view('index');
});
