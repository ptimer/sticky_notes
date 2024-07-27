export interface Note {
    $id: string;
    body: string;
    colors: string;
    position: string;
}

export interface Color {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
}
