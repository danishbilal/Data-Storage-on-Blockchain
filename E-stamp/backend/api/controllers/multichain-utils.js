//  console.log(process.env.host)

let multichain = require("multichain-node")({
    //  port: process.env.port,
    //  host: process.env.host,
    //  user: process.env.user,
    //  pass: process.env.pass
    port: "4267",
    host: "127.0.0.1",
    user: "multichainrpc",
    pass: "51xK7ef5WqYrDqpnareGjEou23HBGSkGJ6FZAur5BY5J"
    //  headers: {
    //      'Content-Type': 'application/json'
    //  }
});
let obj = {
    //  "json": {
    "PersonName": "huzaifa",
    "IncidentLocation": "St # 02 Model Town house 332",
    "RegistrarDesignation": "Clerk",
    "CrimeType": "Violence",
    "Hash": "asd",
    "District": "Punjab",
    "CaseSummary": "2 people killed their friend",
    "RegistrarName": "Umar",
    "PoliceStationAddress": "ModelTown Lahore"
    //  }
}
exports.multichain_publish = (stream, key, obj) => {
    multichain.publish([stream, key, obj], (err, info) => {
        if (err) {
            return {
                status: -1,
                err: err

            }

        }
        return {
            status: 1,
            result: info

        }
    })

}
exports.multichain_subscibe = (stream) => {
    multichain.subscribe([stream, {
        "rescan": true
    }], (err, info) => {
        if (err) {
            return {
                status: -1,
                err: err

            }

        }
        return {
            status: 1,
            result: info

        }
    })

}
exports.multichain_get_all_stream_items = async (stream = "stream1", count = 99999) => {
    try {
        console.log("count", count);
        let res = await multichain.listStreamItems(
            [stream, false, count, -1 * count, false]
        );
        // console.log("res", res);
        if (res.err) {
            let obj = {
                status: -1,
                err: err

            }
            return obj;

        } else {
            let obj = {
                status: 1,
                result: res

            }
            return obj;
        }
    } catch (err) {
        console.log("count", count);

        return err;
    }
}
// , (err, info) => {
//     if (err) {
//         let obj = {
//             status: -1,
//             err: err

//         }
//         return err;

//     }

//     let obj = {
//         status: 1,
//         result: info

//     }
//     return obj;
// })