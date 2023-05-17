export default interface ProductType {
    product_id: string;
    name: string,
    price:number;
    type?: string,
    size: 'XL' | 'XS' | 'L'| 'M'| 'S'
}
