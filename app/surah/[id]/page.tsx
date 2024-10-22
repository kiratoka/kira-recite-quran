
const page = ({ params }: any) => {
    const numberAyat = params.id
    return (
        <div>Nomor surat {numberAyat}</div>
    )
}

export default page