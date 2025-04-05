import { theme } from '../../Styles/theme'; // Ajusta la ruta según sea necesario

describe('theme.js', () => {
  it('debe tener un color primario definido', () => {
    expect(theme.colors.primary).toBe('#4CAF50');  // Verifica si el color primario es el correcto
  });

  it('debe tener un color de fondo', () => {
    expect(theme.colors.background).toBe('#f4f4f4');  // Verifica el color de fondo
  });

  it('debe tener el tamaño de fuente medium', () => {
    expect(theme.fontSizes.medium).toBe('1.2rem');  // Verifica el tamaño de la fuente
  });
});
