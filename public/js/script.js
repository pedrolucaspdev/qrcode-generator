// Generate QR Code
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

    // Check input message
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
      }).then((result) => {
        if(result.isConfirmed) {
          var url = 'https://api.qrserver.com/v1/create-qr-code/?data='+text+'';
          downloadQrImage(url)
        }
      })
    }
}

// Download the QR Image Generated
async function downloadQrImage ($url) {
  const { value: filename } = await Swal.fire({
    title: 'Enter your filename',
    input: 'text',
    inputLabel: 'Your Filename',
    inputPlaceholder: 'Enter a name for the file ...',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  })

  // Checks to see if it contains the file name
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

// Read QR Code
async function readQr () {

    const { value: file } = await Swal.fire({
      title: 'Select a file',
      input: 'file',
      showCancelButton: true,
      inputAttributes: {
        'accept': 'image/*',
      }
    })

    // Checks to see if it contains a file
    if (file) {
      var form = new FormData();
      form.append("file", file, file.name);

      // Settings of Ajax
      var settings = {
        "url": "http://api.qrserver.com/v1/read-qr-code/",
        "method": "POST",
        "timeout": 0,
        "dataType": "json",
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form,
      };

      // Request in API
      const result = $.ajax(settings).done(function (response) {

        // Validation of the uploaded image
        if(response[0]['symbol'][0]['data'] === null) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid file',
            text: 'could not detect the qr code, try to leave as visible as possible and try again! ',
          })
        } else {
            Swal.fire(
              'Message below',
              response[0]['symbol'][0]['data'],
              'success'
            )
          }
    })
  }
}


