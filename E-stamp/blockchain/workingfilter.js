// unminify first we need to minify code
function filterstreamitem() {
    var item = getfilterstreamitem(); if (item.format != \"json\") { return \"Only JSON items are allowed\"; }
    var json = item.data.json; if (!json.hasOwnProperty(\"json\")) { return \"Item is not in proper formate\"; }
}


//working smart filter
multichain - cli thesischain create streamfilter filter1 "{}" "function filterstreamitem() { var t = getfilterstreamitem(); return \"json\" != t.format ? \"Only JSON items are allowed\" : t.data.json.hasOwnProperty(\"json\") ? void 0 : \"Item is not in proper formate\" }"

// id
259799f7b6dc5dff7406978fc4ad4083b6fcd8f69c011e90b51fd1dd7c2ac1ca
