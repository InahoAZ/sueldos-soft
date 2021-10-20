const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            
        },
        { timestamps: true}
    );
    
    
    
    
    const Puesto = mongoose.model("puesto", schema);

    return Puesto;
}