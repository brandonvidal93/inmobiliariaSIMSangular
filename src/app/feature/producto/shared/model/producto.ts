export class Producto {
    id: string;
    type: number;
    totalArea: number;
    builtArea: number;
    antique: string;
    levelId: number;
    ubication: string;
    address: string;
    rooms: number;
    office?: number;
    bathrooms: number;
    garages?: number;
    floors: number;
    price: number;
    priceDiscount: number;
    priceAdmon?: number;
    pricePolicy?: number;
    imgCover: string;
    descripcion: string;

    constructor(id: string, type: number, totalArea: number, builtArea: number, antique: string, levelId: number, ubication: string, address: string, rooms: number, office: number, bathrooms: number, garages: number, floors: number, price, priceDiscount: number, priceAdmon: number, pricePolicy: number, imgCover: string ,descripcion: string) {
        this.id = id;
        this.type = type;
        this.totalArea = totalArea;
        this.builtArea = builtArea;
        this.antique = antique;
        this.levelId = levelId;
        this.ubication = ubication;
        this.address = address;
        this.rooms = rooms;
        this.office = office;
        this.bathrooms = bathrooms;
        this.garages = garages;
        this.floors = floors;
        this.price = price;
        this.priceDiscount = priceDiscount;
        this.priceAdmon = priceAdmon;
        this.pricePolicy = pricePolicy;
        this.imgCover = imgCover;
        this.descripcion = descripcion;
    }
}
