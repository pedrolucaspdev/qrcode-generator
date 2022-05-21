<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use RealRashid\SweetAlert\Facades\Alert;

@include('sweetalert::alert');
class QrController extends Controller
{
    public function generateQr($message)
    {
        $response = Http::acceptJson()->get('https://api.qrserver.com/v1/create-qr-code/?data=' . $message);
        $response->header("Content-Type", 'image/png');
        return $response;
    }

    public function readQr(Request $request)
    {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
            ]);

            if ($request->hasFile('image')) {

                $file = $request->file('image');
                $filename = $request->file('image')->getClientOriginalName();

                $photo = fopen($file, 'r');
                $requestapi = Http::attach(
                    'file', $photo, $filename
                )->post('http://api.qrserver.com/v1/read-qr-code/')->json();

                $message = $requestapi[0]['symbol'][0]['data'];

                if ($message == null) {
                    Alert::toast('QR Code not found');
                } else {
                    session()->flash("success");
                    Alert::success('Message Below', $message);
                }
                return redirect('/');
            }
        }
}
