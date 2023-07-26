export const ValidateEditProfile = (
    profile:File | null,
    niche : string,
    image : File | null,
    description : string,
    err:object,
    setErr:Function
) =>{
    const nicheRegex: RegExp = /^[A-Za-z ]{3,20}$/;
    const descriptionRegex: RegExp = /^.{10,500}$/;
    setErr((prevErr: object) => ({
        ...prevErr,
        // profile : (profile?.name.trim().length === 0) ? 'Please choose a profile image!' : '',
        // niche: (niche.trim().length === 0) ? 'Niche field cannot be empty!' : (!nicheRegex.test(niche) ? 'Enter a valid niche' : ''), 
        niche: (!nicheRegex.test(niche) ? 'Enter a valid niche' : ''), 
        // image : (image?.name.trim().length === 0) ? 'Please choose a banner image!' : '',
        description: (!descriptionRegex.test(description) ? 'Enter a valid description' : ''),
      }));
}


// export const ValidateEditProfile = (
//     profile:File | null,
//     niche : string,
//     image : File | null,
//     description : string,
//     err:object,
//     setErr:Function
// ) =>{
//     const nicheRegex: RegExp = /^[A-Za-z ]{3,20}$/;
//     const descriptionRegex: RegExp = /^.{10,500}$/;
//     setErr((prevErr: object) => ({
//         ...prevErr,
//         profile : (profile?.name.trim().length === 0) ? 'Please choose a profile image!' : '',
//         niche: (niche.trim().length === 0) ? 'Niche field cannot be empty!' : (!nicheRegex.test(niche) ? 'Enter a valid niche' : ''), 
//         image : (image?.name.trim().length === 0) ? 'Please choose a banner image!' : '',
//         description: (description.trim().length === 0) ? 'Description field cannot be empty!' : (!descriptionRegex.test(description) ? 'Enter a valid description' : ''),
//       }));
// }