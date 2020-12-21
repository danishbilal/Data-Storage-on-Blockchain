const mongoose = require("mongoose");

const Fir = require("../models/fir");
const helper = require("./helpers");
const { update } = require("../models/fir");
const multichain = require("multichain-node")({

    // port: process.env.multichainport,
    // host: process.env.multichainhost,
    // user: process.env.multichainuser,
    // pass: process.env.multichainpass
    port: "4267",
    host: "127.0.0.1",
    user: "multichainrpc",
    pass: "51xK7ef5WqYrDqpnareGjEou23HBGSkGJ6FZAur5BY5J"

});

exports.firs_get_all = (req, res, next) => {
    Fir.find().exec()
        .then(docs => {
            const response = {
                count: docs.length,
                firs: docs
                // docs.map(doc => {
                //     return {
                //         name: doc.name,
                //         price: doc.price,
                //         productImage: doc.productImage,
                //         _id: doc._id,
                //         request: {
                //             type: "GET",
                //             url: "http://localhost:3000/products/" + doc._id
                //         }
                //     };
                // })
            };
            //   if (docs.length >= 0) {
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.fir_create = (req, res, next) => {
    let inputobj = {
        _id: new mongoose.Types.ObjectId(),
        TehsilName: req.body.TehsilName,
        DistrictName: req.body.DistrictName,
        DeedName: req.body.DeedName,
        StampPaperType: req.body.StampPaperType,
        AgentName: req.body.AgentName,
        AgentCNIC: req.body.AgentCNIC,
        AgentContact: req.body.AgentContact,
        FPName: req.body.FPName,
        FPCNIC: req.body.FPCNIC,
        SPName: req.body.SPName,
        SPCNIC: req.body.SPCNIC,
        Status: req.body.Status,

    };
    //   Needs to take hash
    // inputobj.Hash="";
    const hash = helper.generatehash(inputobj);
    inputobj.Hash = hash;
    // multichain 
    let multichainObj = {
        "json": inputobj
    };
    console.log("input obj", multichainObj);
    multichain.publish(["stream1", "key1", multichainObj]).then(resp => {
        const streamarr = [resp];
        inputobj.StreamId = streamarr
        // console.log("Stream Id " + resp);
        const fir = new Fir(inputobj);
        fir.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Created Fir successfully",
                    data: result

                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            });

        // return res.status(200).json({
        //     result: resp,
        //     message: "success"
        // });
    }).catch(err => {
        console.log(err);

        return res.status(500).json({
            error: err,
            msg: "exception"
        });
    });
    // 

};
exports.fir_get = (req, res, next) => {
    const id = req.params.firId;
    Fir.findById(id).select("-__v")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                // calculate hash
                let obj = {
                    _id: doc._id,
                    TehsilName: doc.TehsilName,
                    DistrictName: doc.DistrictName,
                    DeedName: doc.DeedName,
                    StampPaperType: doc.StampPaperType,
                    AgentName: doc.AgentName,
                    AgentCNIC: doc.AgentCNIC,
                    AgentContact: doc.AgentContact,
                    FPName: doc.FPName,
                    FPCNIC: doc.FPCNIC,
                    SPName: doc.SPName,
                    SPCNIC: doc.SPCNIC,
                    Status: doc.Status
                };
                //   Needs to take hash
              
                const hash = helper.generatehash(obj);
                let hashresult = false;
                if (hash === doc.Hash) {
                // if hash matches send resposne
                    hashresult = true;
                    return res.status(200).json({
                        fir: doc,
                        hashmatched: hashresult,
                        calculatedhash: hash,
                        dbhash:doc.Hash
                        // request: {
                        //     type: "GET",
                        //     url: "http://localhost:3000/products"
                        // }
                    });
                }
                // if hash not match get data from multichain
                // get multichain item
                else {
                  console.log('streamid reading',doc.StreamId[doc.StreamId.length-1]);
                    multichain.getStreamItem(["stream1",doc.StreamId[doc.StreamId.length-1]]).then(resp => {
                        
                        // multichain doc,
                        const firobj=resp.data.json;
                      
                        let updatepropsobj = {
                            _id: firobj._id,
                            TehsilName: firobj.TehsilName,
                            DistrictName: firobj.DistrictName,
                            DeedName: firobj.DeedName,
                            StampPaperType: firobj.StampPaperType,
                            AgentName: firobj.AgentName,
                            AgentCNIC: firobj.AgentCNIC,
                            AgentContact: firobj.AgentContact,
                            FPName: firobj.FPName,
                            FPCNIC: firobj.FPCNIC,
                            SPName: firobj.SPName,
                            SPCNIC: firobj.SPCNIC,
                            Status: firobj.Status,
                        };
                        // update this record into db and send
                    Fir.findOneAndUpdate({ _id: firobj._id }, { $set: updatepropsobj }, {
                        new: true 
                    }).then(updateddoc => {
                        return res.status(200).json({
                            message: "Chain Fir updated  successfully into db ",
                            fir: updateddoc

                        });
                    })
                        .catch(e => {
                            return res.status(500).json({
                                error: e,
                                message: "chain FIR updation failed"
                            });
                        });



                        //End updation db
                    }).catch(err => {
                        return res.status(500).json({
                            error: err,
                            msg: "exception"
                        });
                    });
                }



               
            } else {
              return  res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
// dont call search api with empty params
exports.fir_search = (req, res, next) => {
    // const searchfir = "/" + req.params.firsearch + "/i";
    let searchfir;
    searchfir = req.params.firsearch;
    console.log("searchfir" + searchfir);

    // User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}
    console.log(searchfir);
    Fir.find({
        $or: [
            {
                TehsilName: new RegExp(searchfir, 'i')
            },
            {
                DistrictName: new RegExp(searchfir, 'i')
            },
            {
                DeedName: new RegExp(searchfir, 'i')
            },
            {
                StampPaperType: new RegExp(searchfir, 'i')
            },
            {
                AgentName: new RegExp(searchfir, 'i')
            },
            {
                AgentCNIC: new RegExp(searchfir, 'i')
            },
            {
                AgentContact: new RegExp(searchfir, 'i')
            },
            {
                FPName: new RegExp(searchfir, 'i')
            },
            {
                FPCNIC: new RegExp(searchfir, 'i')
            },
            {
                SPName: new RegExp(searchfir, 'i')
            },
            {
                SPCNIC: new RegExp(searchfir, 'i')
            },
            {
                Status: new RegExp(searchfir, 'i')
            }
        ]
    })
        .exec()
        .then(doc => {
            // console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    fir: doc,
                    // request: {
                    //     type: "GET",
                    //     url: "http://localhost:3000/products"
                    // }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.fir_update = async (req, res, next) => {
    const id = req.params.firId;
    console.log("req body " + req.body);
    const updateOps = {};
    for (const ops of req.body.data) {
        updateOps[ops.propName] = ops.value;
    }
    try {
        let doc = await Fir.findOneAndUpdate({ _id: id }, { $set: updateOps }, {
            new: true
        });
        console.log("after updating inital status:" + doc);
        // update new hash
        let updateddocobj = {
            _id: doc._id,
            TehsilName: doc.TehsilName,
            DistrictName: doc.DistrictName,
            DeedName: doc.DeedName,
            StampPaperType: doc.StampPaperType,
            AgentName: doc.AgentName,
            AgentCNIC: doc.AgentCNIC,
            AgentContact: doc.AgentContact,
            FPName: doc.FPName,
            FPCNIC: doc.FPCNIC,
            SPName: doc.SPName,
            SPCNIC: doc.SPCNIC,
            Status: doc.Status
        };
        //   Needs to take hash

        const hash = helper.generatehash(updateddocobj);
        updateddocobj.Hash = hash;
        updateddocobj.PreviousHash = doc.Hash ? doc.Hash : "";
        updateddocobj.StreamId = doc.StreamId ? doc.StreamId : "";
        let streamarr = doc.StreamId;
        let multichainObj = {
            "json": updateddocobj
        };
        console.log("multichain obj", multichainObj);
        // push new data stream
        multichain.publish(["stream1", "key1", multichainObj]).then(stid => {

            streamarr.push(stid);
            const updatepropsobj = {
                Hash: hash,
                StreamId: streamarr
            };

            Fir.findOneAndUpdate({ _id: id }, { $set: updatepropsobj }, {
                new: true
            }).then(updateddoc => {
                return res.status(200).json({
                    message: " Fir updated successfully",
                    data: updateddoc

                });
            })
                .catch(e => {
                    return res.status(500).json({
                        error: e,
                        message: "last updation record into db failed"
                    });
                });

        });
        // push new streamid to db

    }
    catch (e) {
        return res.status(500).json({
            error: e,
            message: "first updation into db failed"
        });
    }
    // .then(result => {
    //     res.status(200).json({
    //         message: "fir updated",
    //         request: {
    //             type: "GET",
    //             url: `http://localhost:${process.env.Port}/fir/` + id
    //         }
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // });


    // Fir.update({ _id: id }, { $set: updateOps })
    //     .exec()
    //     .then(result => {
    //         res.status(200).json({
    //             message: "fir updated",
    //             request: {
    //                 type: "GET",
    //                 url: `http://localhost:${process.env.Port}/fir/` + id
    //             }
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
    // 

};


