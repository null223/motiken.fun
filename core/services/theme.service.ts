import { ColorSet } from "../interfaces/theme";
import {baseColors, ColorSet1, ColorSet2, ColorSet3 } from "../constants/color";

export const getRandomColorSet = (): ColorSet => {
    const colorSets = [ColorSet1, ColorSet2, ColorSet3];
    return colorSets[Math.floor(Math.random() * colorSets.length)];
};

export const getThemeColor = () => {
    const colorSet = getRandomColorSet();
    return {
        colors: {
            ...baseColors,
            ...{
                primary: colorSet.main,
                secondary: colorSet.base,
                orange: colorSet.accent,
                black: colorSet.text,
            }
        }
    }
}