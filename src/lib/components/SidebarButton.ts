const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const headerButton = document.querySelector(".header--menu button");
    sidebar?.classList.toggle("sidebar--hidden");
    if (sidebar?.classList.contains("sidebar--hidden")) {
        headerButton?.classList.remove("transparent");
        sidebar?.classList.add("transparent");
    } else {
        headerButton?.classList.add("transparent");
        sidebar?.classList.remove("transparent");
    }
}

export default toggleSidebar;