function filterstreamitem() {
    var item = getfilterstreamitem();

    if (item.format != "json")
        return "Only JSON items are allowed";

    var json = item.data.json;

    if ((!json.hasOwnProperty("PersonName")) || (json.PersonName.length < 2))
        return "Item requires a PersonName";
    if ((!json.hasOwnProperty("PersonCnic")) || (json.PersonCnic.length != 2))
        return "Item requires a valid Person Cnic";

}