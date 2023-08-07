export const validate = (
    title:string,
    description:string,
    selectedThumbnail:File | null,
    selectedVideo:File,
    err:object,
    setErr:Function
    ) =>{
        const titleRegex: RegExp = /^[A-Za-z ]{3,50}$/;
        const descriptionRegex: RegExp = /^.{10,500}$/;
        setErr((prevErr: object) => ({
            ...prevErr,
            title: (title.trim().length === 0) ? 'Title field cannot be empty!' : (!titleRegex.test(title) ? 'Enter a valid title' : ''), 
            description: (description.trim().length === 0) ? 'Description field cannot be empty!' : '',

            thumbnail : (selectedThumbnail?.name.trim().length === 0) ? 'Please choose a thumbnail!' : '',
            video : (selectedVideo?.name.trim().length === 0) ? 'Please choose a video!' : '',
          }));
}

            // description: (description.trim().length === 0) ? 'Description field cannot be empty!' : (!descriptionRegex.test(description) ? 'Enter a valid description' : ''),