import '@testing-library/jest-dom';

// Fix for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
