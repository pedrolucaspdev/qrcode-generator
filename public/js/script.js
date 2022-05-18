async function generateQr () {
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Your Message / Link',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
    })
      
    if (text) {
      Swal.fire({
        title: 'QR Code, Done!',
        text: 'Choose an option',
        imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?data='+text+'',
        imageWidth: 250,
        imageHeight: 200,
        confirmButtonText: 'Download', 
        cancelButtonText: 'Exit',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to select a file!'
          }
        }
      })

      var url = 'https://api.qrserver.com/v1/create-qr-code/?data='+text+'';
      downloadQrImage(url)
    }
}

async function downloadQrImage ($url) {
  const { value: filename } = await Swal.fire({
    title: 'Enter your filename',
    input: 'text',
    inputLabel: 'Your Filename',
    inputPlaceholder: 'Insert your filename...',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  })

  if (filename) {
    const image = await fetch($url)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

async function readQr () {
    const { value: file } = await Swal.fire({
      title: 'Insert Filename',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
      }
    })


    if (file) {
    var form = new FormData();
    form.append("file", file, file.name);
    
    var settings = {
      "url": "http://api.qrserver.com/v1/read-qr-code/",
      "method": "POST",
      "timeout": 0,
      "dataType": "json",                 
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };
    
    $.ajax(settings).done(function (response) {
      Swal.fire(
        'Message Returned',
        response[0]['symbol'][0]['data'],
        'success'
      )
    });
  }
}