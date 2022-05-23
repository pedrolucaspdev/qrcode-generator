<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QrController;
use RealRashid\SweetAlert\Facades\Alert;

Route::get('/', function () {
    return view('index');
});

Route::get('/qrcode/read', function () {
    return redirect('index');
});


Route::controller(QrController::class)->group(function () {
    Route::get('/qrcode/generate/{message}', 'generateQr')->name('qrcode.generate');
    Route::post('/qrcode/read/', 'readQr')->name('qrcode.read');
});


