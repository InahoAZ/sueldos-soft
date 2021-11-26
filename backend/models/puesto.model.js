const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            convenio_subcat: {
                type: Schema.Types.ObjectId,
                ref: 'subcategorias_conv',    
            }           
            
            
        },
        { timestamps: true}
    );
    
    
    
    
    const Puesto = mongoose.model("puesto", schema);

    return Puesto;
}