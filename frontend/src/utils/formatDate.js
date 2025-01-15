export const formatDate  = (isoDate) =>{
    const date = new Date(isoDate);
    return date.toLocaleDateString('vi-VN',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}