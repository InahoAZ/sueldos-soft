const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            subcategorias: [{
                type: Schema.Types.ObjectId,
                ref: 'subcat_conv'

            }]
        },
        { timestamps: true}
    );
    
    
    
    
    const CategoriasConv = mongoose.model("categorias_conv", schema);

    return CategoriasConv;
}