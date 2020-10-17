export declare type RGBAColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare type HSVAColor = {
    h: number;
    s: number;
    v: number;
    a?: number;
};
export declare class Color {
    private _rgba;
    private _hsva;
    private _hexNumber;
    private _brightness;
    private _hexString;
    private _isDark;
    private _isLight;
    constructor(color: number | string);
    fromHex(color: number | string): void;
    fromHsv(color: HSVAColor): void;
    private _updateBrightness;
    get rgb(): RGBAColor;
    get hsv(): HSVAColor;
    get hex(): number;
    get hexString(): string;
    get brightness(): number;
    get isDark(): boolean;
    get isLight(): boolean;
}
export declare function hexNumberToRgb(color: number): RGBAColor;
export declare function rgbToHex(color: RGBAColor): string;
export declare function numberToHexString(color: number): string;
export declare function hexStringToNumber(color: string): number;
export declare function hsvToRgb(color: HSVAColor): RGBAColor;
export declare function rgbToHsv(color: RGBAColor): HSVAColor;
