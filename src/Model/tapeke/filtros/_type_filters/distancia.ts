import { typeFilters } from "."

export const data: typeFilters = {
    showInBar: false,
    label: "Distancia",
    select: "14",
    options: {
        "4": { label: "menos de 4 Km", value: "4" },
        "14": { label: "menos de 14 Km", value: "14" },
    }
}

export const filtro = (arr, filtro) => {
    // return arr;
    return arr.filter((obj: any) => parseFloat(obj?.distancia ?? 0) <= parseFloat(filtro?.select ?? 0));
}