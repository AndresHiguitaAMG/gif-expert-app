import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import useFetchGifs from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Purebas en el componente <GifGrid />', () => {
    const category = 'One Punch';
    test('debe de mostrar el loading inicialmente', () => {
        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true,
        });
        render(<GifGrid category={category}/>);
        
        expect(screen.getByText('Loading...'));
        expect(screen.getByText(category));
    });

    test('debe de mostrar items cuando se cargan las imágenes useFetchGifs', () => {
        const gifs = [
        {
            id: 'ABC',
            title: 'Saitama',
            url: 'https://localhost/saitama.jpg'
        },

        {
            id: '123',
            title: 'Pikachu',
            url: 'https://localhost/pikachu.jpg'
        }
    ];
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false,
        });
        render(<GifGrid category={category}/>);
        
        expect(screen.getAllByRole('img').length).toBe(2);
    })
})