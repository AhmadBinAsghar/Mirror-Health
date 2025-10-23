import { SendData } from "./SendData";

// Define the DeviceName class extending SendData
export class DeviceName extends SendData {
    name: string;

    constructor(name: string = '') {
        super(); // Call the constructor of SendData
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}
