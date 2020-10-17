export declare function clamp(value: number, min: number, max: number): number;
export declare type Position = {
    x: number;
    y: number;
};
export declare function getMousePosition(e: MouseEvent | TouchEvent): Position;
export declare function pad2(c: string): string;
