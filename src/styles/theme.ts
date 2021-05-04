export const theme: ITheme = {
    colors: {
        primary: '#7b2cbf',
        secondary: '#ff7900',
        textColor: '#fefefe',
        background: '#240046'
    }
}

export interface ITheme {
    colors: {
        primary: string;
        secondary: string;
        textColor:  string;
        background:  string;
    }
}