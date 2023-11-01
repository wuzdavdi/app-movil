export class Datos{
    datId: any
    datNombre: string
    datLanzamiento: string
    datGenero: any
    datImagen: string
    datDescripcion: string

    constructor(datId:any, datNombre: string, datLanzamiento: string,
                datGenero: any, datImagen: string,
                datDescripcion: string)
    {
        this.datId = datId
        this.datNombre = datNombre
        this.datLanzamiento = datLanzamiento
        this.datGenero = datGenero
        this.datImagen = datImagen
        this.datDescripcion = datDescripcion
    }
}