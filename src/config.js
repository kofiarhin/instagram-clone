const avatar = `https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg`;

const LoggedIn = () => {

    const user = sessionStorage.getItem("user");

    return user;
}


const generateDate = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
export { avatar, LoggedIn, generateDate }