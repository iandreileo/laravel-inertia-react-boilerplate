import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadComponent = ({
    fileTypes,
    type,
    name,
    route,
    download_extension,
}) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (file) => {
        setFile(file);
    };

    // transform the convert function using axios
    const convert = async () => {
        if (!file) return alert("Please select a file.");
        setLoading(true);
        var formdata = new FormData();
        formdata.append("file", file);
        formdata.append("type", type);

        try {
            axios
                .post(`/api/tools/${route}`, formdata, {
                    responseType: "blob",
                })
                .then((response) => response.data)
                .then((result) => {
                    // convert the result to blob
                    const blob = new Blob([result], {
                        type: "application/zip",
                    });

                    // download the file
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");

                    link.href = url;

                    const fileName = file.name.split(".")[0];

                    link.setAttribute(
                        "download",
                        `${fileName}.${download_extension}`
                    );
                    link.click();
                });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <FileUploader
                multiple={false}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
            />
            <button
                onClick={convert}
                disabled={loading}
                className="text-center w-full my-4 hover:text-gray-400 text-white bg-gray-800 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
                CONVERT
            </button>
            {/* loading */}
            {loading ? (
                <div className="text-center w-full m-auto">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-bgray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        ></path>
                    </svg>
                </div>
            ) : (
                ""
            )}
            <p className="text-xs text-center">
                {file ? `File name: ${file.name}` : "no files uploaded yet"}
            </p>
        </div>
    );
};

export default UploadComponent;
