// const localStorageMock = {
// 	getItem: jest.fn(),
// 	setItem: jest.fn(),
// 	clear: jest.fn()
// };
// global.localStorage = localStorageMock;
import 'jest-localstorage-mock';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });