module.exports = mongoose => {
    const Empresa = mongoose.model(
        "empresa",
        mongoose.Schema(
            {
                name: String,
            },
            { timestamps: true}
        )
    )
    return Empresa;
}