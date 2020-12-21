function filterstreamitem() {
    var item = getfilterstreamitem();

    if (item.format != "json") {
        return "Only JSON items are allowed";
    }
    var json = item.data.json;

    if ((!json.hasOwnProperty("PersonName")) || (json.PersonName.length < 2)) {
        return "Item requires a PersonName";
    }
    if ((!json.hasOwnProperty("PersonCnic")) || (json.PersonCnic.length != 2)) {
        return "Item requires a valid Person Cnic";

    }
}



'function filterstreamitem() {var item = getfilterstreamitem();if (item.format != "json") return "Only JSON items are allowed";var json = item.data.json; if ((!json.hasOwnProperty("PersonName")) || (json.PersonName.length < 2))  return "Item requires a PersonName";if ((!json.hasOwnProperty("PersonCnic")) || (json.PersonCnic.length != 2)) return "Item requires a valid Person Cnic";}'

/*
  > multichain - cli thesischain create streamfilter filter1 '{}
*/




/*
2nd minified version
function filterstreamitem() { var e = getfilterstreamitem(); if ("json" != e.format) return "Only JSON items are allowed"; var r = e.data.json; return !r.hasOwnProperty("PersonName") || r.PersonName.length < 2 ? "Item requires a PersonName" : r.hasOwnProperty("PersonCnic") && 2 == r.PersonCnic.length ? void 0 : "Item requires a valid Person Cnic" }


*/
'function filterstreamitem(){var item=getfilterstreamitem();if(item.format!="json")return"Only JSON items are allowed";var json=item.data.json;if((!json.hasOwnProperty("PersonName"))||(json.PersonName.length<2))return"Item requires a PersonName";if((!json.hasOwnProperty("PersonCnic"))||(json.PersonCnic.length!=2))return"Item requires a valid Person Cnic"}'


thesis chain working
multichain - cli chain1 create streamfilter  filter1 "{}" "function filterstreamitem() { return \"Reject all items\"; }"