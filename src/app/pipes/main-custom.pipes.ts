export class basicCustomPipesMethods{
    constructor(){
    }

    static addChar(value: any, str: string){
        let result = value.toString() + str;
        return result;
    }
}