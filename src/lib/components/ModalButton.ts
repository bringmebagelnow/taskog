const toggleModal = () => {
    const modal = document.querySelector(".modal");
    const createButton = document.querySelector(".modal--button");
    modal?.classList.toggle("modal--hidden");
    if (modal?.classList.contains("modal--hidden")) {
        createButton?.classList.remove("transparent");
        modal?.classList.add("transparent");
    } else {
        createButton?.classList.add("transparent");
        modal?.classList.remove("transparent");
    }
}

export default toggleModal;