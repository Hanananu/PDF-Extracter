import React, { useEffect, useMemo, useState ,useRef} from "react";
import { EyeIcon,CloudArrowDownIcon } from "@heroicons/react/24/solid";


var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =  "/js/pdf.worker.js";

function FileConverter({ pdfUrl, fileName }) {
  
  const myRef = useRef();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [imageUrls]);

  const handleClickOpen = (url, index) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const UrlUploader = (url) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let reader = new FileReader();
        reader.onload = (e) => {
          const data = atob(e.target.result.replace(/.*base64,/, ""));
          renderPage(data);
        };
        reader.readAsDataURL(blob);
      });
    });
  };

  useMemo(() => {
    UrlUploader(pdfUrl);
  }, []);

  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canv");
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setNumOfPages((e) => e + pdf.numPages);
    setImageUrls((e) => [...e, ...imagesList]);
  };

  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageUrls]);

  const downloadImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };

  return (
    <div className="px-2 py-4 text-center overflow-y-auto scrollbar-hide max-h-[480px] " ref={myRef}>
      {loading ? (
        <div className="text-4xl text-black">Loading...</div>
      ) : (
        <>
          {imageUrls.length > 0 && (
            <>
              <h4 className="text-2xl mb-4 text-black font-semibold">
                Select Pages For Extracting - {numOfPages}
              </h4>
              <div className="flex flex-wrap  gap-4 justify-center ">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative w-48 h-48 px-2 py-2 opacity-100"
                >
                  <img
                    src={url}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-cover shadow-md border border-gray-300 rounded"
                  />
                  <div className="absolute top-1 right-1 space-x-1 ">
                    <button
                      onClick={() => handleClickOpen(url, index)}
                      className="btn-bg p-2 "
                    >
                      <EyeIcon className="h-7 w-7 text-black bg-slate-300 rounded-full"/>
                    </button>
                    <button
                      onClick={() => downloadImage(url, index)}
                      className="btn-bg p-2 rounded-full "
                    >
                      <CloudArrowDownIcon className="h-7 w-7 text-black bg-slate-300 rounded-full"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </>
      )}
      {open && (
        <div className="fixed inset-0  flex items-center justify-center ">
          <div className="bg-white p-4 rounded-lg max-w-2xl overflow-y-auto scrollbar-default">
            <img
              src={selectedImage?.url}
              alt={selectedImage?.url}
              className="w-96 h-96 object-fill"
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="text-white bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  downloadImage(selectedImage.url, selectedImage.index)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileConverter;
