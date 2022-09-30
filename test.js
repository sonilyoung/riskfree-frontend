const [selectedFileName, setSelectedFileName] = useState("")



const handleDialogOpen = () => {
    setSelectedFileName("");
}

const handleDialogInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file.name)
}


selectedFileName = { selectedFileName }