export class Producto {
    id: string;
    type: string;
    totalArea: number;
    builtArea: number;
    antique: string;
    levelId: string;
    ubication: string;
    address: string;
    rooms: string;
    office?: string;
    bathrooms: string;
    garages?: string;
    floors: string;
    price: number;
    priceDiscount: number;
    priceAdmon?: number;
    pricePolicy?: number;
    imgCover: string;
    descripcion: string;

    constructor(id: string, type: string, totalArea: number, builtArea: number, antique: string, levelId: string, ubication: string, address: string, rooms: string, office: string, bathrooms: string, garages: string, floors: string, price: number, priceDiscount: number, priceAdmon: number, pricePolicy: number, imgCover: string ,descripcion: string) {
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
