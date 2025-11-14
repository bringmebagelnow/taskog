const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const headerbutton = document.querySelector(".header--menu button");
    sidebar?.classList.toggle("sidebar--hidden");
    if (sidebar?.classList.contains("sidebar--hidden")) {
        headerbutton?.classList.remove("transparent");
        sidebar?.classList.add("transparent");
    } else {
        headerbutton?.classList.add("transparent");
        sidebar?.classList.remove("transparent");
    }
}

export default toggleSidebar;