const mongoose = require('mongoose');

const FirSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    TehsilName: {
        type: String
    },
    DistrictName: {
        type: String
    },
    DeedName: {
        type: String
    },
    StampPaperType: {
        type: String
    },
    AgentName: {
        type: String
    },
    AgentCNIC: {
        type: String
    },
    AgentContact: {
        type: String
    },
    FPName: {
        type: String
    },
    FPCNIC: {
        type: String
    },
    SPName: {
        type: String
    },
    SPCNIC: {
        type: String
    },
    Status: {
        type: String,
        default: "pending"
    },
    StreamId: {
        type: [String]
    },
    Hash: {
        type: String
    },
    InvestigationStatus: {
        type: String,

    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Fir', FirSchema);