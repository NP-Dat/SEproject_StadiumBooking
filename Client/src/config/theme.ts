export const theme = {
    light: {
        background: '#ffffff',
        text: '#000000',
    },
    dark: {
        background: '#000000',
        text: '#ffffff',
    },
};

export type ThemeType = typeof theme.light | typeof theme.dark;
