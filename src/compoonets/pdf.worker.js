importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js');

self.onmessage = function (e) {
  if (e.data.msg === 'loadDocument') {
    const loadingTask = pdfjsLib.getDocument(e.data.url);
    loadingTask.promise.then(
      function (pdfDocument) {
        postMessage({ msg: 'documentLoaded', data: pdfDocument });
      },
      function (reason) {
        postMessage({ msg: 'documentError', data: reason });
      }
    );
  }
};
