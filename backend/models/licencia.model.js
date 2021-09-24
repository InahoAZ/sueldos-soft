module.exports = mongoose => {
    const Licencia = mongoose.model(
        "licencia",
        mongoose.Schema(
            {
                descripcion: String,
            },
            { timestamps: true}
        )
    )
    return Licencia;
}