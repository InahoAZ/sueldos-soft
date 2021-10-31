const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            basico: Number,
            
        },
        { timestamps: true}
    );
    
    
    
    
    const SubCategoriasConv = mongoose.model("subcategorias_conv", schema);

    return SubCategoriasConv;
}