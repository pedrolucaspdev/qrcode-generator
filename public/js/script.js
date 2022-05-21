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
        // imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?data='+text+'',
        imageUrl: 'http://127.0.0.1:8000/qrcode/generate/'+text+'',
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
          var url = 'http://127.0.0.1:8000/qrcode/generate/'+text+'';
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
