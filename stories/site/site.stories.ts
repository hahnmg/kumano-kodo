import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, type Content } from '../templates/content';
import {
    dayPage,
    daysPage,
    homePage,
    kohechiPage,
    legalPage,
    newsletterPage,
    photosPage,
    placePage,
    practicalPage,
    practicalSubPage,
    routePage,
    searchPage,
    loginPage,
    contactPage,
} from '../templates/site-pages.markup';

const page =
    (render: (c: Content) => string): StoryObj['render'] =>
    (_, { globals }) =>
        render(content(globals.locale));

// Every page of the trail journal; internal links switch between these stories (see .storybook/preview.ts).
const meta: Meta = { title: 'Site', tags: ['!autodocs', 'dev'], parameters: { layout: 'fullscreen', options: { showPanel: false } } };
export default meta;

export const Home: StoryObj = { render: page(homePage) };
export const Route: StoryObj = { name: 'The route', render: page(routePage) };
export const Days: StoryObj = { name: 'Days and places', render: page(daysPage) };
export const Day1: StoryObj = { name: 'Day 1', render: page((c) => dayPage(1, c)) };
export const Day2: StoryObj = { name: 'Day 2', render: page((c) => dayPage(2, c)) };
export const Day3: StoryObj = { name: 'Day 3', render: page((c) => dayPage(3, c)) };
export const Day4: StoryObj = { name: 'Day 4', render: page((c) => dayPage(4, c)) };
export const PlaceChikatsuyu: StoryObj = { name: 'Place · Chikatsuyu', render: page((c) => placePage('chikatsuyu', c)) };
export const PlaceYunomine: StoryObj = { name: 'Place · Yunomine', render: page((c) => placePage('yunomine', c)) };
export const PlaceNachi: StoryObj = { name: 'Place · Nachi', render: page((c) => placePage('nachi', c)) };
export const Practical: StoryObj = { render: page(practicalPage) };
export const PracticalGettingThere: StoryObj = {
    name: 'Practical · Getting there',
    render: page((c) => practicalSubPage('getting-there', c)),
};
export const PracticalAccommodation: StoryObj = {
    name: 'Practical · Accommodation',
    render: page((c) => practicalSubPage('accommodation', c)),
};
export const PracticalTrailMarkers: StoryObj = {
    name: 'Practical · Trail markers',
    render: page((c) => practicalSubPage('trail-markers', c)),
};
export const PracticalMaps: StoryObj = { name: 'Practical · Maps', render: page((c) => practicalSubPage('maps', c)) };
export const Photos: StoryObj = { render: page(photosPage) };
export const Newsletter: StoryObj = { render: page(newsletterPage) };
export const Kohechi: StoryObj = { render: page(kohechiPage) };
export const Imprint: StoryObj = { render: page((c) => legalPage('imprint', c)) };
export const Privacy: StoryObj = { render: page((c) => legalPage('privacy', c)) };
export const Accessibility: StoryObj = { render: page((c) => legalPage('accessibility', c)) };
export const Search: StoryObj = { render: page(searchPage) };
export const Login: StoryObj = { name: 'Log in', render: page(loginPage) };
export const Contact: StoryObj = { render: page(contactPage) };
